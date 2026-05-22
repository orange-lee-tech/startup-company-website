const rawBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export const siteBasePath = rawBasePath
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export function withBasePath(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteBasePath}${normalizedPath}`;
}