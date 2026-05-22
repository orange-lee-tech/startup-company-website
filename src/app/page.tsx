import ScrollUp from "@/components/Common/ScrollUp";
import HomeHeroServicesStage from "@/components/Home/HeroServicesStage";
import HomeContactCTA from "@/components/Home/HomeContactCTA";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "九辰本硕博升学就业 | 九辰教育咨询有限公司",
  description:
    "九辰教育咨询有限公司专注本硕博升学与就业陪跑服务，覆盖保研、海外本硕申请、国内申博、海外全奖博士、本科就业与高端就业。",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <HomeHeroServicesStage />
<Testimonials />
      <TeacherCarousel />
      <HomeContactCTA />
    </>
  );
}