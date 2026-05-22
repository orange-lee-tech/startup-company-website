import { teachers, type Teacher } from "@/data/teachers";

export type TeacherDetail = {
  overview: string;
  focusAreas: string[];
  publicHighlights: string[];
  serviceValue: string;
};

export const teacherDetails: Record<string, TeacherDetail> = {
  "xu-zhaoyi": {
    overview:
      "徐照宜老师为清华大学经济学博士后，现任清华大学“水木学者”，长期关注经济学、管理学与金融相关研究方向。",
    focusAreas: ["经济学研究", "管理学研究", "金融研究", "学术规划指导"],
    publicHighlights: [
      "清华大学经济学博士后",
      "现任清华大学“水木学者”",
      "研究成果发表于《管理世界》《金融研究》等期刊",
    ],
    serviceValue:
      "可为学生在经济、管理、金融等相关方向的学术规划、科研认知与升学路径判断提供参考。",
  },
  "cheng-cheng": {
    overview:
      "成程老师为湖南大学金融与统计学院教授、博士生导师，研究方向包括供应链金融、企业创新和公司金融。",
    focusAreas: ["供应链金融", "企业创新", "公司金融", "金融统计方向规划"],
    publicHighlights: [
      "湖南大学金融与统计学院教授",
      "博士生导师",
      "长期从事供应链金融、企业创新和公司金融相关研究",
    ],
    serviceValue:
      "可为金融、统计、管理及相关交叉方向学生提供学术方向认知、科研路径与深造规划参考。",
  },
  "maxim-fedorov": {
    overview:
      "Maxim Fedorov 老师为物理化学博士，主要研究方向为高性能计算与数据分析，聚焦计算化学物理、物理化学及分子生物物理领域应用。",
    focusAreas: [
      "高性能计算",
      "数据分析",
      "计算化学物理",
      "分子生物物理",
    ],
    publicHighlights: [
      "物理化学博士",
      "长期聚焦高性能计算与数据分析",
      "研究方向覆盖计算化学物理、物理化学及分子生物物理应用",
    ],
    serviceValue:
      "可为理工科、交叉学科及海外科研方向学生提供研究方向认知和学术路径判断参考。",
  },
  "qiu-feng": {
    overview:
      "邱枫老师长期深耕光通信、光子计算与集成光子学研究，曾在 Nature Communications 等期刊发表论文。",
    focusAreas: ["光通信", "光子计算", "集成光子学", "科研方向规划"],
    publicHighlights: [
      "研究员 / 特聘研究员",
      "长期深耕光通信、光子计算与集成光子学研究",
      "曾在 Nature Communications 等期刊发表论文",
    ],
    serviceValue:
      "可为电子信息、光学工程、通信、集成光子等相关方向学生提供科研方向认知与升学路径参考。",
  },
    "wang-zhifeng": {
    overview:
      "王智丰老师为中南林业科技大学土木工程学院副教授，长期深耕现代竹木结构理论及应用、绿色交通材料与桥梁工程创新领域，聚焦竹材高值化利用与工程结构低碳化升级研究。",
    focusAreas: [
      "现代竹木结构",
      "绿色交通材料",
      "桥梁工程创新",
      "竹材高值化利用",
      "工程结构低碳化升级",
    ],
    publicHighlights: [
      "中南林业科技大学土木工程学院副教授",
      "长期深耕现代竹木结构理论及应用、绿色交通材料与桥梁工程创新领域",
      "牵头研发竹 - 钢装配式伸缩缝，突破传统技术瓶颈",
      "相关成果已应用于中小跨径桥梁建设、市政快速维保及应急抢险等场景",
      "先后参与多项省部级科研项目，曾获湖南省科技进步奖",
    ],
    serviceValue:
      "可为土木工程、桥梁工程、交通基础设施、绿色材料与低碳工程方向学生提供科研方向认知、工程应用视野与升学规划参考。",
  },
  "wang-da": {
    overview:
      "王达老师为芙蓉计划高校学术拔尖人才特聘教授，现任中南林业科技大学土木工程学院院长、博士生导师，长期聚焦桥梁结构性能演化感知、运营可靠性保障及绿色交通材料应用等研究方向。",
    focusAreas: [
      "桥梁结构性能演化感知",
      "运营可靠性保障",
      "绿色交通材料",
      "缆索承重桥梁技术",
      "交通基建高质量发展",
    ],
    publicHighlights: [
      "芙蓉计划高校学术拔尖人才特聘教授",
      "中南林业科技大学土木工程学院院长、博士生导师",
      "担任湖南省第六届学科评议组专家、湖南省公路学会副理事长等职务",
      "主持国家自然科学基金、重大工程技术攻关课题等 60 余项",
      "发表高水平论文 110 余篇，授权发明专利 12 件及软件著作权 2 项",
      "获省部级科技进步奖 3 项，牵头项目曾获湖南省科学技术进步二等奖",
    ],
    serviceValue:
      "可为土木工程、桥梁工程、交通工程、绿色交通材料及相关工程博士申请方向学生提供学术方向认知、科研路径判断与深造规划参考。",
  },
};

export const detailedTeachers = teachers.filter(
  (teacher) => teacher.hasDetail && teacher.detailPath && teacherDetails[teacher.id],
);

export function getDetailedTeacherById(id: string):
  | {
      teacher: Teacher;
      detail: TeacherDetail;
    }
  | undefined {
  const teacher = teachers.find((item) => item.id === id);

  if (!teacher || !teacher.hasDetail || !teacher.detailPath) {
    return undefined;
  }

  const detail = teacherDetails[id];

  if (!detail) {
    return undefined;
  }

  return {
    teacher,
    detail,
  };
}