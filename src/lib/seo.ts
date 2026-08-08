import { contactInfo } from "@/data/contactInfo";
import type { Metadata } from "next";

export const siteConfig = {
  url: "https://jiuchenedu.com",
  name: "九辰教育",
  companyName: contactInfo.companyName,
  defaultTitle: "九辰本硕博升学就业 | 长沙九辰教育咨询有限公司",
  description:
    "长沙九辰教育咨询有限公司专注本硕博升学与就业陪跑服务，覆盖保研、海外本硕申请、国内申博、海外全奖博士、本科就业与高端就业。",
  locale: "zh_CN",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: contactInfo.companyName,
  alternateName: contactInfo.brandName,
  url: siteConfig.url,
  email: contactInfo.email,
  telephone: contactInfo.phone,
  address: {
    "@type": "PostalAddress",
    addressCountry: "CN",
    addressRegion: "湖南省",
    addressLocality: "长沙市",
    streetAddress: contactInfo.address,
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  inLanguage: "zh-CN",
};

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
