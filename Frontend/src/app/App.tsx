import { useState, useEffect, useRef } from "react";
import sarathiLogo from "../imports/Media.jpg";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from "recharts";
import { motion } from "motion/react";
import {
  LayoutDashboard, FolderKanban, BarChart3, Brain, FileText,
  Users, Settings, Bell, Search, ChevronDown, ChevronRight,
  AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown,
  Clock, Activity, Zap, Shield, RefreshCw, Database, GitBranch,
  Layers, Target, Calendar, Filter, Download, Plus, MoreVertical,
  ArrowRight, Loader2, Eye, Edit2, Trash2, UserPlus, Key, Lock,
  Globe, Mail, Server, HardDrive, LogOut, ChevronLeft, MessageSquare,
  Send, Bot, Sparkles, Flag, Bug, GitPullRequest, Package, Play,
  RotateCcw, ExternalLink, Building2, GitCommit, Terminal, Upload,
  Copy, Info, AlertCircle, X, Menu, Award, Cpu, Wifi, Home,
  ArrowUpRight, ArrowDownRight, Minus, CheckSquare, List,
  Percent, Star, Briefcase, GitMerge, Inbox, Hash, Check,
  BarChart2, User, PhoneCall, Gauge, Radio, Triangle, Hexagon
} from "lucide-react";

// ──────────────────────────────────────────────
// ROLES
// ──────────────────────────────────────────────
type Role = "org-admin" | "pm" | "it-admin";

const USER_ROLES: Record<string, Role> = {
  "pradeepadmin@gmail.com": "org-admin",
  "deepthiadmin@gmail.com": "org-admin",
  "sripriyaadmin@gmail.com": "org-admin",
  "tiruadmin@gmail.com": "org-admin",
  "hemanthadmin@gmail.com": "org-admin",
  "pradeepmanager@gmail.com": "pm",
  "hemanthmanager@gmail.com": "pm",
  "deepthimanager@gmail.com": "pm",
  "sripriyamanager@gmail.com": "pm",
  "tirumanager@gmail.com": "pm",
  "sarathiadmin@gmail.com": "it-admin",
};

const ROLE_DEFAULT_SCREEN: Record<Role, string> = {
  "org-admin": "org-admin",
  pm: "pm-dashboard",
  "it-admin": "it-admin",
};

const ROLE_LABEL: Record<Role, string> = {
  "org-admin": "Organization Administrator",
  pm: "Project Manager",
  "it-admin": "IT Administrator",
};

const getDisplayName = (email: string): string => {
  const prefix = email.split("@")[0];
  return prefix
    .replace(/(admin|manager)$/i, "")
    .replace(/^(.)/, (c) => c.toUpperCase());
};

// ──────────────────────────────────────────────
// COLORS
// ──────────────────────────────────────────────
const C = {
  blue: "#2563EB",
  green: "#16A34A",
  amber: "#D97706",
  red: "#DC2626",
  purple: "#7C3AED",
  indigo: "#4F46E5",
  teal: "#0D9488",
  pink: "#DB2777",
};

// ──────────────────────────────────────────────
// SAMPLE DATA
// ──────────────────────────────────────────────
const PROJECTS = [
  { id: 1, name: "RetailX-Commerce", code: "RXC", health: 87, status: "on-track", team: 12, sprint: 14, completion: 76, velocity: 48, org: "Contoso Retail", budget: "₹2.4Cr", risk: 22 },
  { id: 2, name: "FinBank Mobile", code: "FBM", health: 62, status: "at-risk", team: 8, sprint: 9, completion: 54, velocity: 32, org: "FinBank Corp", budget: "₹1.8Cr", risk: 68 },
  { id: 3, name: "SmartHR Portal", code: "SHP", health: 91, status: "on-track", team: 15, sprint: 22, completion: 88, velocity: 56, org: "SmartHR Inc", budget: "₹3.1Cr", risk: 14 },
  { id: 4, name: "AI Support Desk", code: "ASD", health: 45, status: "critical", team: 6, sprint: 5, completion: 38, velocity: 24, org: "Contoso Corp", budget: "₹0.9Cr", risk: 85 },
  { id: 5, name: "Customer Analytics", code: "CAN", health: 78, status: "on-track", team: 10, sprint: 11, completion: 71, velocity: 40, org: "Analytics Co", budget: "₹1.5Cr", risk: 31 },
];

const SPRINT_TREND = [
  { sprint: "S10", planned: 45, completed: 42, velocity: 42 },
  { sprint: "S11", planned: 50, completed: 44, velocity: 44 },
  { sprint: "S12", planned: 48, completed: 48, velocity: 48 },
  { sprint: "S13", planned: 52, completed: 46, velocity: 46 },
  { sprint: "S14", planned: 55, completed: 50, velocity: 50 },
];

const BURNDOWN = [
  { day: "D1", ideal: 80, actual: 80, scope: 82 },
  { day: "D2", ideal: 72, actual: 76, scope: 82 },
  { day: "D3", ideal: 64, actual: 69, scope: 80 },
  { day: "D4", ideal: 56, actual: 62, scope: 80 },
  { day: "D5", ideal: 48, actual: 54, scope: 80 },
  { day: "D6", ideal: 40, actual: 45, scope: 78 },
  { day: "D7", ideal: 32, actual: 37, scope: 78 },
  { day: "D8", ideal: 24, actual: 28, scope: 78 },
  { day: "D9", ideal: 16, actual: 19, scope: 78 },
  { day: "D10", ideal: 8, actual: 10, scope: 78 },
];

const VELOCITY_DATA = [
  { project: "RetailX", velocity: 48, target: 50 },
  { project: "FinBank", velocity: 32, target: 45 },
  { project: "SmartHR", velocity: 56, target: 52 },
  { project: "AI Desk", velocity: 24, target: 40 },
  { project: "Analytics", velocity: 40, target: 42 },
];

const KPI_TREND = [
  { month: "Jan", sprintRate: 82, defect: 1.2, buildSuccess: 88, velocity: 38 },
  { month: "Feb", sprintRate: 85, defect: 1.0, buildSuccess: 91, velocity: 42 },
  { month: "Mar", sprintRate: 80, defect: 1.4, buildSuccess: 87, velocity: 40 },
  { month: "Apr", sprintRate: 88, defect: 0.9, buildSuccess: 93, velocity: 45 },
  { month: "May", sprintRate: 87, defect: 0.8, buildSuccess: 94, velocity: 48 },
  { month: "Jun", sprintRate: 91, defect: 0.7, buildSuccess: 96, velocity: 50 },
];

const RISK_RADAR = [
  { subject: "Schedule", A: 72, fullMark: 100 },
  { subject: "Quality", A: 45, fullMark: 100 },
  { subject: "Scope", A: 60, fullMark: 100 },
  { subject: "Technical", A: 55, fullMark: 100 },
  { subject: "Dependency", A: 38, fullMark: 100 },
  { subject: "Resource", A: 48, fullMark: 100 },
];

const RISK_TREND = [
  { month: "Jan", schedule: 65, quality: 50, scope: 55, technical: 60 },
  { month: "Feb", schedule: 68, quality: 52, scope: 58, technical: 62 },
  { month: "Mar", schedule: 70, quality: 48, scope: 60, technical: 58 },
  { month: "Apr", schedule: 74, quality: 44, scope: 62, technical: 56 },
  { month: "May", schedule: 72, quality: 45, scope: 60, technical: 55 },
  { month: "Jun", schedule: 72, quality: 45, scope: 60, technical: 55 },
];

const HEALTH_DONUT = [
  { name: "On Track", value: 3, color: C.green },
  { name: "At Risk", value: 1, color: C.amber },
  { name: "Critical", value: 1, color: C.red },
];

const PIPELINE_DATA = [
  { project: "RetailX-Commerce", branch: "main", status: "success", build: "#312", duration: "3m 42s", triggered: "2h ago" },
  { project: "FinBank Mobile", branch: "release/v2.4", status: "failed", build: "#147", duration: "1m 15s", triggered: "4h ago" },
  { project: "SmartHR Portal", branch: "main", status: "success", build: "#589", duration: "4m 08s", triggered: "30m ago" },
  { project: "AI Support Desk", branch: "feature/chat-v2", status: "running", build: "#89", duration: "2m 10s", triggered: "5m ago" },
  { project: "Customer Analytics", branch: "main", status: "success", build: "#203", duration: "5m 21s", triggered: "1h ago" },
];

const ACTIVITY_FEED = [
  { user: "SJ", name: "Sarah Johnson", action: "closed Sprint 14 for RetailX-Commerce", time: "5m ago", type: "sprint" },
  { user: "MC", name: "Michael Chen", action: "raised a critical bug in FinBank Mobile", time: "12m ago", type: "bug" },
  { user: "PP", name: "Priya Patel", action: "merged PR #142 — SmartHR Portal auth module", time: "28m ago", type: "pr" },
  { user: "AI", name: "Sarathi AI", action: "detected scope creep risk in AI Support Desk", time: "1h ago", type: "ai" },
  { user: "JW", name: "James Wilson", action: "exported Executive Report for Q2 2024", time: "2h ago", type: "report" },
  { user: "LR", name: "Lisa Rodriguez", action: "triggered manual sync for Customer Analytics", time: "2h ago", type: "sync" },
];

const TEAM_MEMBERS = [
  { id: 1, name: "Sarah Johnson", role: "Tech Lead", avatar: "SJ", project: "RetailX-Commerce", util: 95, tasks: 8, bugs: 2 },
  { id: 2, name: "Michael Chen", role: "Senior Dev", avatar: "MC", project: "FinBank Mobile", util: 78, tasks: 5, bugs: 4 },
  { id: 3, name: "Priya Patel", role: "Business Analyst", avatar: "PP", project: "SmartHR Portal", util: 88, tasks: 12, bugs: 1 },
  { id: 4, name: "James Wilson", role: "QA Lead", avatar: "JW", project: "AI Support Desk", util: 65, tasks: 4, bugs: 7 },
  { id: 5, name: "Lisa Rodriguez", role: "DevOps Engineer", avatar: "LR", project: "Customer Analytics", util: 82, tasks: 6, bugs: 0 },
  { id: 6, name: "Raj Kumar", role: "Senior Dev", avatar: "RK", project: "RetailX-Commerce", util: 91, tasks: 9, bugs: 1 },
];

const AUDIT_LOGS = [
  { time: "2024-06-10 14:32", user: "sarah.j@contoso.com", action: "Sync Triggered", resource: "RetailX-Commerce", status: "success", ip: "10.0.0.45" },
  { time: "2024-06-10 14:15", user: "admin@sarathi.ai", action: "User Invited", resource: "m.chen@finbank.com", status: "success", ip: "10.0.0.1" },
  { time: "2024-06-10 13:58", user: "system", action: "Pipeline Failed", resource: "FinBank Mobile / Build #147", status: "failed", ip: "-" },
  { time: "2024-06-10 13:30", user: "j.wilson@contoso.com", action: "Report Exported", resource: "Executive Summary - May 2024", status: "success", ip: "192.168.1.12" },
  { time: "2024-06-10 12:45", user: "system", action: "AI Analysis Complete", resource: "Risk Assessment - Q2", status: "success", ip: "-" },
  { time: "2024-06-10 11:20", user: "p.patel@smarthr.com", action: "Sprint Closed", resource: "SmartHR Portal / Sprint 22", status: "success", ip: "10.0.1.88" },
  { time: "2024-06-10 10:05", user: "system", action: "Sync Failed", resource: "AI Support Desk", status: "failed", ip: "-" },
  { time: "2024-06-10 09:30", user: "admin@sarathi.ai", action: "Role Updated", resource: "l.rodriguez@analytics.co", status: "success", ip: "10.0.0.1" },
  { time: "2024-06-10 09:00", user: "itadmin@sarathi.ai", action: "PAT Token Refreshed", resource: "Azure DevOps - Analytics Co", status: "success", ip: "10.0.0.2" },
];

