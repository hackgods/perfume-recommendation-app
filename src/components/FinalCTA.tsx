"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

function FinalCTA() {
  const router = useRouter();

  return (
    <motion.section
      id="final-cta"
      className="section-spacing"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="container-shell">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,rgba(255,255,255,0.9),rgba(255,240,243,0.6))] p-[1px]"
        >
          <div className="glass-panel flex flex-col items-center gap-4 px-6 py-12 text-center md:px-10">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Ready to understand your taste?
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Start with what you already love. Let the rest make sense.
            </p>
            <Button size="lg" className="mt-2" onClick={() => router.push("/recommend")}>
              Find perfumes I&apos;ll love
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export { FinalCTA };
