"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Clock, Wind, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useRecommendationStore } from "@/lib/store";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function ResultsPage() {
  const router = useRouter();
  const recommendations = useRecommendationStore((state) => state.recommendations);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!recommendations) {
      router.push("/recommend");
    }
  }, [recommendations, router]);

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-bg-tint">
        <Navigation />
        <div className="container-shell py-20 flex justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
             <Sparkles className="text-primary h-8 w-8" />
          </motion.div>
        </div>
      </div>
    );
  }

  const { results, fingerprint } = recommendations.data;

  return (
    <div className="min-h-screen bg-bg-tint pb-20">
      <Navigation />
      <div className="container-shell py-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/recommend")}
              className="inline-flex items-center gap-2 hover:bg-white/40"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to discovery</span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-4 px-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            <span className="gradient-text-primary">Recommendations</span> for you
            </h1>
            {fingerprint?.summary && (
              <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {fingerprint.summary}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8"
          >
            {results.map((perfume, index) => {
              const isExpanded = expandedDescriptions.has(perfume.id);
              const rank = index + 1;
              const hasDescription = !!perfume.description;
              const showReadMore = hasDescription && perfume.description!.length > 120;

              return (
                <motion.div
                  key={perfume.id}
                  variants={itemVariants}
                  className="glass-panel relative overflow-hidden p-5 md:p-10 rounded-[32px] md:rounded-[40px] border-white/40 shadow-xl shadow-rose-900/5"
                >
                  <div className="absolute top-4 right-4 md:right-0 md:left-4 z-50">
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                      <span className="text-xl md:text-2xl font-black gradient-text-primary">
                        #{rank}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    <div className="flex flex-col items-center md:items-start shrink-0">
                      <div className="relative w-48 h-64 md:w-48 md:h-64 lg:w-56 lg:h-72 rounded-[24px] overflow-hidden shadow-2xl shadow-rose-900/10 group bg-white">
                        {perfume.image ? (
                          <Image
                            src={perfume.image}
                            alt={perfume.name}
                            fill
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground italic">
                            No visual available
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3">
                           <div className="gradient-bg-primary backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold tracking-tighter shadow-sm uppercase text-white/90">
                              {(perfume.score * 100).toFixed(0)}% Match
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6 md:space-y-8">
                      <div className="text-center md:text-left">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                          {perfume.name}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                          <span className="text-lg font-medium text-primary/80 uppercase tracking-widest text-[16px]">
                            {perfume.brand}
                          </span>
                          {perfume.year && (
                            <span className="text-muted-foreground/40 px-2 py-0.5 rounded-md border border-black/5 text-sm">
                              {perfume.year}
                            </span>
                          )}
                        </div>
                      </div>

                      {hasDescription && (
                        <div>
                          <p className="text-[14px] md:text-base text-muted-foreground leading-relaxed transition-all duration-300">
                            {isExpanded
                              ? perfume.description
                              : showReadMore
                              ? `${perfume.description!.substring(0, 120)}...`
                              : perfume.description}
                          </p>
                          {showReadMore && (
                            <button
                              onClick={() => toggleDescription(perfume.id)}
                              className="mt-3 text-xs font-bold text-primary flex items-center gap-1 mx-auto md:mx-0"
                            >
                              {isExpanded ? (
                                <>LESS <ChevronUp className="h-3 w-3" /></>
                              ) : (
                                <>FULL STORY <ChevronDown className="h-3 w-3" /></>
                              )}
                            </button>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {perfume.dna_card?.accords && perfume.dna_card.accords.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Accords</h3>
                              <button onClick={() => toggleSection(`${perfume.id}-accords`)} className="text-[11px] font-bold text-primary underline underline-offset-4">
                                 {expandedSections.has(`${perfume.id}-accords`) ? "Show Less" : `View ${perfume.dna_card.accords.length}`}
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {perfume.dna_card.accords
                                .sort((a, b) => (b.weight || 0) - (a.weight || 0))
                                .slice(0, expandedSections.has(`${perfume.id}-accords`) ? undefined : 4)
                                .map((accord, idx) => (
                                  <div key={idx} className="glass-card shadow-xs! border border-rose-900/20! px-3 py-1.5 rounded-full text-sm font-medium text-foreground">
                                    {capitalizeWords(accord.name)} <span className="opacity-80 ml-1">{accord.percentage}%</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {perfume.dna_card?.notes && perfume.dna_card.notes.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Primary Notes</h3>
                              <button onClick={() => toggleSection(`${perfume.id}-notes`)} className="text-[11px] font-bold text-primary underline underline-offset-4">
                                {expandedSections.has(`${perfume.id}-notes`) ? "Show Less" : `View ${perfume.dna_card.notes.length}`}
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {perfume.dna_card.notes
                                .sort((a, b) => (b.weight || 0) - (a.weight || 0))
                                .slice(0, expandedSections.has(`${perfume.id}-notes`) ? undefined : 4)
                                .map((note, idx) => (
                                  <div key={idx} className="glass-card shadow-xs! bg-rose-50/50! border border-rose-900/20! px-3 py-1.5 rounded-full text-sm font-medium text-rose-900!">
                                    {capitalizeWords(note.name)}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {perfume.why?.performance && (
                        <div className="flex gap-3 pt-2">
                          {[
                            { label: "Longevity", icon: Clock, val: perfume.why.performance.longevity },
                            { label: "Sillage", icon: Wind, val: perfume.why.performance.sillage }
                          ].map((stat, i) => (
                            <div key={i} className="flex-1 bg-white/40 p-3 rounded-2xl border border-white/60 flex flex-col items-center">
                              <stat.icon className="h-4 w-4 text-primary mb-1" />
                              <span className="text-[11px] uppercase font-bold text-muted-foreground/60">{stat.label}</span>
                              <span className="text-lg font-black text-foreground">{stat.val.toFixed(1)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}