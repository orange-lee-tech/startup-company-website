import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function pageCandidates(route) {
  if (route === "/") return [join(outDir, "index.html")];
  const clean = route.replace(/^\/+|\/+$/g, "");
  return [join(outDir, `${clean}.html`), join(outDir, clean, "index.html")];
}

function assertPage(route) {
  const candidates = pageCandidates(route);
  if (!candidates.some(existsSync)) {
    fail(`missing exported page ${route} (${candidates.join(" or ")})`);
  } else {
    console.log(`OK page ${route}`);
  }
}

function assertMissingPage(route) {
  const candidates = pageCandidates(route);
  const found = candidates.find(existsSync);
  if (found) {
    fail(`legacy route ${route} is still exported at ${found}`);
  } else {
    console.log(`OK legacy route absent ${route}`);
  }
}

if (!existsSync(outDir)) {
  fail("out/ was not generated");
} else {
  [
    "/",
    "/about",
    "/services",
    "/services/baoyan",
    "/services/overseas-funded-phd",
    "/cases",
    "/cases/baoyan",
    "/teachers",
    "/teachers/xu-zhaoyi",
    "/faq",
    "/contact",
  ].forEach(assertPage);

  [
    "/signin",
    "/signup",
    "/blog",
    "/blog-details",
    "/blog-sidebar",
    "/error",
  ].forEach(assertMissingPage);

  const chunksDir = join(outDir, "_next", "static", "chunks");
  if (!existsSync(chunksDir)) {
    fail("missing _next/static/chunks");
  } else {
    const hasJs = readdirSync(chunksDir, { recursive: true }).some((name) =>
      String(name).endsWith(".js"),
    );
    if (!hasJs) fail("no JavaScript chunks found in static export");
    else console.log("OK Next.js static chunks present");
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log("PASS: static export contract verified");
