import Breadcrumb from "@/components/Common/Breadcrumb";
import { getCasesByCategory } from "@/data/cases";
import { casePages } from "@/data/routePages";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "案例 | 九辰本硕博升学就业",
  description:
    "九辰教育学员案例总览，覆盖保研辅导、留学申请、博士申请与就业辅导。",
  alternates: { canonical: "/cases" },
};

const caseOverviewTones = [
  {
    card: "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark",
    badge: "bg-primary/10 text-primary",
    panel: "bg-white ring-1 ring-primary/10 dark:bg-white/5 dark:ring-white/10",
  },
  {
    card: "border-yellow/20 bg-yellow/5 hover:border-yellow/50 hover:bg-white dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark",
    badge: "bg-yellow/20 text-primary dark:text-yellow",
    panel: "bg-white ring-1 ring-yellow/20 dark:bg-white/10 dark:ring-yellow/20",
  },
];

const CasesPage = () => {
  const caseCategories = casePages.map((item) => {
    const cases = getCasesByCategory(
      item.slug as Parameters<typeof getCasesByCategory>[0],
    );

    return {
      ...item,
      featuredCase: cases[0],
    };
  });

  return (
    <>
      <Breadcrumb
        pageName="案例"
        description="按保研辅导、留学申请、博士申请与就业辅导四类整理九辰学员案例，重点呈现初始情况与最终结果。"
      />

      <section className="bg-white py-14 dark:bg-bg-color-dark md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-10 max-w-[900px]">
            <p className="mb-4 text-base font-semibold text-primary">
              案例总览
            </p>

            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              按目标方向查看相近背景的规划结果。
            </h1>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              你可以从不同服务方向中查看相近背景与结果路径，也可以先咨询规划老师，判断更接近自己的阶段与目标。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {caseCategories.map((item, index) => {
              const tone = caseOverviewTones[index % caseOverviewTones.length];

              return (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className={`group flex h-full flex-col rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${tone.card}`}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className={`rounded-full px-3 py-1.5 text-sm font-bold ${tone.badge}`}>
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <span className="text-sm font-semibold text-primary transition group-hover:translate-x-1">
                      查看详情 →
                    </span>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                    {item.title}
                  </h2>

                  <p className="mb-6 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>

                  {item.featuredCase ? (
                    <div className={`mt-auto rounded-xl p-4 ${tone.panel}`}>
                      <p className="mb-2 text-sm font-semibold text-primary">
                        代表结果
                      </p>

                      <h3 className="mb-2 text-base font-bold leading-tight text-black dark:text-white">
                        {item.featuredCase.title}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.featuredCase.outcomeSummary || item.featuredCase.result}
                      </p>
                    </div>
                  ) : (
                    <div className={`mt-auto rounded-xl border border-dashed border-primary/20 p-4 ${tone.panel}`}>
                      <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        可先咨询相近路径，由规划老师根据当前背景判断适合方向。
                      </p>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  想了解更接近自己的案例路径？
                </h2>

                <p className="max-w-[720px] text-base leading-relaxed text-white/80">
                  提交当前阶段、目标方向与主要困惑，规划老师会结合你的背景给出初步判断。
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xs bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
              >
                咨询相近案例路径
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CasesPage;
