#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${REPO_DIR:-/www/wwwroot/startup-company-website}"
BASE_URL="${BASE_URL:-https://jiuchenedu.com}"
LOCAL_URL="${LOCAL_URL:-http://127.0.0.1:8088}"
HOST_HEADER="${HOST_HEADER:-jiuchenedu.com}"
CURRENT_LINK="${CURRENT_LINK:-/www/wwwroot/jiuchen-current}"
RELEASES_DIR="${RELEASES_DIR:-/www/wwwroot/jiuchen-releases}"

cd "$REPO_DIR"

echo "========== 1. Git / build =========="
git rev-parse --short HEAD
if [[ -f out/index.html ]]; then
  stat out/index.html | grep -E 'Modify|修改' || true
  sha256sum out/index.html
else
  echo "WARN: out/index.html not found"
fi

echo
echo "========== 2. Nginx configuration test =========="
nginx -t

echo
echo "========== 3. Nginx effective roots / includes / 8088 =========="
nginx -T 2>/dev/null \
  | grep -nE 'listen[[:space:]].*8088|server_name|^[[:space:]]*root[[:space:]]|^[[:space:]]*include[[:space:]]|jiuchen-static|jiuchen-current|startup-company-website/out' \
  | head -n 180 || true

echo
echo "========== 4. /etc/nginx/default.d =========="
ls -lah /etc/nginx/default.d/ 2>/dev/null || true
for f in /etc/nginx/default.d/*.conf; do
  [[ -f "$f" ]] || continue
  echo
  echo "----- $f -----"
  sed -n '1,220p' "$f"
done

echo
echo "========== 5. Atomic release paths =========="
if [[ -L "$CURRENT_LINK" ]]; then
  echo "$CURRENT_LINK -> $(readlink -f "$CURRENT_LINK")"
elif [[ -e "$CURRENT_LINK" ]]; then
  echo "WARN: $CURRENT_LINK exists but is not a symlink"
else
  echo "$CURRENT_LINK does not exist yet"
fi

if [[ -d "$RELEASES_DIR" ]]; then
  ls -lah "$RELEASES_DIR" | head -n 40
else
  echo "$RELEASES_DIR does not exist yet"
fi

echo
echo "========== 6. Nginx read permission =========="
if [[ -f out/index.html ]] && runuser -u nginx -- test -r out/index.html; then
  echo "PASS: nginx can read out/index.html"
else
  echo "FAIL: nginx cannot read out/index.html"
fi

echo
echo "========== 7. Local / public status =========="
for url in "/" "/services" "/services/baoyan"; do
  printf 'LOCAL  %-32s ' "$url"
  curl -sS -o /dev/null -w '%{http_code}\n' -H "Host: $HOST_HEADER" "${LOCAL_URL}${url}"
  printf 'PUBLIC %-32s ' "$url"
  curl -sS -o /dev/null -w '%{http_code}\n' "${BASE_URL}${url}"
done

echo
echo "========== 8. Cache headers: HTML =========="
curl -sSI "${BASE_URL}/" \
  | grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|age:|via:|x-cache:|x-served-by:)' || true

echo
echo "========== 9. Cache headers: Next static asset =========="
homepage="$(mktemp)"
trap 'rm -f "$homepage"' EXIT
curl -fsS "${BASE_URL}/" -o "$homepage"
asset_path="$(grep -oE '/_next/static/[^" ]+\.(js|css)' "$homepage" | head -n 1 || true)"
if [[ -n "$asset_path" ]]; then
  echo "Asset: $asset_path"
  curl -sSI "${BASE_URL}${asset_path}" \
    | grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|age:|via:|x-cache:|x-served-by:)' || true
else
  echo "WARN: no Next.js JS/CSS asset found in homepage"
fi

echo
echo "PASS: preflight collection completed. No configuration was changed."
