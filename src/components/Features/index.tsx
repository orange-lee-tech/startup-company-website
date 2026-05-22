import Link from "next/link";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section
      id="features"
className="bg-transparent py-12 md:py-14 lg:py-16"    >
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-body-color/10 pb-8 dark:border-white/10 lg:flex-row lg:items-end">
          <div className="max-w-[760px]">
            <p className="mb-4 text-base font-semibold text-primary">
              服务入口
            </p>

<h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">              六大核心服务赛道
            </h2>

<p className="text-base leading-relaxed text-white/75 md:text-lg">              首页只保留服务摘要，帮助你快速判断方向；完整适用人群、服务内容与流程说明请进入服务说明页。
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center text-base font-semibold text-primary hover:underline"
          >
            查看完整服务说明
          </Link>
        </div>

<div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;