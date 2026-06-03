import { contactChannels } from "@/data/contactChannels";
import { contactInfo } from "@/data/contactInfo";
import Image from "next/image";
import Link from "next/link";

const footerNav = [
  {
    title: "首页",
    path: "/",
  },
  {
    title: "服务",
    path: "/services",
  },
  {
    title: "案例",
    path: "/cases",
  },
  {
    title: "师资",
    path: "/teachers",
  },
  {
    title: "常见问题",
    path: "/faq",
  },
  {
    title: "联系我们",
    path: "/contact",
  },
];

const serviceNav = [
  {
    title: "保研",
    path: "/services/baoyan",
  },
  {
    title: "海外本硕",
    path: "/services/overseas-undergrad-master",
  },
  {
    title: "国内博士",
    path: "/services/domestic-phd",
  },
  {
    title: "海外全奖博士",
    path: "/services/overseas-funded-phd",
  },
  {
    title: "本科就业",
    path: "/services/undergrad-career",
  },
  {
    title: "高端就业",
    path: "/services/elite-career",
  },
];

const Footer = () => {
  const mainChannels = contactChannels.slice(0, 3);

  return (
    <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 border-b border-body-color/10 pb-12 dark:border-white/10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="mb-6 inline-block text-2xl font-bold text-black dark:text-white"
            >
              {contactInfo.brandName}
            </Link>

            <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              专注本硕博升学与就业陪跑服务，以长期陪伴式、量身定制、可量化目标为核心，帮助学员走清晰路径。
            </p>

            <div className="rounded-2xl bg-primary/10 p-5">
              <p className="mb-2 text-sm font-semibold text-primary">
                品牌理念
              </p>

              <p className="text-base font-bold leading-relaxed text-black dark:text-white">
                以智启学，以仁伴行
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
              快速导航
            </h2>

            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-base text-body-color transition hover:text-primary dark:text-body-color-dark"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
              服务方向
            </h2>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {serviceNav.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-base text-body-color transition hover:text-primary dark:text-body-color-dark"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
              联系方式
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
  <p>公司名称：{contactInfo.companyName}</p>
  <p>
    联系电话：
    <a
      href={`tel:${contactInfo.phone}`}
      className="font-semibold text-primary hover:underline"
    >
      {contactInfo.phone}
    </a>
  </p>
  <p>电子邮箱：{contactInfo.email}</p>
  <p>抖音号：{contactInfo.douyinId}</p>
  <p>地址：{contactInfo.address}</p>
</div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
            >
              预约免费评估
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-b border-body-color/10 py-10 dark:border-white/10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
              扫码关注
            </h2>

            <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
              通过公众号、视频号或抖音了解更多升学就业规划内容与服务动态。
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
  {mainChannels.map((channel) => (
    <div
      key={channel.id}
      className="rounded-2xl border border-body-color/10 bg-gray-light p-3 text-center dark:border-white/10 dark:bg-bg-color-dark md:p-4"
    >
      <div className="relative mx-auto mb-3 aspect-square w-[72px] overflow-hidden rounded-xl bg-white dark:bg-gray-dark md:w-[96px]">
        <Image
          src={channel.image}
          alt={channel.title}
          fill
          sizes="(min-width: 768px) 96px, 72px"
          className="object-contain p-1.5"
        />
      </div>

      <h3 className="mb-1 text-sm font-bold leading-tight text-black dark:text-white md:text-base">
        {channel.title}
      </h3>

      {channel.account && (
        <p className="mb-1 text-xs font-semibold text-primary md:text-sm">
          {channel.account}
        </p>
      )}

      <p className="hidden text-sm leading-relaxed text-body-color dark:text-body-color-dark md:block">
        {channel.description}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>

        <div className="py-8">
          <div className="mb-5 rounded-2xl border border-yellow/40 bg-[#FFFBEB] p-5 dark:border-yellow/30 dark:bg-white/5">
            <p className="text-sm font-medium leading-relaxed text-black dark:text-white">
              合规提示：九辰不做对单一院校、导师、公司或岗位的“保录取”“包 offer”“百分百上岸”等绝对化承诺。案例展示均应完成授权与脱敏处理，隐藏姓名、完整院校、企业、联系方式等敏感信息。
            </p>
          </div>

          <div className="text-center text-base text-body-color dark:text-white">
  <p>
    © {new Date().getFullYear()} {contactInfo.companyName}. All rights
    reserved.
  </p>

  <a
    href={contactInfo.icpUrl}
    target="_blank"
    rel="noreferrer"
    className="mt-3 inline-block transition hover:text-primary hover:underline"
  >
    {contactInfo.icpRecord}
  </a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;