"use client";

import { contactChannels } from "@/data/contactChannels";
import { contactInfo } from "@/data/contactInfo";
import Image from "next/image";
import { useEffect, useState } from "react";

const questionnaireUrl = "https://wj.qq.com/s2/26980177/9e75/";

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

const consultationPoints = [
  "判断适合的服务类别",
  "梳理当前背景与目标差距",
  "明确下一步规划建议",
];

const Contact = () => {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  useEffect(() => {
    if (!isQuestionnaireOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isQuestionnaireOpen]);

  return (
    <section
      id="contact"
      className="overflow-hidden bg-[#F4F6FA] py-14 dark:bg-bg-color-dark md:py-18 lg:py-24"
    >
      <div className="container">
        <div className="mb-10 max-w-[860px] md:mb-12">
          <p className="mb-4 text-base font-semibold text-primary">
            联系咨询
          </p>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
            预约免费一对一评估
          </h1>

          <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
            你可以先通过小窗填写腾讯问卷整理咨询信息，也可以直接扫描二维码或拨打电话联系。提交后，规划老师将尽快与你沟通。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-[#E4E8F0] bg-white p-6 shadow-three dark:border-white/10 dark:bg-gray-dark md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-[70px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-yellow/20 blur-[80px]" />

              <div className="relative">
                <p className="mb-3 text-sm font-semibold text-primary">
                  腾讯问卷
                </p>

                <h2 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white md:text-3xl">
                  先用 2 分钟说明你的基本情况
                </h2>

                <p className="mb-7 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  为了避免长问卷直接占满页面，我们已将问卷改为弹出小窗。你可以在当前页面填写，也可以选择新页面打开。
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {consultationPoints.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#E7EBF3] bg-[#F7F8FC] p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <p className="mb-2 text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-black dark:text-white">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsQuestionnaireOpen(true)}
                    className="inline-flex items-center justify-center rounded-xs bg-primary px-7 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
                  >
                    打开咨询问卷
                  </button>

                  <a
                    href={questionnaireUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xs border border-primary/20 bg-white px-7 py-4 text-base font-semibold text-primary transition hover:bg-primary/5 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    新页面填写
                  </a>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  问卷仅用于升学与就业咨询服务对接，不对外泄露。
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div className="rounded-3xl border border-[#E4E8F0] bg-white p-6 shadow-three dark:border-white/10 dark:bg-gray-dark md:p-8">
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

              <div className="rounded-3xl bg-[#102452] p-5 text-white shadow-three md:p-8">
                <h2 className="mb-4 text-2xl font-bold">
                  扫码咨询 / 关注
                </h2>

                <p className="mb-5 text-base leading-relaxed text-white/80 md:mb-6">
                  可扫码填写腾讯问卷，也可通过微信公众号、微信视频号、抖音了解九辰教育内容与服务动态。
                </p>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
                  {contactChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="rounded-2xl bg-white p-3 text-center text-black dark:bg-gray-dark dark:text-white lg:p-4 lg:text-left"
                    >
                      <div className="grid grid-cols-1 items-center gap-2 lg:grid-cols-[112px_1fr] lg:gap-4">
                        <div className="relative mx-auto aspect-square w-full max-w-[112px] overflow-hidden rounded-xl bg-[#F4F6FA] dark:bg-bg-color-dark lg:mx-0 lg:max-w-none">
                          <Image
                            src={channel.image}
                            alt={channel.title}
                            fill
                            sizes="(min-width: 1024px) 112px, 112px"
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

              <div className="rounded-3xl border border-[#E4E8F0] bg-white p-6 shadow-three dark:border-white/10 dark:bg-gray-dark md:p-8">
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
                    九辰坚持真实规划与过程陪跑，不对单一院校或公司作结果承诺，核心是通过定制规划与全程陪跑提升竞争力。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isQuestionnaireOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-end bg-[#020817]/70 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="九辰官网咨询问卷"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsQuestionnaireOpen(false)}
            aria-hidden="true"
          />

          <div className="relative mx-auto flex h-[86vh] w-full max-w-[900px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-three dark:bg-gray-dark sm:h-[82vh] sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-body-color/10 px-5 py-4 dark:border-white/10 sm:px-6">
              <div>
                <p className="text-xs font-semibold text-primary">
                  免费咨询
                </p>
                <h2 className="text-lg font-bold text-black dark:text-white sm:text-xl">
                  填写九辰官网咨询问卷
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsQuestionnaireOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F6FA] text-2xl leading-none text-black transition hover:bg-[#E8EDF6] dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                aria-label="关闭问卷"
              >
                ×
              </button>
            </div>

            <iframe
              id="idy_frame"
              title="九辰官网咨询问卷"
              src={questionnaireUrl}
              width="100%"
              height="100%"
              className="min-h-0 flex-1 bg-white"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
