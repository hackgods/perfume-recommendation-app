"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Clock, Wind } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useRecommendationStore } from "@/lib/store";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function ResultsPage() {
  const router = useRouter();
  const recommendations = useRecommendationStore((state) => state.recommendations);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Redirect to recommend page if no recommendations are available
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

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-bg-tint">
        <Navigation />
        <div className="container-shell py-20">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const { results, fingerprint } = recommendations.data;

  return (
    <div className="min-h-screen bg-bg-tint">
      <Navigation />
      <div className="container-shell py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/recommend")}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-3"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Your <span className="gradient-text-primary">Recommendations</span>
            </h1>
            {fingerprint?.summary && (
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                {fingerprint.summary}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:gap-8"
          >
            {results.map((perfume, index) => {
              const isExpanded = expandedDescriptions.has(perfume.id);
              const rank = index + 1;
              const hasDescription = perfume.description && perfume.description.length > 0;
              const descriptionPreview = hasDescription && perfume.description
                ? perfume.description.substring(0, 150)
                : "";
              const showReadMore = hasDescription && perfume.description && perfume.description.length > 150;

              return (
                <motion.div
                  key={perfume.id}
                  variants={itemVariants}
                  className="glass-panel p-6 md:p-8 rounded-[24px]"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border-2 border-primary/30">
                        <span className="text-2xl md:text-3xl font-bold gradient-text-primary">
                          #{rank}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="relative w-32 h-40 md:w-40 md:h-52 aspect-3/4 rounded-lg overflow-hidden bg-white/10">
                        {perfume.image ? (
                          <Image
                            src={perfume.image}
                            alt={perfume.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            No image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {perfume.name}
                        </h2>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-lg text-muted-foreground">{perfume.brand}</p>
                          {perfume.year && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-lg text-muted-foreground">{perfume.year}</p>
                            </>
                          )}
                        </div>
                      </div>

                      {hasDescription && (
                        <div className="space-y-2">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {isExpanded
                              ? perfume.description
                              : showReadMore
                              ? `${descriptionPreview}...`
                              : perfume.description}
                          </p>
                          {showReadMore && (
                            <button
                              onClick={() => toggleDescription(perfume.id)}
                              className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  Read less <ChevronUp className="h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Read more <ChevronDown className="h-4 w-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}

                      {perfume.dna_card?.accords && perfume.dna_card.accords.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Accords</h3>
                          <div className="flex flex-wrap gap-2">
                            {perfume.dna_card.accords
                              .sort((a, b) => (b.weight || 0) - (a.weight || 0))
                              .map((accord, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="glass-card px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-foreground"
                                >
                                  <span className="capitalize">{accord.name}</span>
                                  {accord.percentage && (
                                    <span className="ml-1.5 text-muted-foreground">
                                      {accord.percentage}%
                                    </span>
                                  )}
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      )}

                      {perfume.dna_card?.notes && perfume.dna_card.notes.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Notes</h3>
                          <div className="flex flex-wrap gap-2">
                            {perfume.dna_card.notes
                              .sort((a, b) => (b.weight || 0) - (a.weight || 0))
                              .map((note, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="glass-card px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-foreground"
                                >
                                  <span className="capitalize">{note.name}</span>
                                  {note.percentage && (
                                    <span className="ml-1.5 text-muted-foreground">
                                      {note.percentage}%
                                    </span>
                                  )}
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      )}

                      {perfume.why?.performance && (
                        <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
                          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-[12px]">
                            <Clock className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Longevity</p>
                              <p className="text-sm font-semibold text-foreground">
                                {perfume.why.performance.longevity.toFixed(1)}/10
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ({perfume.why.performance.longevity_votes} votes)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-[12px]">
                            <Wind className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Sillage</p>
                              <p className="text-sm font-semibold text-foreground">
                                {perfume.why.performance.sillage.toFixed(1)}/10
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ({perfume.why.performance.sillage_votes} votes)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-[12px]">
                          <span className="text-xs text-muted-foreground">Match Score:</span>
                          <span className="text-sm font-bold gradient-text-primary">
                            {(perfume.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
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
