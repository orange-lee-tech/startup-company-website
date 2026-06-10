# 九辰教育官网：阿里云 ECS 正式域名上线记录

> 用途：记录 `jiuchenedu.com` 从 GitHub Pages 预览环境迁移到阿里云 ECS 正式环境时的已确认信息、待办事项与验收步骤。  
> 注意：本文不保存账号密码、服务器密码、私钥、短信验证码或证书私钥。

## 一、已确认信息

### 1. 域名与备案

- 正式域名：`jiuchenedu.com`
- ICP 主体备案号：`湘ICP备2026021463号`
- 备案地区：湖南省长沙市岳麓区
- 备案域名：`jiuchenedu.com`
- 主办者名称：`长沙九辰教育咨询有限公司`
- 备案状态：已备案
- 域名状态：正常
- 域名实名认证：已实名
- 域名到期时间：`2027-05-22 16:50:46`
- DNS 服务器：
  - `dns3.hichina.com`
  - `dns4.hichina.com`

备案通过后，网站首页底部中间位置需要展示备案号，并链接至工信部备案系统。

### 2. ECS 实例

- 地域：华东 1（杭州）
- 状态：运行中
- 操作系统：Alibaba Cloud Linux 3.2104 LTS 64 位
- 规格：2 vCPU / 2 GiB
- 公网 IPv4：`121.40.168.181`
- 私网 IPv4：`172.25.80.203`
- 公网带宽：3 Mbps

### 3. 当前安全组情况

当前截图可见：

- 已开放 ICMP
- 已开放 SSH 22
- 已开放 RDP 3389
- 尚未看到 HTTP 80
- 尚未看到 HTTPS 443

建议：

- 新增 TCP 80，来源 `0.0.0.0/0`
- 新增 TCP 443，来源 `0.0.0.0/0`
- Linux 服务器通常不需要 RDP 3389，确认无用途后删除
- SSH 22 不建议长期向 `0.0.0.0/0` 开放，应限制为管理员固定公网 IP

### 4. 当前 DNS 情况

当前解析设置页面显示暂无解析记录。

待新增：

| 记录类型 | 主机记录 | 解析线路 | 记录值 | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | 默认 | `121.40.168.181` | 10 分钟 |
| A | `www` | 默认 | `121.40.168.181` | 10 分钟 |

### 5. SSL 状态

- 当前尚未安装 SSL 证书
- 内部验收阶段可以先通过 HTTP 验证
- 正式公开前应申请并部署覆盖以下域名的 SSL 证书：
  - `jiuchenedu.com`
  - `www.jiuchenedu.com`

## 二、给甲方的简短说明

备案通过只是允许网站上线，不会自动让域名打开网站。还需要把网页部署到服务器、开放 80 端口，并把域名解析到服务器公网 IP。SSL 证书可以在内部验收后补装，但正式公开前建议完成 HTTPS。搜索引擎收录不会立即发生，内部验收应先以直接输入域名能正常访问为准。

## 三、推荐上线顺序

1. 修改网站页脚，显示 ICP 备案号并链接至工信部备案系统。
2. 调整 Next.js 静态导出配置，确保本地构建可生成 `out/`。
3. 在 ECS 安全组新增 TCP 80 和 TCP 443。
4. 远程连接 ECS，安装并启动 Nginx。
5. 将本地构建生成的 `out/` 内容上传到 Nginx 网站目录。
6. 先使用 ECS 公网 IP 测试 HTTP 页面是否正常。
7. 在阿里云云解析 DNS 中新增 `@` 与 `www` 两条 A 记录。
8. 通过 `http://jiuchenedu.com` 和 `http://www.jiuchenedu.com` 验收。
9. 申请 SSL 证书，部署 HTTPS，并将 HTTP 重定向到 HTTPS。
10. 网站正式开通后，按要求办理公安联网备案，并在页脚补充公安备案号。

## 四、代码侧待办

### 1. 页脚展示 ICP 备案号

建议在 `src/data/contactInfo.ts` 中增加：

```ts
icpRecord: "湘ICP备2026021463号",
icpUrl: "http://beian.miit.gov.cn/",
```

并确认是否将：

```ts
companyName: "九辰教育咨询有限公司",
privacyEntity: "九辰教育咨询有限公司",
```

调整为备案主办者名称：

```ts
companyName: "长沙九辰教育咨询有限公司",
privacyEntity: "长沙九辰教育咨询有限公司",
```

### 2. 静态导出

建议在 `next.config.js` 中显式启用：

```js
output: "export",
images: {
  unoptimized: true,
},
```

这样本地执行 `npm run build` 后可以稳定生成 `out/`，便于上传到 ECS。

## 五、验收清单

### HTTP 阶段

- [ ] ECS 安全组已开放 80
- [ ] Nginx 已运行
- [ ] 公网 IP 可打开首页
- [ ] `/services`
- [ ] `/cases`
- [ ] `/teachers`
- [ ] `/faq`
- [ ] `/contact`
- [ ] 图片资源正常
- [ ] 手机端布局正常
- [ ] 页脚 ICP 备案号可点击

### DNS 阶段

- [ ] `jiuchenedu.com` 解析到 `121.40.168.181`
- [ ] `www.jiuchenedu.com` 解析到 `121.40.168.181`
- [ ] 两个域名均可打开网站

### HTTPS 阶段

- [ ] 已部署 SSL 证书
- [ ] `https://jiuchenedu.com` 可访问
- [ ] `https://www.jiuchenedu.com` 可访问
- [ ] HTTP 自动跳转 HTTPS
- [ ] 浏览器未出现证书警告

### 合规阶段

- [ ] 首页底部展示 ICP 备案号
- [ ] ICP 备案号链接至工信部备案系统
- [ ] 网站正式开通后办理公安联网备案
- [ ] 公安备案完成后在页脚展示公安备案号

## 六、后续 SEO 待办

### 1. 统一主域名与 canonical

当前 `https://jiuchenedu.com/` 和 `https://www.jiuchenedu.com/` 均可访问。
后续应选定一个主域名，并完成以下处理：

- 将非主域名通过 301 永久重定向至主域名；
- 在页面 `<head>` 中增加 canonical 标记；
- 检查 sitemap.xml 中的域名是否与主域名一致；
- 在百度、Google、必应、搜狗、360 后台统一提交主域名 sitemap；
- 观察 `site:jiuchenedu.com`、品牌词和业务关键词的收录与排名变化。

### 2. 新站收录观察

网站已完成搜索引擎提交，但新域名普通关键词排名仍需等待索引积累。
后续重点观察：

- 百度搜索资源平台：索引量、抓取频次、抓取异常、Robots；
- Google Search Console：页面索引、Sitemap、抓取状态；
- 必应、搜狗、360：站点验证与收录情况；
- 品牌词、完整公司名称及 `site:jiuchenedu.com` 搜索结果；
- 保研辅导、博士申请辅导、海外全奖博士申请、本科就业陪跑等业务词排名。

## 六、后续 SEO 待办

### 1. 统一主域名与 canonical

当前 `https://jiuchenedu.com/` 和 `https://www.jiuchenedu.com/` 均可访问。
后续应选定一个主域名，并完成以下处理：

- 将非主域名通过 301 永久重定向至主域名；
- 在页面 `<head>` 中增加 canonical 标记；
- 检查 sitemap.xml 中的域名是否与主域名一致；
- 在百度、Google、必应、搜狗、360 后台统一提交主域名 sitemap；
- 观察 `site:jiuchenedu.com`、品牌词和业务关键词的收录与排名变化。

### 2. 新站收录观察

网站已完成搜索引擎提交，但新域名普通关键词排名仍需等待索引积累。
后续重点观察：

