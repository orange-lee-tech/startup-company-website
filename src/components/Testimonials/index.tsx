import type { CaseCategory, StudentCase } from "@/data/cases";
import { withBasePath } from "@/lib/site";

const categoryMetaMap: Record<
  CaseCategory,
  {
    path: string;
    label: string;
  }
> = {
  baoyan: {
    path: "/cases/baoyan",
    label: "保研辅导",
  },
  "study-abroad": {
    path: "/cases/study-abroad",
    label: "留学申请",
  },
  "phd-application": {
    path: "/cases/phd-application",
    label: "博士申请",
  },
  "career-coaching": {
    path: "/cases/career-coaching",
    label: "就业辅导",
  },
};

const Testimonials = ({ featuredCases }: { featuredCases: StudentCase[] }) => {
  return (
    <section
      id="testimonials"
      className="bg-transparent py-12 md:py-14 lg:py-16"
    >
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-white/10 pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-4 text-base font-semibold text-yellow">
              案例摘要
            </p>

            <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">
              从真实服务场景中，查看不同方向的规划路径。
            </h2>

            <p className="max-w-[760px] text-base leading-relaxed text-white/75 md:text-lg">
              首页仅展示部分脱敏案例摘要。国外博士统一归入留学申请，国内博士保留在博士申请方向，便于用户按真实目标快速查找参考。
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <a
              href={withBasePath("/cases")}
              className="inline-flex items-center text-base font-semibold text-yellow hover:underline"
            >
              查看全部案例 →
            </a>
          </div>
        </div>

        <div className="flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-px md:overflow-hidden md:rounded-2xl md:border md:border-white/10 md:bg-white/10 md:pb-0">
          {featuredCases.map((item, index) => {
            const categoryMeta = categoryMetaMap[item.category];

            return (
              <a
                key={item.id}
                href={withBasePath(categoryMeta.path)}
                className="group flex min-h-[390px] min-w-[82vw] snap-start flex-col rounded-2xl bg-[#0B1F44]/66 p-6 transition hover:bg-white/10 md:min-h-[420px] md:min-w-0 md:rounded-none md:p-7"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="text-sm font-bold tracking-wide text-yellow">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <span className="rounded-full border border-yellow/25 bg-yellow/10 px-4 py-2 text-sm font-semibold text-yellow">
                    {categoryMeta.label}
                  </span>
                </div>

                <h3 className="mb-5 text-2xl font-bold leading-snug text-white transition group-hover:text-yellow">
                  {item.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-base leading-relaxed text-white/74 transition group-hover:text-white md:line-clamp-none">
                  {item.background}
                </p>

                <div className="mb-6 rounded-xl border-l-4 border-yellow bg-white/8 p-5">
                  <p className="mb-2 text-sm font-semibold text-yellow">
                    最终结果
                  </p>

                  <p className="line-clamp-4 text-base font-semibold leading-relaxed text-white md:line-clamp-none">
                    {item.result}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 transition group-hover:border-yellow/30 group-hover:text-yellow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm font-semibold text-yellow">
                  查看该类案例 →
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
