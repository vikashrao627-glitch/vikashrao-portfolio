import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink } from "lucide-react";
import { Calendar } from "lucide-react";

const certs = [
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    year: "2026",
    credentialId: "BA6331ABBOC4",
    verifyUrl: "https://www.hackerrank.com/certificates/iframe/ba6331abb0c4",
    status: "Verified",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia (Forage)",
    year: "2026",
    credentialId: "d8svA3X8qAeKdL2hD",
    verifyUrl:
      "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_698461798846afd539a9e3fd_1772183164106_completion_certificate.pdf",
    status: "Verified",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-secondary">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-secondary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500">
                <Award size={120} className="text-secondary" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 border border-secondary/20">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 pr-12">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground font-medium mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground/60 mb-6 font-mono">
                  Credential ID: {cert.credentialId}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar size={14} /> Issued {cert.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20">
                    <CheckCircle size={14} /> {cert.status}
                  </span>
                </div>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-certificate-${i}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors font-medium"
                >
                  <ExternalLink size={14} /> View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
