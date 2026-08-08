"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[jiuchen:error-boundary]", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center bg-[#F4F6FA] px-4 py-24 dark:bg-bg-color-dark">
      <div className="mx-auto w-full max-w-[720px] rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-three dark:border-white/10 dark:bg-gray-dark md:p-12">
        <p className="mb-3 text-sm font-semibold text-primary">页面暂时无法正常显示</p>
        <h1 className="mb-5 text-3xl font-bold text-black dark:text-white">
          当前页面遇到临时异常
        </h1>
        <p className="mx-auto mb-8 max-w-[560px] text-base leading-relaxed text-body-color dark:text-body-color-dark">
          你可以尝试重新加载当前内容，或返回九辰教育首页继续浏览。若问题持续出现，我们会继续排查并修复。
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-xs bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary/90"
          >
            重新尝试
          </button>
          {/* Error recovery intentionally uses a full document navigation. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xs border border-primary/20 bg-white px-7 py-3.5 text-base font-semibold text-primary transition hover:bg-primary/5 dark:border-white/15 dark:bg-white/5 dark:text-white"
          >
            返回首页
          </a>
        </div>
      </div>
    </main>
  );
}
