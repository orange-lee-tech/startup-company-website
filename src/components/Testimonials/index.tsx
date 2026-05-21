import { studentCases } from "@/data/cases";
import Link from "next/link";

const featuredCaseIds = [
  "baoyan-01",
  "domestic-phd-02",
  "elite-career-01",
];

const categoryPathMap = {
  baoyan: "/cases/baoyan",
  "overseas-undergrad-master": "/cases/overseas-undergrad-master",
  "domestic-phd": "/cases/domestic-phd",
  "overseas-funded-phd": "/cases/overseas-funded-phd",
  "undergrad-career": "/cases/undergrad-career",
  "elite-career": "/cases/elite-career",
};

const categoryLabelMap = {
  baoyan: "保研",
  "overseas-undergrad-master": "海外本硕",
  "domestic-phd": "国内博士",
  "overseas-funded-phd": "海外全奖博士",
  "undergrad-career": "本科就业",
  "elite-career": "高端就业",
};

const featuredCases = featuredCaseIds
  .map((id) => studentCases.find((item) => item.id === id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20"
    >
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-body-color/10 pb-8 dark:border-white/10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-4 text-base font-semibold text-primary">
              案例摘要
            </p>

            <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              从真实服务场景中，查看不同方向的规划路径。
            </h2>

            <p className="max-w-[760px] text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              首页仅展示部分脱敏案例摘要。完整案例按保研、申博与就业等方向分类整理，便于你快速找到相近背景参考。
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/cases"
              className="inline-flex items-center text-base font-semibold text-primary hover:underline"
            >
              查看全部案例 →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-body-color/10 bg-body-color/10 dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
          {featuredCases.map((item, index) => (
            <Link
              key={item.id}
              href={categoryPathMap[item.category]}
              className="group flex min-h-[360px] flex-col bg-gray-light p-7 transition hover:bg-primary dark:bg-bg-color-dark"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm font-bold tracking-wide text-primary transition group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition group-hover:bg-white/15 group-hover:text-white">
                  {categoryLabelMap[item.category]}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold leading-snug text-black transition group-hover:text-white dark:text-white">
                {item.title}
              </h3>

              <p className="mb-5 text-base leading-relaxed text-body-color transition group-hover:text-white/85 dark:text-body-color-dark">
                {item.background}
              </p>

              <div className="mb-6 rounded-xl border-l-4 border-yellow bg-white p-5 transition group-hover:bg-white/10 dark:bg-white/5">
                <p className="mb-2 text-sm font-semibold text-primary transition group-hover:text-yellow">
                  最终结果
                </p>

                <p className="text-base font-semibold leading-relaxed text-black transition group-hover:text-white dark:text-white">
                  {item.result}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-white px-3 py-1 text-xs font-semibold text-primary transition group-hover:bg-white/15 group-hover:text-white dark:bg-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm font-semibold text-primary transition group-hover:text-yellow">
                查看该类案例 →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-yellow/40 bg-[#FFFBEB] p-6 dark:border-yellow/30 dark:bg-white/5">
          <p className="text-sm font-medium leading-relaxed text-black dark:text-white">
            案例展示说明：网站案例均采用脱敏表达，重点展示背景类型、初始问题、服务过程与最终结果，不展示学员真实姓名、联系方式等敏感信息。
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;