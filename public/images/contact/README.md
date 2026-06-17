# contact 联系入口二维码说明

本目录存放官网联系入口相关二维码图片。

## 当前文件

- `wechat-official.png`：微信公众号二维码。
- `wechat-video.png`：微信视频号二维码。
- `douyin.png`：抖音二维码。

## 展示位置

当前主要在联系页展示：

```text
/contact
```

联系页的数据来源：

```text
src/data/contactChannels.ts
```

## 维护原则

1. 更换二维码图片后，文件名尽量保持不变，避免同步修改代码。
2. 若需要新增联系渠道，应优先修改 `src/data/contactChannels.ts`，不要在组件中硬编码。
3. 二维码图片需保持清晰，建议使用正方形图片。
4. 若二维码指向外部平台，应定期扫码验证可访问性。
