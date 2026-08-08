export type RoutePage = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  highlights: string[];
};

export const servicePages: RoutePage[] = [
  {
    slug: "baoyan",
    title: "保研",
    heading: "保研辅导：定位、背景提升、材料申请与面试冲刺全流程规划",
    description:
      "面向保研边缘、跨专业、科研竞赛短板或信息闭塞的学生，提供定位评估、背景提升、文书打磨、夏令营与预推免申请、面试冲刺等全流程陪跑。",
    highlights: ["定位评估", "背景提升", "文书打磨", "面试冲刺"],
  },
  {
    slug: "overseas-undergrad-master",
    title: "海外本硕",
    heading: "海外本硕申请：选校定位、背景提升、文书网申与面试全流程规划",
    description:
      "面向计划申请海外本科或硕士项目的学生，提供国家地区选择、院校专业定位、背景提升、文书申请、网申递交、面试辅导与入学准备。",
    highlights: ["选校定位", "背景提升", "文书申请", "入学准备"],
  },
  {
    slug: "domestic-phd",
    title: "国内博士",
    heading: "国内博士申请：院校导师匹配、套磁、研究计划与复试辅导",
    description:
      "面向应届硕士、在职申博、科研薄弱或跨专业申请者，提供申博定位、导师匹配、套磁指导、研究计划书打磨、复试面试辅导。",
    highlights: ["申博定位", "导师匹配", "套磁指导", "研究计划"],
  },
  {
    slug: "overseas-funded-phd",
    title: "海外全奖博士",
    heading: "海外全奖博士申请：导师筛选、套磁、英文文书与全奖面试规划",
    description:
      "面向本科、硕士及在职申请者，围绕海外 PhD 与奖学金机会，提供方向定位、导师筛选、套磁策略、英文文书、全奖面试与签证行前指导。",
    highlights: ["方向定位", "导师筛选", "英文文书", "全奖面试"],
  },
  {
    slug: "undergrad-career",
    title: "本科就业",
    heading: "本科就业辅导：职业定位、简历优化、岗位筛选与面试训练",
    description:
      "面向职业方向不清、简历薄弱、网申低效或面试经验不足的本科生，提供职业定位、简历优化、岗位筛选、网申规划、面试训练与 offer 选择。",
    highlights: ["职业定位", "简历优化", "岗位筛选", "面试训练"],
  },
  {
    slug: "elite-career",
    title: "高端就业",
    heading: "高端就业辅导：国央企、大厂、金融等目标岗位求职陪跑",
    description:
      "面向目标国企、央企、大厂、金融、上市公司等高端就业机会的学生，提供精英简历、岗位信息、模拟面试、机会评估与入职准备。",
    highlights: ["精英简历", "岗位信息", "模拟面试", "机会评估"],
  },
];

export const casePages: RoutePage[] = [
  {
    slug: "baoyan",
    title: "保研辅导",
    heading: "保研案例：不同背景学员的规划过程、申请节点与录取结果",
    description:
      "展示保研方向学员在背景提升、夏令营入营、预推免申请、最终去向等方面的代表性案例。",
    highlights: ["入营院校", "科研竞赛", "最终去向", "背景提升"],
  },
  {
    slug: "study-abroad",
    title: "留学申请",
    heading: "留学申请案例：选校定位、文书申请与录取结果对照",
    description:
      "展示海外本科、硕士申请方向的代表性案例，后续将按地区、院校层次、专业方向进一步整理。",
    highlights: ["海外申请", "选校定位", "文书申请", "录取结果"],
  },
  {
    slug: "phd-application",
    title: "博士申请",
    heading: "博士申请案例：导师匹配、研究计划、套磁与录取结果",
    description:
      "展示国内博士与海外全奖博士申请方向的代表性案例，包括背景评估、导师匹配、研究计划、套磁沟通、面试辅导与录取结果。",
    highlights: ["导师匹配", "研究计划", "科研补强", "博士录取"],
  },
  {
    slug: "career-coaching",
    title: "就业辅导",
    heading: "就业辅导案例：职业定位、简历面试与 offer 结果复盘",
    description:
      "展示本科就业与高端就业方向的代表性案例，覆盖职业定位、简历优化、面试训练、投递策略与 offer 结果。",
    highlights: ["职业定位", "简历优化", "面试训练", "offer 结果"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function getCasePage(slug: string) {
  return casePages.find((page) => page.slug === slug);
}
