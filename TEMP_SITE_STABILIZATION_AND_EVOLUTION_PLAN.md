# 临时工作总控：官网稳定化、清理、SEO 与动态化预留

> 本文件是本轮专项工作的临时总控清单，用于 AI / 开发者持续校对进度。
>
> **删除条件：只有四个阶段全部完成、线上验证通过、正式文档同步后，才删除本文件。**
>
> 当前生产形态仍是 Next.js 静态导出，但必须保留未来向 CMS、API、数据库、SSR/ISR、资讯系统、账号与业务系统演进的能力。任何当前稳定性措施都不得被误写为永久架构限制。

## 总目标

1. 清除手机端 Client Exception、403、Nginx、缓存和发布中断等 P0 风险。
2. 清理历史 Startup/SaaS 模板页面、垃圾文案、无引用组件与资产。
3. 重构 SEO 基础：自动 sitemap、canonical、OG、JSON-LD、精准 H1、企业信任内链与移动性能。
4. 保留动态化演进空间：App Router / Server Components / 动态路由继续保留，以内容仓储接口隔离本地数据与未来 CMS/API/DB。

---

# 阶段一：P0 稳定性清零

## 目标

让官网在桌面 Chrome/Edge、Android Chrome/Edge、微信 WebView 等主要环境中稳定加载；单个客户端异常不能再导致整站白屏；生产发布必须可重复、可验证、可回滚。

## 工作项

- [ ] 彻查并消除手机端 `Application error: a client-side exception has occurred`。
  - 已切换 Webpack 生产构建。
  - 已移除首页 `ScrollUp` 自动执行逻辑。
  - 已从 RootLayout 隔离旧 `next-themes` Provider。
  - 手机无痕 + fresh URL 已实测页面和按钮正常，无白屏、无 403。
  - 普通旧会话此前异常，证据强烈指向旧缓存 / 混合构建 / 发布中断遗留状态。
  - 待缓存策略正式上线并完成普通会话最终复测后关闭此项。
- [x] 删除/硬化首页无必要的自动滚动客户端逻辑 `ScrollUp`。
- [x] 隔离旧 `next-themes` 顶层运行时依赖；主题能力保留为轻量本地实现。
- [x] `npm run build` 默认使用 Webpack，同时保留 `npm run build:turbopack` 供未来复测。
- [x] 新增 `app/error.tsx`、`app/global-error.tsx`。
- [x] 新增正式 `app/not-found.tsx`。
- [x] Header / ScrollToTop 对滚动 API 做兼容保护。
- [x] 修复移动端展开导航无法上下滚动的问题；待最终实机确认最底部导航入口可达。
- [x] 修复生产目录权限：父目录可穿越、目录 755、文件 644、nginx 用户可读。
- [x] 修复重复 `location /`，恢复 `nginx -t` successful。
- [x] 修复静态路由规则，避免 `/services` 等 301 到 `http://域名:8088/...`。
- [ ] 正式上线 HTML 与 `/_next/static/` 分层缓存策略。
  - 仓库已新增 `docs/deployment/jiuchen-static-production.conf.example`。
  - HTML / 页面：每次重新验证。
  - `/_next/static/`：构建哈希资源长期缓存。
  - public 图片字体：中短期缓存。
  - robots / sitemap / llms：短缓存。
  - 待同步到真实服务器 Nginx 后验证响应头。
- [x] 新增并执行公网 Smoke Test：`scripts/smoke-production.sh`。
- [ ] 完成真实手机最终回归：普通会话、无痕会话、导航滚动、服务/案例/师资/联系等路径。
- [ ] 将“直接删除并重建线上 out/”迁移为版本目录 + 原子切换。
  - 仓库已新增 `scripts/deploy-production-atomic.sh`。
  - 脚本采用独立 Git worktree 构建、权限检查、版本目录、原子 symlink 切换、本机哈希验证、公网 Smoke Test 和失败回滚。
  - 待一次性把 Nginx root 从仓库 `out/` 迁移到 `/www/wwwroot/jiuchen-current` 后启用。

## 2026-08-08 已确认的线上结果

- [x] Webpack 构建成功并上线。
- [x] `nginx -t` successful。
- [x] 首页、About、服务总览/详情、案例总览/详情、师资总览/详情、FAQ、Contact 公网均 200。
- [x] 缺失测试页返回 404。
- [x] 首页实际引用的 Webpack JS/CSS 公网全部 200。
- [x] nginx 用户可读取全部 `out/_next/static` JS/CSS。
- [x] 手机无痕访问 fresh URL 页面与按钮全部正常，无 Client Exception、无 403。
- [x] 一次新构建后因尚未执行 chmod，首页再次出现 403；完成权限修复、reload、Smoke Test 后恢复正常。此事件进一步确认“直接在 live out/ 构建”属于发布架构风险，而不是页面业务代码故障。

## 本阶段完成标准

- 主要桌面和手机浏览器不再出现整页 Client Exception。
- 普通会话与无痕会话均稳定。
- 移动导航可完整滚动并点击所有入口。
- `npm run build`、`nginx -t`、公网 Smoke Test 全部成功。
- 核心页面直接 200，不泄露 8088。
- HTML / 静态资源缓存策略明确并在线验证。
- 发布不再直接破坏当前在线 `out/`；SSH 中断或构建失败时旧版本继续服务。

---

# 阶段二：历史模板与垃圾信息清仓

## 目标

彻底清除原 Startup/SaaS 模板残留，避免用户误入、搜索引擎污染、无用 bundle/资产堆积，同时不占用未来真正动态模块的设计空间。

## 工作项

