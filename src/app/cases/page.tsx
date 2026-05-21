import Breadcrumb from "@/components/Common/Breadcrumb";
import { casePages } from "@/data/routePages";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "案例 | 九辰本硕博升学就业",
  description:
    "九辰教育学员案例总览，覆盖保研、海外本硕、国内博士、海外全奖博士、本科就业与高端就业。",
};

const CasesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="案例"
        description="按服务方向整理九辰学员案例，后续将持续补充已授权、已脱敏的升学与就业成果。"
      />

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-[860px]">
            <p className="mb-4 text-base font-semibold text-primary">
              案例分类
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              从升学申请到就业陪跑，查看不同方向的代表性成果。
            </h1>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              当前页面先搭建分类入口，后续将按授权情况补充案例详情、结果截图与脱敏证明材料。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {casePages.map((item) => (
              <Link
                key={item.slug}
                href={`/cases/${item.slug}`}
                className="group rounded-2xl border border-body-color/10 bg-white p-7 transition hover:border-primary/40 hover:shadow-three dark:border-white/10 dark:bg-gray-dark"
              >
                <h2 className="mb-4 text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                  {item.title}
                </h2>

                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CasesPage;