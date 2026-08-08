import { contentRepository } from "@/content/repository";
import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicePages, casePages, detailedTeachers] = await Promise.all([
    contentRepository.listServicePages(),
    contentRepository.listCasePages(),
    contentRepository.listDetailedTeachers(),
  ]);

  const fixedPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/cases"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/teachers"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const services: MetadataRoute.Sitemap = servicePages.map((page) => ({
    url: absoluteUrl(`/services/${page.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const cases: MetadataRoute.Sitemap = casePages.map((page) => ({
    url: absoluteUrl(`/cases/${page.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const teachers: MetadataRoute.Sitemap = detailedTeachers.map((teacher) => ({
    url: absoluteUrl(`/teachers/${teacher.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...fixedPages, ...services, ...cases, ...teachers];
}
