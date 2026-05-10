import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务说明详情 | 九辰本硕博升学就业",
  description:
    "九辰教育服务流程、导师匹配、合规边界与咨询报名说明。",
};

const BlogDetailsPage = () => {
  return (
    <section className="bg-gray-light pt-[150px] pb-[120px] dark:bg-bg-color-dark">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <article className="rounded-xs bg-white p-8 shadow-three dark:bg-gray-dark md:p-10">
              <p className="mb-4 text-base font-semibold text-primary">
                常见问题与服务说明
              </p>

              <h1 className="mb-8 text-3xl leading-tight font-bold text-black dark:text-white sm:text-4xl">
                九辰教育如何提供一对一定制化陪跑服务？
              </h1>

              <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg">
                九辰教育围绕本硕博升学与就业目标，为学员提供从免费评估、方案制定、签约启动到全程执行复盘的陪跑服务。我们重视学员真实背景与长期发展，不做简单模板化包装。
              </p>

              <div className="mb-10 rounded-md bg-primary/10 p-6">
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  我们不承诺单一院校或单一公司的“百分百录取”“包 offer”“必过”等结果，而是通过专业规划、过程陪伴与阶段复盘，系统提升学员竞争力。
                </p>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  服务流程
                </h2>
                <ul className="list-inside list-disc space-y-3 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  <li>提交咨询信息，说明当前阶段、目标方向与主要困惑。</li>
                  <li>规划老师进行免费一对一初步评估。</li>
                  <li>结合背景、目标和时间规划，制定专属服务方案。</li>
                  <li>确认方案后签署服务协议，组建专属服务团队。</li>
                  <li>按阶段推进规划、文书、面试、申请或求职任务。</li>
                  <li>定期复盘进度，根据实际反馈动态调整策略。</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  导师如何匹配？
                </h2>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  九辰会根据学员目标方向、薄弱环节、沟通习惯与服务需求进行导师匹配。升学类服务重点匹配具备相关院校、专业、科研或申请经验的导师；就业类服务重点匹配具备行业、岗位、简历面试或招聘经验的导师。
                </p>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  服务周期与收费方式
                </h2>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  服务周期会根据学员当前阶段和目标紧迫程度确定。升学类通常分为短期冲刺、中期系统备考和长期规划；就业类通常分为求职冲刺、职业规划加求职辅导等形式。具体报价根据服务类型、周期和内容确认，不在网站直接展示统一价格。
                </p>
              </div>

              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                  合规与隐私说明
                </h2>
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  网站展示内容会避免使用夸大、绝对化宣传表述。所有学员案例、录取截图、聊天记录、Offer 材料等内容，发布前均需获得授权并进行脱敏处理，隐藏姓名、院校、企业、联系方式等可识别信息。
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-xs bg-black px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-black/90 dark:bg-white/10"
                >
                  返回常见问题
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white duration-300 hover:bg-primary/80"
                >
                  预约免费咨询
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
