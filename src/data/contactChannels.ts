import { withBasePath } from "@/lib/site";

export type ContactChannel = {
  id: string;
  title: string;
  description: string;
  image: string;
  account?: string;
};

const contactImageBase = withBasePath("/images/contact");
const jiuchenImageBase = withBasePath("/images/jiuchen");

export const contactChannels: ContactChannel[] = [
  {
    id: "tencent-survey",
    title: "腾讯问卷",
    description: "扫码填写咨询信息，便于规划老师了解当前阶段与目标方向。",
    image: `${jiuchenImageBase}/wj.qq.com.png`,
  },
  {
    id: "wechat-official",
    title: "微信公众号",
    description: "关注公众号，了解升学就业规划内容与服务动态。",
    image: `${contactImageBase}/wechat-official.png`,
  },
  {
    id: "wechat-video",
    title: "微信视频号",
    description: "查看视频号内容，获取更多升学就业案例与方法分享。",
    image: `${contactImageBase}/wechat-video.png`,
  },
  {
    id: "douyin",
    title: "抖音",
    description: "关注抖音账号，快速了解九辰教育服务与内容更新。",
    image: `${contactImageBase}/douyin.png`,
    account: "67544071749",
  },
];