- [ ] 删除 `/signin`。
- [ ] 删除 `/signup`。
- [ ] 删除 `/blog-sidebar` 英文模板页。
- [ ] 删除 `/blog-details` 历史模板详情页。
- [ ] 删除当前仅 redirect 的假 `/blog`；未来资讯系统重新正式建设。
- [ ] 删除公开 `/error` 模板页，由 Next 正规 error boundary / not-found 接管。
- [ ] 全仓扫描 `Startup`、`SaaS`、模板英文文案、假作者、假日期、假社交入口等残留。
- [ ] 删除确认无引用的 Blog/Login/Newsletter/模板组件。
- [ ] 删除确认无引用的模板图片和静态资产；删除前全文搜索引用。
- [ ] 删除不再使用的旧依赖（包括确认无引用后的 `next-themes`）。
- [ ] 构建并验证被删除页面真实返回 404。

## 本阶段完成标准

- 公开站点不存在与九辰业务无关的模板页面。
- 搜索引擎不会继续发现有效垃圾模板 URL。
- 仓库内无明显无引用模板组件、依赖与静态资源。
- 不影响未来正式建设资讯、会员或账号体系。

---

# 阶段三：SEO 与搜索可理解性重构

## 目标

让搜索引擎、社交平台和 AI 搜索准确理解“长沙九辰教育咨询有限公司 / 九辰教育”的企业实体、六大服务、案例与师资，并改善移动性能。

## 工作项

- [ ] 用 Next 数据源自动生成 sitemap，替代手工 XML。
- [ ] sitemap 自动覆盖固定页面、服务、案例、师资，并可自然扩展未来文章。
- [ ] 校对 robots、canonical 与唯一主域策略。
- [ ] 完善 title 模板、description、Open Graph、分享图。
- [ ] 增加 Organization / WebSite JSON-LD。
- [ ] 服务页增加 Service JSON-LD。
- [ ] 师资页增加 Person JSON-LD。
- [ ] 层级页面增加 BreadcrumbList JSON-LD。
- [ ] 优化服务详情 H1，使其与具体 slug 搜索意图一致。
- [ ] 优化案例分类 H1 与正文主题差异化。
- [ ] 为 `/about` 增加合理站内入口，强化企业主体与信任信息。
- [ ] 检查 heading 层级、图片 alt、内部链接、404/noindex 策略。
- [ ] 统一图片尺寸与压缩策略，降低移动 LCP 与流量。
- [ ] 检查并优化 Core Web Vitals / 移动性能。

## 本阶段完成标准

- sitemap 自动化并与实际路由一致。
- 核心页面 canonical / metadata / OG 完整。
- 企业、服务、师资、面包屑具备可验证结构化数据。
- 核心 H1 与页面主题一致。
- 不存在公开模板垃圾 URL 干扰索引。

---

# 阶段四：动态化接口预留与长期维护能力

## 目标

保持当前静态站简单、快速、低成本，同时让未来新增资讯中心、CMS、API、数据库、ISR/SSR、报名、会员或 CRM 时不必推倒核心页面结构。

## 架构原则

```text
Next.js App Router / Server Components
        ↓
页面与业务组件
        ↓
统一内容仓储 / Repository 接口
        ↓
现在：src/data / Markdown
未来：Headless CMS / API / Database
```

## 工作项

- [ ] 明确保留 App Router、Server Components、动态 `[slug]` 路由。
- [ ] 不把“全站禁止 `next/link`”写成永久规范；当前原生 `<a>` 只作为已知故障期间的兼容策略，客户端路由问题解决后重新评估。
- [ ] 控制 `"use client"` 边界，只给真实交互组件使用。
- [ ] 为服务、案例、师资、未来文章设计内容仓储接口，让页面不直接绑定某个 TS 文件。
- [ ] 规划 Article 模型：slug、title、description、content、author、category、publishedAt、updatedAt、SEO、状态。
- [ ] 规划未来 `/articles` 或正式 `/blog`，不复用旧模板垃圾页面。
- [ ] 将 `output: "export"` 视为当前 deployment adapter，而不是永久业务限制。
- [ ] 文档化未来从 Nginx 静态 `try_files` 切换到 Next Server / 容器 / Serverless `proxy_pass` 的边界。
- [ ] Next / React / ESLint 版本对齐，迁移 ESLint CLI。
- [ ] TypeScript `strict` 分阶段提升。
- [ ] 增加 E2E/Playwright，覆盖桌面与移动 viewport。
- [ ] 完善版本目录、原子发布与快速回滚长期方案。

## 本阶段完成标准

- 当前仍可作为静态企业官网低成本运行。
- 页面和 URL 体系不依赖“数据一定来自本地文件”的假设。
- 有清晰的动态内容与部署演进路径。
- 后续新增资讯中心/CMS 不需要推倒核心服务、案例、师资页面。

---

# 已确认并已修复的服务器问题

- [x] 重复 `location /`。
- [x] `out/` 与父目录权限导致的 403。
- [x] 静态目录路由 301 泄露内部 8088。
- [x] Webpack 版本核心页面、404、静态资源 Smoke Test。
- [x] 发布中断/漏 chmod 可再次制造 403，已确认根因并纳入原子发布整改。

---

# 当前执行状态

- 当前阶段：**阶段一：P0 稳定性清零**
- 当前最高优先事项：**完成真实 Nginx 缓存策略上线 + 一次性原子发布 root 迁移 + 普通/无痕手机最终回归。**
- 已准备但尚未启用：`scripts/deploy-production-atomic.sh`、`docs/deployment/jiuchen-static-production.conf.example`。
- 临时文件删除状态：**禁止删除，四阶段尚未完成。**
