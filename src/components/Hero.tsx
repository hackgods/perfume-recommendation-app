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
  { src: "/perfumes/bottle-1.png" },
  { src: "/perfumes/bottle-2.png" },
  { src: "/perfumes/bottle-3.png" },
  { src: "/perfumes/bottle-4.png" },
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

  // Animation Maps
  const textOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1, 1]);
  const textScale = useTransform(smoothProgress, [0, 0.4], [1, 0.9]);
  const textBlur = useTransform(smoothProgress, [0, 0.3], ["blur(0px)", "blur(0px)"]);

  const bottleScale = useTransform(smoothProgress, [0, 0.3, 0.7, 0.85], [1, 1.2, 1.3, 1.4]);
  const bottleY = useTransform(smoothProgress, [0, 0.7, 1], ["15%", "0%", "-20%"]);
  const bottleOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 1, 1]);
  const bottleRotate = useTransform(smoothProgress, [0, 1], [-10, 10]);

  const [featuredIndex] = useState(
    () => Math.abs(initialFeaturedIndex) % bottleImages.length
  );
  const featuredBottle = bottleImages[featuredIndex];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const autoScrollTriggeredRef = useRef(false);
  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (!autoScrollTriggeredRef.current && value > 0.95) {
      autoScrollTriggeredRef.current = true;
      scrollToSection("how-it-works");
    }
  });

  return (
    <section ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <BubbleBackground
          className="absolute inset-0 z-0"
          interactive={true}
          colors={{
            first: "201,24,74",
            second: "255,143,163",
            third: "255,208,220",
            fourth: "173,20,87",
            fifth: "255,182,193",
            sixth: "240,98,146",
          }}
        />

        <div className="container-shell relative z-10 flex h-full flex-col md:grid md:grid-cols-12 items-center py-12 md:py-0 gap-8 md:gap-0 pointer-events-none">
          
          <motion.div
            style={{ opacity: textOpacity, scale: textScale, filter: textBlur }}
            className="z-20 md:col-span-5 lg:col-span-4 flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left order-2 md:order-1 pointer-events-none"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-[1.1] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                Discover perfumes that match your{" "}
                <span className="gradient-text-primary">taste</span>
              </h1>
            </div>
            
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg max-w-md mx-auto md:mx-0">
              Start with fragrances you already love. We decode your taste fingerprint and reveal recommendations that make immediate sense.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start pt-2 pointer-events-auto">
              <FeatureChip icon={<Compass className="h-4 w-4" />} label="DNA" />
              <FeatureChip icon={<Fingerprint className="h-4 w-4" />} label="Fingerprint" />
              <FeatureChip icon={<Sparkles className="h-4 w-4" />} label="Similar" />
            </div>
          </motion.div>

          <motion.div
            style={{
              scale: bottleScale,
              y: bottleY,
              opacity: bottleOpacity,
              rotate: bottleRotate,
            }}
            className="z-30 md:col-span-2 lg:col-span-4 flex items-center justify-center pointer-events-none order-1 md:order-2"
          >
            <div className="relative w-[40vw] max-w-[180px] sm:max-w-[220px] md:w-[20vw] md:max-w-[280px] lg:max-w-[320px] aspect-3/4">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
              >
                <Image
                  src={featuredBottle.src}
                  alt="Feature Perfume"
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)] md:drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)]"
                  priority
                />
                <div className="absolute inset-0 -z-10 bg-primary/10 blur-[60px] md:blur-[100px] rounded-full" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: textOpacity, scale: textScale, filter: textBlur }}
            className="z-20 md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-end md:justify-end md:pb-16 lg:pb-24 h-full w-full order-3 pointer-events-none"
          >
            <div className="space-y-4 md:space-y-6 text-center md:text-right max-w-sm md:max-w-xs lg:max-w-sm">
              <div className="space-y-1 md:space-y-2">
                <h3 className="text-lg font-medium sm:text-xl lg:text-2xl">
                  Ready to find your perfect scent?
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end pointer-events-auto">
                <Button size="lg" onClick={() => scrollToSection("final-cta")} className="px-6 lg:px-8 shadow-xl shadow-primary/20 text-sm lg:text-base">
                  Find my match
                </Button>
                <Button variant="secondary" size="lg" onClick={() => scrollToSection("how-it-works")} className="text-sm lg:text-base">
                  How it works
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
            className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Scroll</span>
            <div className="h-8 md:h-10 w-px bg-linear-to-b from-primary to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}