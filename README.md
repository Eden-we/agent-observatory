# Agent Observatory

面向中文 RAG / Agent 的质量评测与可观测性 MVP。

这个项目把一次 Agent 执行拆成可以检查的证据链：

- 输入：用户到底问了什么
- 检索：召回了哪些上下文
- 工具：调用了什么能力
- 模型：生成了什么答案
- 质量门禁：引用完整性、答案相关性、事实一致性和敏感信息检查
- 来源：答案中的事实来自哪份文档、哪一页

当前版本内置演示数据，不依赖 API Key，可以直接学习界面、状态管理和评测产品结构。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:5173`。

## 已实现

- 运行趋势图和质量门禁
- Trace 列表、状态筛选和详情切换
- 用户输入、Agent 输出和质量检查面板
- Agent 执行时间线
- 引用来源验证
- Trace 回放反馈
- 桌面端和移动端布局
- GitHub Pages 自动部署

## 部署

本项目使用 GitHub Pages 的 `main/docs` 发布方式。

1. 将代码推送到 `main` 分支。
2. 在本地执行 `npm run build -- --outDir docs`，把静态站点输出到 `docs/`。
3. 在 GitHub 仓库的 `Settings > Pages` 中，把 Source 设为 `Deploy from a branch`。
4. Branch 选 `main`，Folder 选 `/docs`。
5. 保存后，GitHub 会把 `docs/` 作为站点根目录发布。

我已经把这个项目做成了适合 Pages 直出的小型静态站点，不依赖服务器和后台。

## 下一阶段

推荐按以下顺序接入真实能力：

1. 增加 FastAPI / Node API，接收真实 Agent SDK 的 trace。
2. 用 OpenTelemetry 定义统一事件格式。
3. 将 trace 和评测结果写入 SQLite 或 PostgreSQL。
4. 接入真实评测集与人工标注。
5. 增加 GitHub PR 质量门禁。
6. 增加 Prompt Injection 和 MCP 工具权限检查。

## 事件格式草案

```json
{
  "trace_id": "tr_01HZXK8N4K",
  "project": "contract-review",
  "environment": "production",
  "input": "请找出合同中的违约责任。",
  "events": [
    {
      "type": "retrieve",
      "name": "knowledge_search",
      "latency_ms": 526,
      "metadata": {
        "top_k": 6,
        "max_similarity": 0.91
      }
    }
  ],
  "output": {
    "text": "合同第 8.2 条约定……",
    "citations": [
      {
        "document": "采购合同-2026-042.pdf",
        "page": 7
      }
    ]
  },
  "evaluations": {
    "citation_completeness": 0.98,
    "answer_relevance": 0.96,
    "factual_consistency": 0.93,
    "sensitive_information": 0.99
  }
}
```
