# deployment 部署与服务器文档说明

本目录用于记录九辰教育官网的服务器部署、域名跳转、HTTPS、Nginx 配置、发布流程和回滚方式。

> 2026-08-08 已重新核验线上结构。旧文档中 `/opt/jiuchen-releases/...`、`/usr/share/nginx/html/jiuchen-site` 等路径属于历史记录，不再作为当前生产发布依据。

## 当前线上结构

```text
用户访问
→ Nginx Proxy Manager / OpenResty，处理公网 80/443、HTTPS、证书与域名转发
→ 宿主机 Nginx 8088
→ 当前：/www/wwwroot/startup-company-website/out
```

源码目录：

```text
/www/wwwroot/startup-company-website
```

当前静态目录：

```text
/www/wwwroot/startup-company-website/out
```

当前项目是 Next.js `output: "export"` 静态导出，不需要 PM2 或长期运行 `next start`。

## 2026-08-08 已确认的生产故障与修复

本轮线上排查已确认并处理：

1. `/etc/nginx/default.d/` 曾存在重复 `location /`，导致 `nginx -t` 失败。
2. 新构建的 `out/` 曾因父目录穿越权限和文件权限不足导致 Nginx 返回 403。
3. 旧 `try_files $uri $uri/ ...` 顺序会让 `/services` 等静态目录路由自动 301 到 `http://jiuchenedu.com:8088/...`。
4. 当前正确静态路由顺序为优先查找 HTML，再回退真实静态文件。
5. Webpack 生产构建、核心页面、404 和首页实际引用的 JS/CSS 已通过公网 Smoke Test。

## 当前 Nginx 静态路由最低要求

同一个 `server {}` 中只能存在一份 `location /`。

当前静态导出至少需要：

```nginx
index index.html;

location / {
    try_files $uri.html $uri/index.html $uri =404;
}
```

不要恢复为：

```nginx
try_files $uri $uri/ $uri.html =404;
```

否则 `/services`、`/cases` 等目录可能触发 Nginx 自动补 `/`，并把内部的 HTTP / 8088 地址暴露到公网跳转。

完整的缓存建议见：

```text
docs/deployment/jiuchen-static-production.conf.example
```

核心原则：

- HTML / 页面路由：`no-cache` / 每次重新验证。
- `/_next/static/`：按构建哈希长期缓存。
- public 图片和字体：中短期缓存。
- sitemap / robots / llms：短缓存。

这样可降低“旧 HTML + 新 JS”或“新 HTML + 旧 JS”的混合构建风险。

## 当前人工发布流程（过渡方案）

在完成原子发布迁移以前，如仍直接构建当前 `out/`，必须完整执行，不能在 `npm run build` 后中断：

```bash
set -euo pipefail

cd /www/wwwroot/startup-company-website

git pull --ff-only origin main
npm ci

unset GITHUB_PAGES
unset NEXT_PUBLIC_SITE_BASE_PATH

rm -rf .next out
npm run build

test -f out/index.html

chmod o+x /www
chmod o+x /www/wwwroot
chmod o+x /www/wwwroot/startup-company-website
find out -type d -exec chmod 755 {} \;
find out -type f -exec chmod 644 {} \;
runuser -u nginx -- test -r out/index.html

nginx -t
systemctl reload nginx

bash scripts/smoke-production.sh https://jiuchenedu.com
```

### 重要风险

当前 Nginx 直接读取仓库中的 `out/`。因此执行：

```bash
rm -rf out
npm run build
```

期间，生产目录本身正在被删除和重新生成。如果 SSH 中断、构建失败或权限步骤未执行，公网可能出现 403 / 404。

这只是过渡方案，不作为长期发布架构。

## 目标发布架构：版本目录 + 原子切换

阶段一稳定化完成前，将迁移到：

```text
/www/wwwroot/jiuchen-releases/
├── 20260808-xxxxxx-<commit>/
├── 20260809-xxxxxx-<commit>/
└── ...

/www/wwwroot/jiuchen-current
→ /www/wwwroot/jiuchen-releases/<当前版本>
```

宿主机 Nginx 的 `root` 将改为：

```nginx
root /www/wwwroot/jiuchen-current;
```

新版本在独立 Git worktree 中完成：

```text
git pull
→ 独立目录 npm ci
→ 独立目录 npm run build
→ 权限验证
→ nginx -t
→ 写入版本目录
→ 原子切换 jiuchen-current 符号链接
→ reload
→ 本机文件哈希验证
→ 公网 Smoke Test
```

只有所有构建前置检查完成后才切换公网版本。构建失败或 SSH 中断时，旧版本继续在线。

仓库已经提供：

```text
scripts/deploy-production-atomic.sh
```

该脚本需要先完成一次性的 `jiuchen-current` / Nginx root 迁移后才能使用；如果 `jiuchen-current` 不是符号链接，脚本会主动拒绝执行，避免误操作。

## Smoke Test

标准公网检查：

```bash
bash scripts/smoke-production.sh https://jiuchenedu.com
```

它会检查：

- 首页
- About
- 服务总览和服务详情
- 案例总览和案例详情
- 师资总览和师资详情
- FAQ
- Contact
- 不存在页面是否返回 404
- 首页实际引用的至少一个 Next.js JS/CSS 静态资源
- 页面是否泄露内部 `:8088` 重定向

全部通过时输出：

```text
PASS: production smoke test completed successfully.
```

## 常用人工验证

```bash
for p in / /about /services /cases /teachers /faq /contact /robots.txt /sitemap.xml /llms.txt
do
  printf "%-20s" "$p"
  curl -sS -o /dev/null -w "%{http_code} %{content_type}\n" "https://jiuchenedu.com$p"
done
```

本机 8088 验证必须携带正式 Host：

```bash
curl -I -H 'Host: jiuchenedu.com' http://127.0.0.1:8088/
```

## 域名策略

```text
http://jiuchenedu.com/      → https://jiuchenedu.com/
http://www.jiuchenedu.com/  → https://jiuchenedu.com/
https://jiuchenedu.com/     → 200
https://www.jiuchenedu.com/ → https://jiuchenedu.com/
```

非 www 是唯一主域。

## 维护原则

1. 不直接编辑 Nginx Proxy Manager 自动生成的 `proxy_host/*.conf`。
2. 宿主机 Nginx 修改前先备份，修改后必须执行 `nginx -t`。
3. `nginx -t` 不成功时严禁 reload。
4. 每次构建后都必须验证 Nginx 用户能读取静态目录。
5. 每次发布后都运行 `scripts/smoke-production.sh`。
6. 不再把“构建成功”等同于“发布成功”。
7. 服务器私有配置、账号、密钥、证书和备份包不得提交到 Git 仓库。
8. 当前暂不启用严格 CSP；腾讯问卷 iframe 等外部依赖需要单独兼容测试。
9. HSTS 只在所有 HTTPS / www 跳转长期稳定后再启用。
