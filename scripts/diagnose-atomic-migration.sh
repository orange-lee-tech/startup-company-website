#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="${LOG_FILE:-/root/jiuchen-migrate.log}"
CURRENT_LINK="${CURRENT_LINK:-/www/wwwroot/jiuchen-current}"
RELEASES_DIR="${RELEASES_DIR:-/www/wwwroot/jiuchen-releases}"
BASE_URL="${BASE_URL:-https://jiuchenedu.com}"
LOCAL_URL="${LOCAL_URL:-http://127.0.0.1:8088}"
HOST_HEADER="${HOST_HEADER:-jiuchenedu.com}"

echo "================================================"
echo "1. Migration log: key failure lines"
echo "================================================"
if [[ -f "$LOG_FILE" ]]; then
  grep -nEi 'FAIL|failed|error|permission denied|rolling back|rollback|cannot|missing|not found|refused|403|404|500|502|503' "$LOG_FILE" || true
else
  echo "Log file not found: $LOG_FILE"
fi

echo
echo "================================================"
echo "2. Migration log: last 220 lines"
echo "================================================"
if [[ -f "$LOG_FILE" ]]; then
  tail -n 220 "$LOG_FILE"
else
  echo "Log file not found: $LOG_FILE"
fi

echo
echo "================================================"
echo "3. Nginx configuration"
echo "================================================"
nginx -t

echo
echo "--- effective root ---"
nginx -T 2>/dev/null \
  | grep -nE 'root[[:space:]].*(startup-company-website/out|jiuchen-current)' \
  | head -n 20 || true

echo
echo "================================================"
echo "4. Atomic release paths"
echo "================================================"
if [[ -L "$CURRENT_LINK" ]]; then
  echo "$CURRENT_LINK -> $(readlink -f "$CURRENT_LINK")"
elif [[ -e "$CURRENT_LINK" ]]; then
  echo "WARN: $CURRENT_LINK exists but is not a symlink"
else
  echo "$CURRENT_LINK does not exist"
fi

if [[ -d "$RELEASES_DIR" ]]; then
  echo
  ls -lah "$RELEASES_DIR" | head -n 40
else
  echo "$RELEASES_DIR does not exist"
fi

echo
echo "================================================"
echo "5. Recent migration backups"
echo "================================================"
ls -ldt /etc/nginx/jiuchen-migration-backup-* 2>/dev/null | head -n 10 || echo "No migration backup directory found"

echo
echo "================================================"
echo "6. Local / public status"
echo "================================================"
for path in / /services /services/baoyan /cases /teachers /faq /contact; do
  local_code="$(curl -sS -o /dev/null -w '%{http_code}' -H "Host: $HOST_HEADER" "${LOCAL_URL}${path}" || true)"
  public_code="$(curl -sS -o /dev/null -w '%{http_code}' "${BASE_URL}${path}" || true)"
  printf '%-30s LOCAL=%-3s PUBLIC=%-3s\n' "$path" "$local_code" "$public_code"
done

echo
echo "================================================"
echo "7. Cache headers"
echo "================================================"
echo "--- HTML ---"
curl -sSI "$BASE_URL/" \
  | grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' || true

echo
echo "--- Next static asset ---"
homepage="$(mktemp)"
trap 'rm -f "$homepage"' EXIT
if curl -fsS "$BASE_URL/" -o "$homepage"; then
  asset_path="$(grep -oE '/_next/static/[^" ]+\.(js|css)' "$homepage" | head -n 1 || true)"
  if [[ -n "$asset_path" ]]; then
    echo "Asset: $asset_path"
    curl -sSI "$BASE_URL$asset_path" \
      | grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' || true
  else
    echo "WARN: no Next.js asset found in homepage"
  fi
else
  echo "WARN: homepage fetch failed"
fi

echo
echo "================================================"
echo "8. Automatic conclusion"
echo "================================================"

LOG_OK=0
LINK_OK=0
ROOT_OK=0
WEB_OK=0

if [[ -f "$LOG_FILE" ]] && grep -q 'PASS: atomic deployment migration completed successfully' "$LOG_FILE"; then
  LOG_OK=1
fi
[[ -L "$CURRENT_LINK" ]] && LINK_OK=1
if nginx -T 2>/dev/null | grep -q 'root /www/wwwroot/jiuchen-current;'; then
  ROOT_OK=1
fi
if [[ "$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL/" || true)" == "200" ]]; then
  WEB_OK=1
fi

echo "migration success log: $LOG_OK"
echo "current symlink:       $LINK_OK"
echo "nginx uses current:    $ROOT_OK"
echo "public homepage 200:   $WEB_OK"

echo
if [[ "$LOG_OK" == "1" && "$LINK_OK" == "1" && "$ROOT_OK" == "1" && "$WEB_OK" == "1" ]]; then
  echo "CONCLUSION: atomic migration succeeded"
else
  echo "CONCLUSION: atomic migration did not succeed or has been rolled back"
fi

echo
echo "PASS: diagnosis completed. No configuration was changed."
