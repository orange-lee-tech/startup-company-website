# 九辰案例 Markdown 数据源整理

本目录由原 Word 案例源文件整理而来，用于后续网站案例数据层重构。

## 分类规则

- `baoyan`：保研案例。
- `phd-application`：国内博士申请案例。
- `study-abroad`：留学申请案例，包括海外本科、海外硕士、国外博士。
- `career-coaching`：就业辅导案例。

特别说明：按照当前项目口径，凡国外博士均归入 `study-abroad`，不归入 `phd-application`。

## 图片命名与编号关系

每个 Markdown frontmatter 中保留：

- `sourceNumber`：源文件内既有编号。
- `imageFile`：当前已下载图片的原始文件名。
- `image`：网站可引用路径，当前按 `/images/case/<imageFile>` 写入。
- `imageRatio`：依据源文件内嵌图片比例初步标注为 `portrait` 或 `landscape`。

如后续将图片移动到分类文件夹，只需要批量替换 `image` 路径，不应删除 `sourceNumber` 与 `imageFile`。

## 源文件对应

- `保研案例(1).docx` → `baoyan/`
- `博士录取及国外博士录取案例(3).docx` → `phd-application/` 与 `study-abroad/`
- `就业案例(1).docx` → `career-coaching/`