const NOTIFICATIONS = [
  { id: 1, type: "critical", title: "Pipeline Failure", message: "FinBank Mobile build #147 failed at QA stage with 3 test failures", time: "5 min ago", read: false },
  { id: 2, type: "warning", title: "Sprint Delay Risk", message: "AI Support Desk Sprint 5 is 38% behind schedule with 3 days remaining", time: "23 min ago", read: false },
  { id: 3, type: "info", title: "AI Analysis Ready", message: "Q2 Risk Assessment report has been generated and is ready for review", time: "1 hr ago", read: false },
  { id: 4, type: "success", title: "Sync Completed", message: "RetailX-Commerce synchronized successfully — 142 items updated", time: "2 hr ago", read: true },
  { id: 5, type: "warning", title: "Critical Risk Detected", message: "Scope creep detected in AI Support Desk — estimated +12 story points", time: "3 hr ago", read: true },
  { id: 6, type: "info", title: "Approval Required", message: "Sprint 15 plan for RetailX-Commerce requires your approval before start", time: "5 hr ago", read: true },
  { id: 7, type: "success", title: "Sprint Completed", message: "SmartHR Portal Sprint 22 closed with 88% completion rate", time: "6 hr ago", read: true },
];

const SYNC_JOBS = [
  { org: "Contoso Retail", project: "RetailX-Commerce", lastSync: "10 min ago", nextSync: "50 min", status: "success", items: 142, duration: "2.3s", errors: 0 },
  { org: "FinBank Corp", project: "FinBank Mobile", lastSync: "Failed", nextSync: "Manual", status: "failed", items: 0, duration: "-", errors: 3 },
  { org: "SmartHR Inc", project: "SmartHR Portal", lastSync: "1 hr ago", nextSync: "5 min", status: "success", items: 289, duration: "4.1s", errors: 0 },
  { org: "Contoso Corp", project: "AI Support Desk", lastSync: "3 hr ago", nextSync: "Pending", status: "warning", items: 47, duration: "1.8s", errors: 1 },
  { org: "Analytics Co", project: "Customer Analytics", lastSync: "30 min ago", nextSync: "30 min", status: "success", items: 196, duration: "3.2s", errors: 0 },
];

const USERS = [
  { id: 1, name: "Admin User", email: "admin@sarathi.ai", role: "Org Admin", status: "active", lastLogin: "Today 14:30", projects: 5 },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@contoso.com", role: "Project Manager", status: "active", lastLogin: "Today 13:15", projects: 2 },
  { id: 3, name: "Michael Chen", email: "m.chen@finbank.com", role: "Project Manager", status: "active", lastLogin: "Yesterday", projects: 1 },
  { id: 4, name: "Priya Patel", email: "p.patel@smarthr.com", role: "Project Manager", status: "active", lastLogin: "Today 10:20", projects: 1 },
  { id: 5, name: "IT Admin", email: "itadmin@sarathi.ai", role: "IT Admin", status: "active", lastLogin: "Today 09:00", projects: 5 },
  { id: 6, name: "James Wilson", email: "j.wilson@contoso.com", role: "Project Manager", status: "inactive", lastLogin: "3 days ago", projects: 1 },
];

const SPRINT_BOARD = {
  todo: [
    { id: 1, title: "Implement payment gateway v3", points: 8, assignee: "RK", priority: "high" },
    { id: 2, title: "Refactor product catalog API", points: 5, assignee: "SJ", priority: "medium" },
    { id: 3, title: "Setup Redis cache layer", points: 3, assignee: "LR", priority: "low" },
  ],
  inProgress: [
    { id: 4, title: "User authentication with Entra ID", points: 13, assignee: "MC", priority: "critical" },
    { id: 5, title: "Sprint dashboard UI components", points: 8, assignee: "PP", priority: "high" },
  ],
  review: [
    { id: 6, title: "Checkout flow optimization", points: 5, assignee: "SJ", priority: "high" },
    { id: 7, title: "Mobile responsive fixes", points: 3, assignee: "JW", priority: "medium" },
  ],
  done: [
    { id: 8, title: "Database schema migration", points: 8, assignee: "RK", priority: "high" },
    { id: 9, title: "Email notification service", points: 5, assignee: "LR", priority: "medium" },
    { id: 10, title: "API rate limiting middleware", points: 3, assignee: "MC", priority: "low" },
  ],
};

const AI_CHAT = [
  { role: "assistant", msg: "Hello! I'm Sarathi AI. I can analyze your portfolio, predict delivery risks, generate insights, and answer questions about your projects. How can I help you today?" },
  { role: "user", msg: "What is the risk status of FinBank Mobile this sprint?" },
  { role: "assistant", msg: "FinBank Mobile has a **high risk score of 68/100** this sprint. Key concerns:\n\n• Build #147 failed in QA stage (3 test failures in payment module)\n• Sprint 9 velocity (32 pts) is 29% below target (45 pts)\n• 2 critical bugs unresolved (P1 severity)\n• Team capacity at 78% — Michael Chen is blocked on auth module\n\n**AI Recommendation:** Prioritize payment module fixes immediately. Consider pulling in 1-2 story points from backlog and escalating the auth blocker to architecture team." },
  { role: "user", msg: "Which project has the best delivery health?" },
  { role: "assistant", msg: "**SmartHR Portal** leads with a delivery health score of **91/100** across all metrics:\n\n• Sprint Completion: 88% (above 85% target)\n• Velocity: 56 pts (8% above target of 52)\n• Defect Density: 0.4/KLoC (excellent)\n• Build Success Rate: 97%\n• Team Utilization: balanced at 78-88%\n\nSmartHR Portal is on track for their Q3 milestone delivery on July 28, 2024. Recommend showcasing their sprint ceremonies as a best-practice model for other teams." },
];

// ──────────────────────────────────────────────
// SHARED COMPONENTS
// ──────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const cfg: Record<string, { bg: string; text: string; dot: string; label: string }> = {
    "on-track": { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", label: "On Track" },
    "at-risk": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "At Risk" },
    critical: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", label: "Critical" },
    success: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", label: "Success" },
    failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", label: "Failed" },
    warning: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "Warning" },
    running: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", label: "Running" },
    active: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", label: "Active" },
    inactive: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400", label: "Inactive" },
  };
  const c = cfg[status] || cfg.active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

