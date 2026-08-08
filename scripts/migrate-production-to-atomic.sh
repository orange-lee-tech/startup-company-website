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

OLD_ROOT="root /www/wwwroot/startup-company-website/out;"
NEW_ROOT="root /www/wwwroot/jiuchen-current;"
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

ROOT_MATCHES="$(grep -F -c "$OLD_ROOT" "$NGINX_CONF" || true)"
[[ "$ROOT_MATCHES" == "1" ]] || fail "expected exactly one current nginx root '$OLD_ROOT', found $ROOT_MATCHES"

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
mkdir -p "$RELEASE_PATH"
RELEASE_CREATED=1
rsync -a --delete "$REPO_DIR/out/" "$RELEASE_PATH/"
find "$RELEASE_PATH" -type d -exec chmod 755 {} \;
find "$RELEASE_PATH" -type f -exec chmod 644 {} \;
runuser -u nginx -- test -r "$RELEASE_PATH/index.html"
printf 'Release staged: %s\n' "$RELEASE_PATH"

printf '\n========== 3. Create current symlink =========='"\n"
ln -s "$RELEASE_PATH" "$CURRENT_LINK"
LINK_CREATED=1
printf '%s -> %s\n' "$CURRENT_LINK" "$(readlink -f "$CURRENT_LINK")"
runuser -u nginx -- test -r "$CURRENT_LINK/index.html"

printf '\n========== 4. Backup nginx config =========='"\n"
mkdir -p "$BACKUP_DIR"
cp -a "$NGINX_CONF" "$BACKUP_DIR/nginx.conf"
cp -a "$STATIC_CONF" "$BACKUP_DIR/jiuchen-static-export.conf"
printf 'Backup: %s\n' "$BACKUP_DIR"

printf '\n========== 5. Enable atomic root + HTML revalidation =========='"\n"
sed -i "s#${OLD_ROOT}#${NEW_ROOT}#" "$NGINX_CONF"
cat > "$STATIC_CONF" <<'EOF'
index index.html;

# HTML/page routes must be revalidated so an old document does not keep
# referencing JavaScript from a previous deployment.
location / {
    expires epoch;
    try_files $uri.html $uri/index.html $uri =404;
}
EOF
CONFIG_CHANGED=1

printf '\n========== 6. Validate and reload nginx =========='"\n"
nginx -t
systemctl reload nginx

printf '\n========== 7. Verify local nginx serves bootstrap release =========='"\n"
LOCAL_BODY="$(mktemp)"
curl -fsS -H "Host: $HOST_HEADER" "$LOCAL_URL/" -o "$LOCAL_BODY"
if ! cmp -s "$RELEASE_PATH/index.html" "$LOCAL_BODY"; then
  rm -f "$LOCAL_BODY"
  fail "local nginx does not serve the bootstrap release"
fi
rm -f "$LOCAL_BODY"
printf 'PASS: local nginx serves %s\n' "$RELEASE_ID"

printf '\n========== 8. Verify cache headers =========='"\n"
HTML_HEADERS="$(mktemp)"
ASSET_HEADERS="$(mktemp)"
HOME_BODY="$(mktemp)"
trap 'rm -f "$HTML_HEADERS" "$ASSET_HEADERS" "$HOME_BODY"; on_signal' INT TERM HUP

curl -fsSI "$BASE_URL/" -o "$HTML_HEADERS"
grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' "$HTML_HEADERS" || true
if ! grep -Eqi '^cache-control:.*no-cache' "$HTML_HEADERS"; then
  rm -f "$HTML_HEADERS" "$ASSET_HEADERS" "$HOME_BODY"
  fail "HTML response does not include Cache-Control: no-cache"
fi

curl -fsS "$BASE_URL/" -o "$HOME_BODY"
ASSET_PATH="$(grep -oE '/_next/static/[^" ]+\.(js|css)' "$HOME_BODY" | head -n 1 || true)"
[[ -n "$ASSET_PATH" ]] || fail "could not discover a Next.js static asset"
curl -fsSI "$BASE_URL$ASSET_PATH" -o "$ASSET_HEADERS"
printf 'Asset: %s\n' "$ASSET_PATH"
grep -Ei '^(HTTP/|cache-control:|expires:|etag:|last-modified:|x-served-by:)' "$ASSET_HEADERS" || true
if ! grep -Eqi '^cache-control:.*max-age=31536000.*immutable' "$ASSET_HEADERS"; then
  rm -f "$HTML_HEADERS" "$ASSET_HEADERS" "$HOME_BODY"
  fail "Next static asset is missing long immutable cache headers"
fi
rm -f "$HTML_HEADERS" "$ASSET_HEADERS" "$HOME_BODY"

printf '\n========== 9. Public smoke test =========='"\n"
bash "$REPO_DIR/scripts/smoke-production.sh" "$BASE_URL"

trap - ERR INT TERM HUP
printf '\nPASS: atomic deployment migration completed successfully.\n'
printf 'Nginx root now uses: %s\n' "$CURRENT_LINK"
printf 'Bootstrap release: %s\n' "$RELEASE_PATH"
printf 'Nginx backup retained at: %s\n' "$BACKUP_DIR"
printf '\nFuture releases should use:\n  bash scripts/deploy-production-atomic.sh\n'
