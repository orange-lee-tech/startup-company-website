"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

const primaryNav = [
  {
    title: "首页",
    path: "/",
  },
  {
    title: "服务说明",
    path: "/services",
  },
];

const fullNav = [
  {
    title: "关于九辰",
    description: "了解九辰教育的服务理念与机构定位",
    path: "/about",
  },
  {
    title: "服务说明",
    description: "查看六大核心服务赛道与适用人群",
    path: "/services",
  },
  {
    title: "常见问题",
    description: "了解流程、导师匹配、合规边界等问题",
    path: "/blog",
  },
  {
    title: "学员案例",
    description: "案例资料整理中，后续展示授权脱敏成果",
    path: "/#testimonials",
  },
  {
    title: "免费咨询",
    description: "提交当前阶段与目标方向，预约初步评估",
    path: "/contact",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = isHome && !sticky;

  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 80);

    handleStickyNavbar();
    window.addEventListener("scroll", handleStickyNavbar);

    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center transition duration-300 ${
        isTransparent
          ? "absolute bg-transparent"
          : "fixed z-9999 bg-white/90 shadow-sticky backdrop-blur-md dark:bg-gray-dark/90 dark:shadow-sticky-dark"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-auto max-w-full px-4">
            <Link
              href="/"
              aria-label="九辰教育首页"
              className={`header-logo flex items-center gap-3 ${
                sticky ? "py-4 lg:py-3" : "py-6"
              }`}
            >
              <Image
                src="/startup-company-website/images/jiuchen/jiuchen-logo-notext.png"
                alt="九辰教育咨询"
                width={42}
                height={42}
                className="h-9 w-9 object-contain sm:h-10 sm:w-10"
                priority
              />

              <span
                className={`whitespace-nowrap text-lg font-bold leading-none transition ${
                  isTransparent
                    ? "text-white"
                    : "text-black dark:text-white"
                }`}
              >
                九辰教育
              </span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end px-4">
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {primaryNav.map((item) => {
                  const active = pathname === item.path;

                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-base font-medium transition ${
                          isTransparent
                            ? active
                              ? "text-yellow"
                              : "text-white/75 hover:text-white"
                            : active
                              ? "text-primary"
                              : "text-dark hover:text-primary dark:text-white/75 dark:hover:text-white"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-6 hidden items-center md:flex">
              <Link
                href="/contact"
                className={`rounded-md px-7 py-3 text-base font-semibold transition ${
                  isTransparent
                    ? "bg-yellow text-[#07142F] hover:bg-yellow/90"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                联系咨询
              </Link>
            </div>

            <div className="ml-4 hidden md:block">
              <ThemeToggler />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="打开全站导航"
              aria-expanded={menuOpen}
              className={`ml-4 flex h-11 w-11 items-center justify-center border transition ${
                isTransparent
                  ? "border-white/25 text-white hover:bg-white/10"
                  : "border-body-color/20 text-black hover:border-primary hover:text-primary dark:border-white/20 dark:text-white"
              }`}
            >
              <span className="relative block h-5 w-6">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition ${
                    menuOpen ? "top-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition ${
                    menuOpen ? "top-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {menuOpen && (
            <div className="absolute right-4 top-full mt-3 w-[min(92vw,460px)] border border-body-color/10 bg-white p-6 shadow-three dark:border-white/10 dark:bg-gray-dark">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">
                  全站导航
                </p>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
                >
                  关闭
                </button>
              </div>

              <div className="space-y-1">
                {fullNav.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-body-color/10 py-4 last:border-b-0 dark:border-white/10"
                  >
                    <span className="mb-1 block text-lg font-bold text-black transition hover:text-primary dark:text-white">
                      {item.title}
                    </span>
                    <span className="block text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex w-full items-center justify-center bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-primary/90"
              >
                预约免费评估
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;