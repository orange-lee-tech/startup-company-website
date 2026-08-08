# 临时工作总控：官网稳定化、清理、SEO 与动态化预留

> 本文件是本轮专项工作的临时总控清单，用于 AI / 开发者持续校对进度。
>
> **删除条件：只有当下列四个阶段全部完成、线上验证通过、文档已同步，才删除本文件。**
>
> 当前网站仍以 Next.js 静态导出为正式生产形态，但必须保留未来向 CMS、API、数据库、SSR/ISR、账号/业务系统等动态能力演进的空间。任何为了当前稳定性采取的临时降级措施，都不得被误写成永久架构限制。

## 总目标

1. 先清除手机端 Client Exception、发布权限、Nginx 与缓存等 P0 稳定性风险。
2. 清理历史 Startup/SaaS 模板页面、无效路由、垃圾文案与无引用资产，避免 SEO 与维护污染。
3. 重构 SEO 基础：自动 sitemap、规范 canonical、OG、JSON-LD、精准 H1、企业信任内链、性能治理。
4. 保留并明确动态化演进接口：继续使用 Next.js App Router / Server Components / 动态路由，以内容仓储接口隔离本地数据与未来 CMS/API/DB。

---

# 阶段一：P0 稳定性清零

## 目标

让官网在桌面 Chrome/Edge、Android Chrome/Edge、微信内置 WebView 等主要环境中稳定加载；任意单个客户端异常不能再把整站变成白屏；生产发布流程必须可重复验证。

## 工作项

- [ ] 彻查并消除手机端 `Application error: a client-side exception has occurred`。
- [ ] 删除/硬化首页无必要的自动滚动客户端逻辑 `ScrollUp`。
- [ ] 隔离旧 `next-themes` 顶层运行时依赖，保留主题能力但避免整个站点受单一 Provider 拖垮。
- [ ] 将生产构建切换到 Webpack 稳定通道，同时保留 Turbopack 构建入口用于后续重新验证，不永久堵死 Turbopack。
- [ ] 新增 `app/error.tsx` 和 `app/global-error.tsx`，为运行时异常提供品牌化恢复界面。
- [ ] 新增正式 `app/not-found.tsx`，避免依赖历史模板错误页。
- [ ] 硬化 Header / ScrollToTop 中对浏览器滚动 API 的调用，避免不兼容浏览器 API 直接抛异常。
- [ ] 固化生产静态目录权限要求：父目录可穿越、`out/` 目录 755、文件 644、nginx 用户可读。
- [ ] 固化 `nginx -t` 为 reload 前置条件，避免重复 `location` 等配置错误再次进入生产。
- [ ] 固化 Next 静态路由规则，避免 `/services` 等路径重定向泄露 `http://域名:8088/...`。
- [ ] 明确 HTML 与 `/_next/static/` 的缓存策略，降低“旧 HTML + 新 JS / 新 HTML + 旧 JS”的混合构建风险。
- [ ] 增加发布后 Smoke Test：主页、服务总览、服务详情、案例、师资、FAQ、联系页、404、JS/CSS 静态资源。
- [ ] 完成真实手机回归验证，并记录结果。

## 本阶段完成标准

- 主要桌面与手机浏览器不再出现整页 Client Exception。
- `npm run build` 成功。
- `nginx -t` 成功。
- 公网核心页面全部直接 200，不泄露 8088。
- 错误边界和 404 页面可用。
- 发布流程中的权限、路由、缓存、Smoke Test 有明确可重复步骤。

---

# 阶段二：历史模板与垃圾信息清仓

## 目标

彻底清除原 Startup/SaaS 模板残留，避免用户误入、搜索引擎污染、无用 bundle/资产堆积，同时不占用未来真正动态模块的设计空间。

## 工作项

- [ ] 删除当前无业务意义的 `/signin`。
- [ ] 删除当前无业务意义的 `/signup`。
- [ ] 删除 `/blog-sidebar` 英文模板文章页。
- [ ] 删除 `/blog-details` 历史模板详情页。
- [ ] 删除当前仅用于 redirect 的假 `/blog`，未来资讯系统重新正式建设。
- [ ] 删除公开 `/error` 模板页，由 Next 正规 error boundary / not-found 接管。
- [ ] 全仓扫描 `Startup`、`SaaS`、模板英文文案、假作者、假日期、假社交入口等残留。
- [ ] 删除确认无引用的 Blog/Login/Newsletter/模板组件。
- [ ] 删除确认无引用的模板图片和静态资产；删除前必须全文搜索引用。
- [ ] 构建并验证被删除页面真实返回 404。

