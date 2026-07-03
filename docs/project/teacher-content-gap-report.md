# 师资内容资料缺口与维护记录

本文件用于记录师资资料在官网数据层中的完备情况，便于后续确认授权、脱敏口径和素材使用范围。

## 当前前台读取关系

```text
src/data/teachers.ts
→ src/components/Teachers/TeacherCarousel.tsx
→ src/app/teachers/page.tsx

src/data/teacherDetails.ts
→ src/app/teachers/[slug]/page.tsx
```

## 本轮技术修缮记录

1. `src/data/teachers.ts` 已增加 `gender` 字段，用于按性别自动选择统一头像。
2. 头像资源沿用 `public/images/teacher/portraits/male.png` 与 `public/images/teacher/portraits/female.png`。
3. 已按确认将 4 位九辰规划导师加入前台师资数据。
4. 本轮只调整数据层和移动端交互，不改变前台页面结构。

## 当前数据完备性

### 已有详情页资料

当前 `teacherDetails.ts` 已有较完整详情页数据的师资共 6 位，可支撑独立详情页。

### 只有简要卡片资料

当前 `teachers.ts` 中另有 13 位师资只有简要卡片信息，暂无详情页，其中包含本轮新增的 4 位九辰规划导师。后续如需补详情页，应先确认以下字段：

1. 展示称谓；
2. 是否允许公开职称；
3. 是否允许公开机构名称；
4. 擅长方向；
5. 3–5 条可公开展示亮点；
6. 是否允许展示详情页；
7. 脱敏要求。

## 后续维护建议

1. 师资公开口径优先使用“姓氏 + 老师”或“方向导师 A/B”形式。
2. 若确认可以展示更完整履历，再补充 `teacherDetails.ts`，不要直接在组件里写死内容。
3. 头像仍建议使用统一男女头像，除非明确授权真实照片。
4. 新增师资前应先确认是否展示、是否实名、是否有详情页和是否加入首页精选。
5. 若师资资料从 Word 转为 Markdown，建议另建 `content/teachers/`，并让 `teachers.ts` 或独立读取器统一标准化，避免数据分散。
