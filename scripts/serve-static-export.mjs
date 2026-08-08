import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const outDir = join(process.cwd(), "out");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/\\/g, "/");
  const normalized = normalize(decoded).replace(/^([.][.][/\\])+/, "");
  return normalized.startsWith("/") ? normalized.slice(1) : normalized;
}

function candidateFiles(pathname) {
  const relative = safePath(pathname);

  if (!relative) return [join(outDir, "index.html")];

  const raw = join(outDir, relative);
  return [raw, `${raw}.html`, join(raw, "index.html")];
}

function resolveFile(pathname) {
  for (const candidate of candidateFiles(pathname)) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || host}`);
  const file = resolveFile(url.pathname);

  if (!file) {
    const notFound = join(outDir, "404.html");
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    if (existsSync(notFound)) createReadStream(notFound).pipe(response);
    else response.end("Not found");
    return;
  }

  response.statusCode = 200;
  response.setHeader(
    "Content-Type",
    contentTypes[extname(file).toLowerCase()] || "application/octet-stream",
  );
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Serving static export at http://${host}:${port}`);
});
