import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const siteUrl = "https://jiuchenedu.com";
const coreRoutes = [
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
];
const legacyRoutes = [
  "/signin",
  "/signup",
  "/blog",
  "/blog-details",
  "/blog-sidebar",
  "/error",
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function normalizeRoute(route) {
  const clean = route.split(/[?#]/)[0] || "/";
  if (clean === "/") return "/";
  return clean.replace(/\/+$/, "");
}

function pageCandidates(route) {
  if (route === "/") return [join(outDir, "index.html")];
  const clean = route.replace(/^\/+|\/+$/g, "");
  return [join(outDir, `${clean}.html`), join(outDir, clean, "index.html")];
}

function findPage(route) {
  return pageCandidates(normalizeRoute(route)).find(existsSync);
}

function readPage(route) {
  const file = findPage(route);
  if (!file) return "";
  return readFileSync(file, "utf8");
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

function assertIncludes(label, content, expected) {
  if (!content.includes(expected)) {
    fail(`${label} is missing expected content: ${expected}`);
  } else {
    console.log(`OK ${label}`);
  }
}

function assertMatches(label, content, pattern) {
  if (!pattern.test(content)) {
    fail(`${label} does not match ${pattern}`);
  } else {
    console.log(`OK ${label}`);
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const fullPath = join(dir, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function isFileLikePath(path) {
  return (
    path.startsWith("/_next/") ||
    path.startsWith("/images/") ||
    /\.[a-z0-9]{2,8}$/i.test(path)
  );
}

if (!existsSync(outDir)) {
  fail("out/ was not generated");
} else {
  coreRoutes.forEach(assertPage);
  legacyRoutes.forEach(assertMissingPage);

  for (const artifact of ["robots.txt", "sitemap.xml", "llms.txt"]) {
    const file = join(outDir, artifact);
    if (!existsSync(file)) fail(`missing discovery artifact ${artifact}`);
    else console.log(`OK discovery artifact ${artifact}`);
  }

  const homeHtml = readPage("/");
  assertMatches(
    "homepage canonical",
    homeHtml,
    /<link rel="canonical" href="https:\/\/jiuchenedu\.com\/?"/,
  );
  assertIncludes("homepage Organization JSON-LD", homeHtml, '"@type":"Organization"');
  assertIncludes("homepage WebSite JSON-LD", homeHtml, '"@type":"WebSite"');
  assertIncludes("homepage Open Graph", homeHtml, 'property="og:site_name"');

  const serviceHtml = readPage("/services/baoyan");
  assertIncludes("service Service JSON-LD", serviceHtml, '"@type":"Service"');
  assertIncludes("service breadcrumb JSON-LD", serviceHtml, '"@type":"BreadcrumbList"');
  assertIncludes(
    "service page-specific H1",
    serviceHtml,
    "保研辅导：定位、背景提升、材料申请与面试冲刺全流程规划",
  );

  const teacherHtml = readPage("/teachers/xu-zhaoyi");
  assertIncludes("teacher Person JSON-LD", teacherHtml, '"@type":"Person"');
  assertIncludes("teacher breadcrumb JSON-LD", teacherHtml, '"@type":"BreadcrumbList"');

  const caseHtml = readPage("/cases/baoyan");
  assertIncludes(
    "case page-specific H1",
    caseHtml,
    "保研案例：不同背景学员的规划过程、申请节点与录取结果",
  );

  for (const route of coreRoutes) {
    const html = readPage(route);
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    if (h1Count !== 1) {
      fail(`${route} must contain exactly one H1; found ${h1Count}`);
    } else {
      console.log(`OK single H1 ${route}`);
    }
  }

  const robots = readFileSync(join(outDir, "robots.txt"), "utf8");
  assertIncludes("robots sitemap declaration", robots, `${siteUrl}/sitemap.xml`);

  const sitemap = readFileSync(join(outDir, "sitemap.xml"), "utf8");
  for (const requiredUrl of [
    `${siteUrl}/`,
    `${siteUrl}/services/baoyan`,
    `${siteUrl}/cases/baoyan`,
    `${siteUrl}/teachers/xu-zhaoyi`,
  ]) {
    assertIncludes(`sitemap URL ${requiredUrl}`, sitemap, requiredUrl);
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
    /jiuchenedu\.com:8088/i,
  ];
  const legacyRouteSet = new Set(legacyRoutes);
  const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(html)) {
        fail(`forbidden output ${pattern} found in ${file}`);
      }
    }

    for (const imageTag of html.match(/<img\b[^>]*>/gi) ?? []) {
      if (!/\balt=("[^"]*"|'[^']*')/i.test(imageTag)) {
        fail(`image without alt attribute found in ${file}`);
      }
    }

    for (const match of html.matchAll(/href="(\/[^" ]*)"/gi)) {
      const route = normalizeRoute(match[1]);
      if (legacyRouteSet.has(route)) {
        fail(`legacy internal link ${route} found in ${file}`);
        continue;
      }
      if (isFileLikePath(route)) continue;
      if (!findPage(route)) {
        fail(`broken internal page link ${route} found in ${file}`);
      }
    }
  }

  console.log(
    `OK scanned ${htmlFiles.length} HTML files for legacy text, internal links and image alt attributes`,
  );
}

if (process.exitCode) process.exit(process.exitCode);
console.log("PASS: static export contract verified");
