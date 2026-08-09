#!/usr/bin/env bash
set -Eeuo pipefail

REPO_DIR="${REPO_DIR:-/www/wwwroot/startup-company-website}"
RELEASES_DIR="${RELEASES_DIR:-/www/wwwroot/jiuchen-releases}"
CURRENT_LINK="${CURRENT_LINK:-/www/wwwroot/jiuchen-current}"
NGINX_CONF="${NGINX_CONF:-/etc/nginx/nginx.conf}"
STATIC_CONF="${STATIC_CONF:-/etc/nginx/default.d/jiuchen-static-export.conf}"
BASE_URL="${BASE_URL:-https://jiuchenedu.com}"
LOCAL_URL="${LOCAL_URL:-http://127.0.0.1:8088}"
HOST_HEADER="${HOST_HEADER:-jiuchenedu.com}"

OLD_ROOT_PATH="/www/wwwroot/startup-company-website/out"
NEW_ROOT_PATH="/www/wwwroot/jiuchen-current"
CONFIG_CHANGED=0
LINK_CREATED=0
RELEASE_CREATED=0

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  if [[ "${CONFIG_CHANGED:-0}" -eq 1 ]] && declare -F rollback >/dev/null 2>&1; then
    rollback
  fi
  exit 1
}

[[ "${EUID:-$(id -u)}" -eq 0 ]] || fail "run this migration as root"
[[ -d "$REPO_DIR/.git" ]] || fail "repository not found: $REPO_DIR"
[[ -f "$REPO_DIR/out/index.html" ]] || fail "healthy current build not found: $REPO_DIR/out/index.html"
[[ -f "$NGINX_CONF" ]] || fail "nginx config not found: $NGINX_CONF"
[[ -f "$STATIC_CONF" ]] || fail "static route config not found: $STATIC_CONF"
command -v rsync >/dev/null 2>&1 || fail "rsync is required"

if [[ -e "$CURRENT_LINK" || -L "$CURRENT_LINK" ]]; then
  fail "$CURRENT_LINK already exists; migration may already have been performed"
fi

ROOT_MATCHES="$(awk -v old="$OLD_ROOT_PATH" '$1 == "root" && $2 == old ";" { count++ } END { print count + 0 }' "$NGINX_CONF")"
[[ "$ROOT_MATCHES" == "1" ]] || fail "expected exactly one current nginx root '$OLD_ROOT_PATH', found $ROOT_MATCHES"

cd "$REPO_DIR"
SHORT_SHA="$(git rev-parse --short=8 HEAD)"
STAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_ID="${STAMP}-bootstrap-${SHORT_SHA}"
RELEASE_PATH="$RELEASES_DIR/$RELEASE_ID"
BACKUP_DIR="/etc/nginx/jiuchen-migration-backup-${STAMP}"

rollback() {
  set +e
  printf '\n==> Rolling back one-time migration\n' >&2

  if [[ "$CONFIG_CHANGED" -eq 1 && -d "$BACKUP_DIR" ]]; then
    cp -a "$BACKUP_DIR/nginx.conf" "$NGINX_CONF"
    cp -a "$BACKUP_DIR/jiuchen-static-export.conf" "$STATIC_CONF"
    if nginx -t >/dev/null 2>&1; then
      systemctl reload nginx || true
    fi
    CONFIG_CHANGED=0
  fi

  if [[ "$LINK_CREATED" -eq 1 ]]; then
    rm -f "$CURRENT_LINK"
    LINK_CREATED=0
  fi

  if [[ "$RELEASE_CREATED" -eq 1 ]]; then
    rm -rf "$RELEASE_PATH"
    RELEASE_CREATED=0
  fi
}

on_error() {
  local exit_code=$?
  rollback
  exit "$exit_code"
}

on_signal() {
  rollback
  exit 130
}

trap on_error ERR
trap on_signal INT TERM HUP

printf '========== 1. Pre-check current production =========='"\n"
nginx -t
bash "$REPO_DIR/scripts/smoke-production.sh" "$BASE_URL"

printf '\n========== 2. Create bootstrap release =========='"\n"
mkdir -p "$RELEASES_DIR"
chmod 755 "$RELEASES_DIR"
runuser -u nginx -- test -x "$RELEASES_DIR" || fail "nginx user cannot traverse releases directory: $RELEASES_DIR"
mkdir -p "$RELEASE_PATH"
RELEASE_CREATED=1
rsync -a --delete "$REPO_DIR/out/" "$RELEASE_PATH/"
find "$RELEASE_PATH" -type d -exec chmod 755 {} \;
find "$RELEASE_PATH" -type f -exec chmod 644 {} \;
runuser -u nginx -- test -r "$RELEASE_PATH/index.html" || fail "nginx user cannot read bootstrap release index.html"
printf 'Release staged: %s\n' "$RELEASE_PATH"

printf '\n========== 3. Create current symlink =========='"\n"
ln -s "$RELEASE_PATH" "$CURRENT_LINK"
LINK_CREATED=1
printf '%s -> %s\n' "$CURRENT_LINK" "$(readlink -f "$CURRENT_LINK")"
runuser -u nginx -- test -r "$CURRENT_LINK/index.html" || fail "nginx user cannot read current symlink index.html"

printf '\n========== 4. Backup nginx config =========='"\n"
mkdir -p "$BACKUP_DIR"
cp -a "$NGINX_CONF" "$BACKUP_DIR/nginx.conf"
cp -a "$STATIC_CONF" "$BACKUP_DIR/jiuchen-static-export.conf"
printf 'Backup: %s\n' "$BACKUP_DIR"

