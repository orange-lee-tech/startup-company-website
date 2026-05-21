import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "师资 | 九辰本硕博升学就业",
  description:
    "九辰教育导师与教研团队总览，后续展示老师照片、姓名、学校或机构名称及职称。",
};

const TeachersPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="师资"
        description="展示九辰教育导师与教研团队。当前页面先搭建总览骨架，后续将接入老师照片、姓名、学校或机构名称与职称。"
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-[860px]">
            <p className="mb-4 text-base font-semibold text-primary">
              导师团队
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              导师与教研团队总览
            </h1>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              后续此页面仅展示老师照片、姓名、学校或机构名称、职称。若某位老师有更多可展示信息，再单独建立个人详情页。
            </p>
          </div>

          <div className="rounded-2xl border border-body-color/10 bg-gray-light p-8 dark:border-white/10 dark:bg-bg-color-dark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              师资资料整理中
            </h2>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              下一轮将新增师资数据文件，并将老师卡片接入本页面与首页横向轮播组件。
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeachersPage;