"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { Compass, Fingerprint, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureChip } from "@/components/ui/FeatureChip";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";

const bottleImages = [
  {
    src: "/perfumes/bottle-1.png",
  },
  {
    src: "/perfumes/bottle-2.png",
  },
  {
    src: "/perfumes/bottle-3.png",
  },
  {
    src: "/perfumes/bottle-4.png",
  },
] as const;

type HeroProps = {
  initialFeaturedIndex?: number;
};

export function Hero({ initialFeaturedIndex = 0 }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.4], [1, 0.9]);
  const textBlur = useTransform(smoothProgress, [0, 0.3], ["blur(0px)", "blur(10px)"]);

  // Phase 1: Comes into view (0 -> 0.3)
  // Phase 2: Gets VERY close/huge (0.3 -> 0.7)
  // Phase 3: Slides up and out (0.7 -> 1.0)
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const bottleScale = useTransform(smoothProgress, [0, 0.3, 0.7, 0.85], [0.4, 0.6, 0.8, 1]);
  const bottleY = useTransform(smoothProgress, [0, 0.7, 1], ["20%", "0%", "-150%"]);
  const bottleOpacity = useTransform(smoothProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const bottleRotate = useTransform(smoothProgress, [0, 1], [-10, 10]);

  const [featuredIndex] = useState(
    () => Math.abs(initialFeaturedIndex) % bottleImages.length
  );

  const featuredBottle = bottleImages[featuredIndex];

  const autoScrollTriggeredRef = useRef(false);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (!autoScrollTriggeredRef.current && value > 0.85) {
      autoScrollTriggeredRef.current = true;
      scrollToSection("how-it-works");
    }
  });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <BubbleBackground
          className="absolute inset-0"
          interactive={true}
          transition={{ stiffness: 100, damping: 40 }}
          colors={{
            first: "201,24,74",
            second: "255,143,163",
            third: "255,208,220",
            fourth: "173,20,87",
            fifth: "255,182,193",
            sixth: "240,98,146",
          }}
        />

        <div className="container-shell relative z-10 flex h-full items-center justify-center text-center">
          
          <motion.div
            style={{ 
              opacity: textOpacity, 
              scale: textScale,
              filter: textBlur
            }}
            className="glass-panel relative z-20 space-y-6 p-8 md:p-10 max-w-3xl"
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Personalized perfume discovery
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Discover perfumes that <span className="text-gradient">actually match</span> your taste
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Start with fragrances you already love. We decode your taste fingerprint and
              reveal recommendations that make immediate sense.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <FeatureChip icon={<Compass className="h-4 w-4" />} label="Perfume DNA" />
              <FeatureChip icon={<Fingerprint className="h-4 w-4" />} label="Taste Fingerprint" />
              <FeatureChip icon={<Sparkles className="h-4 w-4" />} label="Find Similar" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => scrollToSection("final-cta")}>
                Find perfumes I&apos;ll love
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection("how-it-works")}>
                See how it works
              </Button>
            </div>
          </motion.div>

          <motion.div
            style={{
              scale: bottleScale,
              y: bottleY,
              opacity: bottleOpacity,
              rotate: bottleRotate,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <div className="relative w-[300px] md:w-[450px] lg:w-[550px] aspect-[3/4]">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                <Image
                  src={featuredBottle.src}
                  alt='Bottle Image'
                  fill
                  className="object-contain"
                  priority
                />
                
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll to explore</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}