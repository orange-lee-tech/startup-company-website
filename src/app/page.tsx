import ScrollUp from "@/components/Common/ScrollUp";
import HomeContactCTA from "@/components/Home/HomeContactCTA";
import HomeHeroServicesStage from "@/components/Home/HeroServicesStage";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "九辰本硕博升学就业 | 九辰教育咨询有限公司",
  description:
    "九辰教育咨询有限公司专注本硕博升学与就业陪跑服务，覆盖保研、海外本硕申请、国内申博、海外全奖博士、本科就业与高端就业。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <HomeHeroServicesStage />
      <TeacherCarousel />
      <HomeContactCTA />
    </>
  );
}