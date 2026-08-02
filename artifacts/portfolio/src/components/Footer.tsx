import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-background py-12 relative z-10">
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold tracking-tighter mb-2">
          Vikash<span className="text-primary">Rao</span>
        </h2>
        <p className="text-lg text-muted-foreground font-medium mb-8">
          "Turning Data into Decisions."
        </p>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <a href="https://github.com/vikashrao627-glitch" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all duration-300">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/vikash-rao-402044336" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all duration-300">
            <Linkedin size={20} />
          </a>
          <a href="mailto:vikashrao625@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all duration-300">
            <Mail size={20} />
          </a>
        </div>
        
        <div className="text-sm text-muted-foreground font-medium">
          <p className="mb-2">Made with dedication by Vikash Rao.</p>
          <p>&copy; {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}