printf '\n========== 5. Enable atomic root + HTML revalidation =========='"\n"
ROOT_TMP="$(mktemp)"
if ! awk -v old="$OLD_ROOT_PATH" -v new="$NEW_ROOT_PATH" '
  $1 == "root" && $2 == old ";" {
    sub(old, new)
    replaced++
  }
  { print }
  END {
    if (replaced != 1) exit 42
  }
' "$NGINX_CONF" > "$ROOT_TMP"; then
  rm -f "$ROOT_TMP"
  fail "could not replace the nginx root safely"
fi
cat "$ROOT_TMP" > "$NGINX_CONF"
rm -f "$ROOT_TMP"

cat > "$STATIC_CONF" <<'EOF'
index index.html;

# HTML/page routes must be revalidated so an old document does not keep
# referencing JavaScript from a previous deployment. Use an explicit header
# instead of relying on `expires epoch`, then repeat the server security
# headers because nginx add_header inheritance stops at this location.
location / {
    try_files $uri.html $uri/index.html $uri =404;
    add_header Cache-Control "no-cache" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
}
EOF
CONFIG_CHANGED=1

printf '\n========== 6. Validate and reload nginx =========='"\n"
nginx -t
if ! nginx -T 2>/dev/null | grep -Fq 'add_header Cache-Control "no-cache" always;'; then
  fail "effective nginx configuration does not contain the HTML no-cache header"
fi
systemctl reload nginx

printf '\n========== 7. Wait for reloaded nginx workers =========='"\n"
LOCAL_HTML_HEADERS="$(mktemp)"
LOCAL_CONFIG_READY=0
for attempt in {1..15}; do
  : > "$LOCAL_HTML_HEADERS"
  if curl -fsSI -H "Host: $HOST_HEADER" "$LOCAL_URL/" -o "$LOCAL_HTML_HEADERS" \
    && grep -Eqi '^cache-control:.*no-cache' "$LOCAL_HTML_HEADERS"; then
    LOCAL_CONFIG_READY=1
    printf 'PASS: reloaded nginx workers visible after %s attempt(s)\n' "$attempt"
    break
  fi
  printf 'Waiting for reloaded nginx workers (%s/15)...\n' "$attempt"
  sleep 1
done

printf '%s\n' '--- Local nginx HTML headers (8088) ---'
grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' "$LOCAL_HTML_HEADERS" || true
if [[ "$LOCAL_CONFIG_READY" -ne 1 ]]; then
  rm -f "$LOCAL_HTML_HEADERS"
  fail "local nginx did not expose the new HTML no-cache configuration within 15 seconds"
fi
rm -f "$LOCAL_HTML_HEADERS"

LOCAL_BODY="$(mktemp)"
curl -fsS -H "Host: $HOST_HEADER" "$LOCAL_URL/" -o "$LOCAL_BODY"
if ! cmp -s "$RELEASE_PATH/index.html" "$LOCAL_BODY"; then
  rm -f "$LOCAL_BODY"
  fail "local nginx does not serve the bootstrap release"
fi
rm -f "$LOCAL_BODY"
printf 'PASS: local nginx serves %s\n' "$RELEASE_ID"

printf '\n========== 8. Verify public cache headers =========='"\n"
PUBLIC_HTML_HEADERS="$(mktemp)"
ASSET_HEADERS="$(mktemp)"
HOME_BODY="$(mktemp)"
cleanup_headers() {
  rm -f "$PUBLIC_HTML_HEADERS" "$ASSET_HEADERS" "$HOME_BODY"
}
trap 'cleanup_headers; on_signal' INT TERM HUP

PUBLIC_CONFIG_READY=0
for attempt in {1..15}; do
  : > "$PUBLIC_HTML_HEADERS"
  if curl -fsSI "$BASE_URL/" -o "$PUBLIC_HTML_HEADERS" \
    && grep -Eqi '^cache-control:.*no-cache' "$PUBLIC_HTML_HEADERS"; then
    PUBLIC_CONFIG_READY=1
    printf 'PASS: public no-cache header visible after %s attempt(s)\n' "$attempt"
    break
  fi
  printf 'Waiting for public no-cache header (%s/15)...\n' "$attempt"
  sleep 1
done

printf '%s\n' '--- Public HTML headers (443) ---'
grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' "$PUBLIC_HTML_HEADERS" || true
if [[ "$PUBLIC_CONFIG_READY" -ne 1 ]]; then
  cleanup_headers
  fail "public HTML response is missing Cache-Control: no-cache after local nginx was validated; inspect the outer reverse proxy/header policy"
fi

curl -fsS "$BASE_URL/" -o "$HOME_BODY"
ASSET_PATH="$(grep -oE '/_next/static/[^" ]+\.(js|css)' "$HOME_BODY" | head -n 1 || true)"
[[ -n "$ASSET_PATH" ]] || fail "could not discover a Next.js static asset"
curl -fsSI "$BASE_URL$ASSET_PATH" -o "$ASSET_HEADERS"
printf '\nAsset: %s\n' "$ASSET_PATH"
grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' "$ASSET_HEADERS" || true
if ! grep -Eqi '^cache-control:.*max-age=31536000.*immutable' "$ASSET_HEADERS"; then
  cleanup_headers
  fail "Next static asset is missing long immutable cache headers"
fi
cleanup_headers

printf '\n========== 9. Public smoke test =========='"\n"
bash "$REPO_DIR/scripts/smoke-production.sh" "$BASE_URL"

trap - ERR INT TERM HUP
printf '\nPASS: atomic deployment migration completed successfully.\n'
printf 'Nginx root now uses: %s\n' "$CURRENT_LINK"
printf 'Bootstrap release: %s\n' "$RELEASE_PATH"
printf 'Nginx backup retained at: %s\n' "$BACKUP_DIR"
printf '\nFuture releases should use:\n  bash scripts/deploy-production-atomic.sh\n'
