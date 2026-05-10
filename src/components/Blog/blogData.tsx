import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "服务流程是什么？",
    paragraph:
      "从免费咨询评估开始，我们会根据学员背景和目标制定专属方案；确认方案后签约启动服务，并由专属团队全程陪跑执行，成功拿到录取或 offer 后继续提供入学、入职适应指导。",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "九辰教育",
      image: "/images/blog/author-03.png",
      designation: "服务说明",
    },
    tags: ["流程"],
    publishDate: "FAQ",
  },
  {
    id: 2,
    title: "如何匹配导师？",
    paragraph:
      "我们会根据学员目标方向、薄弱环节、学习习惯与沟通风格匹配导师。匹配维度包括背景匹配、风格匹配和需求匹配，确保导师能够精准解决升学或就业中的关键问题。",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "九辰教育",
      image: "/images/blog/author-02.png",
      designation: "导师匹配",
    },
    tags: ["导师"],
    publishDate: "FAQ",
  },
  {
    id: 3,
    title: "是否承诺录取或 offer？",
    paragraph:
      "我们不做对单一院校或公司的“保录取”“包 offer”“百分百上岸”等夸大承诺。九辰的核心是通过定制化规划、全程陪跑和专业辅导，系统提升学员竞争力。",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "九辰教育",
      image: "/images/blog/author-03.png",
      designation: "合规说明",
    },
    tags: ["合规"],
    publishDate: "FAQ",
  },
];

export default blogData;
