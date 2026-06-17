import Breadcrumb from "@/components/Common/Breadcrumb";
import { getServiceDetail } from "@/data/services";
import {
  getServicePage,
  servicePages,
} from "@/data/routePages";
import Link from "next/link";
import { notFound } from "next/navigation";

const detailBlockTones = [
  {
    card: "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark",
    dot: "bg-primary",
  },
  {
    card: "border-yellow/20 bg-yellow/5 hover:border-yellow/50 hover:bg-white dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark",
    dot: "bg-yellow",
  },
];

const DetailBlock = ({
  title,
  items,
  toneIndex,
}: {
  title: string;
  items: string[];
  toneIndex: number;
}) => {
  const tone = detailBlockTones[toneIndex % detailBlockTones.length];

  return (
    <div className={`rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${tone.card}`}>
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function generateStaticParams() {
  return servicePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  const detail = getServiceDetail(slug);

  if (!page) {
    return {
      title: "服务详情 | 九辰本硕博升学就业",
    };
  }

  return {
    title: `${page.title} | 九辰服务`,
    description: detail?.subtitle || page.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

const ServiceDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const page = getServicePage(slug);
  const detail = getServiceDetail(slug);

  if (!page || !detail) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        pageName={detail.title}
        description={detail.subtitle}
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                服务详情
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                {detail.title}
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {detail.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three transition duration-300 hover:-translate-y-1 hover:shadow-three">
                <h2 className="mb-4 text-2xl font-bold">
                  适合先做免费评估
                </h2>

                <p className="mb-6 text-base leading-relaxed text-white/80">
                  每位学生的背景、目标、时间和短板不同，建议先提交当前情况，由规划老师进行初步判断。
                </p>

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xs bg-white px-6 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
                >
                  预约免费评估
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((item, index) => (
              <div
                key={item}
                className={`rounded-xl border p-5 text-center text-base font-semibold shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${
                  index % 2 === 0
                    ? "border-primary/10 bg-primary/5 text-primary dark:border-white/10 dark:bg-white/5"
                    : "border-yellow/20 bg-yellow/5 text-primary dark:border-yellow/20 dark:bg-white/10 dark:text-yellow"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DetailBlock title="适合人群" items={detail.audience} toneIndex={0} />
            <DetailBlock title="常见痛点" items={detail.painPoints} toneIndex={1} />
            <DetailBlock title="服务目标" items={detail.goals} toneIndex={2} />
            <DetailBlock title="服务内容" items={detail.serviceContent} toneIndex={3} />
            <DetailBlock title="服务流程" items={detail.process} toneIndex={4} />
            <DetailBlock title="服务周期" items={detail.cycle} toneIndex={5} />
            <DetailBlock title="交付成果" items={detail.deliverables} toneIndex={6} />
            <DetailBlock title="配套资源" items={detail.resources} toneIndex={7} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark">
              <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
                私人订制体现
              </h2>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {detail.customization}
              </p>
            </div>

            <div className="rounded-2xl border border-yellow/40 bg-[#FFFBEB] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three dark:border-yellow/30 dark:bg-white/5">
              <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
                展示边界
              </h2>

              <p className="text-base font-semibold leading-relaxed text-black dark:text-white">
                {detail.boundary}
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  不确定自己是否适合「{detail.title}」？
                </h2>

                <p className="max-w-[720px] text-base leading-relaxed text-white/80">
                  你可以先提交当前阶段、目标方向与主要困惑，九辰规划老师将进行免费一对一初步评估。
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
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
