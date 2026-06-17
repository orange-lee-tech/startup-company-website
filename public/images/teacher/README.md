# teacher 师资图片资产说明

本目录存放师资模块相关图片。

## 常见子目录

- `portraits/`：师资头像、详情页头像。
- `card/`：师资卡片展示图片，如后续启用可在此维护。

## 引用关系

师资数据主要位于：

```text
src/data/teachers.ts
src/data/teacherDetails.ts
```

师资页面位于：

```text
src/app/teachers/page.tsx
src/app/teachers/[slug]/page.tsx
```

## 维护原则

1. 师资姓名、头像、职称、单位和简介用于官网展示前，应确认授权。
2. 图片应尽量保持统一比例和清晰度，避免过度压缩或裁切主体。
3. 更换图片时优先保持原文件名，减少代码或数据层同步成本。
4. 若师资信息需要匿名化，应同步调整数据层、图片文件和 sitemap 展示策略。
