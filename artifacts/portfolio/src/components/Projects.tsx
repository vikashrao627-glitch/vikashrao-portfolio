import { motion } from "framer-motion";
import { Github, Database, BarChart, FileSpreadsheet } from "lucide-react";

const projects = [
  {
    title: "Amazon Sales Analysis Dashboard",
    problem: "Analyzing sales performance across categories, regions, and time periods for Amazon.",
    objectives: [
      "Identify top-selling categories",
      "Analyze regional revenue distribution",
      "Track monthly sales trends"
    ],
    tools: ["Python", "Pandas", "Matplotlib", "Power BI"],
    insights: [
      "Electronics was top revenue category at 34%",
      "Q4 drove 41% of annual sales",
      "Western region consistently outperformed"
    ],
    impact: "Enabled data-driven inventory and marketing decisions",
    icon: <BarChart className="text-primary" size={24} />
  },
  {
    title: "IBM HR Analytics Dashboard",
    problem: "Understanding employee attrition patterns at IBM to improve retention.",
    objectives: [
      "Identify high-attrition departments",
      "Analyze factors driving turnover",
      "Build an interactive HR dashboard"
    ],
    tools: ["Python", "Tableau", "Excel", "Pandas"],
    insights: [
      "Attrition rate was 16.1%",
      "Sales Reps had highest turnover at 40%",
      "Employees with 1-2 years experience most at risk"
    ],
    impact: "Provided actionable retention strategies to HR leadership",
    icon: <BarChart className="text-secondary" size={24} />
  },
  {
    title: "Retail Store SQL Project",
    problem: "Extracting actionable business intelligence from a retail database using SQL.",
    objectives: [
      "Write complex queries for sales analysis",
      "Identify top customers and products",
      "Generate monthly revenue reports"
    ],
    tools: ["MySQL", "SQL"],
    insights: [
      "Top 10 customers drove 28% of revenue",
      "Product X had highest margin at 42%",
      "Weekend sales 23% higher"
    ],
    impact: "Demonstrated SQL querying skills across real business scenarios",
    icon: <Database className="text-accent" size={24} />
  },
  {
    title: "Customer Spending Statistics Analysis",
    problem: "Statistical analysis of customer spending behaviour and patterns.",
    objectives: [
      "Calculate descriptive statistics on spending",
      "Identify high-value customer segments",
      "Visualize distributions"
    ],
    tools: ["Python", "Pandas", "Matplotlib", "Statistics"],
    insights: [
      "Mean spend ₹4,200/month",
      "Top 20% customers drove 65% of revenue",
      "Strong correlation between visit frequency and spend"
    ],
    impact: "Customer segmentation insights for targeted marketing",
    icon: <FileSpreadsheet className="text-primary" size={24} />
  },
  {
    title: "Customer Data Analysis",
    problem: "Comprehensive EDA on customer demographics and behaviour data.",
    objectives: [
      "Clean and preprocess messy customer data",
      "Perform exploratory analysis",
      "Identify business-relevant patterns"
    ],
    tools: ["Python", "Pandas", "Seaborn", "EDA"],
    insights: [
      "68% customers in 25-40 age bracket",
      "Churn risk highest in low-engagement segment",
      "Gender had minimal impact on spend"
    ],
    impact: "Provided clean, analysis-ready dataset and key demographic insights",
    icon: <Database className="text-secondary" size={24} />
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-panel rounded-2xl overflow-hidden hover:bg-white/[0.03] hover:-translate-y-1 transition-all duration-300 border-white/5 relative"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-white/5 mt-1 shrink-0">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                      <p className="text-muted-foreground font-medium text-sm leading-relaxed">{project.problem}</p>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/vikashrao627-glitch" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors border border-white/10"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Objectives
                    </h4>
                    <ul className="space-y-2.5">
                      {project.objectives.map((obj, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1 opacity-60">•</span> 
                          <span className="leading-relaxed">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-secondary font-semibold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Key Insights
                    </h4>
                    <ul className="space-y-2.5">
                      {project.insights.map((insight, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-secondary mt-1 opacity-60">•</span> 
                          <span className="leading-relaxed">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 rounded-full bg-background/50 text-xs font-medium border border-white/5 text-foreground/80">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-start md:items-center gap-2 text-sm font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/5 w-full md:w-auto">
                    <span className="text-accent shrink-0">Impact:</span>
                    <span className="text-foreground leading-snug">{project.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}