const KPICard = ({ title, value, change, changeType, icon: Icon, color, subtitle }: {
  title: string; value: string | number; change?: string; changeType?: "up" | "down" | "stable";
  icon: any; color: string; subtitle?: string;
}) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.2 }}
    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-default"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2.5 rounded-xl ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      {change && (
        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${
          changeType === "up" ? "text-green-700 bg-green-50" :
          changeType === "down" ? "text-red-700 bg-red-50" :
          "text-gray-500 bg-gray-50"
        }`}>
          {changeType === "up" ? <TrendingUp size={10} /> : changeType === "down" ? <TrendingDown size={10} /> : <Minus size={10} />}
          {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
    <div className="text-sm font-medium text-gray-600">{title}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
  </motion.div>
);

const ProgressBar = ({ value, color = "bg-blue-500", height = "h-2" }: { value: number; color?: string; height?: string }) => (
  <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden`}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(value, 100)}%` }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`${height} ${color} rounded-full`}
    />
  </div>
);

const Card = ({ children, className = "", padding = "p-5" }: { children: React.ReactNode; className?: string; padding?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${padding} ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => (
  <div className="flex items-start justify-between mb-5">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2 flex-shrink-0 ml-4">{actions}</div>}
  </div>
);

const Avatar = ({ initials, size = "sm", colorIdx }: { initials: string; size?: "xs" | "sm" | "md" | "lg"; colorIdx?: number }) => {
  const colors = ["bg-blue-500", "bg-purple-500", "bg-green-600", "bg-amber-500", "bg-red-500", "bg-indigo-500", "bg-teal-500"];
  const bg = colors[(colorIdx ?? initials.charCodeAt(0)) % colors.length];
  const sizes = { xs: "w-6 h-6 text-xs", sm: "w-8 h-8 text-xs", md: "w-9 h-9 text-sm", lg: "w-11 h-11 text-base" };
  return (
    <div className={`${bg} ${sizes[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
};

const AIInsightCard = ({ title, insight, type = "info", action }: { title: string; insight: string; type?: "info" | "warning" | "success" | "critical"; action?: string }) => {
  const cfg = {
    info: { border: "border-blue-100 bg-blue-50/60", icon: Info, iconColor: "text-blue-500" },
    warning: { border: "border-amber-100 bg-amber-50/60", icon: AlertTriangle, iconColor: "text-amber-500" },
    success: { border: "border-green-100 bg-green-50/60", icon: CheckCircle, iconColor: "text-green-500" },
    critical: { border: "border-red-100 bg-red-50/60", icon: AlertCircle, iconColor: "text-red-500" },
  };
  const c = cfg[type];
  return (
    <div className={`border rounded-xl p-4 ${c.border}`}>
      <div className="flex gap-3">
        <c.icon size={15} className={`${c.iconColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles size={11} className="text-purple-500" />
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">AI Insight</span>
          </div>
          <p className="text-xs font-semibold text-gray-800 mb-1">{title}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{insight}</p>
          {action && (
            <button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              {action} <ArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Tooltip_ = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-3 min-w-[140px]">
      <p className="text-xs font-semibold text-gray-500 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-3 text-xs mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
            <span className="text-gray-500 truncate">{p.name}</span>
          </div>
          <span className="font-bold text-gray-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const Btn = ({ children, variant = "primary", size = "sm", onClick, className = "", icon: Icon }: any) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
  };
  const sizes = { xs: "px-2.5 py-1.5 text-xs", sm: "px-3 py-2 text-xs", md: "px-4 py-2.5 text-sm" };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg transition-all ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${className}`}
    >
      {Icon && <Icon size={size === "md" ? 15 : 13} />}
      {children}
    </button>
  );
};

const HealthBar = ({ value }: { value: number }) => {
  const color = value >= 80 ? "bg-green-500" : value >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-bold ${value >= 80 ? "text-green-600" : value >= 60 ? "text-amber-600" : "text-red-600"}`}>{value}%</span>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: LOGIN
// ──────────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: (email: string, role: Role) => void }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const trimmed = email.trim().toLowerCase();
  const detectedRole = USER_ROLES[trimmed];

  const handleSignIn = () => {
    if (!email.includes("@")) { setError("Enter a valid work email."); return; }
    if (!detectedRole) { setError("This email is not registered in Sarathi AI. Contact your administrator."); return; }
    setError(""); setStep("loading");
    setTimeout(() => { setStep("success"); setTimeout(() => onLogin(trimmed, detectedRole), 900); }, 2200);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-2xl" />
        </div>
        <div className="relative z-10">
          <div className="mb-16">
            <img src={sarathiLogo} alt="Sarathi AI" className="h-20 object-contain brightness-0 invert" />
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Intelligent governance<br />for every sprint.
          </h1>
          <p className="text-blue-100 text-base leading-relaxed max-w-sm">
            AI-powered insights, real-time KPI monitoring, and predictive risk analysis—all integrated with your Azure DevOps ecosystem.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Projects Monitored", value: "5" },
            { label: "Sprints Tracked", value: "61" },
            { label: "AI Insights Daily", value: "340+" },
          ].map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-200 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <img src={sarathiLogo} alt="Sarathi AI" className="h-8 object-contain" />
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {step === "idle" ? (
              <>
                <div className="flex justify-center mb-5">
                  <img src={sarathiLogo} alt="Sarathi AI" className="h-12 object-contain" />
                </div>
                <div className="mb-7">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
                  <p className="text-gray-500 text-sm">Sign in with your registered Sarathi AI account</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(""); }}
                      onKeyDown={e => e.key === "Enter" && handleSignIn()}
                      placeholder="name@company.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
                    />
                    {email && detectedRole && (
                      <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <CheckCircle size={11} />
                        Recognized as {ROLE_LABEL[detectedRole]}
                      </p>
                    )}
                    {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignIn}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Shield size={16} />
                    Sign In to Sarathi AI
                  </motion.button>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Lock size={10} />Secured by Entra ID</span>
                  <span className="flex items-center gap-1"><Shield size={10} />SOC 2 Type II</span>
                  <span className="flex items-center gap-1"><Globe size={10} />ISO 27001</span>
                </div>
              </>
            ) : step === "loading" ? (
              <div className="text-center py-10">
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-800 font-semibold mb-1">Authenticating...</p>
                <p className="text-gray-400 text-sm">Verifying your Sarathi AI credentials</p>
                <div className="mt-4 space-y-1.5 text-left max-w-xs mx-auto">
                  {["Contacting identity provider", "Validating organization access", "Loading workspace"].map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.6 }}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <CheckCircle size={12} className="text-green-500" />
                      {s}
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </motion.div>
                <p className="text-gray-900 font-semibold mb-1">Authentication successful</p>
                <p className="text-gray-400 text-sm">Redirecting to your dashboard...</p>
              </div>
            )}
          </div>

          <p className="text-center text-gray-400 text-xs mt-5">
            © 2025 Sarathi AI · Enterprise Delivery Governance Platform
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: "Dashboards",
    items: [
      { id: "org-admin", label: "Executive Overview", icon: LayoutDashboard, roles: ["org-admin"] as Role[] },
      { id: "pm-dashboard", label: "PM Dashboard", icon: Briefcase, roles: ["pm"] as Role[] },
      { id: "it-admin", label: "IT Admin", icon: Server, roles: ["it-admin"] as Role[] },
      { id: "portfolio", label: "Portfolio", icon: FolderKanban, roles: ["org-admin", "pm"] as Role[] },
    ],
  },
  {
    label: "Projects",
    items: [
      { id: "project-details", label: "Project Details", icon: Layers, roles: ["org-admin", "pm", "it-admin"] as Role[] },
      { id: "sprint", label: "Sprint Governance", icon: Target, roles: ["org-admin", "pm"] as Role[] },
    ],
  },
  {
    label: "Analytics",
    items: [
      { id: "kpi", label: "KPI Dashboard", icon: BarChart3, roles: ["org-admin", "pm"] as Role[] },
      { id: "ai-risk", label: "AI Risk Analysis", icon: Shield, roles: ["org-admin", "pm"] as Role[] },
      { id: "ai-insights", label: "AI Insights", icon: Brain, roles: ["org-admin", "pm"] as Role[] },
      { id: "ai-reports", label: "Executive Reports", icon: FileText, roles: ["org-admin"] as Role[] },
    ],
  },
  {
    label: "Administration",
    items: [
      { id: "users", label: "User Management", icon: Users, roles: ["org-admin", "it-admin"] as Role[] },
      { id: "sync", label: "Sync Monitor", icon: RefreshCw, roles: ["it-admin"] as Role[] },
      { id: "audit", label: "Audit Logs", icon: Terminal, roles: ["org-admin", "it-admin"] as Role[] },
      { id: "settings", label: "Settings", icon: Settings, roles: ["org-admin", "pm", "it-admin"] as Role[] },
    ],
  },
];

const Sidebar = ({ currentScreen, onNavigate, role, collapsed, onToggle }: {
  currentScreen: string; onNavigate: (s: string) => void; role: Role; collapsed: boolean; onToggle: () => void;
}) => {
  return (
    <motion.div
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="bg-slate-900 h-screen flex flex-col flex-shrink-0 overflow-hidden select-none"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Logo */}
     
{/* <div className="h-16 flex items-center px-3 border-b border-slate-800 flex-shrink-0">
  <img
    src={sarathiLogo}
    alt="Sarathi AI"
    className={`object-contain rounded-[20px] transition-all duration-300 ${
      collapsed ? "w-10 h-10" : "w-12 h-12"
    }`}
  />
</div> */}

      {/* Logo */}

{/* Logo */}
<div className="h-20 flex items-center pl-4 border-b border-slate-800 flex-shrink-0">
  <div className="bg-white p-2 rounded-[20px] shadow-md">
    <img
      src={sarathiLogo}
      alt="Sarathi AI"
      className={`object-contain rounded-[20px] ${
        collapsed ? "w-12 h-12" : "w-16 h-16"
      }`}
    />
  </div>
</div>


      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4 scrollbar-hide">
        {NAV_GROUPS.map(group => {
          const visibleItems = group.items.filter(item => item.roles.includes(role));
          if (!visibleItems.length) return null;
          return (
            <div key={group.label}>
              {!collapsed && (
                <div className="px-3 mb-1 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {visibleItems.map(item => {
                  const active = currentScreen === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onNavigate(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${
                        active
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      }`}
                    >
                      <item.icon size={16} className="flex-shrink-0" />
                      {!collapsed && <span className="text-xs font-medium truncate">{item.label}</span>}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-slate-800 space-y-1">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────
// TOP NAV
// ──────────────────────────────────────────────
const SCREEN_LABELS: Record<string, string> = {
  "org-admin": "Executive Dashboard", "pm-dashboard": "PM Dashboard",
  "it-admin": "IT Admin", portfolio: "Portfolio", "project-details": "Project Details",
  sprint: "Sprint Governance", kpi: "KPI Dashboard", "ai-risk": "AI Risk Analysis",
  "ai-reports": "AI Executive Reports", "ai-insights": "AI Insights",
  users: "User & Role Management", sync: "Sync Monitor", audit: "Audit Logs",
  notifications: "Notifications", settings: "Settings",
};

const ROLE_BADGE_COLOR: Record<Role, string> = {
  "org-admin": "bg-blue-100 text-blue-700",
  pm: "bg-green-100 text-green-700",
  "it-admin": "bg-purple-100 text-purple-700",
};

const TopNav = ({ currentScreen, role, email, unreadCount, onNavigate, onLogout }: {
  currentScreen: string; role: Role; email: string; unreadCount: number;
  onNavigate: (s: string) => void; onLogout: () => void;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const displayName = getDisplayName(email);

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-3 flex-shrink-0" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-400 text-xs">Sarathi AI</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-800 font-semibold text-xs truncate">{SCREEN_LABELS[currentScreen]}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${ROLE_BADGE_COLOR[role]}`}>
            {ROLE_LABEL[role]}
          </span>
        </div>
      </div>

      {searchOpen ? (
        <motion.div initial={{ width: 40, opacity: 0 }} animate={{ width: 260, opacity: 1 }}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
          <Search size={13} className="text-gray-400 flex-shrink-0" />
          <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects, sprints, KPIs..."
            className="flex-1 text-xs outline-none bg-transparent" />
          <button onClick={() => { setSearchOpen(false); setSearch(""); }}>
            <X size={13} className="text-gray-400 hover:text-gray-600" />
          </button>
        </motion.div>
      ) : (
        <button onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-2 text-xs hover:bg-gray-50 transition-colors">
          <Search size={13} />
          <span className="hidden sm:block text-gray-400">Search...</span>
          <span className="hidden md:flex items-center gap-0.5 text-[10px] border border-gray-200 rounded px-1 py-0.5 text-gray-300">⌘K</span>
        </button>
      )}

      <button onClick={() => onNavigate("notifications")}
        className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
        <Bell size={17} />
        {unreadCount > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </motion.span>
        )}
      </button>

      <div className="relative">
        <button onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          <Avatar initials={displayName.slice(0, 2).toUpperCase()} size="sm" colorIdx={0} />
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-gray-900 leading-tight">{displayName}</div>
            <div className="text-[10px] text-gray-400">{email}</div>
          </div>
          <ChevronDown size={13} className="text-gray-400" />
        </button>
        {profileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-900">{displayName}</div>
              <div className="text-xs text-gray-400 mt-0.5">{email}</div>
              <div className={`text-[10px] font-semibold mt-1.5 px-1.5 py-0.5 rounded-full inline-block ${ROLE_BADGE_COLOR[role]}`}>
                {ROLE_LABEL[role]}
              </div>
            </div>
            <button onClick={() => { onNavigate("settings"); setProfileOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Settings size={13} />Settings
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button onClick={() => { setProfileOpen(false); onLogout(); }}
              className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors">
              <LogOut size={13} />Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: ORG ADMIN DASHBOARD
// ──────────────────────────────────────────────
const OrgAdminDashboard = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  const kpis = [
    { title: "Portfolio Health", value: "87%", change: "+4%", changeType: "up" as const, icon: Award, color: "bg-blue-600", subtitle: "5 active projects" },
    { title: "Total Projects", value: "5", change: "2 critical", changeType: "down" as const, icon: FolderKanban, color: "bg-indigo-500", subtitle: "Across 4 organizations" },
    { title: "Active Sprints", value: "23", change: "+3 this week", changeType: "up" as const, icon: Target, color: "bg-purple-600", subtitle: "Across all projects" },
    { title: "Delivery Health", value: "76%", change: "-2%", changeType: "down" as const, icon: Activity, color: "bg-teal-600", subtitle: "vs 78% last sprint" },
    { title: "Sprint Completion", value: "87%", change: "+5%", changeType: "up" as const, icon: CheckCircle, color: "bg-green-600", subtitle: "Avg across sprints" },
    { title: "Defect Density", value: "0.8", change: "-12%", changeType: "up" as const, icon: Bug, color: "bg-amber-500", subtitle: "Per KLoC" },
    { title: "Build Success", value: "94%", change: "+2%", changeType: "up" as const, icon: Zap, color: "bg-orange-500", subtitle: "CI/CD pipelines" },
    { title: "Critical Risks", value: "3", change: "+1 new", changeType: "down" as const, icon: AlertTriangle, color: "bg-red-500", subtitle: "Require attention" },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.slice(0, 4).map(k => <KPICard key={k.title} {...k} />)}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.slice(4).map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sprint Completion Trend */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Sprint Completion Trend" subtitle="Planned vs completed story points"
            actions={<Btn variant="secondary" icon={Filter}>Filter</Btn>} />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={SPRINT_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar key="sc-planned" dataKey="planned" name="Planned" fill="#DBEAFE" radius={[4, 4, 0, 0]} />
              <Bar key="sc-completed" dataKey="completed" name="Completed" fill={C.blue} radius={[4, 4, 0, 0]} />
              <Line key="sc-velocity" type="monotone" dataKey="velocity" name="Velocity" stroke={C.purple} strokeWidth={2.5} dot={{ r: 4, fill: C.purple }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Portfolio Health Donut */}
        <Card>
          <SectionHeader title="Portfolio Health" subtitle="Project status distribution" />
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={HEALTH_DONUT} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {HEALTH_DONUT.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<Tooltip_ />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {HEALTH_DONUT.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-bold text-gray-900">{d.value} projects</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* KPI Trend + Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="KPI Trends" subtitle="6-month performance overview" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={KPI_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line key="kpi-sprintRate" type="monotone" dataKey="sprintRate" name="Sprint Rate %" stroke={C.blue} strokeWidth={2} dot={false} />
              <Line key="kpi-buildSuccess" type="monotone" dataKey="buildSuccess" name="Build Success %" stroke={C.green} strokeWidth={2} dot={false} />
              <Line key="kpi-velocity" type="monotone" dataKey="velocity" name="Velocity" stroke={C.purple} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Velocity Comparison" subtitle="Team velocity vs targets" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={VELOCITY_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="project" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={55} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar key="vel-target" dataKey="target" name="Target" fill="#F1F5F9" radius={[0, 4, 4, 0]} />
              <Bar key="vel-velocity" dataKey="velocity" name="Velocity" fill={C.blue} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Project Health */}
        <Card className="lg:col-span-1">
          <SectionHeader title="Project Health" subtitle="All projects at a glance"
            actions={<button onClick={() => onNavigate("portfolio")} className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">View all <ArrowRight size={12} /></button>} />
          <div className="space-y-3">
            {PROJECTS.map(p => (
              <div key={p.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate("project-details")}>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 text-xs font-bold">{p.code}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-800 truncate">{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <HealthBar value={p.health} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="lg:col-span-1">
          <SectionHeader title="AI Recommendations" subtitle="Sarathi AI insights"
            actions={<button onClick={() => onNavigate("ai-insights")} className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">Open AI <ArrowRight size={12} /></button>} />
          <div className="space-y-3">
            <AIInsightCard
              type="critical"
              title="FinBank Mobile at delivery risk"
              insight="Sprint velocity 29% below target. Escalate build #147 failure immediately — 3 test failures in payment module."
              action="View risk report"
            />
            <AIInsightCard
              type="warning"
              title="AI Support Desk scope creep detected"
              insight="12 unplanned story points added in last 2 sprints. Recommend scope freeze and stakeholder alignment."
              action="Review scope"
            />
            <AIInsightCard
              type="success"
              title="SmartHR Portal exceeding targets"
              insight="91% health score — best in portfolio. Team practices could serve as internal benchmark for others."
            />
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-1">
          <SectionHeader title="Recent Activity" subtitle="Live team updates" />
          <div className="space-y-3">
            {ACTIVITY_FEED.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex gap-3 items-start">
                <Avatar initials={item.user} size="xs" colorIdx={i} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">{item.name}</span>{" "}
                    <span className="text-gray-500">{item.action}</span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pipeline Status */}
      <Card padding="p-0">
        <div className="p-5 border-b border-gray-100">
          <SectionHeader title="Pipeline Status" subtitle="CI/CD build health across all projects" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-50">
                {["Project", "Branch", "Build", "Status", "Duration", "Triggered"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PIPELINE_DATA.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">{row.project}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono">{row.branch}</td>
                  <td className="px-5 py-3 text-gray-500 font-mono">{row.build}</td>
                  <td className="px-5 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-5 py-3 text-gray-500">{row.duration}</td>
                  <td className="px-5 py-3 text-gray-400">{row.triggered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: PM DASHBOARD
// ──────────────────────────────────────────────
const PMDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const proj = PROJECTS[selectedProject];

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Project Selector */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-sm font-semibold text-gray-700">Active Project:</div>
        <div className="flex gap-2 flex-wrap">
          {PROJECTS.map((p, i) => (
            <motion.button key={p.id} whileTap={{ scale: 0.97 }} onClick={() => setSelectedProject(i)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedProject === i ? "bg-blue-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
              }`}>
              {p.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Sprint Progress" value={`${proj.completion}%`} change={"+6% vs last"} changeType="up" icon={Target} color="bg-blue-600" />
        <KPICard title="Sprint Velocity" value={proj.velocity} change={`Target: ${proj.velocity + 4}`} changeType="stable" icon={TrendingUp} color="bg-purple-600" />
        <KPICard title="Sprint No." value={proj.sprint} subtitle={`${proj.org}`} icon={Hash} color="bg-indigo-500" />
        <KPICard title="Risk Score" value={`${proj.risk}/100`} changeType={proj.risk > 60 ? "down" : proj.risk > 30 ? "stable" : "up"} change={proj.risk > 60 ? "High" : proj.risk > 30 ? "Medium" : "Low"} icon={Shield} color={proj.risk > 60 ? "bg-red-500" : proj.risk > 30 ? "bg-amber-500" : "bg-green-600"} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Burndown */}
        <Card className="lg:col-span-3">
          <SectionHeader title="Sprint Burndown" subtitle={`Sprint ${proj.sprint} — ${proj.name}`} />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={BURNDOWN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line key="pm-ideal" type="monotone" dataKey="ideal" name="Ideal" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="6 3" dot={false} />
              <Line key="pm-actual" type="monotone" dataKey="actual" name="Actual" stroke={C.blue} strokeWidth={2.5} dot={{ r: 3, fill: C.blue }} />
              <Line key="pm-scope" type="monotone" dataKey="scope" name="Scope" stroke={C.amber} strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Story Status */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Work Item Status" subtitle="Current sprint breakdown" />
          <div className="space-y-4">
            {[
              { label: "Stories Completed", value: 18, total: 24, color: "bg-green-500" },
              { label: "In Progress", value: 4, total: 24, color: "bg-blue-500" },
              { label: "Blocked", value: 2, total: 24, color: "bg-red-500" },
              { label: "Backlog", value: 12, total: 36, color: "bg-gray-300" },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.value} / {item.total}</span>
                </div>
                <ProgressBar value={(item.value / item.total) * 100} color={item.color} />
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Open Bugs (P1/P2)</span>
              <span className="font-bold text-red-600">4</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">PRs Awaiting Review</span>
              <span className="font-bold text-amber-600">7</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Completed Story Points</span>
              <span className="font-bold text-green-600">{proj.velocity}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Team + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Team Productivity */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Team Productivity" subtitle="Utilization & task metrics" />
          <div className="space-y-3">
            {TEAM_MEMBERS.slice(0, 5).map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <Avatar initials={m.avatar} size="sm" colorIdx={i} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <div>
                      <span className="text-xs font-semibold text-gray-800">{m.name}</span>
                      <span className="text-xs text-gray-400 ml-1">· {m.role}</span>
                    </div>
                    <span className={`text-xs font-bold ${m.util > 90 ? "text-red-600" : m.util > 75 ? "text-amber-600" : "text-green-600"}`}>{m.util}%</span>
                  </div>
                  <ProgressBar value={m.util} color={m.util > 90 ? "bg-red-500" : m.util > 75 ? "bg-amber-500" : "bg-green-500"} />
                </div>
                <div className="flex gap-3 text-xs text-gray-400 flex-shrink-0">
                  <span className="flex items-center gap-0.5"><CheckSquare size={11} className="text-blue-400" />{m.tasks}</span>
                  <span className="flex items-center gap-0.5"><Bug size={11} className="text-red-400" />{m.bugs}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Items + AI Summary */}
        <div className="space-y-4">
          <Card>
            <SectionHeader title="Action Items" />
            <div className="space-y-2">
              {[
                { text: "Resolve build #147 payment failures", priority: "P1", due: "Today" },
                { text: "Review Sprint 15 scope with stakeholders", priority: "P2", due: "Tomorrow" },
                { text: "Unblock Michael Chen on auth module", priority: "P1", due: "Today" },
                { text: "Update risk register for Q3 planning", priority: "P3", due: "Jun 14" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className={`mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.priority === "P1" ? "bg-red-100 text-red-700" : item.priority === "P2" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                  }`}>{item.priority}</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-700">{item.text}</p>
                    <p className="text-[10px] text-gray-400">{item.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-sm font-semibold text-gray-900">AI Project Summary</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">{proj.name}</span> is at{" "}
              <span className={`font-bold ${proj.health >= 80 ? "text-green-600" : proj.health >= 60 ? "text-amber-600" : "text-red-600"}`}>{proj.health}% health</span>.
              Current sprint velocity is {proj.completion < 70 ? "below" : "meeting"} targets. {proj.risk > 60 ? "High risk score requires immediate attention." : proj.risk > 30 ? "Moderate risks are being managed." : "Project is tracking well."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: IT ADMIN DASHBOARD
// ──────────────────────────────────────────────
const ITAdminDashboard = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  const [syncing, setSyncing] = useState<number | null>(null);

  const triggerSync = (i: number) => {
    setSyncing(i);
    setTimeout(() => setSyncing(null), 2500);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* System Health KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="API Health" value="99.8%" change="Healthy" changeType="up" icon={Wifi} color="bg-green-600" subtitle="Azure DevOps REST API" />
        <KPICard title="Sync Success Rate" value="80%" change="1 failed" changeType="down" icon={RefreshCw} color="bg-blue-600" subtitle="Last 24 hours" />
        <KPICard title="DB Connections" value="24/50" change="Optimal" changeType="up" icon={Database} color="bg-indigo-500" subtitle="Active connections" />
        <KPICard title="Failed Sync Alerts" value="2" change="Action needed" changeType="down" icon={AlertTriangle} color="bg-red-500" subtitle="Requires manual fix" />
      </div>

      {/* Integration Status + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padding="p-0">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Azure DevOps Integration Status</h3>
              <p className="text-xs text-gray-400">Live synchronization across all connected organizations</p>
            </div>
            <Btn variant="primary" icon={RefreshCw} onClick={() => {}}>Sync All</Btn>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-50">
                  {["Organization", "Project", "Last Sync", "Next Sync", "Items", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SYNC_JOBS.map((job, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{job.org}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{job.project}</td>
                    <td className={`px-4 py-3 ${job.status === "failed" ? "text-red-500 font-semibold" : "text-gray-500"}`}>{job.lastSync}</td>
                    <td className="px-4 py-3 text-gray-400">{job.nextSync}</td>
                    <td className="px-4 py-3 font-mono text-gray-700">{job.items || "-"}</td>
                    <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => triggerSync(i)}
                        className={`flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors ${syncing === i ? "opacity-50 pointer-events-none" : ""}`}>
                        {syncing === i ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                        {syncing === i ? "Syncing..." : "Sync"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* System Health */}
        <Card>
          <SectionHeader title="System Health" subtitle="Infrastructure overview" />
          <div className="space-y-4">
            {[
              { label: "API Gateway", value: 99, icon: Globe, color: "text-green-500" },
              { label: "Database (SQL)", value: 82, icon: Database, color: "text-blue-500" },
              { label: "Redis Cache", value: 76, icon: HardDrive, color: "text-purple-500" },
              { label: "Azure Functions", value: 94, icon: Zap, color: "text-amber-500" },
              { label: "AI Services", value: 88, icon: Brain, color: "text-indigo-500" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon size={14} className={item.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                    <span className={`text-xs font-bold ${item.value > 90 ? "text-green-600" : item.value > 75 ? "text-amber-600" : "text-red-600"}`}>{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color={item.value > 90 ? "bg-green-500" : item.value > 75 ? "bg-amber-500" : "bg-red-500"} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2 font-semibold">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              <Btn variant="secondary" icon={RefreshCw} size="xs" onClick={() => onNavigate("sync")}>Sync Monitor</Btn>
              <Btn variant="secondary" icon={Terminal} size="xs" onClick={() => onNavigate("audit")}>Audit Logs</Btn>
              <Btn variant="secondary" icon={Users} size="xs" onClick={() => onNavigate("users")}>Users</Btn>
              <Btn variant="secondary" icon={Settings} size="xs" onClick={() => onNavigate("settings")}>Settings</Btn>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts + Audit Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Failed Sync Alerts" subtitle="Requires immediate action" />
          <div className="space-y-3">
            {SYNC_JOBS.filter(j => j.status === "failed" || j.status === "warning").map((job, i) => (
              <div key={i} className={`p-4 rounded-xl border ${job.status === "failed" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle size={13} className={job.status === "failed" ? "text-red-500" : "text-amber-500"} />
                      <span className="text-xs font-bold text-gray-900">{job.project}</span>
                    </div>
                    <p className="text-xs text-gray-600">{job.org} · {job.errors} error{job.errors !== 1 ? "s" : ""} · Last sync: {job.lastSync}</p>
                  </div>
                  <Btn variant={job.status === "failed" ? "danger" : "secondary"} icon={RefreshCw} size="xs">Retry</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Recent Audit Events" subtitle="System activity log"
            actions={<button onClick={() => onNavigate("audit")} className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">View all <ArrowRight size={11} /></button>} />
          <div className="space-y-2">
            {AUDIT_LOGS.slice(0, 5).map((log, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700"><span className="font-semibold">{log.action}</span> · {log.resource}</p>
                  <p className="text-[10px] text-gray-400">{log.user} · {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: PORTFOLIO DASHBOARD
// ──────────────────────────────────────────────
const PortfolioDashboard = ({ onNavigate }: { onNavigate: (s: string) => void }) => (
  <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Portfolio Overview</h2>
        <p className="text-sm text-gray-500">5 projects · 4 organizations · FY2024 Q2</p>
      </div>
      <div className="flex gap-2">
        <Btn variant="secondary" icon={Filter}>Filter</Btn>
        <Btn variant="primary" icon={Download}>Export</Btn>
      </div>
    </div>

    {/* Project Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {PROJECTS.map((p, i) => (
        <motion.div key={p.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
          onClick={() => onNavigate("project-details")}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">{p.code}</span>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-0.5 leading-tight">{p.name}</h3>
          <p className="text-xs text-gray-400 mb-4">{p.org}</p>
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Health</span>
              <span className={`font-bold ${p.health >= 80 ? "text-green-600" : p.health >= 60 ? "text-amber-600" : "text-red-600"}`}>{p.health}%</span>
            </div>
            <ProgressBar value={p.health} color={p.health >= 80 ? "bg-green-500" : p.health >= 60 ? "bg-amber-500" : "bg-red-500"} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-400">Sprint</div>
              <div className="font-bold text-gray-900">#{p.sprint}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-400">Team</div>
              <div className="font-bold text-gray-900">{p.team} devs</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-400">Velocity</div>
              <div className="font-bold text-gray-900">{p.velocity} pts</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-gray-400">Budget</div>
              <div className="font-bold text-gray-900">{p.budget}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* KPI Matrix + Trend */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <SectionHeader title="Health Matrix" subtitle="Cross-project KPI comparison" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {["Project", "Health", "Velocity", "Sprint %", "Defects", "Risk"].map(h => (
                  <th key={h} className="text-left py-2 pr-3 text-gray-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 pr-3 font-semibold text-gray-800">{p.code}</td>
                  <td className="py-3 pr-3">
                    <span className={`font-bold ${p.health >= 80 ? "text-green-600" : p.health >= 60 ? "text-amber-600" : "text-red-600"}`}>{p.health}%</span>
                  </td>
                  <td className="py-3 pr-3 text-gray-700">{p.velocity}</td>
                  <td className="py-3 pr-3 text-gray-700">{p.completion}%</td>
                  <td className="py-3 pr-3 text-gray-700">0.{Math.floor(Math.random() * 9 + 1)}</td>
                  <td className="py-3 pr-3"><StatusBadge status={p.risk > 60 ? "critical" : p.risk > 30 ? "warning" : "success"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Delivery Forecast" subtitle="Predicted completion by Q3 end" />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={PROJECTS.map(p => ({ name: p.code, forecast: p.completion, target: 85 }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<Tooltip_ />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar key="pf-forecast" dataKey="forecast" name="Forecast %" fill={C.blue} radius={[4, 4, 0, 0]} />
            <Bar key="pf-target" dataKey="target" name="Target %" fill="#DBEAFE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// SCREEN: PROJECT DETAILS
// ──────────────────────────────────────────────
const ProjectDetails = () => {
  const [tab, setTab] = useState("overview");
  const proj = PROJECTS[0];
  const tabs = ["overview", "epics", "sprints", "bugs", "team", "pipelines", "repos"];

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">{proj.code}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{proj.name}</h1>
              <StatusBadge status={proj.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
              <span className="flex items-center gap-1"><Building2 size={11} />{proj.org}</span>
              <span className="flex items-center gap-1"><Users size={11} />{proj.team} members</span>
              <span className="flex items-center gap-1"><Target size={11} />Sprint {proj.sprint}</span>
              <span className="flex items-center gap-1"><Calendar size={11} />Due: Aug 15, 2024</span>
              <span className="flex items-center gap-1"><Award size={11} />Health: {proj.health}%</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Btn variant="secondary" icon={ExternalLink}>Azure DevOps</Btn>
            <Btn variant="primary" icon={RefreshCw}>Sync Now</Btn>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mt-5 border-b border-gray-100 -mx-5 px-5">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-semibold capitalize border-b-2 transition-all -mb-px ${
                tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700"
              }`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <KPICard title="Completion" value={`${proj.completion}%`} icon={CheckCircle} color="bg-green-600" />
                <KPICard title="Velocity" value={proj.velocity} icon={TrendingUp} color="bg-blue-600" />
                <KPICard title="Risk Score" value={`${proj.risk}/100`} icon={Shield} color={proj.risk > 60 ? "bg-red-500" : "bg-amber-500"} />
              </div>
              <Card>
                <SectionHeader title="Burndown Chart" subtitle={`Sprint ${proj.sprint}`} />
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={BURNDOWN}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tooltip_ />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line key="pd-ideal" type="monotone" dataKey="ideal" name="Ideal" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 3" dot={false} />
                    <Line key="pd-actual" type="monotone" dataKey="actual" name="Actual" stroke={C.blue} strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div className="space-y-4">
              <AIInsightCard type="warning" title="Sprint behind schedule" insight="Actual remaining is 15% above ideal line. Consider moving 3 stories to next sprint or adding capacity." action="View recommendations" />
              <Card>
                <div className="text-xs font-semibold text-gray-700 mb-3">Team Members</div>
                <div className="space-y-2.5">
                  {TEAM_MEMBERS.slice(0, 4).map((m, i) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <Avatar initials={m.avatar} size="xs" colorIdx={i} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-800 truncate">{m.name}</div>
                        <div className="text-[10px] text-gray-400">{m.role}</div>
                      </div>
                      <div className={`text-xs font-bold ${m.util > 90 ? "text-red-500" : m.util > 75 ? "text-amber-500" : "text-green-600"}`}>{m.util}%</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
        {tab === "bugs" && (
          <Card padding="p-0">
            <div className="p-5 border-b border-gray-100">
              <SectionHeader title="Bug Tracker" subtitle="Open defects across all severities" actions={<Btn variant="primary" icon={Plus}>Log Bug</Btn>} />
            </div>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-gray-50">
                {["ID", "Title", "Severity", "Assignee", "Status", "Created"].map(h => <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>)}
              </tr></thead>
              <tbody>
                {[
                  { id: "BUG-147", title: "Payment gateway 500 error on high concurrency", sev: "Critical", assignee: "MC", status: "In Progress", created: "Jun 9" },
                  { id: "BUG-146", title: "Cart total miscalculation for bundled products", sev: "High", assignee: "SJ", status: "Open", created: "Jun 8" },
                  { id: "BUG-145", title: "Search filter not persisting on back navigation", sev: "Medium", assignee: "RK", status: "In Review", created: "Jun 7" },
                  { id: "BUG-144", title: "Email notifications delayed > 5 minutes", sev: "Low", assignee: "LR", status: "Open", created: "Jun 6" },
                ].map((bug, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 font-mono text-blue-600">{bug.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{bug.title}</td>
                    <td className="px-5 py-3"><span className={`font-semibold ${bug.sev === "Critical" ? "text-red-600" : bug.sev === "High" ? "text-amber-600" : bug.sev === "Medium" ? "text-blue-600" : "text-gray-500"}`}>{bug.sev}</span></td>
                    <td className="px-5 py-3 text-gray-500">{bug.assignee}</td>
                    <td className="px-5 py-3"><StatusBadge status={bug.status === "In Progress" ? "running" : bug.status === "Open" ? "warning" : bug.status === "In Review" ? "active" : "success"} /></td>
                    <td className="px-5 py-3 text-gray-400">{bug.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {tab === "team" && (
          <Card padding="p-0">
            <div className="p-5 border-b border-gray-100">
              <SectionHeader title="Team Members" subtitle={`${proj.team} active contributors`} actions={<Btn variant="primary" icon={UserPlus}>Invite Member</Btn>} />
            </div>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-gray-50">
                {["Member", "Role", "Utilization", "Tasks", "Bugs", "Status"].map(h => <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>)}
              </tr></thead>
              <tbody>
                {TEAM_MEMBERS.map((m, i) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><Avatar initials={m.avatar} size="xs" colorIdx={i} /><span className="font-medium text-gray-800">{m.name}</span></div></td>
                    <td className="px-5 py-3 text-gray-500">{m.role}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><ProgressBar value={m.util} color={m.util > 90 ? "bg-red-500" : "bg-blue-500"} /><span className="font-bold text-gray-900 w-8 text-right">{m.util}%</span></div></td>
                    <td className="px-5 py-3 text-gray-700 font-medium">{m.tasks}</td>
                    <td className="px-5 py-3 text-red-500 font-medium">{m.bugs}</td>
                    <td className="px-5 py-3"><StatusBadge status="active" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {(tab === "epics" || tab === "sprints" || tab === "pipelines" || tab === "repos") && (
          <Card>
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <Layers size={28} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">{tab} View</h3>
              <p className="text-sm text-gray-400 max-w-sm">This section shows {tab} data synced from Azure DevOps for {proj.name}.</p>
              <Btn variant="secondary" icon={RefreshCw} className="mt-4">Sync from Azure DevOps</Btn>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: SPRINT GOVERNANCE
// ──────────────────────────────────────────────
const SprintGovernance = () => {
  const columns = [
    { id: "todo", label: "To Do", color: "border-gray-200 bg-gray-50", items: SPRINT_BOARD.todo },
    { id: "inProgress", label: "In Progress", color: "border-blue-200 bg-blue-50/40", items: SPRINT_BOARD.inProgress },
    { id: "review", label: "In Review", color: "border-amber-200 bg-amber-50/40", items: SPRINT_BOARD.review },
    { id: "done", label: "Done", color: "border-green-200 bg-green-50/40", items: SPRINT_BOARD.done },
  ];

  const priorityColor = { critical: "bg-red-100 text-red-700", high: "bg-amber-100 text-amber-700", medium: "bg-blue-100 text-blue-700", low: "bg-gray-100 text-gray-500" };

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Sprint Health" value="74%" change="+5%" changeType="up" icon={Activity} color="bg-blue-600" subtitle="Sprint 14 · RetailX" />
        <KPICard title="Capacity Used" value="82%" change="Healthy" changeType="up" icon={Gauge} color="bg-green-600" subtitle="41 / 50 story points" />
        <KPICard title="Completed Items" value="10" change="3 remaining" changeType="stable" icon={CheckCircle} color="bg-indigo-500" subtitle="of 15 planned" />
        <KPICard title="Delayed Items" value="2" change="High priority" changeType="down" icon={Clock} color="bg-red-500" subtitle="Need attention" />
      </div>

      {/* Sprint Board */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sprint Board <span className="text-sm text-gray-400 font-normal">· Sprint 14 · RetailX-Commerce</span></h2>
          <div className="flex gap-2">
            <Btn variant="secondary" icon={Filter}>Filter</Btn>
            <Btn variant="primary" icon={Plus}>Add Story</Btn>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map(col => (
            <div key={col.id} className={`border rounded-xl ${col.color} p-3`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700">{col.label}</span>
                <span className="text-xs font-bold text-gray-500 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{col.items.length}</span>
              </div>
              <div className="space-y-2.5">
                {col.items.map(item => (
                  <motion.div key={item.id} whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-pointer">
                    <p className="text-xs text-gray-700 font-medium mb-2 leading-relaxed">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${priorityColor[item.priority as keyof typeof priorityColor]}`}>
                        {item.priority}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Avatar initials={item.assignee} size="xs" colorIdx={item.assignee.charCodeAt(0)} />
                        <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded">{item.points}pt</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Sprint Burndown" subtitle="Remaining work vs ideal" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={BURNDOWN}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line key="sg-ideal" type="monotone" dataKey="ideal" name="Ideal" stroke="#CBD5E1" strokeWidth={2} strokeDasharray="5 3" dot={false} />
              <Line key="sg-actual" type="monotone" dataKey="actual" name="Actual" stroke={C.blue} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionHeader title="Velocity Trend" subtitle="5-sprint comparison" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SPRINT_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="sprint" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar key="sg-planned" dataKey="planned" name="Planned" fill="#DBEAFE" radius={[4, 4, 0, 0]} />
              <Bar key="sg-completed" dataKey="completed" name="Completed" fill={C.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: KPI DASHBOARD
// ──────────────────────────────────────────────
const KPIDashboard = () => {
  const [period, setPeriod] = useState("6M");

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">KPI Dashboard</h2>
          <p className="text-sm text-gray-500">Portfolio-wide key performance indicators</p>
        </div>
        <div className="flex gap-2">
          {["1M", "3M", "6M", "1Y"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-blue-300"}`}>
              {p}
            </button>
          ))}
          <Btn variant="secondary" icon={Download}>Export</Btn>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Sprint Completion Rate" value="87%" change="+5%" changeType="up" icon={Target} color="bg-blue-600" subtitle="Target: 85%" />
        <KPICard title="Team Velocity" value="42 pts" change="+3 pts" changeType="up" icon={TrendingUp} color="bg-purple-600" subtitle="Avg across sprints" />
        <KPICard title="Defect Density" value="0.8" change="-12%" changeType="up" icon={Bug} color="bg-green-600" subtitle="Per KLoC · Target: <1.0" />
        <KPICard title="Backlog Health" value="78%" change="+2%" changeType="up" icon={List} color="bg-indigo-500" subtitle="Groomed & estimated" />
        <KPICard title="Lead Time" value="6.2 days" change="-0.4d" changeType="up" icon={Clock} color="bg-teal-600" subtitle="Story to done" />
        <KPICard title="Cycle Time" value="3.1 days" change="-0.2d" changeType="up" icon={RotateCcw} color="bg-amber-500" subtitle="In progress to done" />
        <KPICard title="Build Success" value="94%" change="+2%" changeType="up" icon={Zap} color="bg-orange-500" subtitle="CI/CD pipelines" />
        <KPICard title="Release Success" value="96%" change="+1%" changeType="up" icon={CheckCircle} color="bg-green-700" subtitle="Zero-rollback deploys" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Performance Trends" subtitle="Key metrics over time" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={KPI_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area key="kd-sprintRate" type="monotone" dataKey="sprintRate" name="Sprint Rate %" stroke={C.blue} fill="#DBEAFE" strokeWidth={2} />
              <Area key="kd-buildSuccess" type="monotone" dataKey="buildSuccess" name="Build Success %" stroke={C.green} fill="#DCFCE7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Defect & Velocity Trends" subtitle="Quality vs delivery speed" />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={KPI_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar key="kd-velocity" yAxisId="left" dataKey="velocity" name="Velocity" fill="#EDE9FE" radius={[4, 4, 0, 0]} />
              <Line key="kd-defect" yAxisId="right" type="monotone" dataKey="defect" name="Defect Density" stroke={C.red} strokeWidth={2.5} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* KPI Table */}
      <Card padding="p-0">
        <div className="p-5 border-b border-gray-100">
          <SectionHeader title="KPI Detail Table" subtitle="Per-project breakdown" />
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-50">
            {["Project", "Sprint %", "Velocity", "Defects/KLoC", "Lead Time", "Build Success", "Health"].map(h => (
              <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {PROJECTS.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3 font-semibold text-gray-800">{p.name}</td>
                <td className="px-5 py-3 font-bold text-gray-700">{p.completion}%</td>
                <td className="px-5 py-3 text-gray-700">{p.velocity}</td>
                <td className="px-5 py-3 text-gray-700">0.{p.health % 9 + 1}</td>
                <td className="px-5 py-3 text-gray-700">{(p.velocity / 10).toFixed(1)}d</td>
                <td className="px-5 py-3 font-bold text-gray-700">{Math.min(99, p.health + 7)}%</td>
                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: AI RISK ANALYSIS
// ──────────────────────────────────────────────
const AIRiskAnalysis = () => {
  const overallRisk = 52;

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Risk Analysis</h2>
          <p className="text-sm text-gray-500">Predictive risk scoring across portfolio — powered by Sarathi AI</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" icon={Download}>Risk Report</Btn>
          <Btn variant="primary" icon={RefreshCw}>Refresh Analysis</Btn>
        </div>
      </div>

      {/* Risk Score + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Risk Gauge */}
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="text-sm font-semibold text-gray-600 mb-4">Portfolio Risk Score</div>
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 -rotate-90">
              <circle cx="80" cy="80" r="64" fill="none" stroke="#F1F5F9" strokeWidth="14" />
              <motion.circle
                initial={{ strokeDashoffset: 402 }}
                animate={{ strokeDashoffset: 402 - (overallRisk / 100) * 402 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                cx="80" cy="80" r="64" fill="none"
                stroke={overallRisk > 70 ? C.red : overallRisk > 40 ? C.amber : C.green}
                strokeWidth="14" strokeLinecap="round"
                strokeDasharray="402"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-gray-900">{overallRisk}</span>
              <span className="text-xs text-gray-400">/ 100</span>
            </div>
          </div>
          <div className={`mt-3 text-sm font-bold ${overallRisk > 70 ? "text-red-600" : overallRisk > 40 ? "text-amber-600" : "text-green-600"}`}>
            {overallRisk > 70 ? "High Risk" : overallRisk > 40 ? "Moderate Risk" : "Low Risk"}
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">3 projects contributing to risk elevation</p>
        </Card>

        {/* Radar */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Risk Category Breakdown" subtitle="Multi-dimensional risk radar" />
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RISK_RADAR}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748B" }} />
              <Radar key="risk-radar" name="Risk Score" dataKey="A" stroke={C.blue} fill={C.blue} fillOpacity={0.15} strokeWidth={2} />
              <Tooltip content={<Tooltip_ />} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Risk by Project + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Risk by Project" subtitle="Current risk scores" />
          <div className="space-y-4">
            {PROJECTS.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-500">{p.code}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-700 font-medium">{p.name}</span>
                    <span className={`text-xs font-bold ${p.risk > 60 ? "text-red-600" : p.risk > 30 ? "text-amber-600" : "text-green-600"}`}>{p.risk}/100</span>
                  </div>
                  <ProgressBar value={p.risk} color={p.risk > 60 ? "bg-red-500" : p.risk > 30 ? "bg-amber-500" : "bg-green-500"} height="h-2.5" />
                </div>
                <StatusBadge status={p.risk > 60 ? "critical" : p.risk > 30 ? "warning" : "success"} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Risk Trend" subtitle="4-dimensional risk over time" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RISK_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<Tooltip_ />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line key="rt-schedule" type="monotone" dataKey="schedule" name="Schedule" stroke={C.red} strokeWidth={2} dot={false} />
              <Line key="rt-quality" type="monotone" dataKey="quality" name="Quality" stroke={C.amber} strokeWidth={2} dot={false} />
              <Line key="rt-scope" type="monotone" dataKey="scope" name="Scope" stroke={C.purple} strokeWidth={2} dot={false} />
              <Line key="rt-technical" type="monotone" dataKey="technical" name="Technical" stroke={C.blue} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Mitigation Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-purple-500" />
          AI Mitigation Recommendations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIInsightCard type="critical" title="FinBank Mobile: Escalate immediately" insight="Build failures + below-target velocity creates compounding delivery risk. Recommend: executive escalation, additional QA resources, and sprint scope reduction of 20%." action="Create escalation" />
          <AIInsightCard type="critical" title="AI Support Desk: Scope freeze required" insight="Scope creep of +12 story points detected. Without freeze, Q3 delivery probability drops from 65% to 38%. Immediate stakeholder alignment needed." action="Initiate scope review" />
          <AIInsightCard type="warning" title="Schedule risk rising portfolio-wide" insight="3 of 5 projects show schedule risk increasing month-over-month. Common factor: dependency on external vendor API (expected Jun 20). Monitor closely." action="View dependency map" />
          <AIInsightCard type="success" title="SmartHR Portal risk well-managed" insight="Proactive risk mitigation in Sprint 21 resulted in 40% risk reduction. Their dependency pre-clearing pattern is recommended for replication across portfolio." />
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: AI EXECUTIVE REPORTS
// ──────────────────────────────────────────────
const AIExecutiveReports = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Executive Reports</h2>
          <p className="text-sm text-gray-500">AI-generated executive summaries for Q2 2024 · June 10, 2024</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" icon={Download}>Export PDF</Btn>
          <Btn variant="secondary" icon={Upload}>Export Excel</Btn>
          <Btn variant="primary" icon={Sparkles} onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 2000); }}>
            {generating ? "Generating..." : "Regenerate"}
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Report */}
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Executive Summary</div>
                <div className="text-xs text-gray-400">Sarathi AI · Generated Jun 10, 2024 14:32 IST</div>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                The portfolio maintains an <strong className="text-gray-900">overall health score of 87%</strong> as of Q2 Week 23. Three of five projects (RetailX-Commerce, SmartHR Portal, Customer Analytics) are tracking on schedule. Two projects require executive attention: <strong className="text-red-600">FinBank Mobile</strong> and <strong className="text-red-600">AI Support Desk</strong>.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                <strong className="text-gray-900">Key achievements this period:</strong> SmartHR Portal achieved its highest velocity (56 pts) and best defect density (0.4/KLoC) since project inception. RetailX-Commerce successfully completed payment gateway v2 integration, unblocking the Q3 feature roadmap.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Critical risks:</strong> FinBank Mobile build failures have impacted QA velocity. Scope creep in AI Support Desk requires immediate stakeholder intervention. Portfolio-wide dependency on an external vendor API (deadline: Jun 20) poses a shared schedule risk.
              </p>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Project Health Summary" subtitle="AI-analyzed status across all projects" />
            <div className="space-y-4">
              {PROJECTS.map(p => (
                <div key={p.id} className={`p-4 rounded-xl border ${p.status === "critical" ? "border-red-100 bg-red-50/40" : p.status === "at-risk" ? "border-amber-100 bg-amber-50/40" : "border-green-100 bg-green-50/40"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <span className={`text-lg font-black ${p.health >= 80 ? "text-green-600" : p.health >= 60 ? "text-amber-600" : "text-red-600"}`}>{p.health}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div><span className="text-gray-400">Sprint:</span> <span className="font-semibold">#{p.sprint}</span></div>
                    <div><span className="text-gray-400">Velocity:</span> <span className="font-semibold">{p.velocity} pts</span></div>
                    <div><span className="text-gray-400">Completion:</span> <span className="font-semibold">{p.completion}%</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="KPI Insights" subtitle="AI-interpreted performance analysis" />
            <div className="space-y-3">
              {[
                { metric: "Sprint Completion Rate", value: "87%", trend: "up", insight: "5-point improvement vs Q1. Consistent delivery across 3 of 5 projects. Recommend investigating FinBank Mobile's sprint planning process." },
                { metric: "Defect Density", value: "0.8/KLoC", trend: "up", insight: "12% reduction signals improving code quality culture. SmartHR Portal's 0.4/KLoC is a portfolio benchmark to replicate." },
                { metric: "Build Success Rate", value: "94%", trend: "up", insight: "Significant improvement from 88% in January. FinBank Mobile failure (build #147) is the primary outlier dragging the average." },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-800">{item.metric}</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-500" />
                      <span className="text-xs font-bold text-green-600">{item.value}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{item.insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <SectionHeader title="Report Metadata" />
            <div className="space-y-2.5 text-xs">
              {[
                { label: "Report Period", value: "Q2 2024 · May–Jun" },
                { label: "Generated By", value: "Sarathi AI v2.4" },
                { label: "Data Sources", value: "Azure DevOps, Internal KPIs" },
                { label: "Projects Covered", value: "5 of 5" },
                { label: "Data Freshness", value: "10 min ago" },
                { label: "Confidence Score", value: "94%" },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="AI Recommendations" />
            <div className="space-y-3">
              <AIInsightCard type="critical" title="Escalate FinBank Mobile" insight="CEO-level visibility needed within 48 hours." />
              <AIInsightCard type="warning" title="Scope freeze: AI Support Desk" insight="Stakeholder sign-off required before Sprint 6." />
              <AIInsightCard type="info" title="Portfolio velocity improving" insight="Q3 on track if critical issues are resolved." />
            </div>
          </Card>

          <div className="space-y-2">
            <Btn variant="secondary" icon={Download} size="md" className="w-full justify-center">Download PDF Report</Btn>
            <Btn variant="secondary" icon={Upload} size="md" className="w-full justify-center">Export to Excel</Btn>
            <Btn variant="ghost" icon={Mail} size="md" className="w-full justify-center">Email to Stakeholders</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: AI INSIGHTS (Chat)
// ──────────────────────────────────────────────
const AIInsights = () => {
  const [messages, setMessages] = useState(AI_CHAT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", msg: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        msg: "I'm analyzing your portfolio data... Based on the latest Azure DevOps sync, I can see current sprint metrics, velocity trends, and risk indicators. What specific aspect would you like to explore further?",
      }]);
      setTyping(false);
    }, 1800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const quickActions = [
    "Summarize portfolio health", "Which project is most at risk?",
    "Predict Q3 delivery dates", "Root cause: FinBank delays",
    "Top 3 action items", "Sprint 14 analysis",
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-5" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-900">Sarathi AI Assistant</div>
            <div className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Online · Analyzing live data
            </div>
          </div>
          <Btn variant="ghost" icon={RotateCcw} size="xs">Clear chat</Btn>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={13} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "bg-gray-50 text-gray-800 rounded-tl-sm"
              }`}>
                <p className={`text-xs leading-relaxed whitespace-pre-line ${m.role === "user" ? "text-white" : "text-gray-700"}`}>{m.msg}</p>
              </div>
              {m.role === "user" && <Avatar initials="AU" size="xs" colorIdx={0} />}
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles size={13} className="text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className="px-5 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto scrollbar-hide">
          {quickActions.map(qa => (
            <button key={qa} onClick={() => setInput(qa)}
              className="flex-shrink-0 text-[10px] border border-blue-100 text-blue-600 rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors font-medium whitespace-nowrap">
              {qa}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything about your projects, sprints, KPIs, or risks..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
              <Send size={15} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Sidebar panels */}
      <div className="w-72 flex flex-col gap-4 overflow-y-auto">
        <Card>
          <SectionHeader title="Analysis Panels" />
          <div className="space-y-2">
            {[
              { label: "Sprint Analysis", icon: Target, color: "text-blue-500 bg-blue-50" },
              { label: "Root Cause Analysis", icon: Search, color: "text-purple-500 bg-purple-50" },
              { label: "Delivery Forecast", icon: TrendingUp, color: "text-green-500 bg-green-50" },
              { label: "Productivity Analysis", icon: BarChart2, color: "text-amber-500 bg-amber-50" },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon size={15} />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
                <ArrowRight size={12} className="text-gray-300 ml-auto" />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="AI Suggested Actions" />
          <div className="space-y-2.5">
            {[
              { action: "Escalate FinBank Mobile risk to VP Engineering", priority: "P1" },
              { action: "Schedule scope review for AI Support Desk", priority: "P1" },
              { action: "Share SmartHR best practices with other PMs", priority: "P2" },
              { action: "Review external vendor API dependency plan", priority: "P2" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-xl">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 ${item.priority === "P1" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                  {item.priority}
                </span>
                <p className="text-xs text-gray-600">{item.action}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Conversation History" />
          <div className="space-y-2">
            {["Portfolio risk Q2 review", "FinBank sprint analysis", "SmartHR velocity deep-dive", "Q3 delivery forecast"].map((h, i) => (
              <button key={i} className="w-full text-left p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-xs font-medium text-gray-700 truncate">{h}</div>
                <div className="text-[10px] text-gray-400">{i + 1}h ago</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: USER & ROLE MANAGEMENT
// ──────────────────────────────────────────────
const UserRoleManagement = () => {
  const [tab, setTab] = useState("users");
  const [showInvite, setShowInvite] = useState(false);

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User & Role Management</h2>
          <p className="text-sm text-gray-500">{USERS.length} users · 3 roles · Microsoft Entra ID sync</p>
        </div>
        <Btn variant="primary" icon={UserPlus} onClick={() => setShowInvite(true)}>Invite User</Btn>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {["users", "roles", "permissions", "activity"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-all -mb-px ${
              tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700"
            }`}>{t}</button>
        ))}
      </div>

      {tab === "users" && (
        <Card padding="p-0">
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={13} className="text-gray-400" />
              <input placeholder="Search users..." className="flex-1 text-xs outline-none" />
            </div>
            <Btn variant="secondary" icon={Filter}>Filter by role</Btn>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-50">
              {["User", "Email", "Role", "Projects", "Last Login", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><Avatar initials={u.name.slice(0, 2).toUpperCase()} size="xs" colorIdx={i} /><span className="font-semibold text-gray-800">{u.name}</span></div></td>
                  <td className="px-5 py-3 text-gray-500">{u.email}</td>
                  <td className="px-5 py-3"><span className={`font-semibold text-xs ${u.role === "Org Admin" ? "text-blue-600" : u.role === "IT Admin" ? "text-purple-600" : "text-green-600"}`}>{u.role}</span></td>
                  <td className="px-5 py-3 text-gray-700">{u.projects}</td>
                  <td className="px-5 py-3 text-gray-400">{u.lastLogin}</td>
                  <td className="px-5 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={12} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "roles" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { name: "Organization Admin", icon: Building2, color: "bg-blue-600", count: 1, perms: ["View all projects", "Manage users", "Access all reports", "Configure settings", "Export data", "AI insights access"] },
            { name: "Project Manager", icon: Briefcase, color: "bg-green-600", count: 4, perms: ["View assigned projects", "Sprint management", "KPI dashboard", "AI insights access", "Team management", "Report generation"] },
            { name: "IT Administrator", icon: Server, color: "bg-purple-600", count: 1, perms: ["Azure DevOps config", "Sync management", "Audit logs", "User management", "System health", "PAT token config"] },
          ].map(role => (
            <Card key={role.name}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${role.color} rounded-xl flex items-center justify-center`}>
                  <role.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{role.name}</div>
                  <div className="text-xs text-gray-400">{role.count} user{role.count !== 1 ? "s" : ""}</div>
                </div>
              </div>
              <div className="space-y-2">
                {role.perms.map(p => (
                  <div key={p} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check size={12} className="text-green-500 flex-shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Btn variant="secondary" size="xs" icon={Edit2}>Edit Role</Btn>
                <Btn variant="ghost" size="xs" icon={UserPlus}>Add User</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "permissions" && (
        <Card>
          <SectionHeader title="Permission Matrix" subtitle="Feature access by role" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 pr-6 text-gray-400 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 text-blue-600 font-bold">Org Admin</th>
                  <th className="text-center py-3 px-4 text-green-600 font-bold">Project Manager</th>
                  <th className="text-center py-3 px-4 text-purple-600 font-bold">IT Admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Executive Dashboard", orgAdmin: true, pm: false, it: false },
                  { feature: "Portfolio Dashboard", orgAdmin: true, pm: true, it: false },
                  { feature: "Project Details", orgAdmin: true, pm: true, it: true },
                  { feature: "Sprint Governance", orgAdmin: true, pm: true, it: false },
                  { feature: "KPI Dashboard", orgAdmin: true, pm: true, it: false },
                  { feature: "AI Risk Analysis", orgAdmin: true, pm: true, it: false },
                  { feature: "AI Insights Chat", orgAdmin: true, pm: true, it: false },
                  { feature: "Executive Reports", orgAdmin: true, pm: false, it: false },
                  { feature: "User Management", orgAdmin: true, pm: false, it: true },
                  { feature: "Sync Monitor", orgAdmin: false, pm: false, it: true },
                  { feature: "Audit Logs", orgAdmin: true, pm: false, it: true },
                  { feature: "Azure DevOps Config", orgAdmin: false, pm: false, it: true },
                ].map(row => (
                  <tr key={row.feature} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 pr-6 font-medium text-gray-700">{row.feature}</td>
                    {[row.orgAdmin, row.pm, row.it].map((has, i) => (
                      <td key={i} className="py-3 px-4 text-center">
                        {has ? <Check size={15} className="text-green-500 mx-auto" /> : <X size={15} className="text-gray-200 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "activity" && (
        <Card padding="p-0">
          <div className="p-5 border-b border-gray-100">
            <SectionHeader title="User Activity Log" subtitle="Recent authentication and access events" />
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-50">
              {["Timestamp", "User", "Action", "Resource", "IP Address", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {AUDIT_LOGS.slice(0, 6).map((log, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-gray-500 text-[10px]">{log.time}</td>
                  <td className="px-5 py-3 text-gray-700 truncate max-w-[140px]">{log.user}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{log.action}</td>
                  <td className="px-5 py-3 text-gray-500 truncate max-w-[160px]">{log.resource}</td>
                  <td className="px-5 py-3 font-mono text-gray-400">{log.ip}</td>
                  <td className="px-5 py-3"><StatusBadge status={log.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Invite User</h3>
              <button onClick={() => setShowInvite(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input placeholder="colleague@company.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Role</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Project Manager</option>
                  <option>Organization Admin</option>
                  <option>IT Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assign to Projects</label>
                <div className="space-y-2">
                  {PROJECTS.slice(0, 3).map(p => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-xs text-gray-700">{p.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Btn variant="secondary" onClick={() => setShowInvite(false)} className="flex-1 justify-center" size="md">Cancel</Btn>
              <Btn variant="primary" icon={Mail} onClick={() => setShowInvite(false)} className="flex-1 justify-center" size="md">Send Invitation</Btn>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: SYNC MONITOR
// ──────────────────────────────────────────────
const SyncMonitor = () => {
  const [syncing, setSyncing] = useState<Record<number, boolean>>({});

  const triggerSync = (i: number) => {
    setSyncing(prev => ({ ...prev, [i]: true }));
    setTimeout(() => setSyncing(prev => ({ ...prev, [i]: false })), 2500);
  };

  const syncTimeline = [
    { time: "14:32", project: "RetailX-Commerce", status: "success", items: 142 },
    { time: "14:10", project: "Customer Analytics", status: "success", items: 89 },
    { time: "13:45", project: "SmartHR Portal", status: "success", items: 234 },
    { time: "12:30", project: "FinBank Mobile", status: "failed", items: 0 },
    { time: "11:00", project: "AI Support Desk", status: "warning", items: 47 },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Synchronization Monitor</h2>
          <p className="text-sm text-gray-500">Azure DevOps data synchronization across all connected projects</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" icon={Calendar}>Schedule</Btn>
          <Btn variant="primary" icon={RefreshCw}>Sync All Projects</Btn>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Synced Today" value="754" change="+142 latest" changeType="up" icon={RefreshCw} color="bg-blue-600" />
        <KPICard title="Success Rate" value="80%" change="4/5 orgs" changeType="stable" icon={CheckCircle} color="bg-green-600" />
        <KPICard title="Failed Syncs" value="1" change="FinBank Mobile" changeType="down" icon={XCircle} color="bg-red-500" />
        <KPICard title="Avg Sync Time" value="2.9s" change="-0.3s" changeType="up" icon={Clock} color="bg-indigo-500" />
      </div>

      {/* Organization Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {SYNC_JOBS.map((job, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className={`bg-white rounded-xl shadow-sm border p-4 ${
            job.status === "failed" ? "border-red-200" : job.status === "warning" ? "border-amber-200" : "border-gray-100"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 size={15} className="text-blue-600" />
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="text-xs font-bold text-gray-900 mb-0.5 truncate">{job.project}</div>
            <div className="text-[10px] text-gray-400 mb-3">{job.org}</div>
            <div className="space-y-1.5 text-[10px] mb-3">
              <div className="flex justify-between"><span className="text-gray-400">Last Sync</span><span className={`font-semibold ${job.status === "failed" ? "text-red-600" : "text-gray-700"}`}>{job.lastSync}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Items</span><span className="font-semibold text-gray-700">{job.items || "-"}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Duration</span><span className="font-semibold text-gray-700">{job.duration}</span></div>
            </div>
            <button onClick={() => triggerSync(i)} className="w-full flex items-center justify-center gap-1.5 text-[10px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg py-2 transition-colors">
              {syncing[i] ? <><Loader2 size={11} className="animate-spin" />Syncing...</> : <><RefreshCw size={11} />Sync Now</>}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Timeline + Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Sync Timeline" subtitle="Today's synchronization history" />
          <div className="space-y-3">
            {syncTimeline.map((event, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${event.status === "success" ? "bg-green-500" : event.status === "failed" ? "bg-red-500" : "bg-amber-500"}`} />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-800">{event.project}</p>
                    <p className="text-[10px] text-gray-400">{event.time} · {event.items > 0 ? `${event.items} items` : "Failed"}</p>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Sync Metrics" subtitle="Items synced per project today" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SYNC_JOBS.map(j => ({ project: j.project.split(" ")[0], items: j.items }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="project" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip_ />} />
              <Bar key="sync-items" dataKey="items" name="Items Synced" fill={C.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: AUDIT LOGS
// ──────────────────────────────────────────────
const AuditLogsScreen = () => {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = AUDIT_LOGS.filter(l =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.resource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-sm text-gray-500">Complete audit trail for all system events and user actions</p>
        </div>
        <Btn variant="secondary" icon={Download}>Export CSV</Btn>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        {["all", "login", "sync", "ai", "admin"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-all -mb-px ${
              tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700"
            }`}>{t}</button>
        ))}
      </div>

      <Card padding="p-0">
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
            <Search size={13} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by user, action, or resource..."
              className="flex-1 text-xs outline-none bg-transparent" />
          </div>
          <Btn variant="secondary" icon={Filter}>Filters</Btn>
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-gray-50">
            {["Timestamp", "User", "Action", "Resource", "IP Address", "Status"].map(h => (
              <th key={h} className="text-left px-5 py-3 text-gray-400 font-semibold">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((log, i) => (
              <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-mono text-gray-500 text-[10px] whitespace-nowrap">{log.time}</td>
                <td className="px-5 py-3 text-gray-600 truncate max-w-[140px]">{log.user}</td>
                <td className="px-5 py-3 font-semibold text-gray-800">{log.action}</td>
                <td className="px-5 py-3 text-gray-500 truncate max-w-[160px]">{log.resource}</td>
                <td className="px-5 py-3 font-mono text-gray-400">{log.ip}</td>
                <td className="px-5 py-3"><StatusBadge status={log.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {AUDIT_LOGS.length} events</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="px-2 py-1 text-xs border border-blue-200 rounded-lg text-blue-600 bg-blue-50">1</button>
            <button className="px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: NOTIFICATIONS
// ──────────────────────────────────────────────
const NotificationsScreen = () => {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const markRead = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const notifIcon = { critical: AlertCircle, warning: AlertTriangle, info: Info, success: CheckCircle };
  const notifColor = { critical: "text-red-500", warning: "text-amber-500", info: "text-blue-500", success: "text-green-500" };
  const notifBg = { critical: "bg-red-50 border-red-100", warning: "bg-amber-50 border-amber-100", info: "bg-blue-50 border-blue-100", success: "bg-green-50 border-green-100" };

  const filtered = filter === "all" ? notifs : notifs.filter(n => n.type === filter);
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500">{unread} unread · {notifs.length} total</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" onClick={markAllRead}>Mark all read</Btn>
          <Btn variant="secondary" icon={Settings}>Notification settings</Btn>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "critical", "warning", "info", "success"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === f ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-blue-300"
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n) => {
          const Icon = notifIcon[n.type as keyof typeof notifIcon];
          return (
            <motion.div key={n.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => markRead(n.id)}
              className={`relative border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm ${
                n.read ? "bg-white border-gray-100" : `border ${notifBg[n.type as keyof typeof notifBg]}`
              }`}>
              {!n.read && <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />}
              <div className="flex gap-3">
                <Icon size={16} className={notifColor[n.type as keyof typeof notifColor]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-900">{n.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded capitalize ${
                      n.type === "critical" ? "bg-red-100 text-red-600" :
                      n.type === "warning" ? "bg-amber-100 text-amber-600" :
                      n.type === "success" ? "bg-green-100 text-green-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>{n.type}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SCREEN: SETTINGS
// ──────────────────────────────────────────────
const SettingsScreen = () => {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Configure your Sarathi AI workspace and integrations</p>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        {["profile", "azure devops", "ai settings", "notifications", "security", "theme"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-semibold capitalize border-b-2 transition-all -mb-px whitespace-nowrap ${
              tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700"
            }`}>{t}</button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2">
            <SectionHeader title="Profile Information" />
            <div className="flex items-center gap-5 mb-6 pb-5 border-b border-gray-100">
              <Avatar initials="AU" size="lg" colorIdx={0} />
              <div>
                <div className="text-base font-bold text-gray-900 mb-0.5">Admin User</div>
                <div className="text-xs text-gray-400 mb-2">admin@sarathi.ai · Organization Admin</div>
                <Btn variant="secondary" size="xs" icon={Upload}>Change Photo</Btn>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "First Name", value: "Admin" },
                { label: "Last Name", value: "User" },
                { label: "Email", value: "admin@sarathi.ai" },
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Organization", value: "Sarathi Technologies" },
                { label: "Timezone", value: "Asia/Kolkata (IST)" },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <input defaultValue={field.value} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
              <Btn variant="primary" size="md" onClick={save} className="flex items-center gap-1.5">
                {saved ? <><Check size={14} />Saved!</> : "Save Changes"}
              </Btn>
              <Btn variant="secondary" size="md">Cancel</Btn>
            </div>
          </Card>
          <Card>
            <SectionHeader title="Account Status" />
            <div className="space-y-3 text-xs">
              {[
                { label: "Account Status", value: "Active", color: "text-green-600" },
                { label: "Role", value: "Organization Admin", color: "text-blue-600" },
                { label: "Last Login", value: "Today 14:30 IST", color: "text-gray-700" },
                { label: "MFA Status", value: "Enabled", color: "text-green-600" },
                { label: "Session Expires", value: "In 7 hours", color: "text-gray-700" },
                { label: "Member Since", value: "Jan 15, 2024", color: "text-gray-700" },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={`font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "azure devops" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <SectionHeader title="Azure DevOps Configuration" />
            <div className="space-y-4">
              {[
                { label: "Organization URL", value: "https://dev.azure.com/sarathi-demo", type: "url" },
                { label: "PAT Token", value: "••••••••••••••••••••••••••••••••", type: "password" },
                { label: "API Version", value: "7.1", type: "text" },
                { label: "Sync Interval (minutes)", value: "60", type: "number" },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <div className="flex gap-2">
                    <input type={field.type} defaultValue={field.value}
                      className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                    {field.type === "password" && <Btn variant="secondary" size="xs" icon={Key}>Rotate</Btn>}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Btn variant="secondary" icon={Wifi} size="md">Test Connection</Btn>
                <Btn variant="primary" size="md" onClick={save}>Save Configuration</Btn>
              </div>
            </div>
          </Card>
          <Card>
            <SectionHeader title="Connected Organizations" />
            <div className="space-y-3">
              {SYNC_JOBS.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${job.status === "success" ? "bg-green-500" : job.status === "failed" ? "bg-red-500" : "bg-amber-500"}`} />
                    <div>
                      <div className="text-xs font-semibold text-gray-800">{job.org}</div>
                      <div className="text-[10px] text-gray-400">{job.project}</div>
                    </div>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
              ))}
            </div>
            <Btn variant="secondary" icon={Plus} size="md" className="w-full justify-center mt-4">Add Organization</Btn>
          </Card>
        </div>
      )}

      {tab === "ai settings" && (
        <Card>
          <SectionHeader title="AI Configuration" subtitle="Configure Sarathi AI behavior and analysis settings" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { label: "AI Model", options: ["Sarathi AI v2.4 (Recommended)", "Sarathi AI v2.3", "Custom"], type: "select" },
              { label: "Analysis Frequency", options: ["Real-time", "Every hour", "Every 6 hours", "Daily"], type: "select" },
              { label: "Risk Threshold (Alert %)", value: "65", type: "number" },
              { label: "Velocity Deviation Alert (%)", value: "20", type: "number" },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                {field.type === "select" ? (
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                    {field.options?.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={field.type} defaultValue={field.value}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
            {["Enable predictive delivery forecasting", "Enable risk trend analysis", "Enable AI executive report generation", "Enable real-time anomaly detection"].map(opt => (
              <label key={opt} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-700">{opt}</span>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative flex-shrink-0">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-5">
            <Btn variant="primary" size="md" onClick={save}>Save AI Settings</Btn>
          </div>
        </Card>
      )}

      {(tab === "notifications" || tab === "security" || tab === "theme") && (
        <Card>
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <Settings size={28} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">{tab} Settings</h3>
            <p className="text-sm text-gray-400 max-w-sm">
              {tab === "notifications" ? "Configure alert preferences, email notifications, and in-app notification rules for all events." :
               tab === "security" ? "Manage MFA, session policies, API key rotation, and security audit settings." :
               "Customize appearance, color scheme, data density, and layout preferences."}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// MAIN APP
// ──────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("org-admin");
  const [screen, setScreen] = useState("org-admin");
  const [collapsed, setCollapsed] = useState(false);

  const handleLogin = (userEmail: string, userRole: Role) => {
    setEmail(userEmail);
    setRole(userRole);
    setScreen(ROLE_DEFAULT_SCREEN[userRole]);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setRole("org-admin");
    setScreen("org-admin");
  };

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Dashboard swap: org-admin users see the delivery/sprint PM view;
  // pm users see the executive portfolio overview (OrgAdminDashboard).
  const SCREENS: Record<string, React.ReactNode> = {
    "org-admin": <PMDashboard />,
    "pm-dashboard": <OrgAdminDashboard onNavigate={setScreen} />,
    "it-admin": <ITAdminDashboard onNavigate={setScreen} />,
    portfolio: <PortfolioDashboard onNavigate={setScreen} />,
    "project-details": <ProjectDetails />,
    sprint: <SprintGovernance />,
    kpi: <KPIDashboard />,
    "ai-risk": <AIRiskAnalysis />,
    "ai-reports": <AIExecutiveReports />,
    "ai-insights": <AIInsights />,
    users: <UserRoleManagement />,
    sync: <SyncMonitor />,
    audit: <AuditLogsScreen />,
    notifications: <NotificationsScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar currentScreen={screen} onNavigate={setScreen} role={role} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav currentScreen={screen} role={role} email={email} unreadCount={unread} onNavigate={setScreen} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {SCREENS[screen] ?? SCREENS["org-admin"]}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
