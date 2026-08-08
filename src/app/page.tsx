import HomeContactCTA from "@/components/Home/HomeContactCTA";
import HomeHeroServicesStage from "@/components/Home/HeroServicesStage";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <HomeHeroServicesStage />
      <TeacherCarousel />
      <HomeContactCTA />
    </>
  );
}
