# 九辰案例 Markdown 数据源说明

本目录由原始案例材料整理而来，用于网站案例数据层读取和后续内容维护。

## 分类规则

```text
jiuchen-case-markdown/content/cases/
├── baoyan/
├── study-abroad/
├── phd-application/
└── career-coaching/
```

分类口径：

- `baoyan`：保研辅导案例。
- `study-abroad`：海外本科、海外硕士、海外博士相关案例。
- `phd-application`：国内博士申请案例。
- `career-coaching`：就业辅导案例。

特别说明：按照当前项目口径，海外博士归入 `study-abroad`，不归入 `phd-application`。

## 网站读取关系

案例读取逻辑：

```text
src/data/cases.ts
```

案例总览页：

```text
src/app/cases/page.tsx
```

案例分类页：

```text
src/app/cases/[slug]/page.tsx
```

## frontmatter 字段

每个 Markdown frontmatter 中保留：

- `id`：案例唯一标识。
- `category`：案例分类。
- `sourceNumber`：源材料中的编号。
- `sourceDocument`：来源材料名称。
- `title`：案例标题。
- `studentLabel`：脱敏后的学生标签。
- `result`：前台展示的最终结果。
- `tags`：内部辅助标签，前台不宜过度堆叠展示。
- `featured`：是否作为代表案例。
- `displayOrder`：展示排序。
- `image`：网站引用图片路径。
- `imageFile`：图片文件名。
- `imageRatio`：图片比例，支持 `portrait` 或 `landscape`。

## 内容维护原则

1. 案例公开前必须完成授权确认和脱敏处理。
2. 不展示姓名、联系方式、完整院校、完整企业等可识别信息。
3. 当前前台案例页重点展示“初始情况”和“最终结果”，不再堆叠过多过程标签。
4. `result` 字段用于前台最终结果展示，应避免绝对化、夸大化表达。
5. 图片路径应与 `public/images/case/` 中的文件对应。

## 源文件对应

- `保研案例(1).docx` → `baoyan/`
- `博士录取及国外博士录取案例(3).docx` → `phd-application/` 与 `study-abroad/`
- `就业案例(1).docx` → `career-coaching/`
