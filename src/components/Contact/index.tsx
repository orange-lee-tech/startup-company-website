import { contactChannels } from "@/data/contactChannels";
import { contactInfo } from "@/data/contactInfo";
import Image from "next/image";

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
            你可以通过下方腾讯问卷整理咨询信息，也可以直接扫描二维码或拨打电话联系。提交后，规划老师将尽快与你沟通。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-8 shadow-three dark:bg-gray-dark md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
                填写咨询信息
              </h2>

              <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                请在下方填写基本情况。问卷提交后，规划老师将根据你的阶段与目标进行初步评估。
              </p>

                <div className="overflow-hidden rounded-xl border border-body-color/10 bg-white dark:border-white/10 dark:bg-gray-dark">
                  <iframe
                    id="idy_frame"
                    title="九辰官网咨询问卷"
                    src="https://wj.qq.com/s2/26980177/9e75/"
                    width="100%"
                    height="100%"
                    className="min-h-[720px] w-full bg-white md:min-h-[760px]"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  若问卷未正常显示，可
                  <a
                    href="https://wj.qq.com/s2/26980177/9e75/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    点击此处在新页面打开腾讯问卷
                  </a>
                  。
                </p>
            </div>
          </div>

          <div className="lg:col-span-5">
  <div className="space-y-6">
    <div className="rounded-2xl bg-white p-6 shadow-three dark:bg-gray-dark md:p-8">
      <p className="mb-2 text-sm font-semibold text-primary">
        电话咨询
      </p>

      <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
        {contactInfo.phone}
      </h2>

      <p className="mb-5 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
        可通过电话、二维码或腾讯问卷提交咨询信息，规划老师将根据你的阶段与目标进行初步评估。
      </p>

      <a
        href={`tel:${contactInfo.phone}`}
        className="inline-flex items-center justify-center rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
      >
        拨打电话
      </a>
    </div>

    <div className="rounded-2xl bg-primary p-5 text-white shadow-three md:p-8">
                <h2 className="mb-4 text-2xl font-bold">
                  扫码关注 / 咨询
                </h2>

                <p className="mb-5 text-base leading-relaxed text-white/80 md:mb-6">
                  可通过微信公众号、微信视频号、抖音了解九辰教育内容与服务动态。
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-4">
                  {contactChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="rounded-2xl bg-white p-2 text-center text-black dark:bg-gray-dark dark:text-white sm:p-3 lg:p-4 lg:text-left"
                    >
                      <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[112px_1fr] lg:gap-4">
                        <div className="relative mx-auto aspect-square w-full max-w-[96px] overflow-hidden rounded-xl bg-gray-light dark:bg-bg-color-dark sm:max-w-[112px] lg:mx-0 lg:max-w-none">
                          <Image
                            src={channel.image}
                            alt={channel.title}
                            fill
                            sizes="(min-width: 1024px) 112px, (min-width: 640px) 112px, 96px"
                            className="object-contain p-1.5 lg:p-2"
                          />
                        </div>

                        <div>
                          <h3 className="mt-2 text-sm font-bold leading-tight lg:mt-0 lg:mb-2 lg:text-lg">
                            {channel.title}
                          </h3>

                          {channel.account && (
                            <p className="mt-1 text-xs font-semibold text-primary lg:text-sm">
                              {channel.account}
                            </p>
                          )}

                          <p className="mt-2 hidden text-sm leading-relaxed text-body-color dark:text-body-color-dark lg:block">
                            {channel.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-three dark:bg-gray-dark md:p-8">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                  咨询到服务启动流程
                </h2>

                <div className="space-y-5">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="mb-1 text-base font-bold text-black dark:text-white">
                          {step.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 border-l-4 border-yellow bg-[#FFFBEB] p-5 dark:bg-white/5">
                  <p className="text-sm font-semibold leading-relaxed text-black dark:text-white">
                    九辰不做对单一院校或公司的“保录取”“包 offer”“百分百上岸”等绝对化承诺，核心是通过定制规划与全程陪跑提升竞争力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;