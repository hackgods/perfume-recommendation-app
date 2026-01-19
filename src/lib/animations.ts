import type { Variants } from "framer-motion";

export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: springTransition 
  },
};

export const staggerContainer = (stagger = 0.14, delay = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const floatingMotion = (duration = 4, delay = 0, amplitude = 12) => ({
  y: [0, -amplitude, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};
