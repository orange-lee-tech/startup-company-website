# 九辰本硕博升学就业官网

本项目为九辰教育咨询有限公司企业门户网站，用于展示九辰教育的品牌定位、核心服务、学员案例、师资团队、常见问题与咨询入口。

当前网站定位为：九辰教育最小可商业化样品站。

现阶段以静态展示为主，后续可根据业务需要扩展为动态内容管理网站，或接入腾讯问卷、CRM、企业微信、飞书表格等国内线索系统。

---

## 一、项目定位

网站展示名称：九辰本硕博升学就业

公司主体：九辰教育咨询有限公司

品牌简称：九辰教育

品牌口号：以智启学，以仁伴行

当前核心服务方向：

- 保研辅导
- 留学申请
- 博士申请
- 就业辅导

当前内容组织原则：

- 首页只展示摘要和入口
- 完整内容放入子页面
- 页面内容尽量走数据层或内容文件
- 不把大段展示文本硬写进页面组件
- 保持后续内容维护方便

---

## 二、导航结构

当前主导航结构为：

- 首页
- 服务
- 案例
- 师资
- 常见问题
- 联系我们

其中：

- “服务”包含二级下拉
- “案例”包含二级下拉
- 点击导航栏 Logo 或“首页”应返回首页顶部

---

## 三、当前已完成页面

当前已完成或基本完成的页面包括：

- `/`
- `/services`
- `/services/[slug]`
- `/cases`
- `/cases/[slug]`
- `/teachers`
- `/teachers/[slug]`
- `/faq`
- `/contact`
- `/about`

其中：

- 首页包含首屏 Hero、核心服务入口、案例摘要、师资轮播、免费咨询入口
- 服务页按服务类型展示完整说明
- 案例页按四类案例组织
- 师资页支持部分老师进入个人详情页
- 联系页展示电话、二维码、咨询表单占位和后续线索系统入口思路
- 常见问题页展示服务流程、导师匹配、收费方式、服务保障、合规边界等内容

---

## 四、当前案例分类

网站当前采用四类案例结构：

- 保研辅导
- 留学申请
- 博士申请
- 就业辅导

分类规则：

- 保研案例归入 `baoyan`
- 海外本科、海外硕士、国外博士统一归入 `study-abroad`
- 国内博士申请归入 `phd-application`
- 就业与高端就业案例归入 `career-coaching`

特别说明：

国外博士不再归入“博士申请”，统一放入“留学申请”。

---

## 五、案例 Markdown 内容源

目前已将 Word 源文件整理为 Markdown 数据源，当前同步目录为：

- `jiuchen-case-markdown/`

建议后续迁移为正式内容目录：

- `content/cases/`

推荐最终目录结构：

- `content/cases/README.md`
- `content/cases/case-image-map.csv`
- `content/cases/baoyan/`
- `content/cases/study-abroad/`
- `content/cases/phd-application/`
- `content/cases/career-coaching/`

当前整理后的案例数量：

- `baoyan`：10 个
- `study-abroad`：4 个
- `phd-application`：7 个
- `career-coaching`：15 个

Markdown frontmatter 中保留了以下字段：

- `id`
- `category`
- `sourceNumber`
- `sourceDocument`
- `title`
- `studentLabel`
- `result`
- `tags`
- `featured`
- `displayOrder`
- `image`
- `imageFile`
- `imageRatio`

字段说明：

- `sourceNumber` 用于保留源文件既有编号
- `imageFile` 用于保持与已下载图片文件名对应
- `image` 用于网站实际引用图片
- `imageRatio` 用于区分竖图和横图展示比例

---

## 六、案例图片路径

当前案例图片建议放置于：

- `public/images/case/`

当前 Markdown 中的图片引用形式为：

- `/images/case/001.png`
- `/images/case/01.png`
- `/images/case/1.png`

因此，除非同步批量修改 Markdown 的 `image` 字段，否则不要随意移动图片到子文件夹。

注意：

正确路径：

- `public/images/case/`

不要写成：

- `public/images/cases/`

---

## 七、师资模块状态

当前师资数据位于：

- `src/data/teachers.ts`
- `src/data/teacherDetails.ts`

当前已为有详细资料的老师配置个人详情页：

- `/teachers/[slug]`

已进入详情页体系的老师包括：

- 徐照宜
- 成程
- Maxim Fedorov
- 邱枫
- 王智丰
- 王达

师资图片路径为：

- `public/images/teacher/portraits/`
- `public/images/teacher/card/`

注意路径是 `teacher` 单数，不是 `teachers`。

当前首页师资模块为横向三卡轮播，后续可继续调整自动播放速度、卡片高度和头像展示比例。

---

