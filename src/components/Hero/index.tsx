import { withBasePath } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const heroCategories = [
  {
    title: "保研规划",
    desc: "定位、材料、夏令营与预推免节奏陪跑",
  },
  {
    title: "留学申请",
    desc: "选校、文书、网申、面试与入学衔接",
  },
  {
    title: "申博路径",
    desc: "国内申博、海外 PhD、导师匹配与研究计划",
  },
  {
    title: "就业陪跑",
    desc: "职业定位、简历优化、面试训练与 Offer 选择",
  },
];

const heroStats = [
  {
    value: "1v1",
    label: "定制诊断",
  },
  {
    value: "6",
    label: "产品方向",
  },
  {
    value: "全程",
    label: "陪跑复盘",
  },
];

const titleImage = withBasePath("/images/jiuchen/night title.png");

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 flex items-center overflow-hidden bg-transparent pt-[96px] pb-8 md:pt-[126px] md:pb-14 lg:min-h-[680px] lg:pt-[118px] lg:pb-[64px]"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12">
          <div className="hero-fade-up text-center lg:col-span-7 lg:text-left">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm sm:text-sm lg:px-5">
              九辰教育 · 本硕博升学就业规划
            </p>

            <h1 className="mx-auto mb-4 max-w-[520px] lg:mx-0 lg:max-w-[640px]">
              <span className="sr-only">以智启学，以仁伴行</span>
              <Image
                src={titleImage}
                alt="以智启学，以仁伴行"
                width={640}
                height={156}
                priority
                className="h-auto w-full"
              />
            </h1>

            <p className="mx-auto mb-4 max-w-[720px] text-lg font-semibold leading-relaxed text-white md:text-2xl lg:mx-0">
              让升学与就业选择，更有章法，也更有人味。
            </p>

            <p className="mx-auto mb-6 max-w-[700px] text-sm leading-relaxed text-white/78 sm:text-base lg:mx-0 lg:text-lg">
              从保研、留学、申博到求职，九辰以诊断、规划、执行与复盘串联关键节点，帮助你把复杂路径拆成可落地的下一步。
            </p>

            <div className="mb-5 grid max-w-[620px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-center backdrop-blur-sm lg:mx-0">
              {heroStats.map((item, index) => (
                <div
                  key={item.label}
                  className={`px-2 py-3 sm:px-5 sm:py-4 ${
                    index < heroStats.length - 1 ? "border-r border-white/10" : ""
                  }`}
                >
                  <p className="text-xl font-bold leading-none text-yellow sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-white/75 sm:mt-2 sm:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href="/contact"
                className="w-full rounded-xs bg-yellow px-7 py-3.5 text-center text-base font-semibold text-[#07142F] duration-300 hover:bg-yellow/90 sm:w-auto"
              >
                预约免费评估
              </Link>

              <Link
                href="/cases"
                className="w-full rounded-xs border border-white/25 px-7 py-3.5 text-center text-base font-semibold text-white duration-300 hover:bg-white/10 sm:w-auto"
              >
                查看学员案例
              </Link>
            </div>
          </div>

          <div className="hero-fade-up lg:col-span-5">
            <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.075] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md md:p-6 lg:p-5 xl:p-6">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative">
                <p className="mb-2 text-sm font-semibold text-yellow">
                  产品服务矩阵
                </p>

                <h2 className="mb-4 text-xl font-bold leading-tight text-white md:text-2xl">
                  先判断方向，再定制路径
                </h2>

                <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-2 lg:block lg:space-y-2 lg:pb-0 xl:space-y-3">
                  {heroCategories.map((item, index) => (
                    <Link
                      key={item.title}
                      href="/services"
                      className="group grid min-w-[235px] grid-cols-[38px_1fr] gap-3 rounded-2xl border border-white/10 bg-[#06152F]/58 p-3 transition hover:border-yellow/40 hover:bg-white/10 md:min-w-0 xl:p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-yellow transition group-hover:bg-yellow group-hover:text-[#07142F]">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div>
                        <h3 className="mb-1 text-base font-bold text-white">
                          {item.title}
                        </h3>

                        <p className="line-clamp-2 text-sm leading-relaxed text-white/68">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-yellow/20 bg-yellow/10 p-3 md:p-4">
                  <p className="text-sm font-medium leading-relaxed text-white/82">
                    不确定方向也没关系，先把当前阶段与目标说清楚，剩下的路径由规划老师帮你拆解。
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
