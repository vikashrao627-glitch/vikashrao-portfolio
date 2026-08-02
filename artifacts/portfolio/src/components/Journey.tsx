import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const milestones = [
  {
    date: "Feb 2026",
    title: "Started Data Analytics",
    desc: "Began the journey of transforming data into insights."
  },
  {
    date: "Mar 2026",
    title: "Mastered Excel for Data Analysis",
    desc: "Deep dive into formulas, pivot tables, and data manipulation."
  },
  {
    date: "Apr 2026",
    title: "SQL & MySQL",
    desc: "Intermediate certified on HackerRank. Advanced querying techniques."
  },
  {
    date: "May 2026",
    title: "Python for Data Analysis",
    desc: "Mastered Pandas, NumPy, and Matplotlib for robust data wrangling."
  },
  {
    date: "Jun 2026",
    title: "EDA & Power BI Dashboards",
    desc: "Built comprehensive exploratory analysis projects and interactive BI reports."
  },
  {
    date: "Jul 2026",
    title: "Tableau Dashboards",
    desc: "Advanced data visualization and storytelling using Tableau."
  },
  {
    date: "Aug 2026",
    title: "Continuous Learning",
    desc: "Building, learning, and refining skills every single day."
  }
];

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning <span className="text-primary">Journey</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2 opacity-30"></div>

          <div className="space-y-12 relative z-10">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 flex flex-col ${i % 2 === 0 ? "md:items-start pl-12 md:pl-0" : "md:items-end md:text-right pl-12 md:pl-0"}`}>
                  <div className="glass-panel p-6 rounded-2xl border-white/5 hover:bg-white/5 transition-colors w-full">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3 bg-primary/10 px-2.5 py-1.5 rounded border border-primary/20">
                      <Calendar size={14} /> {milestone.date}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:left-1/2 w-9 h-9 rounded-full bg-background border-4 border-primary flex items-center justify-center md:-translate-x-1/2 mt-6 md:mt-0 glow-primary z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}