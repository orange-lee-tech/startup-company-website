# 九辰本硕博升学就业官网

九辰教育官方网站源码、公开静态资源与交接文档仓库。

- 官网：`https://jiuchenedu.com/`
- 品牌：九辰本硕博升学就业 / 九辰教育
- 公司主体：长沙九辰教育咨询有限公司
- 当前状态：V1.0 已正式上线，进入内容运营与持续维护阶段
- 最后交接更新：2026-07-24

> 第一次接手且不懂代码：先读 [`docs/BEGINNER_GUIDE.md`](docs/BEGINNER_GUIDE.md)。
>
> 准备用 AI 修改：先让 AI 读取 `README.md`、`AGENTS.md` 和与任务相关的目录 README。

---

## 1. 这个项目是什么

这是一个以 **Next.js 静态导出**实现的教育咨询类企业官网，用于：

- 品牌与公司信息展示
- 六大服务方向说明
- 学员案例展示
- 师资团队展示
- 常见问题说明
- 腾讯问卷、电话、公众号、视频号、抖音等咨询转化

它目前不是 WordPress、论坛、课程系统、CRM，也没有可视化后台。内容通常在代码或 Markdown 数据中修改，执行构建后生成静态文件，再发布到服务器。

选择静态官网的优点是访问快、服务器压力低、攻击面相对小、部署简单；不足是文章或案例大量更新时不如 CMS 方便。

---

## 2. 技术框架

| 层级 | 当前方案 | 作用 |
|---|---|---|
| 页面框架 | Next.js 16 | App Router、页面生成、静态导出 |
| UI | React 19 | 组件化页面 |
| 类型 | TypeScript | 降低数据结构和路径修改错误 |
| 样式 | Tailwind CSS 4 | 页面布局和响应式样式 |
| 构建方式 | `output: "export"` | 生成 `out/` 静态网站 |
| 源码管理 | GitHub | 版本记录、协作、回滚 |
| 线上服务 | Nginx + Nginx Proxy Manager | 静态文件、域名、HTTPS 与转发 |
| 咨询承接 | 腾讯问卷 | 当前没有自建表单后端 |

项目要求 Node.js `>=20`。服务器当前实际使用 Node.js 24 也可正常构建。

### 静态导出的关键含义

`next.config.js` 中设置：

```js
output: "export"
```

执行：

```bash
npm run build
```

会生成：

```text
out/
```

线上 Nginx 直接读取该目录中的 HTML、JavaScript、CSS 和图片，因此线上不需要 PM2，也不需要长期运行 `npm run start`。

---

## 3. 项目结构地图

```text
startup-company-website/
├── README.md                    # 项目总览与维护入口
├── AGENTS.md                    # 给 AI / Codex / 开发者的接手规则
├── package.json                 # 依赖、命令、Node 版本要求
├── next.config.js               # 静态导出、basePath、图片配置
│
├── src/
│   ├── app/                     # Next.js 页面路由
│   │   ├── layout.tsx           # 全站根布局、Header、Footer、Metadata 基础
│   │   ├── page.tsx             # 首页
│   │   ├── services/            # 服务总览与动态详情页
│   │   ├── cases/               # 案例总览与动态分类页
│   │   ├── teachers/            # 师资总览与动态详情页
│   │   ├── faq/                 # FAQ
│   │   └── contact/             # 联系咨询
│   │
│   ├── components/              # Header、Footer、Contact 等展示组件
│   ├── data/                    # 网站内容数据层，日常改文案优先看这里
│   ├── lib/site.ts              # basePath 路径兼容工具
│   └── styles/                  # 全局样式
│
├── jiuchen-case-markdown/
│   └── content/cases/           # 案例 Markdown 数据源
│
├── public/
│   ├── robots.txt               # 搜索引擎抓取规则
│   ├── sitemap.xml              # 当前为静态维护的站点地图
│   ├── llms.txt                 # 供 AI 理解官网的简要说明
│   └── images/                  # Logo、二维码、案例图、师资图等
│
├── docs/
│   ├── BEGINNER_GUIDE.md        # 给完全不懂代码的人
│   ├── SECURITY_MAINTENANCE.md  # 风险、漏洞面与维护建议
│   ├── HANDOVER_CHECKLIST.md    # 资产移交检查表
│   ├── deployment/              # 部署、Nginx、验证、回滚
│   └── project/                 # 项目状态、内容口径与后续计划
│
└── out/                         # 构建产物，通常不作为内容源直接修改
```

---

## 4. 页面与数据关系

### 核心页面

