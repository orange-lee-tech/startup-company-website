# 临时工作总控：官网稳定化、清理、SEO 与动态化预留

> 本文件是本轮专项工作的临时总控清单，用于持续校对状态。
>
> **删除条件：四个阶段的 GitHub 工作完成、最终生产部署完成、普通/无痕手机与桌面回归通过、正式文档同步后，才允许删除。**
>
> 当前网站仍采用 Next.js 静态导出，但 `output: "export"` 只视为当前部署适配器，不是永久业务限制。App Router、Server Components、动态 `[slug]`、`next/link` 与未来 CMS/API/数据库/ISR/SSR 能力继续保留。

## 当前执行状态

- 四阶段 GitHub 工作已通过 PR #2 完成并 squash 合并到 `main`。
- 四阶段合并提交：`a8e3aa1e88616e4e093278e84620d551d4f0714f`。
- 合并前最新 Quality Gate 已完整通过：依赖审计、lint、strict typecheck、Webpack 生产静态构建、导出契约验证、Playwright 桌面/移动浏览器回归全部成功。
- 当前策略：**生产服务器继续冻结；后续集中进行一次部署、Nginx 缓存/原子发布迁移与真实设备验收。**
- 当前生产站仍运行此前部署版本；本轮四阶段 `main` 新代码尚未部署到生产环境。

---

# 阶段一：P0 稳定性与质量门槛

## GitHub 侧已完成

- [x] 生产构建默认固定 Webpack：`next build --webpack`，同时保留 `build:turbopack` 供未来复测。
- [x] Next.js 升级到 16.3.0，`eslint-config-next` 对齐 16.3.0。
- [x] 删除 `next-themes`，主题切换改为轻量本地实现。
- [x] 删除旧 `ScrollUp` 客户端组件，Header/ScrollToTop/主题切换做浏览器能力与 hydration 安全处理。
- [x] 新增 `error.tsx`、`global-error.tsx`、`not-found.tsx`，客户端异常不再只能裸露默认白屏。
- [x] 手机导航增加独立滚动区域、touch pan、overscroll、安全区处理。
- [x] 师资轮播移动端不再自动播放；桌面端尊重 `prefers-reduced-motion`。
- [x] TypeScript `strict: true` 已正式启用。
- [x] ESLint 迁移到 Next 16 flat config；`next lint` 旧命令彻底移除。
- [x] GitHub Actions Quality Gate 建立：`npm ci` → 高危漏洞审计 → lint → strict typecheck → Webpack build → 静态导出契约验证 → Playwright 桌面/移动回归。
- [x] Playwright 直接服务生产 `out/` 产物，覆盖核心路由、Client Exception、主题切换以及“手机导航必须存在真实滚动范围并能点到最底部联系入口”。
- [x] 静态导出验证器检查核心页面、404/垃圾路由、SEO 产物、唯一 H1、结构化数据、图片 alt、内部链接和遗留模板文案。
- [x] 原子发布、迁移、Smoke Test、只读诊断脚本均保留在仓库，等待最后服务器阶段启用。

## 最终服务器阶段待完成

- [ ] HTML 明确上线 `Cache-Control: no-cache`/重新验证策略；`/_next/static/` 保持 hashed immutable 长缓存。
- [ ] Nginx root 从实时构建的仓库 `out/` 迁移到版本目录 + `/www/wwwroot/jiuchen-current`。
- [ ] 验证 SSH/Workbench 中断、构建失败时旧版本仍持续在线。
- [ ] 生产环境执行最终 Smoke Test。
- [ ] 手机普通会话、无痕会话、移动导航、服务/案例/师资/联系页面最终实机回归。

---

# 阶段二：历史模板与垃圾信息清仓

## GitHub 侧已完成

- [x] 删除旧公开路由：`/signin`、`/signup`、`/blog`、`/blog-details`、`/blog-sidebar`、`/error`。
- [x] 删除旧 Blog 组件、假作者/文章数据、Blog 类型和 Blog 图片。
- [x] 删除旧 Newsletter / Providers / `next-themes` 运行时遗留。
- [x] 删除未使用的 Startup Pricing、Video、VideoModal、Brands、Testimonials、重复 About、SectionTitle 等模板组件。
- [x] 删除 Formbold、UIdeck、Tailgrids、Lineicons、Tailadmin、PlainAdmin 等继承模板品牌资产。
- [x] 删除孤立旧视频图片与确认无引用的模板素材。
- [x] 内部 npm 包名由 `startup-nextjs-template` 改为 `jiuchen-education-website`。
- [x] CI 对所有生成 HTML 扫描旧模板文本，禁止 `Free Next.js Template`、`Startup Nextjs Template`、`Musharof Chy`、假博客文案等重新进入产物。
- [x] CI 明确验证旧垃圾 URL 不再被静态导出。

