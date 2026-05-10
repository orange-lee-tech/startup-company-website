import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 | 九辰本硕博升学就业",
  description:
    "九辰教育常见问题与服务说明，涵盖服务流程、导师匹配、服务周期、收费方式与合规边界。",
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="常见问题"
        description="整理学员和家长关心的服务流程、导师匹配、服务周期、收费方式与质量保障问题，帮助你在咨询前快速了解九辰。"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
        </div>
      </section>
    </>
  );
};

export default Blog;
