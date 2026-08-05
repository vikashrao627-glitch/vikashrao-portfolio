/**
 * Featured Projects — Premium alternating case-study layout
 * Image slider (4 unique dashboard previews per project) + lightbox
 * Modifying ONLY this section; all other sections untouched.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, ChevronLeft, ChevronRight, X, ZoomIn,
  Target, Lightbulb, TrendingUp, Database,
  Code2, LayoutDashboard, Layers,
} from "lucide-react";

import { P1S1, P1S2, P1S3, P1S4 } from "./ProjectDashboards";
import { P2S1, P2S2, P2S3, P2S4 } from "./ProjectDashboards";
import { P3S1, P3S2, P3S3, P3S4 } from "./ProjectDashboards";
import { P4S1, P4S2, P4S3, P4S4 } from "./ProjectDashboards";
import { P5S1, P5S2, P5S3, P5S4 } from "./ProjectDashboards";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  category: string;
  categoryIcon: React.ReactNode;
  title: string;
  description: string;
  problem: string;
  objectives: string[];
  dataset: string;
  tools: string[];
  insights: string[];
  kpis: { label: string; value: string }[];
  impact: string;
  github: string;
  accent: string;
  accentLight: string;
  accentGlow: string;
  slides: { label: string; node: React.ReactNode }[];
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={12} />,
    title: "Amazon Sales Analysis Dashboard",
    description:
      "Interactive Power BI dashboard to analyze sales performance, revenue, products, customers, regions, and business KPIs across Amazon's full product catalogue.",
    problem:
      "Amazon's sales data was scattered across multiple sheets with no unified view. Decision-makers had no single source of truth to track revenue drivers, identify underperforming categories, or understand regional patterns.",
    objectives: [
      "Unify multi-sheet sales data into a single interactive dashboard",
      "Identify top-revenue categories and seasonal demand patterns",
      "Analyze regional performance and distribution channel mix",
      "Build executive KPI tiles for leadership reporting",
    ],
    dataset: "Amazon Sales Dataset · 84,200+ transactions · FY 2024 · 6 regions · 12 categories",
    tools: ["Power BI", "Excel", "DAX", "Power Query"],
    insights: [
      "Electronics drove 34% of total revenue — highest among all categories",
      "Q4 contributed 41% of annual sales, signalling strong seasonal demand spikes",
      "Western region consistently outperformed all others by 18% margin",
      "Direct channel delivered the highest margin at 52% vs 38% marketplace",
    ],
    kpis: [
      { label: "Total Revenue", value: "$6.9M" },
      { label: "Total Orders", value: "84.2K" },
      { label: "Avg Order Value", value: "$82" },
      { label: "YoY Growth", value: "+18.4%" },
    ],
    impact:
      "Enabled data-driven inventory planning and targeted marketing investment, reducing stock-outs in peak season by an estimated 23%.",
    github: "https://github.com/vikashrao627-glitch",
    accent: "#2563EB",
    accentLight: "#60A5FA",
    accentGlow: "rgba(37,99,235,0.18)",
    slides: [
      { label: "Sales Overview", node: <P1S1 /> },
      { label: "Revenue Trends", node: <P1S2 /> },
      { label: "Product Performance", node: <P1S3 /> },
      { label: "Executive KPIs", node: <P1S4 /> },
    ],
  },
  {
    id: 2,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={12} />,
    title: "IBM HR Analytics Dashboard",
    description:
      "Interactive Power BI dashboard analyzing employee attrition patterns, workforce distribution, job satisfaction, and HR KPIs to improve talent retention at IBM.",
    problem:
      "IBM faced a 16.1% attrition rate — above the 12% industry benchmark — with no clear visibility into which departments, roles, or demographic segments were driving turnover. HR lacked an interactive tool to identify at-risk employees proactively.",
    objectives: [
      "Identify departments and job roles with highest attrition rates",
      "Analyze demographic and compensation drivers of employee turnover",
      "Build an interactive HR KPI dashboard for leadership",
      "Surface high-risk cohorts before they resign",
    ],
    dataset: "IBM HR Dataset · 1,470 employee records · 35 features · Kaggle public dataset",
    tools: ["Power BI", "Excel", "DAX", "Power Query"],
    insights: [
      "Overall attrition rate of 16.1% — 4.1 points above industry benchmark",
      "Sales Representatives had the highest turnover at 40% annually",
      "Employees with 1–2 years of tenure were the most at-risk cohort",
      "Low job satisfaction (score 1-2) correlated with 3× higher attrition",
    ],
    kpis: [
      { label: "Attrition Rate", value: "16.1%" },
      { label: "Total Employees", value: "1,470" },
      { label: "Avg Tenure", value: "7.0 yrs" },
      { label: "Retention Rate", value: "83.9%" },
    ],
    impact:
      "Provided actionable retention strategies enabling estimated 22% reduction in attrition-related hiring and onboarding costs.",
    github: "https://github.com/vikashrao627-glitch",
    accent: "#06B6D4",
    accentLight: "#67E8F9",
    accentGlow: "rgba(6,182,212,0.15)",
    slides: [
      { label: "Attrition Overview", node: <P2S1 /> },
      { label: "Demographics", node: <P2S2 /> },
      { label: "Tenure Analysis", node: <P2S3 /> },
      { label: "HR KPI Summary", node: <P2S4 /> },
    ],
  },
  {
    id: 3,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={12} />,
    title: "Student Social Media Addiction Dashboard",
    description:
      "Interactive Power BI dashboard analyzing students' social media usage patterns and their measurable impact on academic performance, sleep habits, and overall well-being.",
    problem:
      "Educational institutions lacked data-driven evidence linking students' social media habits to measurable academic and health outcomes. Counselors needed an interactive tool to identify high-risk student segments and design targeted interventions.",
    objectives: [
      "Build an executive dashboard with KPIs on usage patterns and addiction levels",
      "Analyze screen time distribution across platforms and demographics",
      "Correlate social media habits with academic GPA and sleep quality",
      "Enable dynamic filtering by age, gender, platform, and study level",
    ],
    dataset: "Student Social Media Survey · 3,200 students · 18 features · Self-reported behavioral data",
    tools: ["Power BI", "Excel", "DAX", "Power Query"],
    insights: [
      "Heavy users (5+ hrs/day) showed 18% lower average GPA vs light users",
      "Sleep deprivation strongly correlated with late-night social media use (r=0.81)",
      "Reels/Shorts drove the highest screen-time spikes among 18–22 year olds",
      "Weekend usage was 38% higher than weekdays with peak at 19:00–21:00",
    ],
    kpis: [
      { label: "Avg Daily Usage", value: "6.4 hrs" },
      { label: "Heavy Users", value: "32%" },
      { label: "GPA Impact", value: "−18%" },
      { label: "Sleep Deficit", value: "2.4 hrs" },
    ],
    impact:
      "Delivered behavioral insights to guide student wellness programs and academic intervention strategies for educational counselors.",
    github: "https://github.com/vikashrao627-glitch/Student-Social-Media-Addiction-Dashboard",
    accent: "#8B5CF6",
    accentLight: "#C4B5FD",
    accentGlow: "rgba(139,92,246,0.15)",
    slides: [
      { label: "Executive Summary", node: <P3S1 /> },
      { label: "Screen Time Heatmap", node: <P3S2 /> },
      { label: "Academic Correlation", node: <P3S3 /> },
      { label: "Sleep Analysis", node: <P3S4 /> },
    ],
  },
  {
    id: 4,
    category: "Python Data Analysis",
    categoryIcon: <Code2 size={12} />,
    title: "Customer Data Analysis using Python",
    description:
      "End-to-end exploratory data analysis, statistical analysis, K-Means clustering, and visualization on customer demographic and behavioural data to surface actionable business insights.",
    problem:
      "The business had accumulated years of raw customer transaction data but lacked any analytical framework to understand spending behaviour, identify high-value segments, or predict churn-prone customers.",
    objectives: [
      "Clean and preprocess messy real-world customer datasets",
      "Perform statistical EDA: distributions, outliers, correlations",
      "Apply K-Means clustering to identify 3 distinct customer segments",
      "Visualize insights with production-quality Python charts",
    ],
    dataset: "Retail Customer Dataset · 12,450 records · 18 features · Purchase history + demographics",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
    insights: [
      "68% of customers fall in the 25–40 age bracket — the primary revenue cohort",
      "Top 20% of customers (high-value cluster) drive 65% of total revenue",
      "Income vs spend correlation: r=0.72 — strongest predictor of LTV",
      "Churn risk was highest in the low-engagement cluster (visits < 2/month)",
    ],
    kpis: [
      { label: "Mean Spend", value: "₹4,200" },
      { label: "High-Value Seg.", value: "23.2%" },
      { label: "Silhouette Score", value: "0.71" },
      { label: "Churn Risk Seg.", value: "34.7%" },
    ],
    impact:
      "Customer segmentation insights directly informed marketing budget allocation, lifting campaign ROI by an estimated 28% for the high-value segment.",
    github: "https://github.com/vikashrao627-glitch",
    accent: "#10B981",
    accentLight: "#6EE7B7",
    accentGlow: "rgba(16,185,129,0.14)",
    slides: [
      { label: "Spending Distribution", node: <P4S1 /> },
      { label: "Correlation Matrix", node: <P4S2 /> },
      { label: "Customer Segments", node: <P4S3 /> },
      { label: "Statistical Summary", node: <P4S4 /> },
    ],
  },
  {
    id: 5,
    category: "SQL Project",
    categoryIcon: <Database size={12} />,
    title: "Retail Store SQL Analysis",
    description:
      "Comprehensive retail business intelligence using advanced SQL queries — joins, CTEs, window functions, and aggregations — to generate actionable insights and support data-driven decisions.",
    problem:
      "The retail store's operational data lived in a relational MySQL database, but managers relied on manual spreadsheets for reporting. There was no automated, query-driven view of revenue drivers, customer behavior, or product profitability.",
    objectives: [
      "Write complex SQL queries using CTEs, window functions, and joins",
      "Identify top customers, highest-margin products, and peak periods",
      "Generate weekly and monthly revenue performance reports",
      "Detect operational patterns to reduce cost and improve throughput",
    ],
    dataset: "Retail MySQL Database · 92,400 transactions · 8 tables · 3 years of historical data",
    tools: ["SQL", "MySQL", "Excel"],
    insights: [
      "Top 10 customers drove 28% of total annual revenue — high concentration risk",
      "Electronics category recorded the highest gross margin at 42%",
      "Weekend sales were 23% higher than weekday averages consistently across all years",
      "Q4 promotional period yielded 1.8× the baseline weekly order volume",
    ],
    kpis: [
      { label: "Annual Revenue", value: "₹8.4M" },
      { label: "Top 10 Cust. Share", value: "28%" },
      { label: "Peak Margin", value: "42%" },
      { label: "Weekend Uplift", value: "+23%" },
    ],
    impact:
      "Delivered production-grade SQL reporting skills applicable directly to analyst roles at product and retail companies.",
    github: "https://github.com/vikashrao627-glitch",
    accent: "#F59E0B",
    accentLight: "#FCD34D",
    accentGlow: "rgba(245,158,11,0.13)",
    slides: [
      { label: "Sales Performance", node: <P5S1 /> },
      { label: "Customer Ranking", node: <P5S2 /> },
      { label: "Product Profitability", node: <P5S3 /> },
      { label: "Business KPIs", node: <P5S4 /> },
    ],
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  project,
  slideIndex,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  slideIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <p className="text-xs text-white/40 mb-0.5">{project.title}</p>
            <p className="text-sm font-semibold text-white/90">{project.slides[slideIndex].label}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        {/* Slide */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.22 }}
            >
              {project.slides[slideIndex].node}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Nav */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8 hover:bg-white/14 border border-white/10 text-white/60 hover:text-white text-sm transition-all"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-2">
            {project.slides.map((s, i) => (
              <button
                key={i}
                className="text-xs px-2.5 py-1 rounded-md transition-all"
                style={{
                  background: i === slideIndex ? project.accent : "rgba(255,255,255,0.06)",
                  color: i === slideIndex ? "white" : "rgba(255,255,255,0.4)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8 hover:bg-white/14 border border-white/10 text-white/60 hover:text-white text-sm transition-all"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Image Gallery / Slider ───────────────────────────────────────────────────

function ImageGallery({
  project,
  onLightbox,
}: {
  project: Project;
  onLightbox: (i: number) => void;
}) {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((a) => (a - 1 + project.slides.length) % project.slides.length), [project]);
  const next = useCallback(() => setActive((a) => (a + 1) % project.slides.length), [project]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main slide */}
      <div
        className="relative rounded-xl overflow-hidden cursor-zoom-in group/img border"
        style={{ borderColor: `${project.accent}22` }}
        onClick={() => onLightbox(active)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="transition-transform duration-700 group-hover/img:scale-[1.02]"
          >
            {project.slides[active].node}
          </motion.div>
        </AnimatePresence>

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-white/50 opacity-0 group-hover/img:opacity-100 transition-opacity">
          <ZoomIn size={14} />
        </div>

        {/* Slide label overlay */}
        <div
          className="absolute bottom-0 inset-x-0 px-4 py-2.5 text-xs font-medium"
          style={{
            background: `linear-gradient(to top, ${project.accent}cc, transparent)`,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {project.slides[active].label}
        </div>

        {/* Prev / Next arrows */}
        {project.slides.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/img:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover/img:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-4 gap-2">
        {project.slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="relative rounded-lg overflow-hidden border-2 transition-all duration-200"
            style={{
              borderColor: i === active ? project.accent : "transparent",
              outline: i === active ? `1px solid ${project.accent}40` : "none",
            }}
          >
            <div className="pointer-events-none scale-[1.0]">{s.node}</div>
            <div
              className="absolute inset-0 rounded-md transition-opacity"
              style={{ background: i === active ? `${project.accent}22` : "rgba(0,0,0,0.35)" }}
            />
            <p
              className="absolute bottom-1 inset-x-0 text-center text-[8px] font-medium px-0.5 truncate"
              style={{ color: i === active ? project.accentLight : "rgba(255,255,255,0.45)" }}
            >
              {s.label}
            </p>
          </button>
        ))}
      </div>

      {/* Dot indicator */}
      <div className="flex justify-center gap-1.5">
        {project.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? project.accent : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Project Content ──────────────────────────────────────────────────────────

function ProjectContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Category + GitHub */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
          style={{
            background: `${project.accent}12`,
            borderColor: `${project.accent}30`,
            color: project.accent,
          }}
        >
          {project.categoryIcon}
          {project.category}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-200"
        >
          <Github size={13} /> View on GitHub
        </a>
      </div>

      {/* Title + description */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      {/* Problem */}
      <div
        className="flex gap-3 p-4 rounded-xl border-l-2"
        style={{ background: `${project.accent}0a`, borderLeftColor: project.accent }}
      >
        <Target size={14} className="shrink-0 mt-0.5" style={{ color: project.accent }} />
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground/80">Problem: </span>
          {project.problem}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-2">
        {project.kpis.map((k) => (
          <div
            key={k.label}
            className="p-3 rounded-lg border"
            style={{ background: `${project.accent}08`, borderColor: `${project.accent}20` }}
          >
            <p className="text-[10px] text-muted-foreground/60 mb-1">{k.label}</p>
            <p className="text-lg font-bold" style={{ color: project.accent }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Objectives + Insights grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4
            className="text-[10px] uppercase tracking-widest font-bold mb-2.5 flex items-center gap-1.5"
            style={{ color: project.accent }}
          >
            <Target size={11} /> Objectives
          </h4>
          <ul className="space-y-2">
            {project.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ background: project.accent }} />
                <span className="leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4
            className="text-[10px] uppercase tracking-widest font-bold mb-2.5 flex items-center gap-1.5"
            style={{ color: project.accentLight }}
          >
            <Lightbulb size={11} /> Key Insights
          </h4>
          <ul className="space-y-2">
            {project.insights.map((ins, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ background: project.accentLight }} />
                <span className="leading-relaxed">{ins}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dataset */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground/60 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
        <Layers size={12} className="shrink-0 mt-0.5 text-muted-foreground/40" />
        <span><span className="text-muted-foreground/60 font-medium">Dataset: </span>{project.dataset}</span>
      </div>

      {/* Footer: tools + impact */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/[0.08] bg-white/[0.04] text-foreground/65"
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="flex items-start gap-2 p-3 rounded-lg border text-xs leading-relaxed"
          style={{ background: `${project.accent}08`, borderColor: `${project.accent}20` }}
        >
          <TrendingUp size={13} className="shrink-0 mt-0.5" style={{ color: project.accent }} />
          <span className="text-muted-foreground"><span className="font-semibold text-foreground/70">Impact: </span>{project.impact}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Project Showcase ─────────────────────────────────────────────────────────

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const [lightboxSlide, setLightboxSlide] = useState<number | null>(null);
  const isEven = index % 2 === 0; // even → image left; odd → image right

  const openLightbox = (i: number) => setLightboxSlide(i);
  const closeLightbox = () => setLightboxSlide(null);
  const prevSlide = () => setLightboxSlide((s) => ((s ?? 0) - 1 + project.slides.length) % project.slides.length);
  const nextSlide = () => setLightboxSlide((s) => ((s ?? 0) + 1) % project.slides.length);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative group"
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
          style={{ background: project.accentGlow }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/[0.07] group-hover:border-white/[0.12] transition-all duration-500 group-hover:-translate-y-1"
          style={{ background: "rgba(255,255,255,0.024)", backdropFilter: "blur(16px)" }}
        >
          {/* Gradient top accent line */}
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, ${project.accentLight}, transparent)` }}
          />

          {/* Project number */}
          <div
            className="absolute top-5 z-10 text-[9px] font-bold px-2.5 py-1 rounded-full border"
            style={{
              left: isEven ? "auto" : "24px",
              right: isEven ? "24px" : "auto",
              background: `${project.accent}18`,
              borderColor: `${project.accent}30`,
              color: project.accent,
            }}
          >
            Project {String(project.id).padStart(2, "0")}
          </div>

          {/* Main grid — alternating */}
          <div className={`grid lg:grid-cols-2 gap-0`}>
            {/* Image col */}
            <div
              className={`${isEven ? "lg:order-1" : "lg:order-2"} p-5 md:p-7`}
            >
              <ImageGallery project={project} onLightbox={openLightbox} />
            </div>

            {/* Divider */}
            <div className={`hidden lg:block absolute top-8 bottom-8 w-px bg-white/[0.05] ${isEven ? "left-1/2" : "left-1/2"}`} />

            {/* Content col */}
            <div
              className={`${isEven ? "lg:order-2" : "lg:order-1"} p-5 md:p-7 pt-0 lg:pt-7`}
            >
              <ProjectContent project={project} />
            </div>
          </div>
        </div>
      </motion.article>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxSlide !== null && (
          <Lightbox
            project={project}
            slideIndex={lightboxSlide}
            onClose={closeLightbox}
            onPrev={prevSlide}
            onNext={nextSlide}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed mb-5">
            Five end-to-end analytics projects spanning Power BI, Python, and SQL —
            each built to solve a real business problem with measurable outcomes.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        {/* Project showcases */}
        <div className="max-w-6xl mx-auto space-y-16">
          {PROJECTS.map((project, i) => (
            <ProjectShowcase key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