## 完成标准

- [x] GitHub 源码不再以旧 Startup/SaaS 模板页面作为有效业务模块。
- [x] 被清理的旧 URL 不占用未来正式资讯、账号或会员系统的架构空间。

---

# 阶段三：SEO 与搜索可理解性

## GitHub 侧已完成

- [x] 建立统一 `src/lib/seo.ts`：主域、品牌、公司主体、默认标题/描述、canonical、Open Graph、Twitter 分享信息集中管理。
- [x] 全站加入 Organization + WebSite JSON-LD。
- [x] 服务详情加入 Service + BreadcrumbList JSON-LD。
- [x] 师资详情加入 Person + BreadcrumbList JSON-LD。
- [x] 案例分类加入 BreadcrumbList JSON-LD。
- [x] 服务、案例、师资、About、FAQ、Contact、首页统一 metadata/canonical/OG 规则。
- [x] `sitemap.xml` 改由 Next metadata route 根据真实服务/案例/师资数据自动生成，不再手工维护。
- [x] `robots.txt` 改由 Next metadata route 生成并指向唯一 sitemap。
- [x] `llms.txt` 与当前九辰业务、核心页面、六大服务和模板清理状态同步。
- [x] 服务详情和案例分类均使用与具体 slug 匹配的差异化 H1。
- [x] 修复 Breadcrumb 与正文重复 H1；CI 要求每个核心页面恰好一个 H1。
- [x] Footer 新增“关于九辰”入口，强化企业主体和信任内链。
- [x] CI 检查 canonical、OG、Organization/WebSite/Service/Person/Breadcrumb JSON-LD、sitemap 核心 URL、内部链接、图片 alt。
- [x] 已配置统一品牌社交分享图（使用现有九辰品牌视觉资产）。

## 最终线上阶段待完成

- [ ] 部署后抽查搜索引擎实际可访问的 robots/sitemap/canonical/结构化数据。
- [ ] 使用真实线上环境复测移动性能/Core Web Vitals；如有需要再做图片物理尺寸/WebP/AVIF 深度治理。

---

# 阶段四：动态化预留与长期维护

## GitHub 侧已完成

- [x] 明确保留 App Router、Server Components、动态 `[slug]` 路由和 `next/link` 能力。
- [x] 新增 `src/content/repository.ts` 内容仓储接口，当前适配本地 `src/data`，未来可替换为 CMS/API/Database adapter。
- [x] 首页、服务总览/详情、案例总览/详情、师资总览/详情、sitemap 已通过内容仓储边界读取数据。
- [x] 首页 Client Component 改为由 Server Component 注入可序列化数据，不再让交互组件直接假定内容来自本地 TS 文件。
- [x] 新增 `src/content/article.ts`，定义未来资讯 Article 的 slug、正文、作者、分类、标签、发布时间、状态和 SEO 契约。
- [x] 新增 `docs/architecture/content-and-deployment-evolution.md`，明确 Static → Markdown/MDX → CMS/API → ISR/SSR → 业务系统的演进路径。
- [x] 明确未来 `/articles/[slug]` 或重新建设 `/blog/[slug]`，不复用已删除的旧模板 Blog。
- [x] 明确未来取消 `output: "export"` 时，Nginx 只需从静态 `try_files` 切换为 Next Server/容器/Serverless 反向代理，核心 URL 与内容模型无需推倒。
- [x] GitHub 质量门槛覆盖高危依赖、lint、strict TypeScript、构建、静态契约与桌面/移动浏览器回归。

---

# 最终关闭本临时文件前的剩余清单

1. [x] 四阶段 GitHub PR 的完整 Quality Gate 通过并合并到 `main`。
2. [ ] 最终集中进入服务器，拉取已经通过 GitHub CI 的 `main`。
3. [ ] 完成 HTML 缓存策略和原子发布 root 迁移。
4. [ ] 完成 Nginx 配置测试、生产 Smoke Test 与回滚验证。
5. [ ] 桌面 + 手机普通会话 + 无痕会话最终实测无 Client Exception、403、8088 泄露。
6. [ ] 线上 robots/sitemap/canonical/结构化数据抽查通过。
7. [ ] 正式 README / 部署交接文档与最终生产状态同步。
8. [ ] 上述全部完成后删除本文件。

**当前结论：GitHub 四阶段主体工作已完成并进入 `main`；生产服务器继续保持冻结，下一阶段只做一次集中上线与线上验收。**
