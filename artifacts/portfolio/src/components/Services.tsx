import { motion } from "framer-motion";
import { LineChart, BarChart2, Database, LayoutDashboard, FileSpreadsheet, Search } from "lucide-react";

const services = [
  {
    title: "Dashboard Development",
    desc: "Interactive and dynamic dashboards using Power BI and Tableau for real-time tracking.",
    icon: LayoutDashboard,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Business Intelligence",
    desc: "Transforming raw data into strategic business insights for informed decision making.",
    icon: BarChart2,
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Data Cleaning",
    desc: "Structuring and preprocessing messy datasets into clean, analysis-ready formats.",
    icon: Database,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Data Visualization",
    desc: "Compelling visual storytelling that highlights key trends and hidden patterns.",
    icon: LineChart,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Excel Reporting",
    desc: "Advanced automation, pivot tables, and tailored reporting in Microsoft Excel.",
    icon: FileSpreadsheet,
    color: "text-teal-400",
    bg: "bg-teal-400/10"
  },
  {
    title: "Data Analysis",
    desc: "Comprehensive exploratory analysis to uncover the narrative behind the numbers.",
    icon: Search,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

export default function Services() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core <span className="text-primary">Services</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl group hover:bg-white/[0.03] transition-colors border-white/5 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color.replace('text-', 'from-')} to-transparent opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-full -mr-10 -mt-10`}></div>
              
              <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center ${service.color} mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}