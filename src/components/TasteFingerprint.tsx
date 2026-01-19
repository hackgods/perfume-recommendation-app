"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const notes = [
  { label: "Bergamot", value: 0.82 },
  { label: "Jasmine", value: 0.7 },
  { label: "Oud", value: 0.62 },
  { label: "Amber", value: 0.78 },
  { label: "Rose", value: 0.66 },
  { label: "Musk", value: 0.74 },
];

function TasteFingerprint() {
  const { polygon, axes, rings, labels } = useMemo(() => {
    const size = 240;
    const center = size / 2;
    const maxRadius = 88;
    const step = (Math.PI * 2) / notes.length;

    const points = notes.map((note, index) => {
      const angle = step * index - Math.PI / 2;
      const radius = maxRadius * note.value;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    });

    const axesLines = notes.map((_, index) => {
      const angle = step * index - Math.PI / 2;
      const x = center + maxRadius * Math.cos(angle);
      const y = center + maxRadius * Math.sin(angle);
      return { x, y };
    });

    const ringSteps = [0.25, 0.5, 0.75, 1];
    const ringPoints = ringSteps.map((ratio) =>
      notes.map((_, index) => {
        const angle = step * index - Math.PI / 2;
        const radius = maxRadius * ratio;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
    );

    const labelPositions = notes.map((note, index) => {
      const angle = step * index - Math.PI / 2;
      const radius = maxRadius + 26;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { ...note, x, y };
    });

    return {
      polygon: points.join(" "),
      axes: axesLines,
      rings: ringPoints,
      labels: labelPositions,
    };
  }, []);

  return (
    <motion.section
      id="about"
      className="section-spacing"
      variants={staggerContainer(0.16)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div variants={fadeInUp} className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Taste fingerprint
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">
            A fingerprint that is actually yours
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Your profile is built from the fragrances you love and evolves with every
            new discovery. See the notes that define your signature.
          </p>
          <p className="text-sm font-medium text-foreground">
            It evolves as your taste evolves.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <GlassCard className="relative p-8">
            <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center">
              <svg
                viewBox="0 0 240 240"
                className="h-64 w-64"
                role="img"
                aria-label="Radar chart of taste fingerprint"
              >
                {rings.map((ring, index) => (
                  <polygon
                    key={`ring-${index}`}
                    points={ring.join(" ")}
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                  />
                ))}
                {axes.map((axis, index) => (
                  <line
                    key={`axis-${index}`}
                    x1="120"
                    y1="120"
                    x2={axis.x}
                    y2={axis.y}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1"
                  />
                ))}
                <polygon
                  points={polygon}
                  fill="rgba(201,24,74,0.25)"
                  stroke="rgba(201,24,74,0.9)"
                  strokeWidth="1.5"
                />
              </svg>

              <motion.div
                className="absolute inset-0"
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                {labels.map((note) => (
                  <motion.span
                    key={note.label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.85 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                    }}
                    className="absolute rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground shadow-sm"
                    style={{ left: note.x, top: note.y, transform: "translate(-50%, -50%)" }}
                  >
                    {note.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.section>
  );
}

export { TasteFingerprint };
