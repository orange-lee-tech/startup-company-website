import Breadcrumb from "@/components/Common/Breadcrumb";
import { getCasesByCategory } from "@/data/cases";
import {
  casePages,
  getCasePage,
} from "@/data/routePages";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const caseCardTones = [
  {
    card: "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark",
    panel: "bg-white ring-1 ring-primary/10 dark:bg-white/5 dark:ring-white/10",
    label: "bg-primary/10 text-primary",
  },
  {
    card: "border-yellow/20 bg-yellow/5 hover:border-yellow/50 hover:bg-white dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark",
    panel: "bg-white ring-1 ring-yellow/20 dark:bg-white/10 dark:ring-yellow/20",
    label: "bg-yellow/20 text-primary dark:text-yellow",
  },
];

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
    alternates: { canonical: `/cases/${slug}` },
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

      <section className="bg-white py-14 dark:bg-bg-color-dark md:py-16 lg:py-20">
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
                      ? "border-primary bg-primary text-white shadow-three"
                      : "border-primary/15 bg-white text-body-color hover:border-primary hover:text-primary dark:border-white/10 dark:bg-gray-dark dark:text-body-color-dark dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="mb-10 max-w-[900px]">
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

          {cases.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {cases.map((item, index) => {
                const tone = caseCardTones[index % caseCardTones.length];
                const initialSummary = item.initialSummary?.trim();
                const outcomeSummary = item.outcomeSummary?.trim() || item.result;

                return (
                  <article
                    key={item.id}
                    className={`rounded-2xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three md:p-7 ${tone.card}`}
                  >
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-4 py-2 text-sm font-semibold ${tone.label}`}>
                        {item.studentLabel}
                      </span>
                    </div>

                    <h2 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white">
                      {item.title}
                    </h2>

                    {item.admissionImage && (
                      <div className="relative mb-6 overflow-hidden rounded-xl bg-[#07142F] shadow-sm">
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={item.admissionImage}
                            alt={item.admissionUnit ?? item.title}
                            fill
                            sizes="(min-width: 1280px) 45vw, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#020817]/85 via-[#020817]/25 to-transparent" />
                        </div>
                        {item.admissionUnit && (
                          <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                            <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-yellow">
                              去向展示
                            </p>
                            <p className="text-xl font-bold leading-tight md:text-2xl">
                              {item.admissionUnit}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.image && (
                      <div
                        className={`relative mb-6 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-bg-color-dark ${
                          item.imageRatio === "portrait"
                            ? "mx-auto aspect-[2/3] w-full max-w-[240px]"
                            : "aspect-[4/3] w-full"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={`${item.title}证明材料`}
                          fill
                          sizes={
                            item.imageRatio === "portrait"
                              ? "240px"
                              : "(min-width: 1280px) 45vw, 100vw"
                          }
                          className="object-contain p-2"
                        />
                      </div>
                    )}

                    <div className="space-y-5">
                      {initialSummary && (
                        <div className={`rounded-xl p-5 ${tone.panel}`}>
                          <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                            初始情况
                          </h3>
                          <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                            {initialSummary}
                          </p>
                        </div>
                      )}

                      <div className="rounded-xl border-l-4 border-yellow bg-[#FFFBEB] p-5 dark:bg-white/5">
                        <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                          最终结果
                        </h3>
                        <p className="text-base font-semibold leading-relaxed text-black dark:text-white">
                          {outcomeSummary}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-8 dark:border-white/10 dark:bg-white/5">
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
