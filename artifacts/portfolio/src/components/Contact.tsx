import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/vikashrao625@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-primary">Touch</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="glass-panel p-8 rounded-2xl border-white/5 h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <a href="mailto:vikashrao625@gmail.com" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-white/5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Email</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">vikashrao625@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://github.com/vikashrao627-glitch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 border border-white/5">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">GitHub</p>
                    <p className="text-foreground font-semibold group-hover:text-secondary transition-colors">vikashrao627-glitch</p>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/vikash-rao-402044336" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 border border-white/5">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">LinkedIn</p>
                    <p className="text-foreground font-semibold group-hover:text-accent transition-colors">Vikash Rao</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 rounded-2xl border-white/5 flex flex-col items-center justify-center gap-4 text-center h-full min-h-[320px]"
              >
                <CheckCircle2 size={56} className="text-secondary" />
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thank you for reaching out. Vikash will get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border-white/5 flex flex-col gap-6">
              {/* FormSubmit hidden config fields */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-muted-foreground/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                data-testid="button-submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-4 py-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}