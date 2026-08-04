# 智能日历

手机、电脑双端可用的日程与办事清单应用。可安装到手机主屏幕全屏运行，支持多设备云端同步、离线使用，并能把选定日期范围的事件导出成一张精美长图。

**在线使用**：https://okydd.github.io/smart-calendar/

## 功能

- **日历页** —— 月历网格、左右滑动切月、点击日期查看当日事项
- **办事清单页** —— 按「已过期 / 今天 / 本周 / 本月 / 以后」分组，勾选完成、已完成折叠
- **云同步** —— 邮箱密码登录，多设备自动互通，冲突按最后修改时间裁决，离线可用
- **导出长图** —— 750px 宽蓝紫渐变图片，含日期 / 事件 / 时间三列表格，适合分享与打印
- **JSON 备份** —— 完整导入导出，便于迁移与归档
- **PWA** —— 添加到主屏幕，独立图标、全屏运行、断网可用

## 技术栈

React 18 · TypeScript · Vite · Ant Design 5 · React Router 6 · 原生 Canvas 2D · Supabase · localStorage

## 开发

```bash
npm install
npm run dev     # http://localhost:5173/
npm run build
```

推送到 `main` 分支后由 GitHub Actions 自动构建并发布到 GitHub Pages。

详细的使用、同步、备份与维护说明见 [SETUP.md](./SETUP.md)。
