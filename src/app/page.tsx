import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import TeacherCarousel from "@/components/Teachers/TeacherCarousel";
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
<Hero />
<Features />
<AboutSectionOne />
<AboutSectionTwo />
<Testimonials />
<TeacherCarousel />
<Blog />
<Contact />
    </>
  );
}
