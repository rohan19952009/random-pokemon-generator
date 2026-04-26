"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRandomPokemon, type Pokemon, type PokemonCount } from "@/lib/pokeapi";
import { INITIAL_POKEMON } from "@/lib/initial-data";
import { PokemonCard } from "@/components/PokemonCard";
import { FilterPanel } from "@/components/FilterPanel";
import { SkeletonCard } from "@/components/SkeletonCard";
import { DailySurprise } from "@/components/DailySurprise";
import { PokemonModal } from "@/components/PokemonModal";
import ScanningOverlay from "@/components/ScanningOverlay";
import Image from "next/image";
import { AdSenseBuffer } from "@/components/AdSenseBuffer";
import { 
  RefreshCw, 
  ChevronRight, 
  Sparkles, 
  Search,
  Terminal, 
  LayoutGrid, 
  Zap, 
  Shield,
  Activity,
  Cpu,
  Database,
  Layers
} from "lucide-react";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pokédex Lab - Advanced Random Pokémon Generator",
    "description": "Professional technical extraction hub for randomized Pokémon signatures. Generation 9 compliant algorithms.",
    "applicationCategory": "Professional Tool",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": "https://randompokemongenerator.info"
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Extract Random Pokémon Signatures",
    "description": "Follow these laboratory protocols to extract high-fidelity Pokémon data.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Initialize Terminal",
        "text": "Access the Pokédex Lab at randompokemongenerator.info to establish a stable bridge with the data mainframe."
      },
      {
        "@type": "HowToStep",
        "name": "Calibrate Extraction Filters",
        "text": "Select your target Region, Type, and Signal Count from the technical buffer panel."
      },
      {
        "@type": "HowToStep",
        "name": "Execute Signature Scan",
        "text": "Initialize the scan process to wipe previous telemetry and extract new high-fidelity signatures."
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Maximum Pokemon Extraction Yield?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Pokédex Lab hub currently supports simultaneous extraction of up to 100 Pokémon signatures per scan to maintain mainframe stability."
        }
      },
      {
        "@type": "Question",
        "name": "Is Gen 9 Paldea Supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our hub has full system synchronization with all Generation 9 Paldean Pokémon, including Paradox forms and regional variants."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Pokemon Generator Data Source Verified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All metadata is extracted via a secure bridge from PokéAPI and verified against the latest version 4.0.0 standards for 100% data integrity."
        }
      }
    ]
  }
];

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(INITIAL_POKEMON);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState<{
    region: string;
    type: string;
    count: PokemonCount;
    isLegendary: boolean;
    isMythical: boolean;
  }>({
    region: "all",
    type: "all",
    count: 12,
    isLegendary: false,
    isMythical: false,
  });

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleShowDetails = (p: Pokemon) => {
    setSelectedPokemon(p);
  };

  const preloadImages = (pList: Pokemon[]) => {
    if (typeof window === "undefined" || pList.length === 0) return;
    pList.slice(0, 8).forEach(p => {
      const img = new window.Image();
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.id}.png`;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cached = localStorage.getItem("poke_gen_results");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPokemon(parsed);
        }
      } catch (e) {
        console.error("Cache restoration failed:", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    // Don't clear pokemon immediately to keep the layout stable during scan
    try {
      const results = await getRandomPokemon(filters.count, {
        region: filters.region,
        type: filters.type,
        isLegendary: filters.isLegendary,
        isMythical: filters.isMythical,
      });
      // Artificial delay for scanning effect immersion
      await new Promise(resolve => setTimeout(resolve, 800));
      setPokemon(results);
      preloadImages(results); 
      localStorage.setItem("poke_gen_results", JSON.stringify(results));
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setVisibleCount(12);
    handleGenerate();
  };

  return (
    <div className="w-full min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: Digital Scanner Interface */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center hero-fade-in">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 mb-8">
              <Activity className="w-3.5 h-3.5 text-lab-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent">System Online // v4.0.0</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-lab-text tracking-tighter leading-[0.9] mb-6 uppercase">
              Advanced <span className="text-lab-accent text-glow italic">Random Pokemon</span> <br className="hidden md:block" /> Generator
            </h1>
            
            <p className="text-lab-text-muted font-medium text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              Use our professional Pokémon database to discover and generate random Pokémon from 
              <span className="text-lab-text"> Kanto </span> 
              to 
              <span className="text-lab-text"> Paldea</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-4 opacity-50">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                <Database className="w-3.5 h-3.5" /> 1025 Signatures
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                <Cpu className="w-3.5 h-3.5" /> Fast Extraction
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5" /> Accurate Stats
              </div>
            </div>
        </div>
      </section>

      {/* Main Content (Generator) */}
      <main className="container mx-auto px-4 md:px-8 mt-4 relative z-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <AdSenseBuffer id="home-top-ad" height="100px" label="Strategic Lab Placement" className="mb-8" />
          
          <FilterPanel
            onGenerate={handleRefresh}
            filters={filters}
            setFilters={setFilters}
            loading={loading}
          />

          <div className="relative min-h-[600px] mt-12">
            <ScanningOverlay isVisible={loading} />
            
            {/* Results Grid */}
            <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ${loading ? "opacity-20 blur-sm scale-[0.98]" : "opacity-100 scale-100"}`}>
                {pokemon.slice(0, visibleCount).map((p, i) => (
                  <PokemonCard 
                    key={`${p.id}-${i}`} 
                    pokemon={p} 
                    index={i} 
                    onShowDetails={handleShowDetails}
                  />
                ))}
            </div>

            {/* Empty state */}
            {!loading && pokemon.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 px-6 glass-card border-dashed">
                <div className="w-20 h-20 bg-lab-accent/5 rounded-full flex items-center justify-center mb-6 text-lab-accent/40 border border-lab-accent/20">
                  <Terminal className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-lab-text mb-2 uppercase tracking-tighter italic">Signal Interference</h3>
                <p className="text-lab-text-muted text-center max-w-sm">
                  We couldn't detect any Pokémon matching those specific parameters. Adjust your frequency and try again.
                </p>
              </div>
            )}
          </div>

          {/* Pagination Area */}
          {!loading && pokemon.length > visibleCount && (
            <div className="flex justify-center mt-16 relative z-30">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                aria-label="Load more Pokémon signatures into the current buffer range"
                className="lab-button lab-button-outline px-12 py-4 uppercase tracking-[0.2em] text-xs font-black group"
              >
                <span>Extend Buffer Range</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Secondary Refresh Area */}
          {!loading && pokemon.length > 0 && (
            <div className="mt-32 p-12 glass-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-lab-accent/10 flex items-center justify-center mb-6 text-lab-accent border border-lab-accent/20 animate-pulse">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter text-lab-text">Ready for a new list?</h3>
              <p className="text-lab-text-muted mb-8 max-w-md">Clear current results and generate a fresh set of Pokémon.</p>
              <button
                onClick={handleRefresh}
                aria-label="Generate a fresh set of random Pokémon"
                className="lab-button lab-button-primary min-w-[240px]"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                <span>Generate New Pokémon</span>
              </button>
            </div>
          )}

          <AdSenseBuffer id="home-middle-ad" height="280px" className="mt-20" />
        </div>
      </main>

      {/* Lab Documentation Section */}
      <section className="bg-lab-bg relative py-32 border-t border-lab-border overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert max-w-none mb-32">
              <header className="flex items-center gap-3 mb-10">
                <div className="h-1 w-12 bg-lab-accent" />
                <h2 className="text-4xl font-black text-lab-text uppercase tracking-tighter m-0 italic">Random Pokemon Generator Guide</h2>
              </header>

              <div className="space-y-16 text-lab-text-muted leading-relaxed">
                <section>
                  <h3 className="text-lab-accent text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    How to use for Nuzlocke Challenges
                  </h3>
                  <p>
                    In the high-stakes environment of a **Nuzlocke Challenge**, the primary obstacle is the unpredictability of the encounter. Our website serves as a decision-support tool, providing trainers with statistically accurate random Pokémon results. Unlike standard tools, our generator accounts for regional distribution densities, ensuring that your results represent a genuine simulation of wild Pokémon encounters.
                  </p>
                  <p className="text-sm font-mono mt-4 border-l-2 border-lab-accent/20 pl-6">
                    &gt; Tip: Use the 'Legendary Offline' protocol for standardized hardcore runs to maintain competitive integrity.
                  </p>
                </section>

                <AdSenseBuffer id="content-middle-ad" height="150px" label="Lab Resource Index" className="my-16" />

                <section>
                  <h3 className="text-lab-accent text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <Database className="w-5 h-5" />
                    All Generations Supported (Inc. Gen 9)
                  </h3>
                  <p>
                    Effective teambuilding requires current data. With the advent of the **Paldean Region**, the Pokémon landscape has shifted significantly. Our generator maintains a 1:1 synchronization with the global Pokémon database, meaning all Paradox Pokémon, regional variants, and new types are built into the core selection. Whether you are looking for ancient fossils or future-forms, every result is maintained with 100% precision.
                  </p>
                </section>

                <section className="p-8 rounded-3xl bg-white/5 border border-white/10 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-lab-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lab-accent text-xl font-black uppercase tracking-widest mb-6 relative z-10 flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Pokemon Fusion Generator Matrix
                  </h3>
                  <p className="relative z-10">
                    For trainers seeking the frontier of Pokémon discovery, our **Fusion Generator** offers the ability to simulate genetic splicing between two distinct Pokémon. By combining primary and secondary types along with averaged stats, the tool engineers a completely new hybrid. This module is essential for creative character development and discovery.
                  </p>
                </section>
              </div>
            </article>

            {/* Comprehensive FAQ Section */}
            <div className="mb-32">
              <h3 className="text-4xl font-black mb-12 text-center text-lab-text uppercase tracking-tighter italic">Mainframe System FAQ</h3>
              <div className="grid gap-6">
                <FAQItem
                  question="How is the Random Selection Generated?"
                  answer="We utilize a cryptographically secure random number generator (CSPRNG) mapped against the global ID index (1-1025). This ensures that every extraction is statistically independent."
                />
                <FAQItem
                  question="Does the Lab Support Regional Variants?"
                  answer="Yes. The terminal scans for specific sub-markers such as Alolan, Galarian, and Hisuian forms. If your filter includes these regions, the variant signatures are added to the pool."
                />
                <FAQItem
                  question="What is the Data Sync Frequency?"
                  answer="Our mainframe performs a deep-sync with official repositories every 24 hours to ensure new variant data and stat adjustments are reflected in your extracts."
                />
                <FAQItem
                  question="Is the Extraction Hub Mobile Compliant?"
                  answer="The terminal interface is optimized for PWA (Progressive Web App) standards. Access the extraction mainframe on any tactical mobile unit with full responsiveness."
                />
              </div>
            </div>

            <h2 className="text-3xl font-black mb-12 text-center text-lab-text uppercase tracking-tighter">Generator Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FeatureItem
                icon={<Zap className="text-lab-accent" />}
                title="Fast Performance"
                description="Built on Next.js for near-instant results and high-performance layout transitions."
              />
              <FeatureItem
                icon={<Shield className="text-lab-accent" />}
                title="Verified Data"
                description="Our filters ensure regional accuracy and prevent errors between various Pokémon generation pools."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Overlays */}
      <div className="relative z-[1000]">
        <AnimatePresence>
          {selectedPokemon && (
            <PokemonModal
              pokemon={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="glass-card p-8 group hover:border-lab-accent/50 transition-all border-lab-border">
      <h4 className="text-lg font-bold mb-3 text-lab-text group-hover:text-lab-accent transition-colors flex items-center gap-3 italic">
        <div className="w-1.5 h-1.5 rounded-full bg-lab-accent" />
        {question}
      </h4>
      <p className="text-lab-text-muted leading-relaxed text-sm ml-4 border-l border-lab-border pl-6">{answer}</p>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start p-6 rounded-3xl hover:bg-white/5 transition-colors group">
      <div className="flex-shrink-0 w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-lab-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,242,255,0.1)]">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 text-lab-text uppercase tracking-tight italic">{title}</h4>
        <p className="text-lab-text-muted leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