## 八、联系方式状态

当前已确认联系方式：

- 电话：18086136309
- 邮箱：xiaojiulaoshi@jiuchenedu.cn
- 抖音号：67544071749
- 地址：湖南省长沙市岳麓区洋湖街道湘江峯汇 1029

二维码路径：

- `public/images/contact/wechat-official.png`
- `public/images/contact/wechat-video.png`
- `public/images/contact/douyin.png`

二维码主要展示位置：

- 联系页
- 页脚

首页免费咨询区不重复展示二维码，避免页面过长和信息重复。

---

## 九、首页视觉状态

当前首页首屏、核心服务入口、案例摘要共用一张背景图，避免背景图在多个模块中重复切割显示。

当前背景图路径：

- `public/images/jiuchen/background.png`

视觉方向：

- 高端
- 理性
- 专业
- 可信赖
- 国际化
- 科技商务感

当前深色背景下，白色和黄色文字表现较好；深蓝文字在夜间模式下不宜作为主要强调色。

---

## 十、路径规范状态

当前已建立统一路径工具：

- `src/lib/site.ts`

该工具用于处理 GitHub Pages 与未来独立域名部署的路径差异。

原则：

- 图片、资源路径优先使用 `withBasePath("/images/xxx.png")`
- 不继续手写 `/startup-company-website/images/xxx.png`

未来迁移到独立域名时，可通过环境变量调整站点基础路径。

---

## 十一、表单与线索系统状态

当前联系页保留咨询表单展示入口，但正式提交机制计划后续接入国内线索系统。

当前计划方案：

- 腾讯问卷

后续甲方需要提供：

- 腾讯问卷链接
- 腾讯问卷二维码
- 网站嵌入代码

接入方式建议：

第一阶段：按钮跳转腾讯问卷。

第二阶段：根据样式需求考虑内嵌问卷。

---

## 十二、技术栈

当前项目技术栈：

- Next.js
- React
- TypeScript
- Tailwind CSS
- GitHub Pages

常用命令：

安装依赖：

    npm install

启动开发环境：

    npm run dev

构建项目：

    npm run build

---

## 十三、部署状态

当前部署依托 GitHub Pages。

每次修改并提交到 `main` 分支后，GitHub Actions 会自动构建并部署。

如页面未及时更新，可查看：

- GitHub → Actions

当前已知技术债：

- GitHub Actions 存在 Node.js 20 deprecation warning

该问题暂不影响构建，计划在最小商业化样品站完成后统一处理 CI / Node 24 兼容问题。

---

## 十四、主要内容文件

当前核心数据层：

- `src/data/navigation.ts`
- `src/data/routePages.ts`
- `src/data/services.ts`
- `src/data/cases.ts`
- `src/data/teachers.ts`
- `src/data/teacherDetails.ts`
- `src/data/faq.ts`
- `src/data/about.ts`
- `src/data/contactChannels.ts`
- `src/data/contactInfo.ts`

当前首页主要组件：

- `src/app/page.tsx`
- `src/components/Home/HeroServicesStage.tsx`
- `src/components/Hero/index.tsx`
- `src/components/Features/index.tsx`
- `src/components/Features/SingleFeature.tsx`
- `src/components/Testimonials/index.tsx`
- `src/components/Teachers/TeacherCarousel.tsx`
- `src/components/Home/HomeContactCTA.tsx`

当前案例相关页面：

- `src/app/cases/page.tsx`
- `src/app/cases/[slug]/page.tsx`

当前师资相关页面：

- `src/app/teachers/page.tsx`
- `src/app/teachers/[slug]/page.tsx`

---

## 十五、合规说明

网站内容应避免使用以下绝对化或夸大宣传表述：

- 保录取
- 包 offer
- 百分百上岸
- 包过
- 必过

所有学员案例、录取截图、聊天记录、Offer 材料等内容，发布前必须获得授权，并进行脱敏处理，隐藏姓名、院校、企业、联系方式等可识别信息。

---

## 十六、当前项目状态

当前状态：

- 最小可商业化样品站优化阶段

已完成重点：

- 首页主体结构
- 服务页结构
- 案例页结构
- 师资页结构
- 部分师资详情页
- 联系页与联系方式展示
- 二维码展示
- 路径规范
- 深浅色模式优化
- 移动端适配
- 案例 Markdown 数据源整理
- 首页背景视觉升级

下一阶段重点：

- 将案例 Markdown 数据源正式接入网站案例数据层
- 校验案例图片路径与显示比例
- 优化案例详情页图片展示效果
- 继续统一深色背景下的卡片层级与文字颜色
- 接入腾讯问卷或其他国内线索系统
- 完成最小商业化样品站最终检查