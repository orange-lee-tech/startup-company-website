# src/data 内容数据层说明

本目录存放官网主要内容数据。它虽然位于源码目录下，但承担内容管理和页面关系配置职责，因此需要单独说明。

## 当前主要文件

- `navigation.ts`：主导航、下拉菜单和页面入口。
- `routePages.ts`：服务页、案例页等路由型页面的标题、描述、亮点等配置。
- `services.ts`：各类服务详情内容。
- `cases.ts`：案例 Markdown 数据读取与标准化逻辑。
- `teachers.ts`：师资列表页数据。
- `teacherDetails.ts`：师资详情页数据。
- `faq.ts`：常见问题内容。
- `about.ts`：关于九辰页面内容。
- `contactChannels.ts`：联系页二维码渠道。
- `contactInfo.ts`：电话、邮箱、地址、备案主体等联系信息。

## 页面关系

```text
src/data/routePages.ts
→ src/app/services/page.tsx
→ src/app/services/[slug]/page.tsx
→ src/app/cases/page.tsx
→ src/app/cases/[slug]/page.tsx
```

```text
src/data/contactChannels.ts
→ src/components/Contact/index.tsx
```

```text
src/data/teachers.ts + src/data/teacherDetails.ts
→ src/app/teachers/page.tsx
→ src/app/teachers/[slug]/page.tsx
```

```text
src/data/faq.ts
→ src/app/faq/page.tsx
```

## 内容维护原则

1. 修改服务、案例、师资、FAQ 文案时，优先找数据层，不要先改组件。
2. 组件负责展示结构，数据层负责内容和页面关系。
3. 公司主体当前统一为：长沙九辰教育咨询有限公司。
4. 联系方式、备案号等信息应优先在 `contactInfo.ts` 维护。
5. 二维码渠道应优先在 `contactChannels.ts` 维护。
6. 案例内容来源于 Markdown，`cases.ts` 只负责读取与转换，不应写死具体案例。
7. 合规表达应保持克制，不做单一结果承诺。

## 案例展示口径

当前前台案例页只突出：

- 初始情况
- 最终结果

案例 Markdown 中仍可保留背景、服务过程、标签等字段，用于内部管理或未来页面升级，但不应在前台一次性堆叠展示。

`cases.ts` 会优先读取 Markdown 或 frontmatter 中的精简字段：

```text
initialSummary
outcomeSummary
```

如果没有 `initialSummary`，则按以下顺序兜底读取：

```text
## 初始情况
## 初始问题
## 申请难点
## 问题分析
## 学员背景
## 背景情况
```

如果仍然没有内容，前台不渲染空的“初始情况”模块。

## 师资与案例授权

师资和案例公开前应确认：

- 是否允许展示姓名、头像、职称和简介。
- 案例是否已授权展示。
- 是否已完成脱敏。
- 图片是否可公开使用。

如授权状态不确定，应先下线、匿名化或移出 sitemap。
