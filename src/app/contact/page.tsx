import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "免费咨询 | 九辰本硕博升学就业",
  description:
    "预约九辰教育免费一对一评估，了解保研、留学、申博、本科就业与高端就业定制陪跑服务。",
  alternates: { canonical: "/contact" },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="免费咨询"
        description="提交你的当前阶段、目标方向与联系方式，九辰规划老师将尽快与你沟通，提供免费一对一初步评估。"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
