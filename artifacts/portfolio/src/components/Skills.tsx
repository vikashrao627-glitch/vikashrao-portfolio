import { motion } from "framer-motion";
import { 
  SiPython, SiMysql, SiGit, SiGithub, SiJupyter, 
  SiGooglecolab
} from "react-icons/si";
import { BarChart3, Database, Code2, LineChart, Wrench, BarChart2, Grid3X3, Table2 } from "lucide-react";

const skillGroups = [
  {
    category: "Programming",
    icon: <Code2 className="text-primary" size={24} />,
    skills: [
      { name: "Python", icon: SiPython, color: "text-blue-500" },
      { name: "SQL", icon: Database, color: "text-gray-400" },
      { name: "Statistics", icon: LineChart, color: "text-purple-400" },
    ]
  },
  {
    category: "Data Analysis",
    icon: <BarChart3 className="text-secondary" size={24} />,
    skills: [
      { name: "Data Cleaning", icon: Database, color: "text-teal-400" },
      { name: "EDA", icon: BarChart3, color: "text-orange-400" },
      { name: "Data Visualization", icon: LineChart, color: "text-pink-400" },
    ]
  },
  {
    category: "BI Tools",
    icon: <LineChart className="text-accent" size={24} />,
    skills: [
      { name: "Power BI", icon: BarChart2, color: "text-yellow-500" },
      { name: "Tableau", icon: Table2, color: "text-blue-600" },
      { name: "Excel", icon: Grid3X3, color: "text-green-500" },
      { name: "Matplotlib", icon: BarChart3, color: "text-indigo-400" },
    ]
  },
  {
    category: "Database",
    icon: <Database className="text-blue-400" size={24} />,
    skills: [
      { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
    ]
  },
  {
    category: "Developer Tools",
    icon: <Wrench className="text-gray-400" size={24} />,
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Jupyter", icon: SiJupyter, color: "text-orange-400" },
      { name: "Google Colab", icon: SiGooglecolab, color: "text-orange-500" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-primary">Skills</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl hover:bg-white/[0.03] transition-colors border-white/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-background/50 border border-white/5">
                  {group.icon}
                </div>
                <h3 className="text-xl font-semibold">{group.category}</h3>
              </div>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <skill.icon className={`text-xl ${skill.color}`} />
                    <span className="font-medium text-muted-foreground">{skill.name}</span>
                    <div className="flex-1 ml-4 h-1.5 bg-background/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}