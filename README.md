# 九辰本硕博升学就业官网

本仓库为九辰教育官网源码与公开静态资源仓库。

官网地址：`https://jiuchenedu.com/`  
展示品牌：九辰本硕博升学就业  
公司主体：长沙九辰教育咨询有限公司  
当前状态：正式上线后的内容修缮与运营优化阶段。

## 1. 项目目标

本项目用于展示九辰教育的品牌定位、核心服务、学员案例、师资团队、常见问题与咨询入口。

当前官网以静态展示为主，联系转化通过腾讯问卷承接。项目重点不是复杂后台，而是稳定、可信、易维护、合规的教育咨询类官网。

## 2. 当前主域策略

唯一主域：

```text
https://jiuchenedu.com/
```

跳转策略：

```text
http://jiuchenedu.com/      → https://jiuchenedu.com/
http://www.jiuchenedu.com/  → https://jiuchenedu.com/
https://jiuchenedu.com/     → 200
https://www.jiuchenedu.com/ → https://jiuchenedu.com/
```

## 3. 技术结构

源码技术栈：

- Next.js
- React
- TypeScript
- Tailwind CSS
- 静态导出产物 `out/`

线上访问链路：

```text
用户访问
→ Nginx Proxy Manager
→ 宿主机 Nginx 8088
→ /usr/share/nginx/html/jiuchen-site
```

GitHub 仓库负责保存源码、公开静态资源和说明文档；服务器配置和备份文件不进入仓库。

## 4. 当前页面结构

核心页面：

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

SEO 与站点文件：

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- 百度验证文件
- Google 验证文件

## 5. 当前内容口径

整体表达应保持：

- 专业
- 理性
- 稳健
- 可信赖
- 不夸大承诺

案例页当前按反馈调整为：

- 不突出案例数量
- 不在前台堆叠过多标签
- 重点展示“初始情况”和“最终结果”
- 通过代表性路径帮助用户判断相近背景

公开页面应避免使用绝对化、保证式或过度营销表达。FAQ 中可以保留必要的合规边界说明，但必须是明确否定语义。

## 6. 联系页

联系页路径：

```text
/contact
```

当前接入腾讯问卷：

```text
https://wj.qq.com/s2/26980177/9e75/
```

联系页同时展示：

- 腾讯问卷 iframe
- 腾讯问卷二维码
- 微信公众号二维码
- 微信视频号二维码
- 抖音二维码
- 电话咨询

腾讯问卷二维码图片：

```text
public/images/jiuchen/wj.qq.com.png
```

域名相关留档图片：

```text
public/images/jiuchen/jiuchenedu.com.png
```

该图片作为固定资产留存，当前不在页面展示。

## 7. 重要目录说明

- `AGENTS.md`：AI / Codex / 真人维护者接手指南。
- `docs/`：项目状态、部署和交接文档。
- `public/`：公开静态资源。
- `public/images/`：图片、二维码、案例图、师资图和固定资产。
- `jiuchen-case-markdown/`：案例 Markdown 数据源。
- `src/data/`：服务、案例、师资、FAQ、联系信息等内容数据层。
- `src/app/`：Next.js 页面路由。
- `src/components/`：页面组件。

README 不应滥用。对于源码目录，AI 可直接读代码；对于图片资产、内容拓扑、项目关系和维护习惯，应通过 README 明确说明。

## 8. 常用命令

安装依赖：

```bash
npm install
```

本地开发：

```bash
npm run dev
```

构建：

```bash
npm run build
```

构建产物：

```text
out/
```

## 9. 修改流程

推荐流程：

1. 阅读 `README.md`、`AGENTS.md` 和相关目录 README。
2. 明确修改目标和影响页面。
3. 本地修改源码或文档。
4. 执行 `npm run build`。
5. 检查构建产物和关键页面。
6. 发布到服务器。
7. 线上验证核心页面、SEO 文件和跳转状态。
8. Git commit / push。

## 10. 当前未完成事项

- 公安备案号下发后补入页脚。
- 增加 JSON-LD 结构化数据。
- 搜索引擎后台复检 sitemap 抓取状态。
- 建立师资授权和案例脱敏台账。
- 继续根据业务反馈优化页面内容与视觉重点。
- 可择机清理旧模板页源码。
- 可增加健康巡检脚本。

## 11. 维护提醒

1. 不要提前填写公安备案号。
2. 不要删除搜索引擎验证文件、`robots.txt`、`sitemap.xml`、`llms.txt`。
3. 不要随意移动图片资产，移动前先搜索引用路径。
4. 不要把服务器备份包或敏感凭据提交到仓库。
5. 修改联系页后必须检查腾讯问卷 iframe 和二维码展示。
6. 修改案例页后必须检查是否仍然弱化数量、突出结果。
