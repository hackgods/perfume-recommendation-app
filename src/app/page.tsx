import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { TasteFingerprint } from "@/components/TasteFingerprint";
import { ExplainableMatches } from "@/components/ExplainableMatches";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const featuredIndex = Math.floor(Math.random() * 4);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero initialFeaturedIndex={featuredIndex} />
      
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