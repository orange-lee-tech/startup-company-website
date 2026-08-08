"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[jiuchen:global-error]", error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f4f6fa",
          color: "#121723",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              background: "#ffffff",
              border: "1px solid rgba(0, 47, 167, 0.12)",
              borderRadius: "24px",
              padding: "40px 28px",
              boxSizing: "border-box",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(6, 8, 15, 0.08)",
            }}
          >
            <div
              style={{
                color: "#002FA7",
                fontWeight: 700,
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              九辰教育
            </div>
            <h1 style={{ margin: "0 0 16px", fontSize: "30px", lineHeight: 1.3 }}>
              页面遇到临时异常
            </h1>
            <p
              style={{
                margin: "0 auto 28px",
                maxWidth: "520px",
                color: "#667085",
                fontSize: "16px",
                lineHeight: 1.8,
              }}
            >
              当前页面未能正常完成加载。你可以重新尝试，或直接返回首页继续浏览。
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => reset()}
                style={{
                  border: 0,
                  borderRadius: "8px",
                  background: "#002FA7",
                  color: "#ffffff",
                  padding: "13px 24px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                重新尝试
              </button>
              <a
                href="/"
                style={{
                  border: "1px solid rgba(0, 47, 167, 0.25)",
                  borderRadius: "8px",
                  color: "#002FA7",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                返回首页
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
