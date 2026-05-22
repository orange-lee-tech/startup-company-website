"use client";

import { siteNavItems } from "@/data/navigation";
import { withBasePath } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isTransparent = isHome && !sticky;

  const isActivePath = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

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
                src={withBasePath("/images/jiuchen/jiuchen-logo-notext.png")}
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
              <ul className="flex items-center gap-8">
                {siteNavItems.map((item) => {
                  const active = isActivePath(item.path);
                  const hasChildren = Boolean(item.children?.length);

                  return (
                    <li key={item.path} className="group relative">
                      <Link
                        href={item.path}
                        className={`flex items-center gap-1.5 text-base font-medium transition ${
                          isTransparent
                            ? active
                              ? "text-yellow"
                              : "text-white/75 hover:text-white"
                            : active
                              ? "text-primary"
                              : "text-dark hover:text-primary dark:text-white/75 dark:hover:text-white"
                        }`}
                      >
                        <span>{item.title}</span>

                        {hasChildren && (
                          <svg
                            className="h-4 w-4 transition group-hover:rotate-180"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </Link>

                      {hasChildren && (
                        <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[260px] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                          <div className="rounded-xl border border-body-color/10 bg-white p-3 shadow-three dark:border-white/10 dark:bg-gray-dark">
                            {item.children?.map((child) => {
                              const childActive = isActivePath(child.path);

                              return (
                                <Link
                                  key={child.path}
                                  href={child.path}
                                  className={`block rounded-lg px-4 py-3 transition ${
                                    childActive
                                      ? "bg-primary/10 text-primary"
                                      : "hover:bg-primary/5"
                                  }`}
                                >
                                  <span className="block text-base font-semibold text-black dark:text-white">
                                    {child.title}
                                  </span>

                                  {child.description && (
                                    <span className="mt-1 block text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-5 hidden md:block">
              <ThemeToggler transparent={isTransparent} />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="打开全站导航"
              aria-expanded={menuOpen}
              className={`ml-4 flex h-11 w-11 items-center justify-center border transition lg:hidden ${
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
            <div className="absolute right-4 top-full mt-3 w-[min(92vw,460px)] border border-body-color/10 bg-white p-6 shadow-three dark:border-white/10 dark:bg-gray-dark lg:hidden">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">全站导航</p>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
                >
                  关闭
                </button>
              </div>

              <div className="space-y-2">
                {siteNavItems.map((item) => {
                  const active = isActivePath(item.path);
                  const hasChildren = Boolean(item.children?.length);

                  return (
                    <div
                      key={item.path}
                      className="border-b border-body-color/10 pb-3 last:border-b-0 dark:border-white/10"
                    >
                      <Link
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2"
                      >
                        <span
                          className={`mb-1 block text-lg font-bold transition ${
                            active
                              ? "text-primary"
                              : "text-black hover:text-primary dark:text-white"
                          }`}
                        >
                          {item.title}
                        </span>

                        {item.description && (
                          <span className="block text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                            {item.description}
                          </span>
                        )}
                      </Link>

                      {hasChildren && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {item.children?.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              onClick={() => setMenuOpen(false)}
                              className="rounded-lg bg-primary/5 px-3 py-2 text-sm font-medium text-dark transition hover:bg-primary/10 hover:text-primary dark:text-white"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;