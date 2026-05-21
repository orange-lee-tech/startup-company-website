import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 | 九辰本硕博升学就业",
  description:
    "九辰教育常见问题，涵盖服务流程、导师匹配、服务周期、收费方式、退费政策与合规边界。",
};

const faqs = [
  {
    question: "服务流程是什么？",
    answer:
      "一般包括免费咨询评估、定制专属方案、签约启动服务、全程陪跑执行、上岸后跟踪等环节。",
  },
  {
    question: "如何匹配导师？",
    answer:
      "会根据学员目标方向、薄弱环节、学习习惯与沟通风格进行匹配，尽量确保导师经验与学员需求相适配。",
  },
  {
    question: "是一对一还是班课？",
    answer:
      "以一对一专属服务为核心，也可根据实际需求提供少量专题小班或集训内容。",
  },
  {
    question: "服务周期多久？",
    answer:
      "服务周期根据升学或就业方向、当前阶段、目标难度与准备时间确定，可分为短期冲刺、中期系统辅导和长期陪跑。",
  },
  {
    question: "是否承诺录取或 offer？",
    answer:
      "不做对单一院校或公司的保录取、包 offer、百分百上岸等夸大承诺，核心是通过专业规划与全程陪跑提升竞争力。",
  },
];

const FAQPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="常见问题"
        description="整理学员与家长常见问题，帮助你在咨询前快速了解服务流程、导师匹配、服务周期与合规边界。"
      />

      <section className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-[960px] space-y-5">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-body-color/10 bg-white p-7 dark:border-white/10 dark:bg-gray-dark"
              >
                <h2 className="mb-3 text-xl font-bold text-black dark:text-white">
                  {item.question}
                </h2>

                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;