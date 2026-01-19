"use client";

import { motion } from "framer-motion";
import { Layers, Link2, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const points = [
  {
    title: "Which perfumes it relates to",
    description:
      "Every match is paired with familiar scents so you know the vibe instantly.",
    icon: Link2,
  },
  {
    title: "What notes and accords overlap",
    description:
      "We highlight the shared notes, accords, and textures that connect the dots.",
    icon: Layers,
  },
  {
    title: "Why it fits your taste",
    description:
      "Clear explanations help you understand the recommendation in seconds.",
    icon: Sparkles,
  },
];

function ExplainableMatches() {
  return (
    <motion.section
      id="features"
      className="section-spacing"
      variants={staggerContainer(0.18)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-shell space-y-10">
        <motion.div variants={fadeInUp} className="space-y-3 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Explainable matches
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Know exactly why something was recommended
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <motion.div key={point.title} variants={fadeInUp}>
              <GlassCard className="h-full p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-primary shadow-sm">
                  <point.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export { ExplainableMatches };
