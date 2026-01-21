"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  searchPerfumes,
  getRecommendations,
  type Perfume,
  type APIError,
} from "@/lib/api";

type PerfumeType = "male" | "female" | "unisex" | "any";

export default function RecommendPage() {
  const [perfumeType, setPerfumeType] = useState<PerfumeType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Perfume[]>([]);
  const [selectedPerfumes, setSelectedPerfumes] = useState<Perfume[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    try {
      // Map perfumeType to gender parameter
      // "any" -> undefined (no gender param), others map directly
      const gender =
        perfumeType && perfumeType !== "any"
          ? (perfumeType as "male" | "female" | "unisex")
          : undefined;

      const results = await searchPerfumes({
        query: query.trim(),
        gender,
      });
      setSearchResults(results.results);
      setShowDropdown(true);
    } catch (error) {
      const apiError = error as APIError;
      setSearchError(
        apiError.message || "Failed to search perfumes. Please try again."
      );
      setSearchResults([]);
      setShowDropdown(false);
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, [perfumeType]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPerfume = (perfume: Perfume) => {
    if (selectedPerfumes.length >= 10) return;
    if (selectedPerfumes.some((p) => p.id === perfume.id)) return;
    setSelectedPerfumes([...selectedPerfumes, perfume]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleRemovePerfume = (id: number) => {
    setSelectedPerfumes(selectedPerfumes.filter((p) => p.id !== id));
  };

  const perfumeTypes: { value: PerfumeType; label: string }[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unisex", label: "Unisex" },
    { value: "any", label: "Any" },
  ];

  return (
    <div className="min-h-screen bg-bg-tint py-12 md:py-20">
      <div className="container-shell max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Let&apos;s find you a <span className="gradient-text-primary">Perfume</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Tell us what you&apos;re looking for and we&apos;ll find perfumes that match your taste
            </p>
          </div>

          {!perfumeType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 md:p-10 space-y-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                What type of perfume are you looking for?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {perfumeTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPerfumeType(type.value)}
                    className="glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <p className="text-lg font-medium text-foreground">{type.label}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {perfumeType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 md:p-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    Select perfumes you love
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add up to 10 perfumes ({selectedPerfumes.length}/10)
                  </p>
                </div>
                <button
                  onClick={() => setPerfumeType(null)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Change type
                </button>
              </div>

              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                    placeholder="Search for perfumes (e.g., Sauvage, Chanel No. 5)..."
                    className="w-full pl-12 pr-4 py-3 rounded-[12px] bg-white/20 backdrop-blur-sm border border-white/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showDropdown && searchResults.length > 0 && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-2 glass-panel border border-white/40 rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-h-[400px] overflow-y-auto"
                    >
                      <div className="p-2 space-y-1">
                        {searchResults.map((perfume) => {
                          const isSelected = selectedPerfumes.some((p) => p.id === perfume.id);
                          const isMaxReached = selectedPerfumes.length >= 10;
                          return (
                            <button
                              key={perfume.id}
                              onClick={() => !isSelected && !isMaxReached && handleSelectPerfume(perfume)}
                              disabled={isSelected || isMaxReached}
                              className={`w-full flex items-center gap-3 p-3 rounded-[12px] transition-all text-left ${
                                isSelected
                                  ? "bg-primary/20 cursor-not-allowed opacity-60"
                                  : isMaxReached
                                  ? "cursor-not-allowed opacity-50"
                                  : "hover:bg-white/20 cursor-pointer"
                              }`}
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/10">
                                {perfume.image ? (
                                  <Image
                                    src={perfume.image}
                                    alt={perfume.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                    No image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">{perfume.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{perfume.brand}</p>
                              </div>
                              {isSelected && (
                                <div className="shrink-0 text-primary">
                                  <Plus className="h-5 w-5 rotate-45" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {selectedPerfumes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Selected Perfumes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {selectedPerfumes.map((perfume) => (
                        <motion.div
                          key={perfume.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="glass-card p-4 relative group"
                        >
                          <button
                            onClick={() => handleRemovePerfume(perfume.id)}
                            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                            aria-label="Remove perfume"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-white/10">
                            {perfume.image ? (
                              <Image
                                src={perfume.image}
                                alt={perfume.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No image
                              </div>
                            )}
                          </div>
                          <p className="font-medium text-sm text-foreground truncate">{perfume.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{perfume.brand}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {searchError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-[12px] bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{searchError}</p>
                </motion.div>
              )}

              {selectedPerfumes.length > 0 && (
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                    onClick={async () => {
                      setIsSubmitting(true);
                      try {
                        const recommendations = await getRecommendations({
                          perfume_ids: selectedPerfumes.map((p) => p.id),
                          type: perfumeType === "any" ? undefined : perfumeType,
                        });
                        // TODO: Navigate to results page with recommendations
                        console.log("Recommendations:", recommendations);
                      } catch (error) {
                        const apiError = error as APIError;
                        setSearchError(
                          apiError.message ||
                            "Failed to get recommendations. Please try again."
                        );
                        console.error("Recommendation error:", error);
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting
                      ? "Getting Recommendations..."
                      : `Get Recommendations (${selectedPerfumes.length})`}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
