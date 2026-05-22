import { withBasePath } from "@/lib/site";
export type Teacher = {
  id: string;
  name: string;
  school: string;
  title: string;
  portraitImage: string;
  cardImage?: string;
  featured?: boolean;
  hasDetail?: boolean;
  detailPath?: string;
  summary?: string;
};

const portraitBase = withBasePath("/images/teacher/portraits");
const cardBase = withBasePath("/images/teacher/card");

export const teachers: Teacher[] = [
  {
    id: "xu-zhaoyi",
    name: "徐照宜",
    school: "中央民族大学 / 清华大学",
    title: "长聘副教授 / 清华大学经济学博士后",
    portraitImage: `${portraitBase}/xu-zhaoyi.png`,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/xu-zhaoyi",
    summary:
      "清华大学经济学博士后，现任清华大学“水木学者”，研究成果发表于《管理世界》《金融研究》等期刊。",
  },
  {
    id: "cheng-cheng",
    name: "成程",
    school: "湖南大学",
    title: "教授 / 博士生导师",
    portraitImage: `${portraitBase}/cheng-cheng.png`,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/cheng-cheng",
    summary:
      "湖南大学金融与统计学院教授、博士生导师，研究方向为供应链金融、企业创新和公司金融。",
  },
  {
    id: "maxim-fedorov",
    name: "Maxim Fedorov",
    school: "俄罗斯科学院",
    title: "物理化学博士",
    portraitImage: `${portraitBase}/maxim-fedorov.png`,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/maxim-fedorov",
    summary:
      "主要研究方向为高性能计算与数据分析，聚焦计算化学物理、物理化学及分子生物物理领域应用。",
  },
  {
    id: "qiu-feng",
    name: "邱枫",
    school: "国科大杭州高等研究院 / 鹏城国家实验室",
    title: "研究员 / 特聘研究员",
    portraitImage: `${portraitBase}/qiu-feng.png`,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/qiu-feng",
    summary:
      "长期深耕光通信、光子计算与集成光子学研究，曾在 Nature Communications 等期刊发表论文。",
  },
  {
    id: "wang-zhifeng",
    name: "王智丰",
    school: "中南林业科技大学",
    title: "副教授",
    portraitImage: `${portraitBase}/wang-zhifeng.png`,
    featured: true,
    hasDetail: false,
    summary:
      "长期深耕现代竹木结构理论及应用、绿色交通材料与桥梁工程创新领域。",
  },
  {
    id: "wang-da",
    name: "王达",
    school: "中南林业科技大学",
    title: "院长 / 博士生导师 / 特聘教授",
    portraitImage: `${portraitBase}/wang-da.png`,
    featured: true,
    hasDetail: false,
    summary:
      "芙蓉计划高校学术拔尖人才特聘教授，长期聚焦桥梁结构性能演化感知与运营可靠性保障。",
  },
  {
    id: "li-qian",
    name: "李倩",
    school: "北京邮电大学",
    title: "助理教授",
    portraitImage: `${portraitBase}/li-qian.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "shi-wenjun",
    name: "石文君",
    school: "中国科学院上海微系统与信息技术研究所",
    title: "副研究员",
    portraitImage: `${portraitBase}/shi-wenjun.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "mukhtar",
    name: "穆赫塔尔",
    school: "穆罕默迪亚大学",
    title: "讲师",
    portraitImage: `${portraitBase}/Mukhtar.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "emmanuel-appiah-kubi",
    name: "Emmanuel C. Appiah-Kubi",
    school: "AAMUSTED",
    title: "副教授",
    portraitImage: `${portraitBase}/Emmanuel C. Appiah-Kubi.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "liu-hong",
    name: "刘洪",
    school: "南京大学",
    title: "教授",
    portraitImage: `${portraitBase}/liu-hong.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "zhu-fei",
    name: "朱飞",
    school: "中央财经大学",
    title: "教授",
    portraitImage: `${portraitBase}/zhu-fei.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "he-yanzhen",
    name: "何燕珍",
    school: "厦门大学",
    title: "教授",
    portraitImage: `${portraitBase}/he-yanzhen.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "xia-defeng",
    name: "夏得峰",
    school: "郑州大学",
    title: "教授",
    portraitImage: `${portraitBase}/xia-defeng.png`,
    featured: false,
    hasDetail: false,
  },
  {
    id: "zhang-jian",
    name: "张剑",
    school: "北京科技大学",
    title: "教授",
    portraitImage: `${portraitBase}/zhang-jian.png`,
    featured: false,
    hasDetail: false,
  },
];

export const teacherCards = [
  {
    id: "chenxin",
    name: "陈鑫",
    image: `${cardBase}/chenxin.png`,
  },
  {
    id: "hanyuhong",
    name: "韩宇宏",
    image: `${cardBase}/hanyuhong.png`,
  },
  {
    id: "ouxiangmei",
    name: "欧阳梅",
    image: `${cardBase}/ouxiangmei.png`,
  },
  {
    id: "zhaoqinghai",
    name: "赵庆海",
    image: `${cardBase}/zhaoqinghai.png`,
  },
];

export const featuredTeachers = teachers.filter((teacher) => teacher.featured);