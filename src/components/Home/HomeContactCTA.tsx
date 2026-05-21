import { contactChannels } from "@/data/contactChannels";
import Image from "next/image";
import Link from "next/link";

const HomeContactCTA = () => {
  return (
    <section className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20">
      <div className="container">
        <div className="overflow-hidden rounded-3xl bg-primary">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-8 text-white md:p-10 lg:col-span-5 lg:p-12">
              <p className="mb-4 text-base font-semibold text-yellow">
                免费咨询
              </p>

              <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                不确定适合哪条路径？
              </h2>

              <p className="mb-8 text-base leading-relaxed text-white/80 md:text-lg">
                你可以先提交当前阶段、目标方向与主要困惑，九辰规划老师将进行免费一对一初步评估。
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-xs bg-yellow px-7 py-4 text-base font-semibold text-[#07142F] transition hover:bg-yellow/90"
                >
                  预约免费评估
                </Link>

                <Link
                  href="/faq"
                  className="rounded-xs border border-white/25 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  查看常见问题
                </Link>
              </div>
            </div>

            <div className="bg-white/10 p-6 md:p-8 lg:col-span-7 lg:p-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {contactChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="rounded-2xl bg-white p-4 shadow-three dark:bg-gray-dark"
                  >
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-gray-light dark:bg-bg-color-dark">
                      <Image
                        src={channel.image}
                        alt={channel.title}
                        fill
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 80vw"
                        className="object-contain p-2"
                      />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                      {channel.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                      {channel.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactCTA;