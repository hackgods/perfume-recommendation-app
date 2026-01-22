import { create } from "zustand";
import type { RecommendationResponse } from "./api";

interface RecommendationStore {
  recommendations: RecommendationResponse | null;
  setRecommendations: (recommendations: RecommendationResponse) => void;
  clearRecommendations: () => void;
}

export const useRecommendationStore = create<RecommendationStore>((set) => ({
  recommendations: null,
  setRecommendations: (recommendations) => set({ recommendations }),
  clearRecommendations: () => set({ recommendations: null }),
}));
