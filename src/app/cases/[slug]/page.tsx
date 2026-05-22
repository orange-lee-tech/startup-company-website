import Breadcrumb from "@/components/Common/Breadcrumb";
import { getCasesByCategory } from "@/data/cases";
import {
  casePages,
  getCasePage,
} from "@/data/routePages";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return casePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getCasePage(slug);

  if (!page) {
    return {
      title: "案例详情 | 九辰本硕博升学就业",
    };
  }

  return {
    title: `${page.title} | 九辰案例`,
    description: page.description,
  };
}

const CaseCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const page = getCasePage(slug);

  if (!page) {
    notFound();
  }

  const cases = getCasesByCategory(
    slug as Parameters<typeof getCasesByCategory>[0],
  );

  return (
    <>
      <Breadcrumb
        pageName={page.title}
        description={page.description}
      />

      <section className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-3">
            {casePages.map((item) => {
              const active = item.slug === slug;

              return (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-body-color/15 bg-gray-light text-body-color hover:border-primary hover:text-primary dark:border-white/10 dark:bg-bg-color-dark dark:text-body-color-dark dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                案例详情
              </p>

              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                {page.title}
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {page.description}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-gray-light p-6 dark:bg-bg-color-dark">
                <p className="mb-2 text-sm font-semibold text-primary">
                  当前分类案例
                </p>

                <p className="text-4xl font-bold text-black dark:text-white">
                  {cases.length}
                  <span className="ml-2 text-lg text-body-color dark:text-body-color-dark">
                    个
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {page.highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-body-color/10 bg-gray-light p-4 text-center text-sm font-semibold text-primary dark:border-white/10 dark:bg-bg-color-dark md:text-base"
              >
                {item}
              </div>
            ))}
          </div>

          {cases.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {cases.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-body-color/10 bg-gray-light p-6 transition hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-bg-color-dark dark:hover:bg-gray-dark md:p-7"
                >
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                      {item.studentLabel}
                    </span>

                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-body-color dark:bg-white/10 dark:text-body-color-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white">
                    {item.title}
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                        学员背景
                      </h3>
                      <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.background}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                        初始问题
                      </h3>
                      <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                        服务过程
                      </h3>
                      <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                        {item.service}
                      </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-yellow bg-white p-5 dark:bg-white/5">
                      <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                        最终结果
                      </h3>
                      <p className="text-base font-semibold leading-relaxed text-black dark:text-white">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-body-color/10 bg-gray-light p-8 dark:border-white/10 dark:bg-bg-color-dark">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                案例内容整理中
              </h2>

              <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                当前方向的案例素材仍在整理与脱敏确认中。后续将补充经授权展示的代表案例。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/cases"
                  className="rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
                >
                  返回案例总览
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xs border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  预约免费评估
                </Link>
              </div>
            </div>
          )}

          {cases.length > 0 && (
            <div className="mt-10 rounded-2xl bg-primary p-7 text-white md:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h2 className="mb-3 text-2xl font-bold">
                    想了解与你背景相近的规划路径？
                  </h2>

                  <p className="max-w-[700px] text-base leading-relaxed text-white/80">
                    你可以提交当前阶段、目标方向与主要困惑，九辰规划老师将进行免费一对一初步评估。
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center rounded-xs bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
                >
                  预约免费评估
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CaseCategoryPage;