import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="bg-[#FFFBEB] py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 aspect-video max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-three lg:m-0">
              <Image
                src="/startup-company-website/images/jiuchen/jiuchen-growth-path.png"
                alt="九辰教育成长路径规划"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  教育初心
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  我们看到许多学子在保研、海内外申硕申博、求职就业中，面临信息闭塞、规划迷茫、缺乏专业指导和无人全程陪伴等问题。九辰希望把“过来人”的经验变成系统化服务，让努力不再白费，让选择不再后悔。
                </p>
              </div>

              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  陪伴式服务
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  我们不做冷冰冰的教育工作，而是做有温度的教育陪伴者。通过专属导师、阶段任务、节点提醒、复盘反馈和动态调整，让 GPA、科研、实习、升学路径与求职节奏清晰可见。
                </p>
              </div>

              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  结果导向与合规边界
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  九辰以结果为导向保障服务质量，但不使用“保录取”“包 offer”“百分百上岸”等夸大表述。我们坚持真实、透明、合规展示，尊重每位学员的隐私与长期发展。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;