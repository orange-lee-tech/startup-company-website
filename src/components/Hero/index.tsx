import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]"
    >
      <div className="absolute inset-0 z-[-1] bg-linear-to-br from-primary/5 via-white to-yellow/10 dark:from-primary/10 dark:via-gray-dark dark:to-gray-dark" />

      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mx-auto max-w-[620px] text-center lg:mx-0 lg:text-left">
              <p className="mb-4 text-base font-semibold text-primary">
                长期陪伴式 · 量身定制 · 可量化目标
              </p>

              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl">
                以智启学，以仁伴行
              </h1>

              <p className="mb-4 text-xl font-semibold text-black dark:text-white">
                九辰本硕博升学就业
              </p>

              <p className="mb-10 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                九辰教育陪你走对每一步，助力每位学员所愿皆所得，所行皆坦途。
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link
                  href="/contact"
                  className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
                >
                  免费咨询
                </Link>

                <Link
                  href="/about"
                  className="rounded-xs bg-black px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-black/90 dark:bg-white/10"
                >
                  了解九辰
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 w-full px-4 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto aspect-video max-w-[620px] overflow-hidden rounded-2xl bg-white shadow-three">
              <Image
                src="/images/jiuchen/jiuchen-education-planning.png"
                alt="九辰教育规划服务"
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