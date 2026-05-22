/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const siteBasePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH ??
  (isGithubPages ? "/startup-company-website" : "");

const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: siteBasePath,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;