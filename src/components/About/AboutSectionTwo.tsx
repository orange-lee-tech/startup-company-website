import Image from "next/image";
import Link from "next/link";

const methods = [
  {
    id: "01",
    title: "长期陪伴式",
    description:
      "从咨询评估到申请、面试、求职、入学入职适应，持续跟进关键节点。",
  },
  {
    id: "02",
    title: "量身定制",
    description:
      "不套模板，围绕学员背景、目标方向、时间周期和薄弱环节制定路径。",
  },
  {
    id: "03",
    title: "可量化目标",
    description:
      "把模糊焦虑拆成阶段任务，用节点、材料、反馈和复盘推进结果。",
  },
];

const AboutSectionTwo = () => {
  return (
    <section className="relative overflow-hidden bg-[#07142F] py-16 dark:bg-[#07142F] md:py-20 lg:py-24">
      <div className="absolute right-0 top-0 z-0 h-[360px] w-[360px] rounded-full bg-primary/30 blur-[130px]" />
      <div className="absolute bottom-0 left-0 z-0 h-[260px] w-[260px] rounded-full bg-yellow/20 blur-[110px]" />

      <div className="container relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[760px]">
            <p className="mb-4 text-base font-semibold text-yellow">
              九辰方法论
            </p>

            <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-4xl">
              九辰如何陪你走对每一步
            </h2>

            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              我们把升学与就业中的不确定性，拆解为可规划、可执行、可复盘的阶段任务。
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex text-base font-semibold text-yellow hover:underline"
          >
            了解九辰理念
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.id}
              className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm transition duration-300 hover:bg-white/[0.14]"
            >
              <p className="mb-5 text-sm font-semibold text-yellow">
                {method.id}
              </p>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {method.title}
              </h3>

              <p className="text-base leading-relaxed text-white/70">
                {method.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-white/10 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h3 className="mb-3 text-2xl font-bold text-white">
              让努力不再白费，让选择不再后悔
            </h3>
            <p className="text-base leading-relaxed text-white/70">
              九辰不以堆砌信息制造焦虑，而是帮助学员看清方向、拆解路径、推进关键动作。
            </p>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl bg-white/10">
            <Image
              src="/startup-company-website/images/jiuchen/jiuchen-growth-path.png"
              alt="九辰教育成长路径规划"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;