- `/`：首页
- `/about`：关于九辰
- `/services`：服务总览
- `/services/[slug]`：服务详情
- `/cases`：案例总览
- `/cases/[slug]`：案例分类
- `/teachers`：师资总览
- `/teachers/[slug]`：师资详情
- `/faq`：常见问题
- `/contact`：联系咨询

### 修改内容时优先找哪里

| 想修改的内容 | 首选文件 |
|---|---|
| 电话、邮箱、地址、备案号 | `src/data/contactInfo.ts` |
| 导航菜单 | `src/data/navigation.ts` |
| 服务内容 | `src/data/services.ts`、`src/data/routePages.ts` |
| 案例 | `jiuchen-case-markdown/content/cases/` |
| 案例读取逻辑 | `src/data/cases.ts` |
| 师资列表 | `src/data/teachers.ts` |
| 师资详情 | `src/data/teacherDetails.ts` |
| FAQ | `src/data/faq.ts` |
| 公司介绍 | `src/data/about.ts` |
| 二维码与渠道 | `src/data/contactChannels.ts` |
| 腾讯问卷链接 | `src/components/Contact/index.tsx` 中的 `questionnaireUrl` |
| 全站 Header / Footer | `src/components/Header/`、`src/components/Footer/` |
| 全站根布局和基础域名 | `src/app/layout.tsx` |
| GitHub Pages / 正式域名路径 | `next.config.js`、`src/lib/site.ts` |

原则：**内容优先改数据层，组件主要负责展示结构。** 不要为了换一句话，先去大范围重写组件。

---

## 5. 域名、备案与线上结构

唯一主域：

```text
https://jiuchenedu.com/
```

预期跳转：

```text
http://jiuchenedu.com/      → https://jiuchenedu.com/
http://www.jiuchenedu.com/  → https://jiuchenedu.com/
https://jiuchenedu.com/     → 200
https://www.jiuchenedu.com/ → https://jiuchenedu.com/
```

备案信息：

```text
湘ICP备2026021463号
湘公网安备43010402002934号
```

当前源码和服务器路径：

```text
源码目录：/www/wwwroot/startup-company-website
静态目录：/www/wwwroot/startup-company-website/out
宿主机 Nginx：8088
```

公网 80/443、证书和主域跳转由 Nginx Proxy Manager 处理；宿主机 Nginx 8088 负责读取 `out/`。

服务器私有配置、账号、密钥和备份包不得提交到本仓库。

---

## 6. 本地启动与构建

### 首次安装

```bash
npm ci
```

### 本地开发

```bash
npm run dev
```

默认打开：

```text
http://localhost:3000
```

### 正式构建

正式域名部署前，不应带 GitHub Pages 子路径：

```bash
unset GITHUB_PAGES
unset NEXT_PUBLIC_SITE_BASE_PATH
npm run build
```

检查：

```bash
test -f out/index.html && echo "构建成功"
```

> `package.json` 中旧的 `npm run lint` 使用 `next lint`。Next.js 16 已不再推荐该命令；在迁移 ESLint 配置前，不要把它当作唯一验收依据。至少要以 `npm run build` 成功和页面验证为准。详见 `docs/SECURITY_MAINTENANCE.md`。

---

## 7. 当前服务器发布流程

在服务器远程终端：

```bash
set -euo pipefail

cd /www/wwwroot/startup-company-website

git pull --ff-only origin main
npm ci

unset GITHUB_PAGES
unset NEXT_PUBLIC_SITE_BASE_PATH
npm run build

test -f out/index.html

find out -type d -exec chmod 755 {} \;
find out -type f -exec chmod 644 {} \;

nginx -t
systemctl reload nginx
```

核心页面验证：

```bash
for p in / /about /services /cases /teachers /faq /contact \
/services/undergrad-career /cases/baoyan /robots.txt /sitemap.xml /llms.txt
do
  printf "%-35s" "$p"
  curl -sS -o /dev/null -w "%{http_code} %{content_type}\n" \
    -H "Host: jiuchenedu.com" "http://127.0.0.1:8088$p"
done
```

预期页面返回 `200`。若目录型路由出现 `403`，优先检查 Nginx 是否有：

```nginx
index index.html;

location / {
    try_files $uri $uri/ $uri.html =404;
}
```

详细说明见 [`docs/deployment/README.md`](docs/deployment/README.md)。

---

## 8. 内容与合规边界

公开表达保持：

- 专业、理性、稳健、可信赖
- 强调评估、规划、陪跑、材料优化、面试训练和复盘
- 不把个别案例包装为普遍结果
- 不作单一学校、导师、公司或岗位的确定性承诺

避免将下列表达作为营销承诺：

```text
保录取、包 offer、百分百上岸、包过、必过、低分必录
```

