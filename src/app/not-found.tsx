import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面未找到 | 九辰教育",
  description: "你访问的页面不存在或已调整，请返回九辰教育首页继续浏览。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#F4F6FA] px-4 py-24 dark:bg-bg-color-dark">
      <div className="mx-auto w-full max-w-[720px] rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-three dark:border-white/10 dark:bg-gray-dark md:p-12">
        <p className="mb-3 text-sm font-semibold text-primary">404 · 页面未找到</p>
        <h1 className="mb-5 text-3xl font-bold text-black dark:text-white">
          你访问的页面不存在或已调整
        </h1>
        <p className="mx-auto mb-8 max-w-[560px] text-base leading-relaxed text-body-color dark:text-body-color-dark">
          请检查网址是否正确，或返回九辰教育首页继续浏览服务、案例、师资与咨询信息。
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xs bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary/90"
          >
            返回首页
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xs border border-primary/20 bg-white px-7 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5 dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            联系九辰
          </a>
        </div>
      </div>
    </main>
  );
}
