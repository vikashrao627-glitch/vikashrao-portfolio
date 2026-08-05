import { motion } from "framer-motion";
import {
  Github,
  Target,
  Lightbulb,
  TrendingUp,
  BarChart2,
  Database,
  Code2,
  LayoutDashboard,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  category: string;
  categoryIcon: React.ReactNode;
  title: string;
  description: string;
  problem: string;
  objectives: string[];
  tools: string[];
  insights: string[];
  impact: string;
  github: string;
  accentFrom: string;   // Tailwind gradient-from colour (arbitrary)
  accentTo: string;     // Tailwind gradient-to colour (arbitrary)
  accentText: string;   // text-* class for badge / heading accent
  accentBorder: string; // border-* class for gradient ring
  image?: string;       // path to screenshot once uploaded
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={13} />,
    title: "Amazon Sales Analysis Dashboard",
    description:
      "Interactive Power BI dashboard to analyze sales performance, revenue, products, customers, regions, and business KPIs across Amazon's product catalogue.",
    problem:
      "Analyze Amazon's multi-dimensional sales data to surface actionable revenue insights and guide inventory & marketing decisions.",
    objectives: [
      "Identify top-selling categories and SKUs",
      "Analyze regional revenue distribution",
      "Track month-over-month and quarter-over-quarter sales trends",
      "Build dynamic KPI tiles for executives",
    ],
    tools: ["Power BI", "Excel", "DAX"],
    insights: [
      "Electronics drove 34% of total revenue — highest among all categories",
      "Q4 contributed 41% of annual sales, signalling strong seasonal demand",
      "Western region consistently outperformed all other regions by 18%",
    ],
    impact:
      "Enabled data-driven inventory planning and targeted marketing investment decisions.",
    github: "https://github.com/vikashrao627-glitch",
    accentFrom: "#2563EB",
    accentTo: "#06B6D4",
    accentText: "text-blue-400",
    accentBorder: "from-blue-500 via-cyan-500 to-blue-600",
  },
  {
    id: 2,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={13} />,
    title: "IBM HR Analytics Dashboard",
    description:
      "Interactive HR dashboard analyzing employee attrition patterns, workforce distribution, job satisfaction, and key HR KPIs to improve talent retention.",
    problem:
      "Understand employee attrition patterns at IBM and identify the root factors driving turnover to support retention strategy.",
    objectives: [
      "Identify departments and roles with highest attrition rates",
      "Analyze demographic and compensation drivers of turnover",
      "Build an interactive HR KPI dashboard for leadership",
      "Surface high-risk employee segments before they resign",
    ],
    tools: ["Power BI", "Excel", "DAX"],
    insights: [
      "Overall attrition rate was 16.1% — above industry benchmark of 12%",
      "Sales Representatives had the highest turnover at 40%",
      "Employees with 1–2 years of tenure were the most at-risk cohort",
    ],
    impact:
      "Provided actionable retention strategies that could reduce attrition-related costs by an estimated 22%.",
    github: "https://github.com/vikashrao627-glitch",
    accentFrom: "#06B6D4",
    accentTo: "#8B5CF6",
    accentText: "text-cyan-400",
    accentBorder: "from-cyan-500 via-violet-500 to-cyan-600",
  },
  {
    id: 3,
    category: "Power BI Dashboard",
    categoryIcon: <LayoutDashboard size={13} />,
    title: "Student Social Media Addiction Dashboard",
    description:
      "Interactive Power BI dashboard analyzing students' social media usage patterns and their measurable impact on academic performance, sleep habits, and overall well-being.",
    problem:
      "Analyze students' social media usage and identify its relationship with academic performance and lifestyle using interactive dashboards.",
    objectives: [
      "Build an Executive Dashboard with KPIs on usage patterns",
      "Analyze screen time distribution across platforms and demographics",
      "Correlate social media habits with academic grades and sleep quality",
      "Enable dynamic filtering by age, gender, platform, and study level",
    ],
    tools: ["Power BI", "Excel", "DAX", "Power Query"],
    insights: [
      "Heavy users (5+ hrs/day) showed an 18% lower average GPA",
      "Sleep deprivation was strongly correlated with late-night social media use",
      "Reels/Shorts drove the highest screen-time spikes among 18–22 year olds",
    ],
    impact:
      "Delivered interactive behavioral insights to guide student wellness programs and academic intervention strategies.",
    github:
      "https://github.com/vikashrao627-glitch/Student-Social-Media-Addiction-Dashboard",
    accentFrom: "#8B5CF6",
    accentTo: "#EC4899",
    accentText: "text-violet-400",
    accentBorder: "from-violet-500 via-pink-500 to-violet-600",
  },
  {
    id: 4,
    category: "Python Data Analysis",
    categoryIcon: <Code2 size={13} />,
    title: "Customer Data Analysis using Python",
    description:
      "Performed end-to-end exploratory data analysis, statistical analysis, and visualization on customer demographics and behaviour data to generate meaningful business insights.",
    problem:
      "Extract meaningful patterns from raw customer data to support product, marketing, and retention strategies.",
    objectives: [
      "Clean and preprocess messy customer datasets",
      "Perform statistical and exploratory data analysis",
      "Visualize demographic distributions and spending patterns",
      "Identify high-value customer segments for targeting",
    ],
    tools: ["Python", "Pandas", "NumPy", "Matplotlib"],
    insights: [
      "68% of customers fall in the 25–40 age bracket — the primary revenue cohort",
      "Churn risk was highest in the low-engagement customer segment",
      "Gender had minimal impact on spend; purchase frequency was the key driver",
    ],
    impact:
      "Provided clean, analysis-ready insights that directly informed customer segmentation and retention strategy.",
    github: "https://github.com/vikashrao627-glitch",
    accentFrom: "#10B981",
    accentTo: "#06B6D4",
    accentText: "text-emerald-400",
    accentBorder: "from-emerald-500 via-cyan-500 to-emerald-600",
  },
  {
    id: 5,
    category: "SQL Project",
    categoryIcon: <Database size={13} />,
    title: "Retail Store SQL Analysis",
    description:
      "Analyzed retail business data using advanced SQL queries to generate actionable business intelligence and support data-driven decision making across sales, customers, and products.",
    problem:
      "Extract actionable business intelligence from a retail database to identify revenue drivers, top customers, and operational inefficiencies.",
    objectives: [
      "Write complex SQL queries for multi-dimensional sales analysis",
      "Identify top customers and highest-margin products",
      "Generate weekly and monthly revenue performance reports",
      "Surface operational patterns to reduce waste",
    ],
    tools: ["SQL", "MySQL"],
    insights: [
      "Top 10 customers alone drove 28% of total revenue",
      "The highest-margin product category recorded a 42% gross margin",
      "Weekend sales were 23% higher than weekday averages consistently",
    ],
    impact:
      "Demonstrated production-grade SQL skills across real business scenarios — directly applicable to analyst roles.",
    github: "https://github.com/vikashrao627-glitch",
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
    accentText: "text-amber-400",
    accentBorder: "from-amber-500 via-orange-500 to-amber-600",
  },
];

