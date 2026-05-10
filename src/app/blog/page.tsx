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

      <section className="bg-gray-light py-20 dark:bg-bg-color-dark md:py-24 lg:py-32">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center gap-y-10">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
