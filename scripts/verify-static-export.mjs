import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
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

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const fullPath = join(dir, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
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

  for (const artifact of ["robots.txt", "sitemap.xml"]) {
    const file = join(outDir, artifact);
    if (!existsSync(file)) fail(`missing SEO artifact ${artifact}`);
    else console.log(`OK SEO artifact ${artifact}`);
  }

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

  const forbiddenPatterns = [
    /Free Next\.js Template/i,
    /Startup Nextjs Template/i,
    /Sign in with Github/i,
    /10 amazing sites to download stock photos/i,
    /Musharof Chy/i,
  ];

  const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(html)) {
        fail(`legacy template text ${pattern} found in ${file}`);
      }
    }
  }
  console.log(`OK scanned ${htmlFiles.length} HTML files for legacy template text`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log("PASS: static export contract verified");