// ─── Dashboard Placeholder ────────────────────────────────────────────────────

function DashboardPlaceholder({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const bars = [65, 82, 48, 90, 73, 58, 95, 67];
  const line = [40, 55, 45, 70, 60, 80, 72, 88, 76, 92];

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)`,
      }}
    >
      {/* Gradient accent wash */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${project.accentFrom}55 0%, transparent 60%),
                       radial-gradient(ellipse at 75% 60%, ${project.accentTo}33 0%, transparent 50%)`,
        }}
      />

      {/* Grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`g${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g${index})`} />
      </svg>

      {/* KPI tiles (top row) */}
      <div className="absolute top-5 left-5 right-5 flex gap-3">
        {["Total Revenue", "Active Users", "Growth Rate", "Avg. Score"].map((label, k) => (
          <div
            key={k}
            className="flex-1 rounded-lg p-2.5 border border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="h-1 w-8 rounded mb-2 opacity-70"
              style={{ background: project.accentFrom }}
            />
            <div className="h-3 w-14 bg-white/20 rounded mb-1.5" />
            <div className="h-5 w-10 bg-white/30 rounded" />
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="absolute bottom-6 left-5 flex items-end gap-[3px] h-20">
        {bars.map((h, k) => (
          <div
            key={k}
            className="w-5 rounded-t opacity-60"
            style={{
              height: `${h}%`,
              background: `linear-gradient(to top, ${project.accentFrom}, ${project.accentTo})`,
            }}
          />
        ))}
      </div>

      {/* Line chart */}
      <div className="absolute bottom-6 left-48 right-32">
        <svg viewBox="0 0 200 80" className="w-full h-20 overflow-visible">
          <defs>
            <linearGradient id={`lf${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={project.accentFrom} stopOpacity="0.3" />
              <stop offset="100%" stopColor={project.accentFrom} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Fill */}
          <path
            d={`M ${line.map((v, i) => `${i * 22},${80 - v * 0.75}`).join(" L ")} L ${(line.length - 1) * 22},80 L 0,80 Z`}
            fill={`url(#lf${index})`}
          />
          {/* Line */}
          <polyline
            points={line.map((v, i) => `${i * 22},${80 - v * 0.75}`).join(" ")}
            fill="none"
            stroke={project.accentFrom}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          {/* Dots */}
          {line.map((v, i) => (
            <circle
              key={i}
              cx={i * 22}
              cy={80 - v * 0.75}
              r="2.5"
              fill={project.accentFrom}
              opacity="0.9"
            />
          ))}
        </svg>
      </div>

      {/* Donut / pie suggestion */}
      <div className="absolute top-[30%] right-6 w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          <circle
            cx="40" cy="40" r="28"
            fill="none"
            stroke={project.accentFrom}
            strokeWidth="12"
            strokeDasharray="65 35"
            strokeDashoffset="25"
            opacity="0.7"
          />
          <circle
            cx="40" cy="40" r="28"
            fill="none"
            stroke={project.accentTo}
            strokeWidth="12"
            strokeDasharray="25 75"
            strokeDashoffset="-40"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Overlay: category + number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className="text-[7rem] font-black leading-none select-none"
          style={{ color: "rgba(255,255,255,0.03)" }}
        >
          0{project.id}
        </div>
      </div>

      {/* "Screenshot coming soon" badge */}
      <div
        className="absolute bottom-3 right-3 text-[10px] font-medium px-2.5 py-1 rounded-full border"
        style={{
          background: "rgba(0,0,0,0.5)",
          borderColor: `${project.accentFrom}40`,
          color: `${project.accentFrom}cc`,
        }}
      >
        Dashboard Preview
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Gradient border ring */}
      <div
        className={`absolute inset-0 rounded-2xl p-px bg-gradient-to-br ${project.accentBorder} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      >
        <div className="w-full h-full rounded-2xl bg-[#0F172A]" />
      </div>

      {/* Static subtle border (always visible) */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.07]" />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
        style={{ background: "rgba(255,255,255,0.026)", backdropFilter: "blur(12px)" }}
      >
        {/* ── Image / Preview ── */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "42%" }}>
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} dashboard screenshot`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <DashboardPlaceholder project={project} index={index} />
            )}
          </div>

          {/* Bottom gradient scrim for text readability */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(15,23,42,0.92) 0%, transparent 100%)",
            }}
          />

          {/* Project number */}
          <div
            className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${project.accentFrom}33, ${project.accentTo}22)`,
              color: project.accentFrom,
            }}
          >
            {String(project.id).padStart(2, "0")}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-6 md:p-8">
          {/* Category + GitHub row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border`}
              style={{
                background: `${project.accentFrom}15`,
                borderColor: `${project.accentFrom}35`,
                color: project.accentFrom,
              }}
            >
              {project.categoryIcon}
              {project.category}
            </span>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-foreground/80 hover:text-foreground"
            >
              <Github size={13} />
              View on GitHub
            </a>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Problem statement */}
          <div
            className="flex gap-3 p-4 rounded-xl mb-6 border-l-2"
            style={{
              background: `${project.accentFrom}0c`,
              borderLeftColor: project.accentFrom,
            }}
          >
            <Target size={15} className="shrink-0 mt-0.5" style={{ color: project.accentFrom }} />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground/80">Problem: </span>
              {project.problem}
            </p>
          </div>

          {/* Objectives + Insights grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Objectives */}
            <div>
              <h4
                className="text-[11px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2"
                style={{ color: project.accentFrom }}
              >
                <Target size={12} />
                Objectives
              </h4>
              <ul className="space-y-2">
                {project.objectives.map((obj, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ background: project.accentFrom }}
                    />
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Insights */}
            <div>
              <h4
                className="text-[11px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2"
                style={{ color: project.accentTo }}
              >
                <Lightbulb size={12} />
                Key Insights
              </h4>
              <ul className="space-y-2">
                {project.insights.map((ins, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ background: project.accentTo }}
                    />
                    <span className="leading-relaxed">{ins}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer: tools + impact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
            {/* Tool badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/[0.08] bg-white/[0.04] text-foreground/70"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Impact */}
            <div className="flex items-start gap-2 text-xs font-medium shrink-0 max-w-xs text-right">
              <TrendingUp
                size={14}
                className="shrink-0 mt-0.5"
                style={{ color: project.accentFrom }}
              />
              <span className="text-muted-foreground leading-snug text-left sm:text-right">
                {project.impact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
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
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed mb-5">
            End-to-end analytics projects spanning Power BI dashboards, Python
            analysis, and SQL — each delivered with measurable business impact.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        {/* Cards — vertical stack, easy to extend */}
        <div className="max-w-5xl mx-auto space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
