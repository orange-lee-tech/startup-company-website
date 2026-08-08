#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://jiuchenedu.com}"
BASE_URL="${BASE_URL%/}"

CORE_PATHS=(
  "/"
  "/about"
  "/services"
  "/services/baoyan"
  "/services/overseas-funded-phd"
  "/cases"
  "/cases/baoyan"
  "/teachers"
  "/teachers/xu-zhaoyi"
  "/faq"
  "/contact"
)

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

printf 'Smoke testing %s\n' "$BASE_URL"

for path in "${CORE_PATHS[@]}"; do
  headers="$(mktemp)"
  body="$(mktemp)"

  code="$(curl -sS --max-redirs 0 -D "$headers" -o "$body" -w '%{http_code}' "${BASE_URL}${path}")"

  if [[ "$code" != "200" ]]; then
    cat "$headers" >&2
    rm -f "$headers" "$body"
    fail "${path} returned HTTP ${code}, expected 200"
  fi

  if grep -Eqi '^location:.*:8088' "$headers"; then
    cat "$headers" >&2
    rm -f "$headers" "$body"
    fail "${path} leaked internal port 8088 in Location header"
  fi

  printf 'OK   %s -> 200\n' "$path"
  rm -f "$headers" "$body"
done

not_found_path="/__jiuchen_smoke_missing_page__"
not_found_code="$(curl -sS --max-redirs 0 -o /dev/null -w '%{http_code}' "${BASE_URL}${not_found_path}")"
if [[ "$not_found_code" != "404" ]]; then
  fail "missing page returned HTTP ${not_found_code}, expected 404"
fi
printf 'OK   %s -> 404\n' "$not_found_path"

homepage="$(mktemp)"
curl -fsS "${BASE_URL}/" -o "$homepage"

asset_path="$(grep -oE '/_next/static/[^" ]+\.(js|css)' "$homepage" | head -n 1 || true)"
if [[ -z "$asset_path" ]]; then
  rm -f "$homepage"
  fail "homepage did not expose a Next.js JS/CSS static asset"
fi

asset_code="$(curl -sS --max-redirs 0 -o /dev/null -w '%{http_code}' "${BASE_URL}${asset_path}")"
if [[ "$asset_code" != "200" ]]; then
  rm -f "$homepage"
  fail "static asset ${asset_path} returned HTTP ${asset_code}, expected 200"
fi
printf 'OK   %s -> 200\n' "$asset_path"

rm -f "$homepage"
printf 'PASS: production smoke test completed successfully.\n'
