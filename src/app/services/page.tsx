import Breadcrumb from "@/components/Common/Breadcrumb";
import { serviceDetails } from "@/data/services";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务 | 九辰本硕博升学就业",
  description:
    "九辰教育六大核心服务方向，覆盖保研、海外本硕、国内博士、海外全奖博士、本科就业与高端就业。",
  alternates: { canonical: "/services" },
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="服务"
        description="九辰教育围绕本硕博升学与就业目标，提供长期陪伴式、量身定制、可量化目标的全链条服务。"
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                六大核心服务方向
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                从升学申请到就业陪跑，建立清晰、系统、可执行的规划路径。
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                主页只展示服务摘要，完整服务内容进入对应详情页。你可以按当前阶段和目标方向选择服务，也可以先预约免费评估，由规划老师协助判断适合路径。
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three">
                <p className="mb-2 text-sm font-semibold text-white/70">
                  服务覆盖
                </p>

                <p className="mb-2 text-5xl font-bold">
                  6
                  <span className="ml-2 text-xl">大方向</span>
                </p>

                <p className="text-sm leading-relaxed text-white/75">
                  覆盖保研、留学、申博、海外 PhD、本科就业与高端就业。
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceDetails.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-body-color/10 bg-gray-light p-7 transition hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-bg-color-dark dark:hover:bg-gray-dark"
              >
                <div className="mb-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2 className="text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                      {service.title}
                    </h2>
                  </div>

                  <span className="shrink-0 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    查看详情
                  </span>
                </div>

                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {service.subtitle}
                </p>

                <div className="mb-6">
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
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary dark:bg-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm font-semibold text-primary">
                  进入服务详情 →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-primary p-8 text-white md:p-10">
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

          <div className="mt-8 rounded-2xl border border-body-color/10 bg-gray-light p-7 dark:border-white/10 dark:bg-bg-color-dark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              服务展示边界
            </h2>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              九辰坚持真实规划与过程陪跑，不对单一院校或公司作结果承诺。网站展示内容以服务路径、能力提升、过程陪跑和案例沉淀为主，所有案例发布前均应完成授权与脱敏处理。
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;