import { motion } from "framer-motion";
import profilePhoto from "@assets/WhatsApp_Image_2026-06-26_at_9.08.09_PM_1785690592723.jpeg";

export default function About() {
  const stats = [
    { label: "Projects", value: "5" },
    { label: "Months Learning", value: "5+" },
    { label: "Certifications", value: "2" },
    { label: "Tools", value: "10+" },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-primary">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-full p-2 bg-gradient-to-tr from-primary via-secondary to-accent glow-secondary">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-card">
                <img 
                  src={profilePhoto} 
                  alt="Vikash Rao" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I am a passionate data analyst who began my journey in February 2026 and have been consistently building hands-on projects ever since. I specialize in transforming messy, complex datasets into clean, actionable insights. 
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                My core strengths are Business Intelligence, Dashboard Development, Data Cleaning, Exploratory Data Analysis, SQL Querying, and Data Visualization. I approach every problem with analytical rigour and a genuine curiosity to understand the story behind the numbers. I am driven by continuous learning and believe real skill comes from building real things.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-4 rounded-xl text-center flex flex-col justify-center items-center gap-2 hover:bg-white/5 transition-colors"
                >
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}