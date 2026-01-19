"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <header className="fixed top-4 left-0 right-0 z-50 w-full">
      <div className="container-shell flex justify-center">
        <motion.nav
          initial={{ y: -16, opacity: 0, borderRadius: 9999 }}
          animate={{ y: 0, opacity: 1, borderRadius: 9999 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          whileHover={{ scale: 1.01, boxShadow: "0 18px 45px rgba(0,0,0,0.12)" }}
          className="glass-panel flex w-full max-w-5xl items-center justify-between rounded-[999px] border border-white/40 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-6 md:py-3"
        >
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-foreground md:text-base"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#top");
            }}
          >
            Perfume Recommendation System
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button size="sm" onClick={() => scrollToSection("#final-cta")}>
              Get started
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex items-center justify-center rounded-full bg-white/60 p-2 text-foreground shadow-sm backdrop-blur md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.nav>
      </div>

      <div
        className={cn(
          "mt-3 px-4 text-sm md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="glass-panel mx-auto w-full max-w-5xl rounded-2xl border border-white/40 px-6 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="text-left text-foreground"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" className="w-full" onClick={() => scrollToSection("#final-cta")}>
              Get started
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export { Navigation };
