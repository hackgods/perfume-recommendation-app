"use client";

import { motion } from "framer-motion";
import { Bookmark, Sparkles, Wand2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    title: "Pick perfumes you already love",
    description: "Tell us the scents you reach for. We map the DNA behind every note.",
    icon: Bookmark,
  },
  {
    title: "See your taste fingerprint come alive",
    description: "Your scent profile becomes a radar of notes, moods, and accords.",
    icon: Sparkles,
  },
  {
    title: "Get clear, explainable recommendations",
    description: "Every suggestion comes with a reason, so you always know why.",
    icon: Wand2,
  },
];

function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="section-spacing"
      variants={staggerContainer(0.18)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-shell space-y-10">
        <motion.div variants={fadeInUp} className="space-y-3 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Three steps to a perfect match
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <motion.div key={step.title} variants={fadeInUp}>
              <GlassCard className="h-full p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-primary shadow-sm">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export { HowItWorks };
