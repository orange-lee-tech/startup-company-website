import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-5/12">
            <div className="mb-12 max-w-[420px] lg:mb-16">
              <Link
                href="/"
                className="mb-6 inline-block text-2xl font-bold text-black dark:text-white"
              >
                长沙九辰教育咨询有限公司
              </Link>

              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                专注教育咨询服务展示，致力于以清晰、专业、可信的方式呈现企业形象、服务内容与联系渠道。
              </p>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-8 text-xl font-bold text-black dark:text-white">
                快速导航
              </h2>

              <ul>
                <li>
                  <Link
                    href="/"
                    className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark"
                  >
                    首页
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark"
                  >
                    关于九辰
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark"
                  >
                    资讯动态
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark"
                  >
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-8 text-xl font-bold text-black dark:text-white">
                联系方式
              </h2>

              <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                公司名称：长沙九辰教育咨询有限公司
              </p>
              <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                联系电话：待补充
              </p>
              <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                电子邮箱：待补充
              </p>
              <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
                公司地址：待补充
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]" />

        <div className="py-8">
          <p className="text-center text-base text-body-color dark:text-white">
            © {new Date().getFullYear()} 长沙九辰教育咨询有限公司. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
