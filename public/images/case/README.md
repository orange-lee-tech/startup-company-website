# case 案例图片资产说明

本目录存放学员案例相关图片、录取材料截图、结果证明材料等。

## 引用关系

案例图片主要由 Markdown 数据源中的 `image` 字段引用，例如：

```text
image: /images/case/001.png
```

案例数据读取逻辑位于：

```text
src/data/cases.ts
```

案例页面位于：

```text
src/app/cases/[slug]/page.tsx
```

## 维护原则

1. 所有案例图片公开前必须确认授权与脱敏。
2. 图片不得包含姓名、联系方式、完整证件号、完整聊天记录、可识别隐私信息。
3. 删除或改名图片前，必须同步检查 Markdown 中的 `image` 字段。
4. 若图片方向不同，可在 Markdown 中通过 `imageRatio` 标记：
   - `portrait`：竖图
   - `landscape`：横图
5. 当前案例页重点展示“初始情况”和“最终结果”，不再堆叠过多过程标签。
