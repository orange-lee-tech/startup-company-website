import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[#07142F] pt-[110px] pb-12 dark:bg-[#07142F] md:pt-[130px] md:pb-16 lg:pt-[150px] lg:pb-20"
    >
      <div className="absolute inset-0 z-[-1] bg-linear-to-br from-primary via-[#07142F] to-[#07142F]" />
      <div className="absolute right-0 top-0 z-[-1] h-[360px] w-[360px] rounded-full bg-yellow/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 z-[-1] h-[300px] w-[300px] rounded-full bg-primary/30 blur-[120px]" />

      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mx-auto max-w-[680px] text-center lg:mx-0 lg:text-left">
              <p className="mb-5 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white/90">
                本硕博升学就业全链条服务
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                以智启学，
                <span className="text-yellow">以仁伴行</span>
              </h1>

              <p className="mb-5 text-xl font-semibold text-white/90 md:text-2xl">
                九辰本硕博升学就业
              </p>

              <p className="mb-8 max-w-[620px] text-base leading-relaxed text-white/75 sm:text-lg">
                围绕保研、海外本硕、国内申博、海外全奖博士、本科就业与高端就业，提供长期陪伴式规划服务。
              </p>

              <div className="mb-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  长期陪伴式
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  量身定制
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  可量化目标
                </span>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link
                  href="/contact"
                  className="rounded-xs bg-yellow px-8 py-4 text-base font-semibold text-[#07142F] duration-300 hover:bg-yellow/90"
                >
                  预约免费评估
                </Link>

                <Link
                  href="/services"
                  className="rounded-xs border border-white/25 px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-white/10"
                >
                  查看服务说明
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 w-full px-4 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto aspect-video max-w-[620px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-three">
              <Image
                src="/startup-company-website/images/jiuchen/jiuchen-school-admission.png"
                alt="九辰本硕博升学规划"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;