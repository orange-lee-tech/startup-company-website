import { contactChannels } from "@/data/contactChannels";
import Image from "next/image";

const serviceOptions = [
  "保研辅导",
  "留学申请",
  "博士申请",
  "就业辅导",
  "其他 / 暂不确定",
];

const processSteps = [
  {
    title: "提交咨询信息",
    description: "填写称呼、联系方式、当前阶段与意向服务。",
  },
  {
    title: "免费一对一评估",
    description: "规划老师了解背景、目标和当前困难，初步判断可提升空间。",
  },
  {
    title: "定制方案沟通",
    description: "根据升学或就业目标，明确服务内容、周期与执行节奏。",
  },
  {
    title: "签约启动陪跑",
    description: "确认方案后签署服务协议，组建专属服务团队，全程推进与复盘。",
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="overflow-hidden bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <div className="mb-12 max-w-[860px]">
          <p className="mb-4 text-base font-semibold text-primary">
            联系咨询
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
            预约免费一对一评估
          </h1>

          <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
            你可以通过表单整理咨询信息，也可以直接扫描二维码关注或联系。当前表单作为信息收集入口展示，正式提交接收方式后续再接入。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
  {mainChannels.map((channel) => (
    <div
      key={channel.id}
      className="rounded-2xl border border-body-color/10 bg-gray-light p-2 text-center dark:border-white/10 dark:bg-bg-color-dark sm:p-4"
    >
      <div className="relative mx-auto mb-3 aspect-square w-full max-w-[96px] overflow-hidden rounded-xl bg-white dark:bg-gray-dark sm:max-w-[132px] lg:max-w-[160px]">
        <Image
          src={channel.image}
          alt={channel.title}
          fill
          sizes="(min-width: 1024px) 160px, (min-width: 640px) 132px, 96px"
          className="object-contain p-1.5 sm:p-2"
        />
      </div>

      <h3 className="mb-1 text-sm font-bold leading-tight text-black dark:text-white sm:text-base">
        {channel.title}
      </h3>

      {channel.account && (
        <p className="mb-1 text-xs font-semibold text-primary sm:text-sm">
          {channel.account}
        </p>
      )}

      <p className="hidden text-sm leading-relaxed text-body-color dark:text-body-color-dark sm:block">
        {channel.description}
      </p>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Contact;