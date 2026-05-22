import { contactChannels } from "@/data/contactChannels";
import { contactInfo } from "@/data/contactInfo";
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
            你可以通过表单整理咨询信息，也可以直接扫描二维码关注或联系。当前表单作为信息收集入口展示，后续可接入腾讯问卷或其他国内线索系统。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-8 shadow-three dark:bg-gray-dark md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
                填写咨询信息
              </h2>

              <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                留下你的基本情况，便于规划老师初步判断适合的服务方向。正式提交功能接入前，建议优先通过右侧二维码或后续腾讯问卷入口联系。
              </p>

              <form>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      称呼
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="请填写你的称呼"
                      className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      手机号 / 微信号
                    </label>

                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      placeholder="请填写手机号或微信号"
                      className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="stage"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      当前阶段 / 身份
                    </label>

                    <input
                      id="stage"
                      name="stage"
                      type="text"
                      placeholder="例如：本科在读、硕士在读、在职求职"
                      className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      意向服务
                    </label>

                    <select
                      id="service"
                      name="service"
                      className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        请选择意向服务
                      </option>

                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      咨询问题
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="例如：本科大三，想咨询保研定位；硕士在读，想咨询申博；应届生，想咨询就业辅导。"
                      className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      className="rounded-xs bg-primary px-9 py-4 text-base font-semibold text-white shadow-submit transition hover:bg-primary/90"
                    >
                      提交咨询信息
                    </button>

                    <p className="mt-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                      提示：当前页面先展示咨询入口，正式线索接收方式接入前，建议扫描二维码联系九辰教育。后续可将按钮接入腾讯问卷。
                    </p>
                  </div>
                </div>
              </form>
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
        可通过电话、二维码或后续腾讯问卷提交咨询信息，规划老师将根据你的阶段与目标进行初步评估。
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