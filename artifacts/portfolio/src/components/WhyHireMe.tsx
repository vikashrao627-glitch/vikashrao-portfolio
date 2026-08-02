import { motion } from "framer-motion";
import { Brain, Presentation, Zap, BookOpen } from "lucide-react";

const reasons = [
  {
    title: "Strong Analytical Thinking",
    desc: "I approach every dataset with rigorous logic and curiosity. I don't just run queries—I solve business problems.",
    icon: Brain
  },
  {
    title: "Interactive Dashboard Development",
    desc: "I build intuitive, user-friendly dashboards that allow stakeholders to explore data dynamically and seamlessly.",
    icon: Presentation
  },
  {
    title: "Data Storytelling",
    desc: "I bridge the gap between raw numbers and business strategy. My reports focus on clarity and actionable takeaways.",
    icon: Zap
  },
  {
    title: "Continuous Learning Mindset",
    desc: "Tech evolves rapidly, and so do I. I am constantly upgrading my skills to stay at the cutting edge of analytics.",
    icon: BookOpen
  }
];

export default function WhyHireMe() {
  return (
    <section className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why <span className="text-accent">Hire Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-2xl flex flex-col sm:flex-row gap-6 hover:border-white/10 transition-colors group"
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <reason.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}