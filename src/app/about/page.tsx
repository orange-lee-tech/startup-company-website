import Breadcrumb from "@/components/Common/Breadcrumb";
import { aboutInfo } from "@/data/about";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于九辰 | 九辰本硕博升学就业",
  description:
    "了解长沙九辰教育咨询有限公司的服务理念、教育初心与本硕博升学就业全链条陪跑服务。",
  alternates: { canonical: "/about" },
};

const aboutCardTones = [
  "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark",
  "border-yellow/20 bg-yellow/5 hover:border-yellow/50 hover:bg-white dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark",
];

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="关于九辰"
        description="长沙九辰教育咨询有限公司专注本硕博升学与就业陪跑服务，以长期陪伴式、量身定制、可量化目标为核心，陪伴学员走清晰路径。"
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-4 text-base font-semibold text-primary">
                关于我们
              </p>

              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
                {aboutInfo.slogan}
              </h1>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
                {aboutInfo.oneSentence}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-primary p-7 text-white shadow-three transition duration-300 hover:-translate-y-1">
                <p className="mb-2 text-sm font-semibold text-white/70">
                  公司主体
                </p>

                <h2 className="mb-3 text-2xl font-bold">
                  {aboutInfo.companyName}
                </h2>

                <p className="text-sm leading-relaxed text-white/75">
                  所在城市：{aboutInfo.city}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {aboutInfo.keywords.map((keyword, index) => (
              <div
                key={keyword}
                className={`rounded-2xl border p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${aboutCardTones[index % aboutCardTones.length]}`}
              >
                <p className="text-2xl font-bold text-primary">
                  {keyword}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-primary/10 bg-primary/5 p-8 shadow-sm transition duration-300 hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark md:p-10">
                <p className="mb-4 text-base font-semibold text-primary">
                  机构简介
                </p>

                <h2 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white">
                  深耕升学与就业全链条服务
                </h2>

                <div className="space-y-5">
                  {aboutInfo.intro.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed text-body-color dark:text-body-color-dark"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-yellow/20 bg-yellow/5 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow/50 hover:bg-white hover:shadow-three dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark md:p-10">
                <p className="mb-4 text-base font-semibold text-primary">
                  六大服务方向
                </p>

                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                  覆盖升学、申博与就业关键节点
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {aboutInfo.serviceDirections.map((item, index) => (
                    <Link
                      key={item}
                      href="/services"
                      className={`rounded-xl px-5 py-4 text-base font-semibold transition hover:-translate-y-0.5 hover:bg-primary hover:text-white ${
                        index % 2 === 0
                          ? "bg-white text-primary shadow-sm dark:bg-white/10"
                          : "bg-primary/10 text-primary dark:bg-white/10"
                      }`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-white/5 dark:hover:bg-gray-dark md:p-10">
              <p className="mb-4 text-base font-semibold text-primary">
                品牌理念
              </p>

              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                做有温度的教育陪伴者
              </h2>

              <div className="space-y-5">
                {aboutInfo.philosophy.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-yellow/20 bg-yellow/5 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-yellow/50 hover:bg-white hover:shadow-three dark:border-yellow/20 dark:bg-white/10 dark:hover:bg-gray-dark md:p-10">
              <p className="mb-4 text-base font-semibold text-primary">
                教育初心
              </p>

              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                让努力不再白费，让选择不再后悔
              </h2>

              <div className="space-y-5">
                {aboutInfo.originalPurpose.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-body-color dark:text-body-color-dark"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/10 bg-primary/5 p-8 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-10">
            <p className="mb-4 text-base font-semibold text-primary">
              用户痛点
            </p>

            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
              九辰关注的不只是结果，还有过程中的信息差、焦虑与执行难题
            </h2>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {aboutInfo.painPoints.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${aboutCardTones[index % aboutCardTones.length]}`}
                >
                  <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutInfo.principles.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-three ${aboutCardTones[index % aboutCardTones.length]}`}
              >
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  想了解九辰是否适合你的目标？
                </h2>

                <p className="max-w-[720px] text-base leading-relaxed text-white/80">
                  你可以先提交当前阶段、目标方向与主要困惑，规划老师将进行免费一对一初步评估。
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

export default AboutPage;
