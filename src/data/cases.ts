export type CaseCategory =
  | "baoyan"
  | "overseas-undergrad-master"
  | "domestic-phd"
  | "overseas-funded-phd"
  | "undergrad-career"
  | "elite-career";

export type StudentCase = {
  id: string;
  category: CaseCategory;
  title: string;
  studentLabel: string;
  background: string;
  challenge: string;
  service: string;
  result: string;
  tags: string[];
};

export const studentCases: StudentCase[] = [
  {
    id: "baoyan-01",
    category: "baoyan",
    title: "普通 985 工科背景，冲刺强势工科院校",
    studentLabel: "W 同学",
    background: "某 985 高校土木工程专业，成绩前 20%，具备省级大创与结构设计竞赛经历。",
    challenge:
      "学生有一定竞赛基础，但成绩排名并非绝对优势，需要进一步梳理科研竞赛亮点，优化院校梯度与申请节奏。",
    service:
      "围绕保研定位、竞赛经历提炼、材料表达和夏令营申请节奏进行系统规划，协助形成冲刺、稳妥、保底组合。",
    result: "入营多所强势工科院校，最终进入某 C9 高校深圳校区继续深造。",
    tags: ["工科保研", "竞赛经历", "院校梯度"],
  },
  {
    id: "baoyan-02",
    category: "baoyan",
    title: "电子信息背景，科研与建模经历助力保研",
    studentLabel: "P 同学",
    background: "某 211 高校电子信息类专业，成绩前 15%，具备论文在投、校级大创和数学建模经历。",
    challenge:
      "学生综合条件较好，但科研成果仍处于在投阶段，需要在有限时间内梳理已有经历并优化申请表达。",
    service:
      "帮助学生提炼科研、竞赛与项目经历，梳理目标院校申请材料，并针对电子信息方向强化面试表达。",
    result: "入营多所重点院校及科研院所，最终进入中国科学院体系相关研究机构深造。",
    tags: ["电子信息", "科研梳理", "研究所方向"],
  },
  {
    id: "baoyan-03",
    category: "baoyan",
    title: "数学类高排名背景，冲刺顶尖统计与数学方向",
    studentLabel: "W 同学",
    background: "某 985 高校数学类专业，成绩前 10%，具备数学竞赛、数学建模和大模型项目经历。",
    challenge:
      "学生目标院校层次较高，需要将竞赛能力、数理基础与新兴项目经历转化为申请优势。",
    service:
      "围绕数学与统计方向进行院校定位，梳理竞赛及项目材料，并进行面试问答与自我介绍打磨。",
    result: "入营多所重点高校，最终进入某顶尖综合大学数学与统计学院深造。",
    tags: ["数学统计", "竞赛优势", "项目表达"],
  },
  {
    id: "baoyan-04",
    category: "baoyan",
    title: "头部高校高排名背景，冲刺顶尖工科院系",
    studentLabel: "L 同学",
    background: "某 C9 高校土木工程专业，成绩前 1%，具备国家级结构设计竞赛负责人经历。",
    challenge:
      "学生基础优秀，但目标院校竞争激烈，需要突出排名、竞赛负责人经历与专业潜力。",
    service:
      "协助学生进行材料精修、科研竞赛经历表达、面试逻辑梳理，并对目标院校进行精细化投递规划。",
    result: "入营多所顶尖高校，最终进入国内顶尖高校土木工程相关院系。",
    tags: ["高排名", "顶尖院校", "工科升学"],
  },
  {
    id: "baoyan-05",
    category: "baoyan",
    title: "材料方向科研成果突出，聚焦强势工科平台",
    studentLabel: "C 同学",
    background: "某 211 高校材料类专业，专业排名靠前，具备中英文 SCI 论文与多项创新创业经历。",
    challenge:
      "学生成果较丰富，需要在材料方向申请中突出科研连续性与高水平成果价值。",
    service:
      "帮助学生整合论文、项目、竞赛和创新经历，提炼申请亮点并进行目标院校面试准备。",
    result: "成功进入国内顶尖高校材料相关学院继续深造。",
    tags: ["材料方向", "SCI 成果", "科研强化"],
  },

  {
    id: "domestic-phd-01",
    category: "domestic-phd",
    title: "艺术设计与书法背景，提前接触目标博导",
    studentLabel: "某艺术方向硕士",
    background: "本科为艺术设计方向，硕士阶段聚焦书法与艺术教育，语言成绩较好。",
    challenge:
      "学生希望申请顶尖艺术院校博士，同时希望提前接触目标导师并完成论文成果准备。",
    service:
      "协助学生梳理研究方向与申请节奏，陪同进行线下导师沟通，并规划南核期刊发表与博士申请材料。",
    result: "最终获得国内顶尖艺术院校艺术教育方向博士录取机会。",
    tags: ["艺术教育", "导师沟通", "申博规划"],
  },
  {
    id: "domestic-phd-02",
    category: "domestic-phd",
    title: "计算机硕士背景，补齐独立科研成果短板",
    studentLabel: "某计算机方向硕士",
    background: "本科与硕士均为计算机相关专业，硕士期间参与多个人工智能研究项目。",
    challenge:
      "学生项目经历较多，但缺乏能独立证明研究能力的成果，博士申请竞争力不足。",
    service:
      "提供研究指导，协助其完成深度学习方向论文发表，并补充企业实习经历与申请材料准备。",
    result: "最终获得国内顶尖高校计算机科学与技术相关博士录取。",
    tags: ["人工智能", "论文发表", "计算机申博"],
  },
  {
    id: "domestic-phd-03",
    category: "domestic-phd",
    title: "生命科学背景转向生物信息学方向",
    studentLabel: "某生命科学方向硕士",
    background: "本科为生物科学方向，硕士阶段为生命科学相关专业。",
    challenge:
      "学生希望博士阶段转向生物信息学，但此前相关背景不足，需要补齐方向匹配度。",
    service:
      "推荐相关课程与独立项目，协助完成生物信息学方向项目积累，并规划实习与研究论文。",
    result: "最终获得国内重点高校生命科学相关博士录取。",
    tags: ["跨方向申博", "生物信息学", "背景补强"],
  },
  {
    id: "domestic-phd-04",
    category: "domestic-phd",
    title: "地理信息背景，转向遥感技术研究",
    studentLabel: "某地理信息方向硕士",
    background: "本科为地理科学方向，硕士阶段聚焦地理信息科学。",
    challenge:
      "学生希望博士阶段专注遥感技术，但原有研究方向与目标方向存在差异。",
    service:
      "提供遥感方向学术指导，协助发表国际会议论文，并安排相关科研机构实习经历。",
    result: "最终获得国内强势遥感方向学院博士录取机会。",
    tags: ["遥感方向", "国际会议", "方向转型"],
  },
  {
    id: "domestic-phd-05",
    category: "domestic-phd",
    title: "材料科学背景，聚焦新能源材料申博",
    studentLabel: "某材料方向硕士",
    background: "本科为材料化学方向，硕士阶段为材料科学与工程方向。",
    challenge:
      "学生希望围绕新能源材料尤其是锂离子电池方向申请博士，需要增强研究成果与产业项目匹配度。",
    service:
      "协助联系新能源材料相关合作项目，并提供论文写作与发表指导。",
    result: "最终获得国内顶尖科研机构物理与材料相关方向博士录取。",
    tags: ["新能源材料", "科研项目", "论文指导"],
  },

  {
    id: "elite-career-01",
    category: "elite-career",
    title: "海外名校背景，补齐国内金融求职认知",
    studentLabel: "某海外本硕学生",
    background: "海外名校本硕背景，学历优秀，但长期在海外学习，对国内求职形式不熟悉。",
    challenge:
      "学生目标金融方向，但缺乏对国内招聘流程、笔试面试节奏和岗位要求的系统认知。",
    service:
      "安排在职导师进行行业普及，深挖过往经历，精修简历，并安排笔试练习与针对性面试辅导。",
    result: "最终获得头部券商投行方向全职 Offer。",
    tags: ["金融求职", "投行方向", "海外背景"],
  },
  {
    id: "elite-career-02",
    category: "elite-career",
    title: "毕业后求职窗口有限，校招社招同步推进",
    studentLabel: "某海外硕士",
    background: "海外硕士与国内本科背景，加入项目时已经毕业，可参与的校招机会较少。",
    challenge:
      "学生时间窗口有限，需要同步考虑校招与社招，并快速补齐金融知识与面试技能。",
    service:
      "帮助学生修改简历，安排导师短期普及金融专业知识，同时进行面试技能辅导和岗位筛选。",
    result: "最终获得国际银行个人理财顾问方向全职 Offer。",
    tags: ["金融岗位", "社招同步", "面试辅导"],
  },
  {
    id: "elite-career-03",
    category: "elite-career",
    title: "非相关专业背景，转向金融行业研究方向",
    studentLabel: "某海外名校学生",
    background: "海外顶尖院校背景，目标金融方向，但缺少相关专业背景与实习经历。",
    challenge:
      "学生对金融行业理解较浅，缺少相关经历支撑，求职目标与履历之间存在差距。",
    service:
      "补充金融相关实习经历，安排职业规划课程、行业认知课程、专业知识梳理和面试 case 训练。",
    result: "最终获得国际银行行业研究方向全职 Offer。",
    tags: ["跨专业求职", "行业研究", "背景补强"],
  },
  {
    id: "elite-career-04",
    category: "elite-career",
    title: "顶尖高校背景，系统准备咨询行业求职",
    studentLabel: "某顶尖高校学生",
    background: "本科与硕士均为国内顶尖高校背景，目标咨询行业。",
    challenge:
      "学生基础优秀，但咨询求职对简历表达、case 面试和长期 mock 要求较高。",
    service:
      "一周内精修多版简历，匹配合适导师长期 mock，并持续复盘 case 表现和面试表达。",
    result: "最终获得国际咨询公司分析师方向全职 Offer。",
    tags: ["咨询求职", "case mock", "简历精修"],
  },
  {
    id: "elite-career-05",
    category: "elite-career",
    title: "秋招末期加入，远程补充咨询项目经历",
    studentLabel: "某海外硕士",
    background: "海外硕士与国内重点高校本科背景，秋招末期加入项目。",
    challenge:
      "学生此前准备不足，投递数量有限，且短期内无法回国参加线下实习。",
    service:
      "安排笔面试准备，补充咨询远程 PTA，完善简历，并由在职导师进行多轮面试辅导。",
    result: "最终获得知名咨询公司咨询分析师方向全职 Offer。",
    tags: ["秋招冲刺", "远程 PTA", "咨询面试"],
  },
];

export function getCasesByCategory(category: CaseCategory) {
  return studentCases.filter((item) => item.category === category);
}