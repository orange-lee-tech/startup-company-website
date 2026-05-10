import Link from "next/link";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section
      id="features"
      className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-24"
    >
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[720px]">
            <p className="mb-4 text-base font-semibold text-primary">
              服务赛道
            </p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              六大核心服务入口
            </h2>
            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              首页只展示服务方向与核心关键词。更完整的适用人群、服务内容与流程说明，可进入服务说明页查看。
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center text-base font-semibold text-primary hover:underline"
          >
            查看完整服务说明
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;