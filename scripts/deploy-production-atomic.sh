#!/usr/bin/env bash
set -Eeuo pipefail

REPO_DIR="${REPO_DIR:-/www/wwwroot/startup-company-website}"
RELEASES_DIR="${RELEASES_DIR:-/www/wwwroot/jiuchen-releases}"
CURRENT_LINK="${CURRENT_LINK:-/www/wwwroot/jiuchen-current}"
BUILD_PARENT="${BUILD_PARENT:-/www/wwwroot}"
BASE_URL="${BASE_URL:-https://jiuchenedu.com}"
LOCAL_URL="${LOCAL_URL:-http://127.0.0.1:8088}"
HOST_HEADER="${HOST_HEADER:-jiuchenedu.com}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
LOCK_FILE="${LOCK_FILE:-/var/lock/jiuchen-deploy.lock}"

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

[[ -d "$REPO_DIR/.git" ]] || fail "repository not found: $REPO_DIR"
[[ -L "$CURRENT_LINK" ]] || fail "$CURRENT_LINK is not a symlink; complete the one-time atomic deployment migration first"
command -v flock >/dev/null 2>&1 || fail "flock is required"
command -v rsync >/dev/null 2>&1 || fail "rsync is required"

mkdir -p "$RELEASES_DIR"
chmod 755 "$RELEASES_DIR"
runuser -u nginx -- test -x "$RELEASES_DIR" || fail "nginx user cannot traverse releases directory: $RELEASES_DIR"
exec 9>"$LOCK_FILE"
flock -n 9 || fail "another deployment is already running"

cd "$REPO_DIR"
printf '==> Updating repository\n'
git pull --ff-only origin main
TARGET_SHA="$(git rev-parse HEAD)"
SHORT_SHA="$(git rev-parse --short=8 HEAD)"
RELEASE_ID="$(date +%Y%m%d-%H%M%S)-${SHORT_SHA}"
RELEASE_PATH="$RELEASES_DIR/$RELEASE_ID"
BUILD_DIR="$(mktemp -d "$BUILD_PARENT/jiuchen-build.XXXXXX")"
WORKTREE_ADDED=0
SWITCHED=0
PREVIOUS_TARGET="$(readlink -f "$CURRENT_LINK" || true)"

cleanup() {
  set +e
  if [[ "$WORKTREE_ADDED" -eq 1 ]]; then
    git -C "$REPO_DIR" worktree remove --force "$BUILD_DIR" >/dev/null 2>&1
    git -C "$REPO_DIR" worktree prune >/dev/null 2>&1
  else
    rm -rf "$BUILD_DIR"
  fi
  rm -f "${CURRENT_LINK}.next.$$" "${CURRENT_LINK}.rollback.$$"
}

rollback() {
  set +e
  if [[ "$SWITCHED" -eq 1 && -n "$PREVIOUS_TARGET" && -d "$PREVIOUS_TARGET" ]]; then
    printf '==> Rolling back to %s\n' "$PREVIOUS_TARGET" >&2
    ln -s "$PREVIOUS_TARGET" "${CURRENT_LINK}.rollback.$$"
    mv -Tf "${CURRENT_LINK}.rollback.$$" "$CURRENT_LINK"
    if nginx -t >/dev/null 2>&1; then
      systemctl reload nginx || true
    fi
    SWITCHED=0
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

trap cleanup EXIT
trap on_error ERR
trap on_signal INT TERM HUP

printf '==> Building commit %s in isolated worktree\n' "$TARGET_SHA"
git worktree add --detach "$BUILD_DIR" "$TARGET_SHA" >/dev/null
WORKTREE_ADDED=1

cd "$BUILD_DIR"
npm ci
unset GITHUB_PAGES
unset NEXT_PUBLIC_SITE_BASE_PATH
npm run build

test -f out/index.html || fail "build did not produce out/index.html"

find out -type d -exec chmod 755 {} \;
find out -type f -exec chmod 644 {} \;
runuser -u nginx -- test -r out/index.html || fail "nginx user cannot read built index.html"

printf '==> Staging release %s\n' "$RELEASE_ID"
mkdir -p "$RELEASE_PATH"
rsync -a --delete out/ "$RELEASE_PATH/"
find "$RELEASE_PATH" -type d -exec chmod 755 {} \;
find "$RELEASE_PATH" -type f -exec chmod 644 {} \;
runuser -u nginx -- test -r "$RELEASE_PATH/index.html" || fail "nginx user cannot read staged release"

printf '==> Validating nginx configuration before switch\n'
nginx -t

printf '==> Atomically switching current release\n'
ln -s "$RELEASE_PATH" "${CURRENT_LINK}.next.$$"
mv -Tf "${CURRENT_LINK}.next.$$" "$CURRENT_LINK"
SWITCHED=1
systemctl reload nginx

printf '==> Verifying local nginx serves the new release\n'
LOCAL_BODY="$(mktemp)"
curl -fsS -H "Host: $HOST_HEADER" "$LOCAL_URL/" -o "$LOCAL_BODY"
if ! cmp -s "$RELEASE_PATH/index.html" "$LOCAL_BODY"; then
  rm -f "$LOCAL_BODY"
  fail "local nginx is not serving the staged release index.html"
fi
rm -f "$LOCAL_BODY"

printf '==> Running public smoke test\n'
bash "$REPO_DIR/scripts/smoke-production.sh" "$BASE_URL"

printf '==> Cleaning old releases (keeping %s)\n' "$KEEP_RELEASES"
CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
mapfile -t OLD_RELEASES < <(
  find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
    | sort -nr \
    | awk '{print $2}' \
    | tail -n "+$((KEEP_RELEASES + 1))"
)
for old_release in "${OLD_RELEASES[@]}"; do
  [[ "$old_release" == "$CURRENT_TARGET" ]] && continue
  [[ "$old_release" == "$PREVIOUS_TARGET" ]] && continue
  rm -rf "$old_release"
done

SWITCHED=0
printf 'PASS: deployed %s (%s)\n' "$RELEASE_ID" "$TARGET_SHA"
