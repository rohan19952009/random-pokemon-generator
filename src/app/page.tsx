"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomPokemon, type Pokemon, type PokemonCount } from "@/lib/pokeapi";
import { INITIAL_POKEMON } from "@/lib/initial-data";
import { PokemonCard } from "@/components/PokemonCard";
import { FilterPanel } from "@/components/FilterPanel";
import { SkeletonCard } from "@/components/SkeletonCard";
import { DailySurprise } from "@/components/DailySurprise";
import { PokemonModal } from "@/components/PokemonModal";
import Image from "next/image";
import { 
  RefreshCw, 
  ChevronRight, 
  Sparkles, 
  Search,
  Filter, 
  LayoutGrid, 
  Play, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Zap, 
  Shield,
  Globe,
  Award,
  Trophy,
  History,
  Star
} from "lucide-react";

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(INITIAL_POKEMON);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
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

  // Deferred Audio - Zero overhead until first interaction
  const [pikachuAudio, setPikachuAudio] = useState<HTMLAudioElement | null>(null);

  const playPikachuCry = () => {
    let audio = pikachuAudio;
    if (!audio) {
      audio = new Audio("https://play.pokemonshowdown.com/audio/cries/pikachu-starter.mp3");
      audio.volume = 0.25;
      setPikachuAudio(audio);
    }
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio blocked:", e));
  };

  const preloadImages = (pList: Pokemon[]) => {
    if (typeof window === "undefined" || pList.length === 0) return;
    // Only preload if we're on a fast connection or post-initial-load
    pList.slice(0, 4).forEach(p => {
      const img = new window.Image();
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.id}.png`;
    });
  };

  // Persistence Shield: Load from cache on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cached = localStorage.getItem("poke_gen_results");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPokemon(parsed);
          // Don't block hydration with manual preloads, browser handles 'priority' images
        }
      } catch (e) {
        console.error("Cache restoration failed:", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setPokemon([]); 
    try {
      const results = await getRandomPokemon(filters.count, {
        region: filters.region,
        type: filters.type,
        isLegendary: filters.isLegendary,
        isMythical: filters.isMythical,
      });
      setPokemon(results);
      preloadImages(results); 
      // Save to Persistence Shield
      localStorage.setItem("poke_gen_results", JSON.stringify(results));
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    playPikachuCry();
    setVisibleCount(12);
    handleGenerate();
  };

  return (
    <div className="w-full">

      {/* Ultra-Slim Mobile-Friendly Hero - Clean & Fast */}
      <section className="relative py-4 md:py-6 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              The Ultimate <span className="text-poke-red italic">Random Pokémon</span> Generator
            </h1>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mb-2">
              Discover and build teams with every Pokémon from 
              <span className="text-slate-800 font-bold"> Kanto </span> 
              to 
              <span className="text-slate-800 font-bold"> Paldea (Gen 9)</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content (Generator) */}
      <main className="container mx-auto px-4 md:px-6 mt-4 md:mt-8 relative z-20 pb-20">
        <FilterPanel
          onGenerate={handleRefresh}
          filters={filters}
          setFilters={setFilters}
          loading={loading}
        />

        {/* Premium Empty State */}
        {!loading && pokemon.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 text-slate-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 italic">Zero Matches Found</h3>
            <p className="text-slate-500 text-center max-w-md">
              We couldn't find any Pokémon matching those specific filters. Try a different region or type combination!
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))
            ) : (
              pokemon.slice(0, visibleCount).map((p, i) => (
                <PokemonCard 
                  key={`${p.id}-${i}`} 
                  pokemon={p} 
                  index={i} 
                  onShowDetails={handleShowDetails}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Spacing and Generation Trigger Area */}
        {!loading && pokemon.length > visibleCount && (
          <div className="flex justify-center mt-8 md:mt-12 px-4 relative z-30">
            <button
              onClick={() => {
                playPikachuCry();
                setVisibleCount(prev => prev + 12);
              }}
              className="w-full md:w-auto px-10 py-4 bg-poke-red text-white font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-xl hover:bg-red-600 flex items-center justify-center gap-2 group text-sm md:text-base"
            >
              <span>Load More Pokémon</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {!loading && pokemon.length > 0 && (
          <div className="flex flex-col items-center mt-12 md:mt-24 p-8 md:p-12 glass-card rounded-[2rem] border-dashed border-2 border-slate-200 mx-4 md:mx-0">
            <h3 className="text-lg md:text-xl font-bold mb-4">Want more Results?</h3>
            <button
              onClick={handleRefresh}
              className="poke-button poke-button-primary px-8 md:px-10 py-4 flex items-center justify-center gap-3 group w-full md:w-auto"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              <span>Generate New Set</span>
            </button>
          </div>
        )}

        {!loading && pokemon.length === 0 && (
          <div className="text-center py-20 px-6 glass-card rounded-3xl">
            <h3 className="text-lg font-bold mb-2">No Match Found</h3>
            <p className="text-slate-500 mb-6">Try changing the region or type filter.</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-poke-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              Refresh Filters
            </button>
          </div>
        )}
      </main>

      {/* AdSense Optimization: High-Value Publisher Content Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* The Ultimate Guide Section (500+ words target) */}
            <article className="prose max-w-none text-slate-600 mb-20">
              <h2 className="text-3xl font-black mb-6 text-slate-900">The Ultimate Guide to Using Random Pokémon Generators</h2>
              <p className="mb-4">
                In the expansive universe of Pokémon, variety is more than just the spice of life—it's the core of the competitive and casual gameplay experience. A **Random Pokémon Generator** is a powerful tool designed to inject unpredictability and fresh challenges into your journey as a trainer. Whether you are a veteran of the Kanto region or a newcomer starting in Paldea, understanding how to leverage randomness can transform your playstyle.
              </p>
                    <h3 className="text-xl font-bold mb-4 text-slate-800">Advanced Nuzlocke Team Selection</h3>
              <p className="mb-4">
                The most common application for our generator is the **Nuzlocke Challenge**. This fan-made set of rules requires players to only catch the first Pokémon they encounter in each area. By using a specialized generator, you can pre-determine your "Poke-Destiny" for a run, or identify unique team compositions that you otherwise might never have considered. Our system is built to handle complex randomization logic, ensuring that your Nuzlocke teambuilding remains fair, exciting, and statistically sound. 
              </p>
              <p className="mb-6">
                Whether you are attempting a Hardcore Nuzlocke in *Pokémon Platinum* or a Soulink in *Pokémon Scarlet*, our randomizer provides the perfect balance of surprise and utility. Beyond challenges, casual fans use generators to discover new favorites among the 1,000+ species currently in the National PokéDex, revealing forgotten gems from the Johto or Unova regions.
              </p>

              <h3 className="text-xl font-bold mb-4 text-slate-800">Precision Filters for Every Region</h3>
              <p className="mb-4">
                Our tool provides absolute control over the data generation process. By filtering by **Region**, you ensure that your generated Pokémon are 100% compatible with the version of the game you are playing. For example, if you are revisiting *Pokémon Emerald*, you can set the filter to **Hoenn** to stay within the Generation 3 pool. Furthermore, the **Type Filter** allows specialized trainers—such as "Monotype" challengers or Gym Leader roleplayers—to generate specific team cores for themed battles.
              </p>
              <p className="mb-6">
                We support every major region in the Pokémon franchise, including:
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-8 text-sm font-bold text-slate-700">
                <li>• Kanto (Gen 1)</li>
                <li>• Johto (Gen 2)</li>
                <li>• Hoenn (Gen 3)</li>
                <li>• Sinnoh (Gen 4)</li>
                <li>• Unova (Gen 5)</li>
                <li>• Kalos (Gen 6)</li>
                <li>• Alola (Gen 7)</li>
                <li>• Galar (Gen 8)</li>
                <li>• Paldea (Gen 9)</li>
              </ul>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-8 shadow-inner">
                <h4 className="font-bold text-slate-900 mb-2">Expert Tip: Competitive Theory Crafting</h4>
                <p className="text-sm leading-relaxed">
                  Are you a competitive player on Pokémon Showdown? Use the generator with the **Legendary** toggle turned **ON** to find inspiration for Restricted Sparring or Uber-tier cores. If you're looking for a realistic training experience for a standard playthrough, keep the Legendaries **OFF** to find Pokémon you can catch in standard tall grass. This versatility is why our tool is considered the "Professional Grade" choice for trainers worldwide.
                </p>
              </div>

              <h3 className="text-xl font-bold mb-4 text-slate-800">Is this the most Accurate Pokémon Generator?</h3>
              <p className="mb-4">
                Absolutely. We pull real-time data directly from the official **PokéAPI**, the industry standard for Pokémon metadata. This means every base stat (HP, Attack, Defense, Speed), type combination, and image you see is 100% accurate according to the latest game updates. We handle the complex filtering logic in the background—accounting for regional variants and modern Type chart changes—so you can focus on building your ultimate team.
              </p>
            </article>

            {/* Comprehensive FAQ Section */}
            <div className="mb-20">
              <h3 className="text-3xl font-black mb-10 text-center text-slate-900">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <FAQItem
                  question="How many Pokémon can I generate at once?"
                  answer="You can generate up to 24 Pokémon in a single click. This is ideal for quickly drafting multiple teams or populating a large roster for a draft league."
                />
                <FAQItem
                  question="Does this include Gen 9 Paldea Pokémon?"
                  answer="Yes! Our generator is fully updated with the latest entries from the Paldea region (Gen 9), including the newest legendaries and regional variants."
                />
                <FAQItem
                  question="Which regions are supported?"
                  answer="We support every major region in the franchise: Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea."
                />
                <FAQItem
                  question="Are the stats accurate for competitive play?"
                  answer="Absolutely. The base stats (HP, ATK, DEF, SPE) are pulled directly from game data, making this a reliable tool for competitive theory-crafting."
                />
                <FAQItem
                  question="Is this generator free to use?"
                  answer="Yes, the Random Pokémon Generator is a free community tool. We built it to provide a premium, ad-supported experience for fans worldwide."
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Professional Tool?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FeatureItem
                icon={<Zap className="text-poke-yellow" />}
                title="Next-Gen Performance"
                description="Built on Next.js 14 for near-instant generation and zero layout shift transitions."
              />
              <FeatureItem
                icon={<Shield className="text-poke-blue" />}
                title="Verified Data"
                description="Our filters are logic-tested to ensure Gen-specific accuracy (e.g., no Alolan variants in a Kanto-only search)."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Overlays (Positioned outside limited stacking context) */}
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
    <div className="glass-card p-6 rounded-2xl border border-slate-200 transition-all hover:border-poke-red/30">
      <h4 className="text-lg font-bold mb-2 text-slate-800">{question}</h4>
      <p className="text-slate-600 leading-relaxed text-sm">{answer}</p>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 glass-card rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 text-slate-800">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
