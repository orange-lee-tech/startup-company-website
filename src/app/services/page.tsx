import Breadcrumb from "@/components/Common/Breadcrumb";
import { contentRepository } from "@/content/repository";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "服务 | 九辰本硕博升学就业",
  description:
    "九辰教育六大核心服务方向，覆盖保研、海外本硕、国内博士、海外全奖博士、本科就业与高端就业。",
  path: "/services",
});

const serviceCardTones = [
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

const ServicesPage = async () => {
  const services = await contentRepository.listServices();

  return (
    <>
      <Breadcrumb
        pageName="服务"
        description="九辰教育围绕本硕博升学与就业目标，提供长期陪伴式、量身定制、可量化目标的全链条服务。"
      />

      <section className="bg-white py-12 dark:bg-gray-dark md:py-14 lg:py-18">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                六大核心服务方向
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                从升学申请到就业陪跑，建立清晰、系统、可执行的规划路径。
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                你可以按当前阶段和目标方向选择服务，也可以先预约免费评估，由规划老师协助判断适合路径。
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three">
                <p className="mb-2 text-sm font-semibold text-white/70">
                  服务覆盖
                </p>

                <p className="mb-2 text-5xl font-bold">
                  {services.length}
                  <span className="ml-2 text-xl">大方向</span>
                </p>

                <p className="text-sm leading-relaxed text-white/75">
                  覆盖保研、留学、申博、海外 PhD、本科就业与高端就业。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ detail: service }, index) => {
              const tone = serviceCardTones[index % serviceCardTones.length];

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group flex h-full flex-col rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${tone.card}`}
                >
                  <div className="mb-5 flex items-start justify-between gap-6">
                    <div>
                      <p className={`mb-3 inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${tone.badge}`}>
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                        {service.title}
                      </h2>
                    </div>

                    <span className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tone.badge}`}>
                      查看详情
                    </span>
                  </div>

                  <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {service.subtitle}
                  </p>

                  <div className={`mb-6 rounded-xl p-5 ${tone.panel}`}>
                    <h3 className="mb-3 text-base font-bold text-black dark:text-white">
                      适合人群
                    </h3>

                    <div className="space-y-2">
                      {service.audience.slice(0, 3).map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {service.serviceContent.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm dark:bg-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-sm font-semibold text-primary transition group-hover:translate-x-1">
                    进入服务详情 →
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  不确定自己适合哪条路径？
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

export default ServicesPage;
