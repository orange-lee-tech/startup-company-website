import Link from "next/link";

const faqs = [
  {
    question: "服务流程是什么？",
    answer:
      "从免费咨询评估开始，根据学员背景和目标制定专属方案，确认后签约启动服务。",
  },
  {
    question: "如何匹配导师？",
    answer:
      "根据目标方向、薄弱环节、学习习惯与沟通风格，匹配适合的规划与辅导导师。",
  },
  {
    question: "是否承诺录取或 offer？",
    answer:
      "不承诺“保录取”“包 offer”等绝对化结果，九辰通过规划、陪跑和复盘提升竞争力。",
  },
];

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light py-14 dark:bg-bg-color-dark md:py-16 lg:py-20"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="mb-4 text-base font-semibold text-primary">
              常见问题
            </p>

            <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              咨询前，你可以先了解这些问题
            </h2>

            <p className="mb-7 text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              服务流程、导师匹配、合规边界与隐私保护，是九辰咨询前最常被问到的内容。
            </p>

            <Link
              href="/services"
              className="inline-flex items-center text-base font-semibold text-primary hover:underline"
            >
              查看完整服务说明
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-body-color/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-dark"
                >
                  <div className="mb-3 flex items-start gap-4">
                    <span className="mt-1 text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {faq.question}
                    </h3>
                  </div>

                  <p className="pl-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-primary/10 p-6">
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                更多关于服务周期、费用确认、隐私保护和案例展示的问题，将在服务说明页持续补充。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;