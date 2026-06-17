import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  detailedTeachers,
  getDetailedTeacherById,
} from "@/data/teacherDetails";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return detailedTeachers.map((teacher) => ({
    slug: teacher.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getDetailedTeacherById(slug);

  if (!result) {
    return {
      title: "师资详情 | 九辰教育",
    };
  }

  return {
    title: `${result.teacher.name} | 九辰师资`,
    description:
      result.teacher.summary ??
      `${result.teacher.name}，${result.teacher.title}，${result.teacher.school}`,
    alternates: { canonical: `/teachers/${slug}` },
  };
}

const TeacherDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const result = getDetailedTeacherById(slug);

  if (!result) {
    notFound();
  }

  const { teacher, detail } = result;

  return (
    <>
      <Breadcrumb
        pageName={teacher.name}
        description={`${teacher.title}｜${teacher.school}`}
      />

      <section className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-2xl border border-body-color/10 bg-gray-light dark:border-white/10 dark:bg-bg-color-dark">
                <div className="relative flex h-[360px] items-end justify-center overflow-hidden bg-linear-to-b from-[#EEF3FF] to-white px-6 pt-6 dark:from-gray-dark dark:to-bg-color-dark">
                  <Image
                    src={teacher.portraitImage}
                    alt={teacher.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-contain object-bottom"
                    priority
                  />
                </div>

                <div className="p-6">
                  <h1 className="mb-3 text-3xl font-bold text-black dark:text-white">
                    {teacher.name}
                  </h1>

                  <p className="mb-3 text-base font-semibold text-primary">
                    {teacher.title}
                  </p>

                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {teacher.school}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-body-color/10 bg-gray-light p-7 dark:border-white/10 dark:bg-bg-color-dark md:p-8">
                <p className="mb-4 text-base font-semibold text-primary">
                  个人简介
                </p>

                <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white">
                  {teacher.name}老师
                </h2>

                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                  {detail.overview}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-body-color/10 bg-white p-6 shadow-three dark:border-white/10 dark:bg-bg-color-dark">
                  <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
                    研究与指导方向
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {detail.focusAreas.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-body-color/10 bg-white p-6 shadow-three dark:border-white/10 dark:bg-bg-color-dark">
                  <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
                    公开履历摘要
                  </h2>

                  <ul className="space-y-3">
                    {detail.publicHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-body-color dark:text-body-color-dark"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-primary p-7 text-white md:p-8">
                <h2 className="mb-4 text-2xl font-bold">
                  对学生规划的参考价值
                </h2>

                <p className="text-base leading-relaxed text-white/82">
                  {detail.serviceValue}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/teachers"
                  className="inline-flex items-center justify-center rounded-xs border border-primary px-7 py-4 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  返回师资总览
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xs bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
                >
                  咨询匹配导师资源
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-yellow/40 bg-[#FFFBEB] p-5 dark:border-yellow/30 dark:bg-white/5">
                <p className="text-sm font-medium leading-relaxed text-black dark:text-white">
                  展示说明：本页面仅展示已整理且适合公开呈现的师资信息。具体服务匹配将根据学生阶段、目标方向、背景情况与授权范围综合安排。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeacherDetailPage;