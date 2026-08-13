import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileCheck2,
  Filter,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TimerReset,
  TrendingDown,
  TrendingUp,
  X,
  Zap
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import './styles.css';

const trendData = [
  { time: '08:00', runs: 18, score: 84, latency: 2.1 },
  { time: '09:00', runs: 24, score: 87, latency: 2.4 },
  { time: '10:00', runs: 31, score: 89, latency: 2.0 },
  { time: '11:00', runs: 28, score: 86, latency: 2.8 },
  { time: '12:00', runs: 36, score: 91, latency: 2.2 },
  { time: '13:00', runs: 42, score: 93, latency: 1.9 },
  { time: '14:00', runs: 48, score: 92, latency: 2.3 },
  { time: '15:00', runs: 52, score: 94, latency: 2.0 },
  { time: '16:00', runs: 58, score: 95, latency: 1.8 },
  { time: '17:00', runs: 64, score: 94, latency: 2.1 }
];

const traces = [
  {
    id: 'tr_01HZXK8N4K',
    name: '合同审阅助手',
    environment: 'production',
    model: 'Qwen3-32B',
    status: 'passed',
    score: 94,
    latency: '2.1s',
    cost: '$0.018',
    time: '2 分钟前',
    query: '请帮我找出这份采购合同中关于违约责任的条款，并说明对甲方的风险。',
    answer: '合同第 8.2 条约定，乙方逾期交付时每日按合同总额的 0.5% 支付违约金，上限为合同总额的 10%。对甲方的主要风险是：未明确乙方延迟交付对甲方下游损失的赔偿范围。',
    checks: [
      { label: '引用完整性', value: '通过', score: '0.98', tone: 'good' },
      { label: '答案相关性', value: '通过', score: '0.96', tone: 'good' },
      { label: '事实一致性', value: '通过', score: '0.93', tone: 'good' },
      { label: '敏感信息', value: '安全', score: '0.99', tone: 'good' }
    ],
    events: [
      { type: 'input', label: '用户问题', meta: '11:42:08.102', detail: '已接收 41 tokens 的中文查询' },
      { type: 'retrieve', label: '检索知识库', meta: '11:42:08.316', detail: '召回 6 个片段，最高相似度 0.91' },
      { type: 'tool', label: '引用定位器', meta: '11:42:08.842', detail: '定位合同第 8.2 条，页码 7' },
      { type: 'model', label: '模型生成', meta: '11:42:09.764', detail: 'Qwen3-32B · 1,248 output tokens' },
      { type: 'check', label: '质量门禁', meta: '11:42:10.184', detail: '4/4 检查通过，trace 已归档' }
    ],
    sources: [
      { title: '采购合同-2026-042.pdf', page: '第 7 页', quote: '乙方逾期交付的，每逾期一日，应按合同总金额的 0.5% 向甲方支付违约金。' },
      { title: '采购合同-2026-042.pdf', page: '第 9 页', quote: '违约金总额不超过合同总金额的 10%，超出部分由双方另行协商。' }
    ]
  },
  {
    id: 'tr_01HZXJQ1T2',
    name: '客服知识助手',
    environment: 'staging',
    model: 'DeepSeek-V3',
    status: 'warning',
    score: 78,
    latency: '4.8s',
    cost: '$0.011',
    time: '8 分钟前',
    query: '用户说昨天充值没到账，应该如何回复？',
    answer: '建议先确认订单状态和支付渠道，再引导用户等待到账。若超过 24 小时仍未到账，收集订单号后转人工处理。',
    checks: [
      { label: '引用完整性', value: '警告', score: '0.71', tone: 'warning' },
      { label: '答案相关性', value: '通过', score: '0.91', tone: 'good' },
      { label: '事实一致性', value: '通过', score: '0.88', tone: 'good' },
      { label: '敏感信息', value: '安全', score: '1.00', tone: 'good' }
    ],
    events: [
      { type: 'input', label: '用户问题', meta: '11:36:42.520', detail: '已接收 18 tokens 的中文查询' },
      { type: 'retrieve', label: '检索知识库', meta: '11:36:42.832', detail: '召回 4 个片段，最高相似度 0.84' },
      { type: 'model', label: '模型生成', meta: '11:36:47.004', detail: 'DeepSeek-V3 · 542 output tokens' },
      { type: 'check', label: '质量门禁', meta: '11:36:47.298', detail: '引用完整性低于阈值，标记人工复核' }
    ],
    sources: [
      { title: '充值到账 FAQ.md', page: '第 2 节', quote: '通常 5 分钟内到账，超过 24 小时请转人工客服。' }
    ]
  },
  {
    id: 'tr_01HZXH5G7R',
    name: '研究资料问答',
    environment: 'production',
    model: 'GPT-4.1-mini',
    status: 'passed',
    score: 91,
    latency: '1.7s',
    cost: '$0.008',
    time: '16 分钟前',
    query: '总结这三篇论文对 RAG 评测的共同结论。',
    answer: '三篇论文都指出，单一的答案相似度不足以衡量 RAG 质量，应同时评估检索召回、上下文利用、引用可验证性和最终答案的事实一致性。',
    checks: [
      { label: '引用完整性', value: '通过', score: '0.94', tone: 'good' },
      { label: '答案相关性', value: '通过', score: '0.92', tone: 'good' },
      { label: '事实一致性', value: '通过', score: '0.90', tone: 'good' },
      { label: '敏感信息', value: '安全', score: '1.00', tone: 'good' }
    ],
    events: [
      { type: 'input', label: '用户问题', meta: '11:28:15.086', detail: '已接收 27 tokens 的中文查询' },
      { type: 'retrieve', label: '检索知识库', meta: '11:28:15.294', detail: '召回 9 个片段，覆盖 3 篇来源' },
      { type: 'model', label: '模型生成', meta: '11:28:16.682', detail: 'GPT-4.1-mini · 386 output tokens' },
      { type: 'check', label: '质量门禁', meta: '11:28:16.884', detail: '4/4 检查通过，trace 已归档' }
    ],
    sources: [
      { title: 'RAGAS: Automated Evaluation of RAG.md', page: '第 3 节', quote: 'Faithfulness and answer relevancy should be measured separately.' },
      { title: 'Evaluating Retrieval-Augmented Generation.pdf', page: '第 5 页', quote: 'Retrieval quality is a necessary but not sufficient condition.' }
    ]
  },
  {
    id: 'tr_01HZXF2M9C',
    name: '产品手册助手',
    environment: 'production',
    model: 'Qwen3-14B',
    status: 'failed',
    score: 59,
    latency: '6.2s',
    cost: '$0.006',
    time: '32 分钟前',
    query: '对比专业版和企业版的审计日志保留时间。',
    answer: '专业版和企业版都支持长期保存审计日志，具体时间请联系客服确认。',
    checks: [
      { label: '引用完整性', value: '失败', score: '0.42', tone: 'bad' },
      { label: '答案相关性', value: '警告', score: '0.64', tone: 'warning' },
      { label: '事实一致性', value: '失败', score: '0.51', tone: 'bad' },
      { label: '敏感信息', value: '安全', score: '1.00', tone: 'good' }
    ],
    events: [
      { type: 'input', label: '用户问题', meta: '11:12:04.922', detail: '已接收 22 tokens 的中文查询' },
      { type: 'retrieve', label: '检索知识库', meta: '11:12:05.310', detail: '召回 3 个片段，最高相似度 0.62' },
      { type: 'model', label: '模型生成', meta: '11:12:10.842', detail: 'Qwen3-14B · 214 output tokens' },
      { type: 'check', label: '质量门禁', meta: '11:12:11.106', detail: '事实一致性失败，自动阻断发布' }
    ],
    sources: [
      { title: '产品版本对照表.xlsx', page: '第 1 页', quote: '专业版保留 30 天，企业版保留 365 天。' }
    ]
  }
];

const navItems = [
  { label: '总览', icon: BarChart3 },
  { label: 'Trace Explorer', icon: Activity },
  { label: '评测集', icon: FileCheck2 },
  { label: '知识库', icon: Database },
  { label: '安全策略', icon: ShieldCheck }
];

function App() {
  const [activeNav, setActiveNav] = useState('总览');
  const [period, setPeriod] = useState('最近 24 小时');
  const [selectedTraceId, setSelectedTraceId] = useState(traces[0].id);
  const [filter, setFilter] = useState('全部');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState('');

  const selectedTrace = traces.find((trace) => trace.id === selectedTraceId) ?? traces[0];
  const filteredTraces = useMemo(
    () => traces.filter((trace) => filter === '全部' || trace.status === filter),
    [filter]
  );

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleRun = () => {
    setIsRunning(true);
    window.setTimeout(() => {
      setIsRunning(false);
      showToast('已创建一次演示运行，新的 Trace 将在几秒内出现');
    }, 1500);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>observatory</strong>
            <small>Agent quality control</small>
          </div>
          <button className="icon-button sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="关闭导航">
            <X size={17} />
          </button>
        </div>

        <button className="workspace-switcher">
          <span className="workspace-avatar">CN</span>
          <span className="workspace-copy">
            <b>中文 RAG 实验室</b>
            <small>个人工作区</small>
          </span>
          <ChevronDown size={16} />
        </button>

        <div className="nav-section">
          <span className="nav-label">工作台</span>
          <nav>
            {navItems.map(({ label, icon: Icon }) => (
              <button
                className={`nav-item ${activeNav === label ? 'active' : ''}`}
                key={label}
                onClick={() => {
                  setActiveNav(label);
                  setMobileNavOpen(false);
                }}
              >
                <Icon size={17} />
                <span>{label}</span>
                {label === 'Trace Explorer' && <span className="nav-count">24</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="nav-section">
          <span className="nav-label">项目</span>
          <nav>
            <button className="nav-item project-item">
              <span className="project-dot coral" />
              合同审阅助手
              <MoreHorizontal size={15} className="push-right" />
            </button>
            <button className="nav-item project-item">
              <span className="project-dot mint" />
              客服知识助手
              <MoreHorizontal size={15} className="push-right" />
            </button>
            <button className="nav-item project-item">
              <span className="project-dot blue" />
              研究资料问答
              <MoreHorizontal size={15} className="push-right" />
            </button>
            <button className="add-project">
              <Plus size={15} />
              新建项目
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="status-pill">
            <span className="status-dot" />
            所有系统正常
          </div>
          <button className="nav-item">
            <Settings2 size={17} />
            设置
          </button>
          <div className="profile">
            <div className="profile-avatar">林</div>
            <div>
              <b>林默</b>
              <small>管理员</small>
            </div>
            <MoreHorizontal size={16} className="push-right" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="打开导航">
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              <span>中文 RAG 实验室</span>
              <span className="slash">/</span>
              <strong>{activeNav}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="live-indicator">
              <span />
              实时
            </div>
            <button className="icon-button" aria-label="帮助">
              <CircleHelp size={18} />
            </button>
            <button className="icon-button notification-button" aria-label="通知">
              <Bell size={18} />
              <i />
            </button>
            <button className={`run-button ${isRunning ? 'running' : ''}`} onClick={handleRun}>
              {isRunning ? <RefreshCw size={16} className="spin" /> : <Play size={16} fill="currentColor" />}
              {isRunning ? '运行中...' : '运行演示'}
            </button>
          </div>
        </header>

        <div className="page-container">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><span /> 质量控制中心</div>
              <h1>看见每一次 Agent 决策</h1>
              <p>从输入、检索到答案，让中文 RAG 的质量、成本与风险都可被验证。</p>
            </div>
            <div className="heading-actions">
              <button className="secondary-button">
                <GitBranch size={16} />
                main
                <ChevronDown size={14} />
              </button>
              <button className="secondary-button">
                <ExternalLink size={16} />
                分享视图
              </button>
            </div>
          </section>

          <section className="stat-grid">
            <StatCard
              label="总运行次数"
              value="1,284"
              change="+18.4%"
              helper="较上一周期"
              icon={Activity}
              tone="blue"
              trend="up"
            />
            <StatCard
              label="平均质量分"
              value="91.8"
              suffix="/ 100"
              change="+4.2%"
              helper="较上一周期"
              icon={Gauge}
              tone="mint"
              trend="up"
            />
            <StatCard
              label="平均响应延迟"
              value="2.4"
              suffix="s"
              change="-12.6%"
              helper="较上一周期"
              icon={TimerReset}
              tone="violet"
              trend="down"
            />
            <StatCard
              label="本周期成本"
              value="$18.42"
              change="+6.8%"
              helper="较上一周期"
              icon={Zap}
              tone="coral"
              trend="up"
            />
          </section>

          <section className="overview-grid">
            <div className="panel trend-panel">
              <div className="panel-header">
                <div>
                  <h2>运行表现</h2>
                  <p>运行量与质量分的实时变化</p>
                </div>
                <div className="period-switcher">
                  {['最近 24 小时', '最近 7 天'].map((item) => (
                    <button className={period === item ? 'active' : ''} onClick={() => setPeriod(item)} key={item}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-legend">
                <span><i className="legend-line blue-line" />运行次数</span>
                <span><i className="legend-line mint-line" />质量分</span>
                <span className="chart-note"><span className="pulse-dot" /> 自动刷新中</span>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 16, right: 8, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="runFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6da8ff" stopOpacity={0.23} />
                        <stop offset="100%" stopColor="#6da8ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7de5b3" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#7de5b3" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1c2a3a" vertical={false} />
                    <XAxis dataKey="time" stroke="#68788b" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" stroke="#68788b" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[70, 100]} hide />
                    <Tooltip content={<ChartTooltip />} />
                    <Area yAxisId="left" type="monotone" dataKey="runs" stroke="#6da8ff" strokeWidth={2.2} fill="url(#runFill)" />
                    <Area yAxisId="right" type="monotone" dataKey="score" stroke="#7de5b3" strokeWidth={2.2} fill="url(#scoreFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footer">
                <span><TrendingUp size={15} /> 峰值出现在 16:00，质量分保持稳定</span>
                <button className="text-button">查看完整报告 <ArrowUpRight size={14} /></button>
              </div>
            </div>

            <div className="panel gate-panel">
              <div className="panel-header">
                <div>
                  <h2>质量门禁</h2>
                  <p>最近 100 次运行</p>
                </div>
                <button className="icon-button"><MoreHorizontal size={18} /></button>
              </div>
              <div className="gate-score">
                <div className="score-ring">
                  <div>
                    <strong>94<span>%</span></strong>
                    <small>通过率</small>
                  </div>
                </div>
                <div className="gate-copy">
                  <b>状态良好</b>
                  <span>比上个周期提升 7.2%</span>
                  <div className="mini-bars">
                    {[58, 70, 66, 82, 75, 91, 86, 94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
                  </div>
                </div>
              </div>
              <div className="gate-list">
                <GateRow label="引用完整性" value="98.2%" change="+2.4%" tone="mint" />
                <GateRow label="答案相关性" value="95.6%" change="+1.1%" tone="blue" />
                <GateRow label="事实一致性" value="92.8%" change="+4.7%" tone="violet" />
                <GateRow label="敏感信息拦截" value="99.9%" change="+0.2%" tone="coral" />
              </div>
              <button className="outline-wide-button">配置质量门禁 <Settings2 size={15} /></button>
            </div>
          </section>

          <section className="lower-grid">
            <div className="panel trace-panel">
              <div className="panel-header trace-header">
                <div>
                  <div className="title-with-count">
                    <h2>最近 Trace</h2>
                    <span className="count-chip">24</span>
                  </div>
                  <p>查看每一次 Agent 执行的完整上下文</p>
                </div>
                <div className="trace-controls">
                  <button className="icon-button"><Search size={17} /></button>
                  <button className="icon-button"><Filter size={17} /></button>
                  <button className="secondary-button compact"><ExternalLink size={15} /> 查看全部</button>
                </div>
              </div>
              <div className="filter-row">
                {['全部', 'passed', 'warning', 'failed'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={filter === item ? 'active' : ''}
                  >
                    {item === '全部' ? '全部' : item === 'passed' ? '通过' : item === 'warning' ? '警告' : '失败'}
                  </button>
                ))}
              </div>
              <div className="trace-list">
                {filteredTraces.map((trace) => (
                  <TraceRow
                    trace={trace}
                    selected={trace.id === selectedTraceId}
                    key={trace.id}
                    onClick={() => setSelectedTraceId(trace.id)}
                  />
                ))}
              </div>
            </div>

            <div className="panel detail-panel">
              <div className="panel-header">
                <div>
                  <div className="detail-kicker"><span className={`status-dot ${selectedTrace.status}`} /> {selectedTrace.environment}</div>
                  <h2>{selectedTrace.name}</h2>
                  <p className="trace-id">{selectedTrace.id} · {selectedTrace.time}</p>
                </div>
                <button className="icon-button"><MoreHorizontal size={18} /></button>
              </div>
              <div className="detail-meta">
                <MetaItem icon={Bot} label="模型" value={selectedTrace.model} />
                <MetaItem icon={Clock3} label="延迟" value={selectedTrace.latency} />
                <MetaItem icon={Zap} label="成本" value={selectedTrace.cost} />
              </div>
              <div className="detail-section">
                <div className="section-label"><TerminalSquare size={14} /> 用户输入</div>
                <div className="query-box">{selectedTrace.query}</div>
              </div>
              <div className="detail-section">
                <div className="section-label"><Sparkles size={14} /> Agent 输出 <button className="copy-button" onClick={() => { navigator.clipboard?.writeText(selectedTrace.answer); showToast('答案已复制到剪贴板'); }}><Copy size={13} /> 复制</button></div>
                <div className="answer-box">{selectedTrace.answer}</div>
              </div>
              <div className="detail-section">
                <div className="section-label"><ShieldCheck size={14} /> 质量检查</div>
                <div className="check-grid">
                  {selectedTrace.checks.map((check) => (
                    <div className="check-item" key={check.label}>
                      <div className={`check-icon ${check.tone}`}><Check size={13} /></div>
                      <div>
                        <span>{check.label}</span>
                        <b>{check.value}</b>
                      </div>
                      <em>{check.score}</em>
                    </div>
                  ))}
                </div>
              </div>
              <button className="outline-wide-button" onClick={() => showToast('Trace 回放已加入队列')}>
                <RefreshCw size={15} /> 回放此 Trace
              </button>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel timeline-panel">
              <div className="panel-header">
                <div>
                  <h2>执行时间线</h2>
                  <p>按顺序还原 Agent 的决策路径</p>
                </div>
                <button className="text-button">查看原始 JSON <Code2 size={14} /></button>
              </div>
              <div className="timeline">
                {selectedTrace.events.map((event, index) => (
                  <TimelineItem event={event} index={index} key={`${event.label}-${index}`} />
                ))}
              </div>
            </div>
            <div className="panel sources-panel">
              <div className="panel-header">
                <div>
                  <h2>引用验证</h2>
                  <p>答案中的事实来自哪里</p>
                </div>
                <div className="verified-label"><CheckCircle2 size={15} /> 已验证</div>
              </div>
              <div className="source-list">
                {selectedTrace.sources.map((source) => (
                  <div className="source-item" key={`${source.title}-${source.page}`}>
                    <div className="source-icon"><BookOpen size={16} /></div>
                    <div className="source-copy">
                      <div><b>{source.title}</b><span>{source.page}</span></div>
                      <p>“{source.quote}”</p>
                    </div>
                    <ExternalLink size={15} className="source-link" />
                  </div>
                ))}
              </div>
              <div className="source-footer"><LockKeyhole size={14} /> 来源已锁定，内容未经模型改写</div>
            </div>
          </section>

          <footer className="page-footer">
            <span><span className="footer-orb" /> 数据每 30 秒自动刷新</span>
            <span>Agent Observatory v0.1 · 本地演示模式</span>
          </footer>
        </div>
      </main>

      {toast && <div className="toast"><CheckCircle2 size={16} /> {toast}</div>}
    </div>
  );
}

function StatCard({ label, value, suffix, change, helper, icon: Icon, tone, trend }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={18} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}<small>{suffix}</small></div>
      <div className={`stat-change ${trend}`}><span>{trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}</span> <em>{helper}</em></div>
    </div>
  );
}

function GateRow({ label, value, change, tone }) {
  return (
    <div className="gate-row">
      <span className={`gate-dot ${tone}`} />
      <span>{label}</span>
      <b>{value}</b>
      <em><ArrowUpRight size={12} />{change}</em>
    </div>
  );
}

function TraceRow({ trace, selected, onClick }) {
  return (
    <button className={`trace-row ${selected ? 'selected' : ''}`} onClick={onClick}>
      <span className={`trace-status ${trace.status}`}>
        {trace.status === 'passed' ? <CheckCircle2 size={17} /> : trace.status === 'warning' ? <AlertTriangle size={17} /> : <X size={17} />}
      </span>
      <span className="trace-main">
        <b>{trace.name}</b>
        <small>{trace.id} · {trace.model}</small>
      </span>
      <span className={`environment ${trace.environment}`}>{trace.environment}</span>
      <span className="trace-score"><strong>{trace.score}</strong><small>/ 100</small></span>
      <span className="trace-latency">{trace.latency}</span>
      <span className="trace-time">{trace.time}</span>
      <ChevronDown size={16} className="trace-chevron" />
    </button>
  );
}

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="meta-item">
      <Icon size={14} />
      <div><small>{label}</small><b>{value}</b></div>
    </div>
  );
}

function TimelineItem({ event, index }) {
  const Icon = event.type === 'input' ? TerminalSquare : event.type === 'retrieve' ? Search : event.type === 'tool' ? Layers3 : event.type === 'model' ? Sparkles : ShieldCheck;
  return (
    <div className="timeline-item">
      <div className={`timeline-icon ${event.type}`}><Icon size={15} /></div>
      <div className="timeline-line" />
      <div className="timeline-copy">
        <div><b>{event.label}</b><span>{event.meta}</span></div>
        <p>{event.detail}</p>
      </div>
      {index === 0 && <span className="timeline-badge">start</span>}
      {index === 4 && <span className="timeline-badge done">done</span>}
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <b>{label}</b>
      {payload.map((entry) => (
        <span key={entry.dataKey} style={{ color: entry.color }}>
          {entry.dataKey === 'runs' ? '运行次数' : '质量分'} <strong>{entry.value}{entry.dataKey === 'score' ? '' : ' 次'}</strong>
        </span>
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
