const caseTypes = [
  {
    id: "01",
    title: "升学申请案例",
    description:
      "后续将展示经授权并脱敏的保研、海外本硕与升学规划服务案例。",
    points: ["背景诊断", "路径规划", "申请推进"],
  },
  {
    id: "02",
    title: "博士申请案例",
    description:
      "后续将展示经授权并脱敏的国内申博、海外全奖博士申请服务案例。",
    points: ["导师匹配", "研究计划", "面试辅导"],
  },
  {
    id: "03",
    title: "就业成长案例",
    description:
      "后续将展示经授权并脱敏的本科就业陪跑与高端就业定制服务案例。",
    points: ["职业定位", "简历优化", "面试训练"],
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-white py-14 dark:bg-gray-dark md:py-16 lg:py-20"
    >
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-body-color/10 pb-8 dark:border-white/10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 text-base font-semibold text-primary">
              案例沉淀
            </p>

            <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              学员案例与成果展示区正在整理
            </h2>

            <p className="max-w-[760px] text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              九辰将按服务方向整理经授权并脱敏的真实案例。所有案例内容均会隐藏姓名、联系方式、敏感院校或企业信息，确保合规展示。
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-l-4 border-yellow bg-[#FFFBEB] p-6 dark:bg-white/5">
              <p className="text-base font-semibold leading-relaxed text-black dark:text-white">
                当前阶段先展示案例承载结构，待甲方确认案例素材后，再替换为正式内容。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-body-color/10 bg-body-color/10 dark:border-white/10 dark:bg-white/10 md:grid-cols-3">
          {caseTypes.map((item) => (
            <div
              key={item.id}
              className="bg-gray-light p-7 dark:bg-bg-color-dark"
            >
              <p className="mb-5 text-sm font-bold tracking-wide text-primary">
                {item.id}
              </p>

              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">
                {item.title}
              </h3>

              <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.points.map((point) => (
                  <span
                    key={point}
                    className="bg-white px-3 py-1 text-xs font-semibold text-primary dark:bg-white/10"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;