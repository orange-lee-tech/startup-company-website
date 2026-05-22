import Link from "next/link";

const heroCategories = ["保研辅导", "留学申请", "博士申请", "就业辅导"];

const heroStats = [
  {
    value: "4",
    label: "核心类别",
  },
  {
    value: "1v1",
    label: "定制规划",
  },
  {
    value: "全程",
    label: "陪跑复盘",
  },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden bg-[#020817] pt-[112px] pb-10 dark:bg-[#020817] md:pt-[132px] md:pb-16 lg:min-h-[760px] lg:pt-[150px] lg:pb-[110px]"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-95"
        style={{
          backgroundImage:
            "url('/startup-company-website/images/jiuchen/background.png')",
        }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/95 via-[#07142F]/88 to-[#061B3A]/45" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/10 via-transparent to-black/75" />

      <div className="hero-float absolute right-[8%] top-[18%] z-0 hidden h-36 w-36 rounded-full bg-primary/25 blur-[80px] lg:block" />
      <div className="hero-soft-pulse absolute left-[8%] bottom-[12%] z-0 h-28 w-28 rounded-full bg-yellow/15 blur-[70px]" />

      <div className="container relative z-10">
        <div className="max-w-[900px]">
          <div className="hero-fade-up rounded-[28px] border border-white/15 bg-[#06152F]/48 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-7 md:p-8 lg:bg-[#06152F]/38 lg:p-9">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
              九辰教育 · 升学就业一站式规划
            </p>

            <h1 className="mb-6 text-[46px] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
              以智启学，
              <span className="text-yellow">以仁伴行</span>
            </h1>

            <p className="mb-5 max-w-[780px] text-xl font-semibold leading-relaxed text-white md:text-2xl">
              保研、留学、申博与就业，四类入口清晰匹配不同阶段目标
            </p>

            <p className="mb-8 max-w-[780px] text-base leading-relaxed text-white/80 sm:text-lg">
              围绕保研辅导、留学申请、博士申请与就业辅导，提供从定位评估、背景提升、材料打磨到面试陪跑的系统服务，让升学与求职路径更清晰、更可执行。
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {heroCategories.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-yellow/50 hover:text-yellow"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mb-8 grid max-w-[760px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center backdrop-blur-sm">
              {heroStats.map((item, index) => (
                <div
                  key={item.label}
                  className={`px-3 py-4 sm:px-5 ${
                    index < heroStats.length - 1
                      ? "border-r border-white/10"
                      : ""
                  }`}
                >
                  <p className="text-2xl font-bold leading-none text-yellow sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-white/75 sm:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link
                href="/contact"
                className="w-full rounded-xs bg-yellow px-8 py-4 text-center text-base font-semibold text-[#07142F] duration-300 hover:bg-yellow/90 sm:w-auto"
              >
                预约免费评估
              </Link>

              <Link
                href="/cases"
                className="w-full rounded-xs border border-white/25 px-8 py-4 text-center text-base font-semibold text-white duration-300 hover:bg-white/10 sm:w-auto"
              >
                查看学员案例
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;