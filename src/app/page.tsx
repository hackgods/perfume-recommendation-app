import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TasteFingerprint } from "@/components/TasteFingerprint";
import { ExplainableMatches } from "@/components/ExplainableMatches";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Discover Perfumes That Match Your Taste",
  description: "Start with fragrances you already love. We decode your taste fingerprint and reveal recommendations that match your taste. An intelligent perfume discovery system powered by machine learning.",
  openGraph: {
    title: "Discover Perfumes That Match Your Taste",
    description: "Start with fragrances you already love. We decode your taste fingerprint and reveal recommendations that match your taste.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <div className="relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <HowItWorks />
        <TasteFingerprint />
        <ExplainableMatches />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}