# 内容与部署演进边界

## 当前形态

九辰官网当前采用 Next.js App Router + `output: "export"`，由 Nginx 直接提供静态 HTML、CSS、JavaScript 与图片。

这是当前的部署适配器，不是业务层永久限制。页面结构、URL 与内容模型必须能够在未来切换到 CMS、API、数据库、ISR 或 SSR 时继续使用。

## 稳定保留的架构能力

- App Router 保留。
- Server Components 优先，只有真实交互组件才使用 `"use client"`。
- 服务、案例、师资继续使用稳定的 `[slug]` URL。
- `next/link` 不被列为禁用技术；此前首页原生 `<a>` 是已知线上故障期间的兼容策略，后续可在客户端运行时稳定后重新评估。
- 页面不应直接假定数据永远来自本地 TypeScript 或 Markdown。

## 内容仓储边界

当前统一入口位于：

```text
src/content/repository.ts
```

页面与 sitemap 可通过 `contentRepository` 读取服务、案例、师资。当前实现仍使用本地 `src/data` 与 Markdown；未来可以新增其他实现：

```text
ContentRepository
├── LocalContentRepository      当前
├── CmsContentRepository        未来 Headless CMS
├── ApiContentRepository        未来业务 API
└── DatabaseContentRepository   未来数据库
```

页面组件和公开 URL 不需要因为数据源切换而重写。

## 未来资讯系统

旧 Startup/SaaS 模板中的 `/blog`、`/blog-details`、`/blog-sidebar` 已废弃，不作为未来资讯系统基础。

未来资讯内容先遵循 `src/content/article.ts` 的内容契约，再决定公开 URL。推荐二选一：

```text
/articles
/articles/[slug]
```

或正式重建：

```text
/blog
/blog/[slug]
```

无论选择哪种 URL，文章数据都应至少包含：slug、标题、摘要、正文、作者、分类、标签、发布时间、更新时间、发布状态与 SEO 字段。

## 静态到动态的演进路径

### V1：当前静态站

```text
src/data / Markdown
        ↓
ContentRepository
        ↓
Server Components
        ↓
next build → out/
        ↓
Nginx static files
```

### V1.5：静态资讯

增加 Markdown/MDX 文章，构建时生成文章页面和 sitemap，不引入数据库。

### V2：CMS / API

内容编辑进入 Headless CMS 或业务后台；构建时拉取内容，仍可继续静态导出。

### V2.5：ISR / SSR

当出现高频内容更新、登录态、个性化、实时库存/名额、动态搜索等需求时，取消 `output: "export"`，部署 Next Server、容器或 Serverless。

Nginx 从：

```nginx
try_files ...
```

切换到类似：

```nginx
proxy_pass http://next_app;
```

这属于部署层迁移，不应要求重写核心 URL 与页面内容模型。

### V3：业务系统

报名、会员、CRM、权限、订单或支付等能力使用数据库与 API，官网展示层继续复用既有服务、案例、师资和文章内容模型。

## 客户端边界

客户端组件应限制在：

- 导航菜单
- 轮播
- 主题切换
- 咨询问卷弹窗
- 需要浏览器状态的真实交互

纯内容、SEO、数据读取与结构化数据默认保持服务端组件。

## 发布边界

当前生产服务器最终仍需完成一次集中迁移：

- HTML 明确重新验证缓存策略；
- `/_next/static/` 哈希资源长期 immutable 缓存；
- Nginx root 从实时构建目录迁移到版本目录 / `jiuchen-current`；
- 新版本独立构建、检查后原子切换；
- 构建失败或 SSH 断开时旧版本继续服务。

该服务器迁移延后到本轮 GitHub 四阶段代码工作完成后集中执行。
