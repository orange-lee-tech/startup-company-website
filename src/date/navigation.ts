export type NavChild = {
  title: string;
  path: string;
  description?: string;
};

export type NavItem = {
  title: string;
  path: string;
  description?: string;
  children?: NavChild[];
};

export const serviceNavItems: NavChild[] = [
  {
    title: "保研",
    path: "/services/baoyan",
    description: "保研定位、背景提升、文书与面试陪跑",
  },
  {
    title: "海外本硕",
    path: "/services/overseas-undergrad-master",
    description: "海外本科、硕士申请与选校规划",
  },
  {
    title: "国内博士",
    path: "/services/domestic-phd",
    description: "国内申博、博导匹配与研究计划辅导",
  },
  {
    title: "海外全奖博士",
    path: "/services/overseas-funded-phd",
    description: "海外 PhD、套磁、奖学金与英文面试",
  },
  {
    title: "本科就业",
    path: "/services/undergrad-career",
    description: "本科生职业定位、简历、面试与求职陪跑",
  },
  {
    title: "高端就业",
    path: "/services/elite-career",
    description: "国企、央企、大厂、金融与高端岗位定制",
  },
];

export const caseNavItems: NavChild[] = [
  {
    title: "保研",
    path: "/cases/baoyan",
    description: "推免入营、拟录取与升学去向案例",
  },
  {
    title: "海外本硕",
    path: "/cases/overseas-undergrad-master",
    description: "海外本科、硕士申请结果案例",
  },
  {
    title: "国内博士",
    path: "/cases/domestic-phd",
    description: "国内博士申请与录取案例",
  },
  {
    title: "海外全奖博士",
    path: "/cases/overseas-funded-phd",
    description: "海外 PhD 与全奖录取案例",
  },
  {
    title: "本科就业",
    path: "/cases/undergrad-career",
    description: "本科就业陪跑与 offer 案例",
  },
  {
    title: "高端就业",
    path: "/cases/elite-career",
    description: "名企、金融、咨询、国央企等高端就业案例",
  },
];

export const siteNavItems: NavItem[] = [
  {
    title: "首页",
    path: "/",
    description: "返回九辰教育首页",
  },
  {
    title: "服务",
    path: "/services",
    description: "查看六大服务方向",
    children: serviceNavItems,
  },
  {
    title: "案例",
    path: "/cases",
    description: "查看学员成功案例",
    children: caseNavItems,
  },
  {
    title: "师资",
    path: "/teachers",
    description: "查看导师与教研团队",
  },
  {
    title: "常见问题",
    path: "/faq",
    description: "了解服务流程、周期、收费与合规边界",
  },
  {
    title: "联系我们",
    path: "/contact",
    description: "预约免费一对一评估",
  },
];