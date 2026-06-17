import Image from "next/image";
import Link from "next/link";

const capabilities = [
  {
    title: "全链条服务",
    description: "覆盖升学申请、科研文书、面试辅导与就业陪跑。",
  },
  {
    title: "一对一定制",
    description: "围绕学员背景、目标方向和时间周期制定路径。",
  },
  {
    title: "合规透明",
    description: "不夸大承诺，不模板化包装，尊重学员长期发展。",
  },
];

const AboutSectionOne = () => {
  return (
    <section id="about" className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 border-b border-body-color/10 pb-14 dark:border-white/10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="mb-4 text-base font-semibold text-primary">
              关于九辰
            </p>

            <h2 className="mb-5 max-w-[760px] text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              不做模板化包装，只做可执行的升学与就业规划。
            </h2>

            <p className="mb-8 max-w-[760px] text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              长沙九辰教育咨询有限公司专注本硕博升学与高端就业服务，帮助学员看清目标、拆解路径、推进关键动作。
            </p>

            <div className="grid grid-cols-1 border border-body-color/10 dark:border-white/10 md:grid-cols-3">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-body-color/10 p-5 last:border-b-0 dark:border-white/10 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-7 inline-flex text-base font-semibold text-primary hover:underline"
            >
              了解九辰教育
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-body-color/10 bg-gray-light dark:border-white/10">
              <Image
                src="/startup-company-website/images/jiuchen/jiuchen-one-on-one-consultation.png"
                alt="九辰教育一对一咨询服务"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;