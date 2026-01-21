import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

// Force static generation for fast access
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Technical Documentation | Perfume Recommendation System",
  description: "Learn how the perfume recommendation system works, from vector embeddings to taste fingerprints and the recommendation pipeline.",
};

export default function TechnicalPage() {
  return (
    <div className="min-h-screen bg-[#fff0f3]">
      <div className="container-shell py-12 md:py-16 lg:py-20">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <article className="glass-panel max-w-4xl mx-auto p-8 md:p-12 lg:p-16 space-y-8">
          <header className="space-y-4 pb-8">
            <h1 className="gradient-text-primary text-3xl md:text-4xl lg:text-4xl font-bold text-foreground">
              Perfume Recommendation System
            </h1>
            <p className="text-lg text-muted-foreground">
              Technical Documentation
            </p>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Overview</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This project is an intelligent perfume recommendation system designed to help people discover fragrances that genuinely match their personal taste. Instead of relying on basic filters, popularity, or surface-level similarity, the system focuses on understanding why someone likes certain perfumes and uses that understanding to guide meaningful recommendations.
              </p>
              <p>
                At its core, the system builds a personalized taste profile for each user based on the perfumes they already love. This profile is not a static preference list. It is a dynamic representation of scent patterns, families, notes, accords, and overall character. Using this profile, the system recommends perfumes that feel aligned with the user&apos;s taste while still encouraging discovery and variety.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Recommendation Philosophy</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Inspired by How Spotify Understands Taste</h3>
                <p>
                  The underlying ideology of this system is closer to how Spotify recommends music than how traditional perfume sites recommend fragrances.
                </p>
                <p>
                  Spotify does not simply suggest songs with the same genre tag or the same tempo. It learns patterns from how millions of listeners behave:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Songs frequently liked together</li>
                  <li>Tracks saved by the same listeners</li>
                  <li>Listening habits that reveal mood and preference</li>
                </ul>
                <p className="mt-3">
                  Over time, Spotify builds a taste fingerprint that understands not just what you listen to, but why you listen to it.
                </p>
                <p className="mt-3 font-medium text-foreground">
                  This recommendation system follows the same philosophy.
                </p>
              </div>

              <div className="glass-card p-6 mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Parallel Concepts</h3>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium text-foreground">Vector embeddings</span> are similar to audio embeddings. They capture the overall vibe of a perfume, not just its ingredients.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Perfume DNA</span> plays the role of explainable metadata. It exists to tell the user why something fits, not to blindly drive similarity.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Wardrobe co-occurrence</span> mirrors collaborative filtering. It learns from shared ownership patterns, not reviews or hype.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-medium text-foreground mb-2">The result is a system that does not ask:</p>
                <p className="italic mb-4">&quot;Which perfumes look similar?&quot;</p>
                <p className="font-medium text-foreground mb-2">but instead asks:</p>
                <p className="italic mb-4">&quot;People with this taste tend to enjoy these perfumes next&quot;</p>
                <p>
                  Just like Spotify, the goal is not to recommend clones of what you already love, but to guide you toward discoveries that feel familiar, comfortable, and exciting at the same time.
                </p>
                <p className="mt-3 font-medium text-foreground">
                  That balance between familiarity and exploration is the core design principle behind the entire system.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Building a User&apos;s Taste Fingerprint</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                When a user selects perfumes they like, the system aggregates their data to build a User Taste Fingerprint. This fingerprint represents recurring patterns across their choices, such as dominant scent families, preferred accords, and commonly enjoyed notes. Outliers are naturally smoothed out, resulting in a stable and realistic taste profile.
              </p>
              <p>
                This fingerprint becomes the foundation for all recommendations. It answers questions like what the user consistently enjoys, what they tend to avoid, and where they might explore next without feeling overwhelmed.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">The Problem With Traditional Perfume Discovery</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Most perfume discovery tools fall into one of three traps:</p>
              <div className="space-y-3 pl-4 border-l-2 border-primary/30">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">1. Rigid Filtering</h3>
                  <p>Filtering by notes, brands, or years assumes users already know what they want. In reality, most people do not think in raw note lists.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">2. Naive Similarity</h3>
                  <p>&quot;Similar perfumes&quot; often means near duplicates. This leads to recommendations that feel repetitive and uninspiring.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">3. Popularity Bias</h3>
                  <p>Highly rated or viral perfumes dominate results, regardless of personal taste.</p>
                </div>
              </div>
              <p>
                These approaches fail to answer why someone likes a perfume and how their taste actually behaves.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">The Core Idea</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground">Instead of asking:</p>
              <p className="italic">&quot;Which perfumes are similar?&quot;</p>
              <p className="font-medium text-foreground">This system asks:</p>
              <p className="italic">&quot;What patterns define this person&apos;s taste, and how can we respect that while still helping them discover something new?&quot;</p>
              <p>Everything in the architecture flows from this idea.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">High-Level Architecture</h2>
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Next.js application</li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Backend</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Node.js with Express and TypeScript</li>
                  <li>Single hybrid recommendation pipeline</li>
                  <li>All logic centralized and deterministic</li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Database</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>PostgreSQL</li>
                  <li>pgvector for semantic similarity</li>
                  <li>JSONB for structured DNA data</li>
                </ul>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">Deployment</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Docker + Dokploy</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Core Concepts Explained Simply</h2>
            
            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">1. Vector Embeddings</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">Understanding the &quot;vibe&quot; of a perfume</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Every perfume is converted into a 512-dimensional vector. This vector represents more than notes. It captures mood, style, balance, and character.</p>
                  <p>Perfumes that feel similar to humans tend to be close together in this space, even if they do not share obvious ingredients.</p>
                  <p className="font-medium text-foreground mt-3">This allows the system to answer questions like:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>&quot;This feels warm and smooth, not sharp or fresh&quot;</li>
                    <li>&quot;These two perfumes belong to the same scent mood&quot;</li>
                  </ul>
                  <p className="mt-2">Vectors are used for fast candidate discovery, not final decisions.</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">2. Perfume DNA</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">Making recommendations explainable</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Each perfume also has a structured DNA profile:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Scent families</li>
                    <li>Accords</li>
                    <li>Notes</li>
                    <li>Weighted importance</li>
                  </ul>
                  <p className="font-medium text-foreground mt-3">When a recommendation is shown, the system can clearly say:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Which notes overlap</li>
                    <li>Which accords connect</li>
                    <li>Which parts of the user&apos;s taste it matches</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">3. User Taste Fingerprint</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">Aggregated, not assumed</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>A user&apos;s taste fingerprint is built by:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Aggregating DNA from perfumes they like</li>
                    <li>Weighting dominant patterns</li>
                    <li>Ignoring one-off outliers</li>
                  </ul>
                  <p>The result is a stable representation of taste, not a fragile profile based on one input.</p>
                  <p className="font-medium text-foreground mt-3">It answers questions like:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>What families dominate this user&apos;s taste?</li>
                    <li>What they consistently avoid</li>
                    <li>Where they might explore safely</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Wardrobe Co-occurrence</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">Learning from real people, not just data</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Some patterns cannot be learned from similarity alone.</p>
                  <p>If many users own both Perfume A and Perfume B, that relationship matters. This signal captures human behavior at scale.</p>
                  <p className="font-medium text-foreground mt-3">To avoid popularity bias:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Co-occurrence is log-scaled</li>
                    <li>Used as a supporting signal, not a dominant one</li>
                  </ul>
                  <p className="mt-2">This allows the system to learn taste patterns that feel natural, not forced.</p>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Performance Metrics</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">Smell is not everything</p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Longevity and sillage matter to many users.</p>
                  <p className="font-medium text-foreground mt-3">Performance data is:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Weighted by vote confidence</li>
                    <li>Optional, not mandatory</li>
                    <li>Used lightly to avoid bias</li>
                  </ul>
                  <p className="mt-2">This ensures performance enhances recommendations without overriding taste.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">The Recommendation Pipeline</h2>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 1: User Input</h3>
                <p className="text-muted-foreground">The user selects 1 to 10 perfumes they already love. No onboarding quiz. No forced answers.</p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 2: Taste Modeling</h3>
                <p className="text-muted-foreground mb-2">The system builds:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li>An average embedding vector</li>
                  <li>A structured DNA aggregation</li>
                  <li>A stable taste fingerprint</li>
                </ul>
                <p className="text-muted-foreground mt-2">This represents the user&apos;s scent identity.</p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 3: Candidate Retrieval</h3>
                <p className="text-muted-foreground">Using vector similarity, the system retrieves the top 400 closest perfumes. This step is intentionally high-recall and fast.</p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 4: Multi-Signal Scoring</h3>
                <p className="text-muted-foreground mb-2">Each candidate is scored using:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Semantic similarity</li>
                  <li>DNA overlap</li>
                  <li>Wardrobe co-occurrence</li>
                  <li>Rating confidence</li>
                  <li>Performance metrics</li>
                </ul>
                <p className="text-muted-foreground mt-2">Each signal is normalized and weighted.</p>
              </div>

              <div className="glass-card p-6 border-2 border-primary/30">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 5: Clone Suppression</h3>
                <p className="font-medium text-foreground mb-2">This is critical</p>
                <p className="text-muted-foreground mb-2">Perfumes that are too similar are penalized.</p>
                <p className="text-muted-foreground mb-2">This prevents:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Clone recommendations</li>
                  <li>Flanker spam</li>
                  <li>Recommending what the user already owns under a different name</li>
                </ul>
                <p className="text-muted-foreground mt-2">The system actively prefers meaningful similarity, not duplication.</p>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 6: Brand Diversification</h3>
                <p className="text-muted-foreground mb-2">Only one perfume per brand is allowed by default.</p>
                <p className="text-muted-foreground mb-2">This ensures:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Exploration</li>
                  <li>Variety</li>
                  <li>A healthier recommendation set</li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Step 7: Explainable Output</h3>
                <p className="text-muted-foreground mb-2">Each recommendation includes:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Final score</li>
                  <li>Individual signal breakdown</li>
                  <li>&quot;Because similar to&quot; reference</li>
                  <li>Shared notes and accords</li>
                  <li>Optional performance explanation</li>
                </ul>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
