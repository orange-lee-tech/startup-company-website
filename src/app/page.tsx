import HomeContactCTA from "@/components/Home/HomeContactCTA";
import HomeHeroServicesStage from "@/components/Home/HeroServicesStage";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
import { contentRepository } from "@/content/repository";
import type { StudentCase } from "@/data/cases";
import { buildPageMetadata, siteConfig } from "@/lib/seo";
import type { Feature } from "@/types/feature";

const featuredCaseIds = [
  "baoyan-001",
  "study-abroad-01",
  "career-coaching-001",
];

export const metadata = buildPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
});

export default async function Home() {
  const [services, cases, teachers] = await Promise.all([
    contentRepository.listServices(),
    contentRepository.listCases(),
    contentRepository.listFeaturedTeachers(),
  ]);

  const features: Feature[] = services.map(({ detail }, index) => ({
    id: index + 1,
    title: detail.title,
    audience: detail.audience[0],
    keywords: detail.serviceContent.slice(0, 3),
    path: `/services/${detail.slug}`,
  }));

  const featuredCases = featuredCaseIds
    .map((id) => cases.find((item) => item.id === id))
    .filter((item): item is StudentCase => Boolean(item));

  return (
    <>
      <HomeHeroServicesStage
        features={features}
        featuredCases={featuredCases}
      />
      <TeacherCarousel teachers={teachers} />
      <HomeContactCTA />
    </>
  );
}
