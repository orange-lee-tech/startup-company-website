import Link from "next/link";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section id="features" className="bg-transparent py-9 md:py-14 lg:py-16">
      <div className="container">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:mb-10 md:flex-row md:items-end md:pb-8">
          <div className="max-w-[720px]">
            <p className="mb-2 text-sm font-semibold text-yellow md:mb-4 md:text-base">
              产品服务
            </p>

            <h2 className="mb-3 text-2xl font-bold leading-tight text-white md:mb-4 md:text-4xl">
              六大方向，一套清晰的成长路径。
            </h2>

            <p className="max-w-[680px] text-sm leading-relaxed text-white/75 md:text-lg">
              首页保留方向判断与核心价值，详情页再展开适用人群、服务内容与执行流程。
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-yellow hover:underline md:text-base"
          >
            查看完整产品服务
          </Link>
        </div>

        <div className="flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-2xl md:border md:border-white/10 md:bg-white/10 md:pb-0 xl:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
