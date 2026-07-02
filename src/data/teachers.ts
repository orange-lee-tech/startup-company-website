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

const defaultPortrait = `${portraitBase}/female.png`;

export const teachers: Teacher[] = [
  {
    id: "xu-zhaoyi",
    name: "徐老师",
    school: "经济与金融方向｜高校科研背景",
    title: "升学与学术规划导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/xu-zhaoyi",
    summary: "经济学与管理方向背景导师，侧重升学与科研路径规划。",
  },
  {
    id: "cheng-cheng",
    name: "成老师",
    school: "金融与统计方向｜高校科研背景",
    title: "升学与学术规划导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/cheng-cheng",
    summary: "金融与公司金融方向研究背景导师，侧重学术与升学规划。",
  },
  {
    id: "maxim-fedorov",
    name: "海外导师A",
    school: "理工科研方向｜国际学术背景",
    title: "科研与博士申请导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/maxim-fedorov",
    summary: "高性能计算与数据分析方向科研导师。",
  },
  {
    id: "qiu-feng",
    name: "邱老师",
    school: "光通信与光子计算方向",
    title: "科研与升学规划导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/qiu-feng",
    summary: "集成光子与通信方向科研导师。",
  },
  {
    id: "wang-zhifeng",
    name: "王老师",
    school: "土木与绿色工程方向",
    title: "工程与科研导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/wang-zhifeng",
    summary: "绿色交通与结构工程方向导师。",
  },
  {
    id: "wang-da",
    name: "王老师B",
    school: "交通与结构工程方向",
    title: "博士生导师",
    portraitImage: defaultPortrait,
    featured: true,
    hasDetail: true,
    detailPath: "/teachers/wang-da",
    summary: "桥梁结构与交通工程方向导师。",
  },
  {
    id: "li-qian",
    name: "李老师",
    school: "电子与信息方向",
    title: "助理教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "shi-wenjun",
    name: "石老师",
    school: "信息与微系统方向",
    title: "副研究员",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "mukhtar",
    name: "海外导师B",
    school: "国际理工方向",
    title: "讲师",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "emmanuel-appiah-kubi",
    name: "海外导师C",
    school: "国际教育方向",
    title: "副教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "liu-hong",
    name: "刘老师",
    school: "统计与经济方向",
    title: "教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "zhu-fei",
    name: "朱老师",
    school: "金融与经济方向",
    title: "教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "he-yanzhen",
    name: "何老师",
    school: "法学与经管方向",
    title: "教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "xia-defeng",
    name: "夏老师",
    school: "交通工程方向",
    title: "教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  },
  {
    id: "zhang-jian",
    name: "张老师",
    school: "工程与管理方向",
    title: "教授",
    portraitImage: defaultPortrait,
    hasDetail: false,
  }
];

export const featuredTeachers = teachers.filter((t) => t.featured);
