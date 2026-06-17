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

const CasesPage = () => {
  const caseCategories = casePages.map((item) => {
    const cases = getCasesByCategory(
      item.slug as Parameters<typeof getCasesByCategory>[0],
    );

    return {
      ...item,
      count: cases.length,
      featuredCase: cases[0],
    };
  });

  const totalCases = caseCategories.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <>
      <Breadcrumb
        pageName="案例"
        description="按保研辅导、留学申请、博士申请与就业辅导四类整理九辰学员案例，持续补充已授权、已脱敏的升学与就业成果。"
      />

      <section className="bg-gray-light py-14 dark:bg-bg-color-dark md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                案例总览
              </p>

              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                四类案例入口，快速查看相近背景的规划路径。
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                当前案例采用脱敏展示方式，重点呈现背景类型、初始问题、服务过程与最终结果。后续可根据授权情况补充结果截图与证明材料。
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-6 text-white shadow-three">
                <p className="mb-2 text-sm font-semibold text-white/70">
                  当前已整理案例
                </p>

                <p className="mb-2 text-5xl font-bold">
                  {totalCases}
                  <span className="ml-2 text-xl">个</span>
                </p>

                <p className="text-sm leading-relaxed text-white/75">
                  覆盖保研辅导、博士申请与就业辅导方向，留学申请案例正在整理中。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {caseCategories.map((item, index) => {
              const hasCases = item.count > 0;

              return (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-body-color/10 bg-white p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-three dark:border-white/10 dark:bg-gray-dark"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <p className="text-sm font-bold tracking-wide text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <div
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                        hasCases
                          ? "bg-primary/10 text-primary"
                          : "bg-body-color/10 text-body-color dark:bg-white/10 dark:text-body-color-dark"
                      }`}
                    >
                      {hasCases ? `${item.count} 个` : "整理中"}
                    </div>
                  </div>

                  <h2 className="mb-4 text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                    {item.title}
                  </h2>

                  <p className="mb-5 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {item.highlights.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {item.featuredCase ? (
                    <div className="mt-auto rounded-xl bg-gray-light p-4 dark:bg-bg-color-dark">
                      <p className="mb-2 text-sm font-semibold text-primary">
                        精选案例
                      </p>

                      <h3 className="mb-2 text-base font-bold leading-tight text-black dark:text-white">
                        {item.featuredCase.title}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.featuredCase.result}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-auto rounded-xl border border-dashed border-body-color/20 p-4 dark:border-white/20">
                      <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        该方向案例素材仍在整理与脱敏确认中。
                      </p>
                    </div>
                  )}

                  <p className="mt-5 text-sm font-semibold text-primary">
                    查看该方向 →
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-body-color/10 bg-white p-7 dark:border-white/10 dark:bg-gray-dark md:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
                  案例展示说明
                </h2>

                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  所有案例发布前均应完成授权确认与脱敏处理。展示时优先突出背景类型、初始问题、服务过程与最终结果，避免将个别结果表述为普遍承诺。
                </p>
              </div>

              <div className="lg:col-span-4">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
                >
                  咨询相近案例路径
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CasesPage;