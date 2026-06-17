# deployment 部署与服务器文档说明

本目录用于记录九辰教育官网的服务器部署、域名跳转、HTTPS、Nginx 配置、发布流程和回滚方式。

## 当前线上结构

```text
用户访问
→ Nginx Proxy Manager，处理 80/443、HTTPS、证书、域名转发
→ 宿主机 Nginx 8088
→ /usr/share/nginx/html/jiuchen-site
```

## 当前关键路径

源码路径：

```text
/opt/jiuchen-releases/github-20260604-005718
```

线上静态文件路径：

```text
/usr/share/nginx/html/jiuchen-site
```

Nginx Proxy Manager 数据目录：

```text
/clouddream/nginx-proxy-manage/data
```

NPM 自定义一跳配置：

```text
/clouddream/nginx-proxy-manage/data/nginx/custom/http_top.conf
```

宿主机 Nginx 增强配置目录：

```text
/etc/nginx/default.d/
```

缓存与基础安全头配置：

```text
/etc/nginx/default.d/jiuchen-cache-security.conf
```

## 当前域名策略

```text
http://jiuchenedu.com/      → https://jiuchenedu.com/
http://www.jiuchenedu.com/  → https://jiuchenedu.com/
https://jiuchenedu.com/     → 200
https://www.jiuchenedu.com/ → https://jiuchenedu.com/
```

非 www 是唯一主域。

## 维护原则

1. 不要直接编辑 Nginx Proxy Manager 自动生成的 `proxy_host/*.conf`，面板保存后可能覆盖。
2. NPM 自定义配置优先使用 `custom/` 目录。
3. 宿主机 Nginx 修改前先备份，修改后必须执行配置测试。
4. 发布前先构建，发布后必须验证核心页面、SEO 文件和跳转状态。
5. 当前暂不启用 HSTS 和严格 CSP，避免影响证书回旋空间和腾讯问卷 iframe。
6. 服务器备份包只留在服务器，不进入 Git 仓库。

## 常用验证

核心页面：

```bash
for p in / /about /services /cases /teachers /faq /contact /robots.txt /sitemap.xml /llms.txt
do
  printf "%-20s" "$p"
  curl -sS -o /dev/null -w "%{http_code} %{content_type}\n" "https://jiuchenedu.com$p"
done
```

跳转检查：

```bash
for u in \
http://jiuchenedu.com/ \
http://www.jiuchenedu.com/ \
https://jiuchenedu.com/ \
https://www.jiuchenedu.com/
do
  echo
  echo "### $u"
  curl -sS -o /dev/null -D - "$u" | sed -n '1,14p'
done
```
