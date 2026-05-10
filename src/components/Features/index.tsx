import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section
  id="features"
  className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
>
        <div className="container">
          <SectionTitle
            title="六大核心服务赛道"
            paragraph="覆盖保研、海外本硕、国内申博、海外全奖博士、本科就业与高端就业，围绕学员背景和目标提供一对一定制化陪跑服务。"
            center
          />
          

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
