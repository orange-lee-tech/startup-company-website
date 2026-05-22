import Link from "next/link";

const heroCategories = ["保研辅导", "留学申请", "博士申请", "就业辅导"];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[#020817] pt-[120px] pb-16 dark:bg-[#020817] md:pt-[145px] md:pb-20 lg:py-[170px]"
    >
      <div
        className="absolute inset-0 z-[-4] bg-cover bg-center opacity-90"
        style={{
          backgroundImage:
            "url('/startup-company-website/images/jiuchen/background.png')",
        }}
      />

      <div className="absolute inset-0 z-[-3] bg-linear-to-r from-black via-[#07142F]/85 to-[#07142F]/35" />
      <div className="absolute inset-0 z-[-2] bg-linear-to-t from-black via-black/30 to-transparent" />
      <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(20,120,255,0.22),transparent_36%)]" />

      <div className="container">
        <div className="max-w-[880px] text-center lg:text-left">
          <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
            九辰教育 · 升学就业一站式规划
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            以智启学，
            <span className="text-yellow">以仁伴行</span>
          </h1>

          <p className="mb-5 max-w-[760px] text-xl font-semibold leading-relaxed text-white/90 md:text-2xl">
            保研、留学、申博与就业，四类入口清晰匹配不同阶段目标
          </p>

          <p className="mb-8 max-w-[760px] text-base leading-relaxed text-white/75 sm:text-lg">
            围绕保研辅导、留学申请、博士申请与就业辅导，提供从定位评估、背景提升、材料打磨到面试陪跑的系统服务，让升学与求职路径更清晰、更可执行。
          </p>

          <div className="mb-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            {heroCategories.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mb-9 grid max-w-[760px] grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center backdrop-blur-sm sm:grid-cols-3">
            <div className="border-b border-white/10 px-4 py-4 sm:border-b-0 sm:border-r">
              <p className="text-2xl font-bold text-yellow">4</p>
              <p className="mt-1 text-xs font-medium text-white/75">
                核心类别
              </p>
            </div>

            <div className="border-b border-white/10 px-4 py-4 sm:border-b-0 sm:border-r">
              <p className="text-2xl font-bold text-yellow">1v1</p>
              <p className="mt-1 text-xs font-medium text-white/75">
                定制规划
              </p>
            </div>

            <div className="px-4 py-4">
              <p className="text-2xl font-bold text-yellow">全程</p>
              <p className="mt-1 text-xs font-medium text-white/75">
                陪跑复盘
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
            <Link
              href="/contact"
              className="rounded-xs bg-yellow px-8 py-4 text-base font-semibold text-[#07142F] duration-300 hover:bg-yellow/90"
            >
              预约免费评估
            </Link>

            <Link
              href="/cases"
              className="rounded-xs border border-white/25 px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-white/10"
            >
              查看学员案例
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;