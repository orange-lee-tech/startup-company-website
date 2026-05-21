import Breadcrumb from "@/components/Common/Breadcrumb";
import { faqItems } from "@/data/faq";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 | 九辰本硕博升学就业",
  description:
    "九辰教育常见问题，涵盖服务流程、导师匹配、服务周期、收费方式、退费政策与合规边界。",
};

const FAQPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="常见问题"
        description="整理学员与家长常见问题，帮助你在咨询前快速了解服务流程、导师匹配、服务周期、收费方式、退费政策与合规边界。"
      />

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                FAQ
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                咨询前，你可能关心这些问题。
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                以下内容用于帮助你快速了解九辰的服务方式、导师匹配、服务周期、收费原则与合规边界。具体服务内容以一对一评估后的方案为准。
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three">
                <p className="mb-2 text-sm font-semibold text-white/70">
                  已整理问题
                </p>

                <p className="mb-2 text-5xl font-bold">
                  {faqItems.length}
                  <span className="ml-2 text-xl">个</span>
                </p>

                <p className="text-sm leading-relaxed text-white/75">
                  覆盖咨询、匹配、周期、费用、退费、质量保障与结果承诺边界。
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[980px] space-y-5">
            {faqItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-body-color/10 bg-white p-7 dark:border-white/10 dark:bg-gray-dark"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <h2 className="text-xl font-bold leading-relaxed text-black dark:text-white">
                    {item.question}
                  </h2>
                </div>

                <div className="space-y-3 pl-0 md:pl-13">
                  {item.answer.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-body-color dark:text-body-color-dark"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[980px] rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  还有其他问题？
                </h2>

                <p className="max-w-[680px] text-base leading-relaxed text-white/80">
                  你可以提交当前阶段、目标方向与主要困惑，规划老师将进行免费一对一初步评估。
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

export default FAQPage;