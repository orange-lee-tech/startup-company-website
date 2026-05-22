import { withBasePath } from "@/lib/site";
import Link from "next/link";

const heroCategories = [
  {
    title: "保研辅导",
    desc: "定位评估、材料打磨、夏令营与预推免陪跑",
  },
  {
    title: "留学申请",
    desc: "海外本硕选校、文书申请、网申与面试指导",
  },
  {
    title: "博士申请",
    desc: "国内申博、海外 PhD、导师匹配与研究计划",
  },
  {
    title: "就业辅导",
    desc: "职业定位、简历优化、面试训练与 Offer 选择",
  },
];

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
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden bg-[#020817] pt-[112px] pb-12 dark:bg-[#020817] md:pt-[132px] md:pb-16 lg:min-h-[680px] lg:pt-[118px] lg:pb-[64px]"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-95"
        style={{
          backgroundImage: `url('${withBasePath("/images/jiuchen/background.png")}')`,
        }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-r from-[#020817]/96 via-[#07142F]/84 to-[#061B3A]/36" />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/15 via-transparent to-black/78" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_24%_30%,rgba(0,47,167,0.28),transparent_34%)]" />

      <div className="hero-float absolute right-[14%] top-[22%] z-0 hidden h-44 w-44 rounded-full bg-primary/20 blur-[90px] lg:block" />
      <div className="hero-soft-pulse absolute left-[8%] bottom-[12%] z-0 h-28 w-28 rounded-full bg-yellow/12 blur-[70px]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="hero-fade-up text-center lg:col-span-7 lg:text-left">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
              九辰教育 · 升学就业一站式规划
            </p>

            <h1 className="mb-5 whitespace-nowrap text-[clamp(30px,9.2vw,46px)] font-bold leading-[1.08] tracking-[-0.05em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px]">
  以智启学，
  <span className="text-yellow">以仁伴行</span>
</h1>

            <p className="mb-5 max-w-[780px] text-xl font-semibold leading-relaxed text-white md:text-2xl lg:mx-0">
              保研、留学、申博与就业，四类入口清晰匹配不同阶段目标
            </p>

            <p className="mx-auto mb-8 max-w-[760px] text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              围绕保研辅导、留学申请、博士申请与就业辅导，提供从定位评估、背景提升、材料打磨到面试陪跑的系统服务，让升学与求职路径更清晰、更可执行。
            </p>

            <div className="mb-6 grid max-w-[720px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center backdrop-blur-sm lg:mx-0">
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

          <div className="hero-fade-up lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.075] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-6 lg:p-5 xl:p-6">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative">
                <p className="mb-3 text-sm font-semibold text-yellow">
                  规划路径矩阵
                </p>

                <h2 className="mb-5 text-2xl font-bold leading-tight text-white">
                  先判断方向，再定制路径
                </h2>

                <div className="space-y-3 lg:space-y-2 xl:space-y-3">
                  {heroCategories.map((item, index) => (
                    <Link
                      key={item.title}
                      href="/services"
                      className="group grid grid-cols-[42px_1fr] gap-4 rounded-2xl border border-white/10 bg-[#06152F]/58 p-4 transition hover:border-yellow/40 hover:bg-white/10 lg:p-3 xl:p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-yellow transition group-hover:bg-yellow group-hover:text-[#07142F]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="mb-1 text-base font-bold text-white">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-white/68">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-yellow/20 bg-yellow/10 p-4">
                  <p className="text-sm font-medium leading-relaxed text-white/82">
                    不确定属于哪一类？可以先提交当前阶段、目标方向与主要困惑，由规划老师进行免费初步评估。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;