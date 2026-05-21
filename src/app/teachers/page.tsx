import Breadcrumb from "@/components/Common/Breadcrumb";
import { teachers } from "@/data/teachers";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "师资 | 九辰本硕博升学就业",
  description:
    "九辰教育导师与教研团队总览，展示老师照片、姓名、学校或机构名称及职称。",
};

const TeachersPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="师资"
        description="展示九辰教育导师与教研团队。总览页仅展示老师照片、姓名、学校或机构名称与职称；若老师有更多可公开信息，后续将单独设置个人详情页。"
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
              以下信息用于展示导师资源覆盖范围。当前总览页只展示基础信息，涉及个人履历、成果介绍等更多内容，后续根据授权情况再进入个人详情页。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group h-full overflow-hidden rounded-2xl border border-body-color/10 bg-gray-light transition hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-bg-color-dark dark:hover:bg-gray-dark"
              >
                <div className="relative h-[260px] w-full overflow-hidden bg-[#EEF3FF] dark:bg-gray-dark">
                  <Image
                    src={teacher.portraitImage}
                    alt={teacher.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                    {teacher.name}
                  </h2>

                  <p className="mb-3 text-base font-semibold text-primary">
                    {teacher.title}
                  </p>

                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {teacher.school}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeachersPage;