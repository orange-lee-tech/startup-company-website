# public 静态资源目录说明

本目录中的文件会在网站构建后按根路径直接对外提供访问。例如：

- `public/robots.txt` → `https://jiuchenedu.com/robots.txt`
- `public/sitemap.xml` → `https://jiuchenedu.com/sitemap.xml`
- `public/images/jiuchen/wj.qq.com.png` → `https://jiuchenedu.com/images/jiuchen/wj.qq.com.png`

## 维护原则

1. 搜索引擎验证文件、`robots.txt`、`sitemap.xml`、`llms.txt` 必须保留在本目录根部，避免重新构建后丢失。
2. 图片、证书截图、二维码等二进制资产应放入 `public/images/` 下的对应分类目录。
3. 不要在本目录放置证书私钥、后台账号、合同原件、未脱敏截图等敏感文件。
4. 新增静态资产后，应同步检查引用路径是否以 `/images/...` 开头，并在对应图片目录 README 中补充说明。

## 当前关键文件

- `robots.txt`：搜索引擎抓取规则。
- `sitemap.xml`：站点地图。
- `llms.txt`：供 AI 搜索与摘要理解的轻量站点说明。
- `baidu_verify_codeva-yh5q4aQdjc.html`：百度站点验证文件。
- `googlec306fbc6e19a5a63.html`：Google 站点验证文件。
- `images/`：网站图片、二维码、案例图片、师资图片与固定资产截图。
