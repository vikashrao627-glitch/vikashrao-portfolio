import { motion } from "framer-motion";
import { Download, ArrowRight, Mail } from "lucide-react";
import profilePhoto from "@assets/WhatsApp_Image_2026-06-26_at_9.08.09_PM_1785690592723.jpeg";
import resumePdf from "@assets/Vikash_Rao_Resume_(1)_1785691986080.pdf";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background Animated Grid / Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm text-secondary font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Available for Data Analyst Roles
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Transforming <br /> Raw Data into <br />
              <span className="text-gradient">Actionable <br className="hidden md:block" /> Business Insights</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            I analyze datasets, clean data, build dashboards, and generate meaningful business insights using SQL, Excel, Python, Power BI, and Tableau.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a href="#projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              View Projects <ArrowRight size={18} />
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg glass-panel font-medium hover:bg-white/5 transition-colors">
              <Download size={18} /> Download Resume
            </a>
            <a href="#contact" className="inline-flex items-center justify-center p-3 rounded-lg glass-panel hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center md:justify-end py-10"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            {/* Glowing ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 glow-primary"
            />
            
            {/* Photo container */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 bg-card">
              <img 
                src={profilePhoto} 
                alt="Vikash Rao" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-10 glass-panel px-4 py-2 rounded-lg flex items-center gap-3 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">5</div>
              <span className="text-sm font-medium">Projects</span>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-10 glass-panel px-4 py-2 rounded-lg flex items-center gap-3 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="w-8 h-8 rounded bg-secondary/20 flex items-center justify-center text-secondary font-bold">5+</div>
              <span className="text-sm font-medium">Tools</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-5 left-10 glass-panel px-4 py-2 rounded-lg flex items-center gap-3 backdrop-blur-xl border border-white/20 shadow-lg"
            >
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
              <span className="text-sm font-medium">Certifications</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}