案例、录取材料、聊天截图、师资头像和简介公开前必须确认：

- 是否已授权
- 是否完成脱敏
- 是否包含可识别个人信息
- 图片是否有公开使用权
- 是否存在夸大或保证式表述

案例页当前前台重点展示：

- 初始情况
- 最终结果
- 代表性路径

不以案例数量和标签堆叠作为主要卖点。

---

## 9. 已知风险与维护重点

这里列的是交接时已知的风险面，不等于网站已经发生安全事件。

1. **没有 CMS 后台**：大量资讯更新会增加人工发布成本；需要高频发文时再建设后台。
2. **腾讯问卷是外部依赖**：链接失效、iframe 策略变化或平台故障会影响咨询入口。
3. **问卷链接存在双处维护风险**：组件中的 URL 与二维码目标必须同步检查。
4. **站点地图目前为静态文件**：新增、删除页面后需手动同步，否则影响搜索收录。
5. **授权和脱敏依赖人工台账**：这是当前最大的业务合规风险之一。
6. **公共仓库中的图片均可被下载**：不得上传身份证、合同、私聊原图、未脱敏录取材料或其他敏感资产。
7. **严格 CSP 暂未启用**：因为需要兼容腾讯问卷 iframe；新增安全策略必须先测试咨询功能。
8. **尚无完整自动化测试和 CI 发布门禁**：修改后必须人工构建、检查和线上验证。
9. **依赖需要持续更新**：定期执行 `npm outdated`、`npm audit`，不要未经测试直接升级主版本。
10. **旧模板页面可能仍有残留**：`signin`、`signup`、`blog` 等若不对外使用，可在确认无引用后清理并同步 sitemap。
11. **JSON-LD 尚未系统补齐**：不影响访问，但仍有 SEO 提升空间。
12. **服务器备份与回滚需制度化**：发布前应保留上一版代码提交和可用构建产物。

完整风险说明见 [`docs/SECURITY_MAINTENANCE.md`](docs/SECURITY_MAINTENANCE.md)。

---

## 10. 推荐维护节奏

### 每次改动

1. `git pull --ff-only`
2. 修改数据或源码
3. `npm ci`
4. `npm run build`
5. 检查 `out/index.html`
6. 检查受影响页面的电脑端和手机端
7. 发布服务器
8. curl 验证
9. 提交 Git 记录

### 每月

- 检查官网和咨询入口是否正常
- 检查二维码是否仍指向正确地址
- 查看搜索引擎后台和 sitemap 状态
- 执行 `npm outdated`、`npm audit`
- 检查证书到期时间和域名续费时间
- 检查案例与师资授权台账

### 每季度

- 做一次完整备份和恢复演练
- 清理未使用页面、图片和旧依赖
- 检查法律、广告和教育咨询宣传口径
- 评估是否需要 CMS、文章系统或统计分析

---

## 11. 给 AI 的推荐提示词

```text
请先阅读本仓库的 README.md、AGENTS.md，以及与本任务相关目录中的 README。
这是九辰教育正式官网，采用 Next.js 静态导出。
请先说明你准备修改哪些文件、为什么，再执行修改。
修改后必须运行或验证 npm run build，并检查受影响页面。
不要提交敏感信息，不要破坏非 www 主域、备案展示、腾讯问卷、robots.txt、sitemap.xml 和 llms.txt。
涉及案例或师资时，必须提醒授权、脱敏和结果承诺风险。
```

---

## 12. 文档入口

- [小白入门指南](docs/BEGINNER_GUIDE.md)
- [AI / 开发者协作规则](AGENTS.md)
- [部署与服务器说明](docs/deployment/README.md)
- [项目状态说明](docs/project/README.md)
- [安全、风险与维护建议](docs/SECURITY_MAINTENANCE.md)
- [资产交接检查表](docs/HANDOVER_CHECKLIST.md)
- [案例 Markdown 数据说明](jiuchen-case-markdown/README.md)
- [内容数据层说明](src/data/README.md)
- [公共静态资源说明](public/README.md)
- [图片资产说明](public/images/README.md)

---

## 13. 交接时已完成

- [x] 正式域名上线
- [x] HTTPS 可用
- [x] 非 www 主域规范化
- [x] ICP 备案展示
- [x] 公安备案展示
- [x] GitHub 源码与版本记录
- [x] 云服务器静态部署
- [x] Nginx 目录路由修复
- [x] 搜索引擎验证基础文件
- [x] 腾讯问卷及多渠道咨询入口
- [x] 内容合规降敏
- [x] README 与 AI 接手文档体系
- [x] 小白入门、风险维护和交接检查文档

项目已达到可交付、可追溯、可继续维护的 V1.0 状态。