import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于九辰 | 九辰本硕博升学就业",
  description:
    "了解九辰教育咨询有限公司的服务理念、教育初心与本硕博升学就业全链条陪跑服务。",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="关于九辰"
        description="九辰教育咨询有限公司专注本硕博升学与就业陪跑服务，以长期陪伴式、量身定制、可量化目标为核心，陪伴学员走清晰路径。"
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
