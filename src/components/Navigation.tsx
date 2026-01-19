"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

function Navigation() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-panel border-b border-white/40 backdrop-blur-xl">
        <div className="container-shell flex items-center justify-between py-4">
          <a 
            href="#top" 
            className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#top");
            }}
          >
            Perfume Recommendation System
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button 
              size="sm"
              onClick={() => scrollToSection("#final-cta")}
            >
              Get started
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass-panel border-t border-white/40 px-6 py-4 text-sm md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <Button 
            size="sm"
            onClick={() => scrollToSection("#final-cta")}
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}

export { Navigation };
