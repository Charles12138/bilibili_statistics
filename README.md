# B站视频数据统计

一个用于统计和分析 Bilibili 视频数据的 Chrome 扩展插件。

## 功能特点

- 数据统计：采集视频的播放量、弹幕数、点赞、投币、收藏、转发等数据
- 实时更新：打开视频页面时自动获取最新数据
- 简洁界面：以表格形式直观展示所有数据
- 跨页面支持：适配B站视频页面的单页应用导航

## 环境要求

- Chrome 浏览器（推荐版本 88+）
- 启用 JavaScript

## 安装说明

1. 下载源码：

   ```bash
   git clone [repository_url]
   cd bilibili_statistics
   ```

2. 在 Chrome 中加载插件：
   - 打开 Chrome 浏览器，访问 chrome://extensions/
   - 开启右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

## 使用说明

1. 浏览任意 B 站视频页面（网址格式：www.bilibili.com/video/...）
2. 点击浏览器右上角的插件图标
3. 即可在弹出窗口中查看当前视频的数据统计

## 项目结构

```text
bilibili_statistics/
├── README.md
├── manifest.json    # 扩展配置文件
├── background.js    # 后台脚本
├── content.js       # 内容脚本（获取数据）
├── popup.html       # 弹出窗口HTML
├── popup.js         # 弹出窗口脚本
└── icon48.png       # 插件图标
```

## 注意事项

- 请遵守 Bilibili 的使用条款和 API 限制
- 插件仅在 B 站视频页面（www.bilibili.com/video/...）生效
- 如数据加载失败，请刷新页面后重试

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License
