"use client";

import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-white/60 py-12 md:py-16">
      <div className="container-shell">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Perfume Recommendation System
                </h3>
                <p className="text-sm text-muted-foreground">
                  Built by a perfume nerd.
                </p>
              </div>
              
              <div className="space-y-2 pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A project that uses machine learning and data analysis to help you discover perfumes that match your unique taste profile. 
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Developed by <span className="gradient-text-primary font-bold">Saurabh Suresh</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Software developer
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/hackgods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                
                <Link
                  href="https://www.linkedin.com/in/hackgod/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                
                <Link
                  href="https://www.saurabhsuresh.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 hover:bg-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
                  aria-label="Personal Website"
                >
                  <Globe className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