- 百度搜索资源平台：索引量、抓取频次、抓取异常、Robots；
- Google Search Console：页面索引、Sitemap、抓取状态；
- 必应、搜狗、360：站点验证与收录情况；
- 品牌词、完整公司名称及 `site:jiuchenedu.com` 搜索结果；
- 保研辅导、博士申请辅导、海外全奖博士申请、本科就业陪跑等业务词排名。

## 六、后续 SEO 待办

### 1. 统一主域名与 canonical

当前 `https://jiuchenedu.com/` 和 `https://www.jiuchenedu.com/` 均可访问。
后续应选定一个主域名，并完成以下处理：

- 将非主域名通过 301 永久重定向至主域名；
- 在页面 `<head>` 中增加 canonical 标记；
- 检查 sitemap.xml 中的域名是否与主域名一致；
- 在百度、Google、必应、搜狗、360 后台统一提交主域名 sitemap；
- 观察 `site:jiuchenedu.com`、品牌词和业务关键词的收录与排名变化。

### 2. 新站收录观察

网站已完成搜索引擎提交，但新域名普通关键词排名仍需等待索引积累。
后续重点观察：

- 百度搜索资源平台：索引量、抓取频次、抓取异常、Robots；
- Google Search Console：页面索引、Sitemap、抓取状态；
- 必应、搜狗、360：站点验证与收录情况；
- 品牌词、完整公司名称及 `site:jiuchenedu.com` 搜索结果；
- 保研辅导、博士申请辅导、海外全奖博士申请、本科就业陪跑等业务词排名。

## 六、后续 SEO 待办

### 1. 统一主域名与 canonical

当前 `https://jiuchenedu.com/` 和 `https://www.jiuchenedu.com/` 均可访问。
后续应选定一个主域名，并完成以下处理：

- 将非主域名通过 301 永久重定向至主域名；
- 在页面 `<head>` 中增加 canonical 标记；
- 检查 sitemap.xml 中的域名是否与主域名一致；
- 在百度、Google、必应、搜狗、360 后台统一提交主域名 sitemap；
- 观察 `site:jiuchenedu.com`、品牌词和业务关键词的收录与排名变化。

### 2. 新站收录观察

网站已完成搜索引擎提交，但新域名普通关键词排名仍需等待索引积累。
后续重点观察：

- 百度搜索资源平台：索引量、抓取频次、抓取异常、Robots；
- Google Search Console：页面索引、Sitemap、抓取状态；
- 必应、搜狗、360：站点验证与收录情况；
- 品牌词、完整公司名称及 `site:jiuchenedu.com` 搜索结果；
- 保研辅导、博士申请辅导、海外全奖博士申请、本科就业陪跑等业务词排名。

## 六、后续 SEO 待办

### 1. 统一主域名与 canonical

当前 `https://jiuchenedu.com/` 和 `https://www.jiuchenedu.com/` 均可访问。
后续应选定一个主域名，并完成以下处理：

- 将非主域名通过 301 永久重定向至主域名；
- 在页面 `<head>` 中增加 canonical 标记；
- 检查 sitemap.xml 中的域名是否与主域名一致；
- 在百度、Google、必应、搜狗、360 后台统一提交主域名 sitemap；
- 观察 `site:jiuchenedu.com`、品牌词和业务关键词的收录与排名变化。

### 2. 新站收录观察

网站已完成搜索引擎提交，但新域名普通关键词排名仍需等待索引积累。
后续重点观察：

- 百度搜索资源平台：索引量、抓取频次、抓取异常、Robots；
- Google Search Console：页面索引、Sitemap、抓取状态；
- 必应、搜狗、360：站点验证与收录情况；
- 品牌词、完整公司名称及 `site:jiuchenedu.com` 搜索结果；
- 保研辅导、博士申请辅导、海外全奖博士申请、本科就业陪跑等业务词排名。