## 本阶段完成标准

- 公开站点不存在与九辰业务无关的 Startup/SaaS 模板页面。
- 搜索引擎不会继续发现有效的垃圾模板 URL。
- 仓库内无明显无引用模板组件与静态资源。
- 不影响未来重新建设真正的资讯、会员或账号体系。

---

# 阶段三：SEO 与搜索可理解性重构

## 目标

让搜索引擎、社交平台和 AI 搜索更准确理解“长沙九辰教育咨询有限公司 / 九辰教育”的企业实体、六大服务、案例与师资，同时提升移动体验和 Core Web Vitals。

## 工作项

- [ ] 由 Next 数据源自动生成 sitemap，替代手工 XML。
- [ ] sitemap 覆盖固定页面、服务、案例、师资，未来可自然扩展文章。
- [ ] 校对 robots、canonical 与主域策略。
- [ ] 完善全站 Metadata title 模板、description、Open Graph、分享图。
- [ ] 增加 Organization / WebSite JSON-LD。
- [ ] 服务页增加 Service JSON-LD。
- [ ] 师资页增加 Person JSON-LD。
- [ ] 层级页面增加 BreadcrumbList JSON-LD。
- [ ] 优化各服务详情 H1，使其与具体 slug 搜索意图一致。
- [ ] 优化案例分类 H1 与正文主题差异化。
- [ ] 为 `/about` 增加合理站内入口，强化企业主体与信任信息。
- [ ] 检查 heading 层级、图片 alt、内部链接、404/noindex 策略。
- [ ] 统一图片尺寸与压缩策略，降低移动 LCP 与流量。
- [ ] 检查并优化 Core Web Vitals / 移动性能。

## 本阶段完成标准

- sitemap 自动化且与实际路由一致。
- 核心页面 canonical / metadata / OG 完整。
- 企业、服务、师资、面包屑具备可验证的结构化数据。
- 核心 H1 与页面主题一致，不再大面积复用泛化标题。
- 不存在公开模板垃圾 URL 干扰索引。

---

# 阶段四：动态化接口预留与长期维护能力

## 目标

保持当前静态站简单、快速、低成本，同时让未来新增资讯中心、CMS、API、数据库、ISR/SSR、报名、会员或 CRM 时不必推倒现有页面结构。

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
- [ ] 不把“全站禁止 `next/link`”写成永久规范；当前原生 `<a>` 仅作为已知故障期间的兼容策略，客户端路由问题解决后重新评估。
- [ ] 控制 `"use client"` 边界，只给真实交互组件使用。
- [ ] 为服务、案例、师资、未来文章设计内容仓储接口，让页面不直接绑定某个 TS 文件。
- [ ] 规划 Article 内容模型：slug、title、description、content、author、category、publishedAt、updatedAt、SEO、状态。
- [ ] 规划未来 `/articles` 或正式 `/blog` 路由，不复用旧模板垃圾页面。
- [ ] 将静态 `output: "export"` 视为当前 deployment adapter，而不是永久业务限制。
- [ ] 文档化未来从 Nginx 静态 `try_files` 切换到 Next Server / 容器 / Serverless `proxy_pass` 的边界。
- [ ] Next / React / ESLint 版本对齐，迁移 ESLint CLI。
- [ ] TypeScript `strict` 分阶段提升，不一次性制造大量无关重构。
- [ ] 增加 E2E/Playwright，覆盖桌面与移动 viewport。
- [ ] 规划原子化发布、版本目录与快速回滚。

## 本阶段完成标准

- 当前仍可继续作为静态企业官网低成本运行。
- 页面和 URL 体系不依赖“数据一定来自本地文件”的假设。
- 有清晰的动态内容与部署演进路径。
- 后续新增资讯中心/CMS 不需要推倒核心服务、案例、师资页面。

---

# 已确认并已修复的服务器问题（本轮历史记录）

- [x] 发现并修复 `/etc/nginx/default.d/` 中重复 `location /`，恢复 `nginx -t` successful。
- [x] 修复 Nginx 对 `/www/wwwroot/startup-company-website/out` 的读取/穿越权限，首页由 403 恢复 200。
- [x] 修复静态目录规则导致 `/services` 等地址 301 到 `http://jiuchenedu.com:8088/...` 的问题。
- [x] 验证本机 8088 与公网 HTTPS 的首页、服务总览、服务详情均返回 200。

---

# 当前执行状态

- 当前阶段：**阶段一：P0 稳定性清零**
- 当前最高优先问题：**手机端仍出现 Client Exception 白屏**
- 临时文件删除状态：**禁止删除，四阶段尚未完成**
