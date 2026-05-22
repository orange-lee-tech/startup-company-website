import Breadcrumb from "@/components/Common/Breadcrumb";
import { teachers } from "@/data/teachers";
import Image from "next/image";
import Link from "next/link";
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
        description="展示九辰教育导师与教研团队。已有公开详细资料的老师可进入个人详情页，其余老师暂展示基础信息。"
      />

      <section className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-10 max-w-[860px]">
            <p className="mb-4 text-base font-semibold text-primary">
              导师团队
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              导师与教研团队总览
            </h1>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              以下信息用于展示导师资源覆盖范围。已有公开详情资料的老师可点击卡片进入个人主页；其余老师暂展示姓名、机构与职称等基础信息。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teachers.map((teacher) => {
              const canOpenDetail = teacher.hasDetail && teacher.detailPath;

              const card = (
                <article className="group h-full overflow-hidden rounded-2xl border border-body-color/10 bg-gray-light transition hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-bg-color-dark dark:hover:bg-gray-dark">
                  <div className="relative flex h-[300px] w-full items-end justify-center overflow-hidden bg-linear-to-b from-[#EEF3FF] to-white px-6 pt-6 dark:from-gray-dark dark:to-bg-color-dark md:h-[320px]">
                    <Image
                      src={teacher.portraitImage}
                      alt={teacher.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain object-bottom transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h2 className="text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                        {teacher.name}
                      </h2>

                      {canOpenDetail && (
                        <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          详情
                        </span>
                      )}
                    </div>

                    <p className="mb-3 text-base font-semibold text-primary">
                      {teacher.title}
                    </p>

                    <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                      {teacher.school}
                    </p>

                    {teacher.summary && (
                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        {teacher.summary}
                      </p>
                    )}

                    {canOpenDetail && (
                      <p className="mt-5 text-sm font-semibold text-primary">
                        查看个人主页 →
                      </p>
                    )}
                  </div>
                </article>
              );

              if (canOpenDetail) {
                return (
                  <Link key={teacher.id} href={teacher.detailPath!}>
                    {card}
                  </Link>
                );
              }

              return <div key={teacher.id}>{card}</div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeachersPage;