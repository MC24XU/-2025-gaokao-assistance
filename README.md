# Gaokao Auto-Updating Ranks API

## 🛠️ 文件说明
- **crawler/**：每日抓取各省“一分一段”数据，生成 api/data/ranks.json
- **api/**：提供 `/api/ranks?province=...&type=...` 接口
- **railway.toml**：声明两服务和定时任务（每日执行）

## 🚀 部署步骤：

1. Fork/Clone 本仓库到你的 GitHub
2. 登录 Railway → 新建项目 → [Connect GitHub]
3. 选择仓库，Railway 会自动构建 `api` 和 `crawler` 服务
4. 在 Railway Console 启动 Cron Service（daily_crawling）
5. 部署完成后，记下 API 地址，例如：
