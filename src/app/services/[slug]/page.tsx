import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  getServicePage,
  servicePages,
} from "@/data/routePages";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  if (!page) {
    return {
      title: "服务详情 | 九辰本硕博升学就业",
    };
  }

  return {
    title: `${page.title} | 九辰服务`,
    description: page.description,
  };
}

const ServiceDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        pageName={page.title}
        description={page.description}
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-[960px]">
            <p className="mb-4 text-base font-semibold text-primary">
              服务详情
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              {page.title}
            </h1>

            <p className="mb-10 text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              {page.description}
            </p>

            <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-body-color/10 bg-gray-light p-5 text-center text-base font-semibold text-primary dark:border-white/10 dark:bg-bg-color-dark"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-body-color/10 bg-gray-light p-8 dark:border-white/10 dark:bg-bg-color-dark">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                页面内容建设中
              </h2>

              <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                后续将在此页面补充适合人群、用户痛点、服务目标、服务内容、服务流程、服务周期、交付物、配套资源和展示边界等完整信息。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
                >
                  返回服务总览
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xs border border-primary px-6 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  预约免费评估
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;