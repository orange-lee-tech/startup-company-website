import Link from "next/link";

const ctaPoints = [
  "判断适合的服务类别",
  "梳理当前背景与目标差距",
  "给出初步规划建议",
  "说明后续服务启动方式",
];

const HomeContactCTA = () => {
  return (
    <section className="bg-white py-12 dark:bg-gray-dark md:py-14 lg:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-[#07142F] p-7 text-white shadow-three md:p-10 lg:p-12">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/30 blur-[90px]" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-yellow/15 blur-[80px]" />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="mb-4 text-base font-semibold text-yellow">
                免费咨询
              </p>

              <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                不确定适合哪条路径？
              </h2>

              <p className="max-w-[720px] text-base leading-relaxed text-white/80 md:text-lg">
                你可以先提交当前阶段、目标方向与主要困惑，九辰规划老师将进行免费一对一初步评估，帮助你判断更适合保研辅导、留学申请、博士申请还是就业辅导。
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ctaPoints.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                  >
                    <p className="mb-2 text-sm font-bold text-yellow">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="text-sm font-semibold leading-relaxed text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xs bg-yellow px-7 py-4 text-base font-semibold text-[#07142F] transition hover:bg-yellow/90"
                >
                  预约免费评估
                </Link>

                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-xs border border-white/25 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  查看常见问题
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactCTA;