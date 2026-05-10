import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务说明 | 九辰本硕博升学就业",
  description:
    "九辰教育六大核心服务赛道说明，覆盖保研、海外本硕、国内申博、海外全奖博士、本科就业与高端就业。",
};

const services = [
  {
    id: "01",
    title: "保研一站式升学",
    audience: "适合保研边缘、跨专业、科研竞赛短板或信息闭塞的学生。",
    items: ["定位评估", "背景提升", "文书打磨", "夏令营 / 预推免申请", "面试冲刺"],
  },
  {
    id: "02",
    title: "海外本硕申请",
    audience: "适合计划申请英国、香港、新加坡、澳洲等地区本科或硕士项目的学生。",
    items: ["选校定位", "背景提升", "文书申请", "网申递交", "面试辅导", "入学准备"],
  },
  {
    id: "03",
    title: "国内博士申请",
    audience: "适合应届硕士、在职申博、科研薄弱或跨专业申请者。",
    items: ["申博定位", "导师匹配", "套磁指导", "研究计划书打磨", "复试面试辅导"],
  },
  {
    id: "04",
    title: "海外全奖博士申请",
    audience: "适合本科、硕士及在职申请者冲刺海外 PhD 与奖学金机会。",
    items: ["方向定位", "导师筛选", "套磁策略", "英文文书", "全奖面试", "签证行前指导"],
  },
  {
    id: "05",
    title: "本科就业陪跑",
    audience: "适合职业方向不清、简历薄弱、网申低效或面试经验不足的本科生。",
    items: ["职业定位", "简历优化", "岗位筛选", "网申规划", "面试训练", "offer 选择"],
  },
  {
    id: "06",
    title: "高端就业定制",
    audience: "适合目标国企、央企、大厂、金融、上市公司等高端就业机会的学生。",
    items: ["职业定位", "精英简历", "内推资源", "模拟面试", "offer 择优"],
  },
];

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="服务说明"
        description="九辰教育围绕本硕博升学与就业目标，提供长期陪伴式、量身定制、可量化目标的全链条服务。"
      />

      <section className="bg-white py-16 dark:bg-gray-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-14 max-w-[860px]">
            <p className="mb-4 text-base font-semibold text-primary">
              六大核心服务赛道
            </p>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              从升学申请到就业陪跑，九辰提供清晰、系统、可执行的服务路径。
            </h1>
            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              我们不做模板化包装，而是根据学员背景、目标方向、时间周期和薄弱环节，制定可推进、可复盘、可调整的服务方案。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-body-color/10 bg-gray-light p-7 transition hover:border-primary/40 hover:bg-white hover:shadow-three dark:border-white/10 dark:bg-bg-color-dark dark:hover:bg-gray-dark"
              >
                <div className="mb-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-primary">
                      {service.id}
                    </p>
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {service.audience}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-primary p-8 text-white md:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold">
                  不确定自己适合哪条路径？
                </h2>
                <p className="max-w-[680px] text-base leading-relaxed text-white/80">
                  你可以先提交当前阶段、目标方向与主要困惑，九辰规划老师将与你进行免费一对一初步评估。
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xs bg-white px-8 py-4 text-base font-semibold text-primary duration-300 hover:bg-white/90"
              >
                预约免费评估
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;