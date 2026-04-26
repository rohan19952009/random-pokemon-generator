"use client";

import { useState, useCallback, useEffect } from "react";
import { Dna, RefreshCw, Zap, Terminal, Activity, Monitor, Cpu, FlaskConical, Plus, ArrowRight, Save, History, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLab } from "@/context/LabContext";
import { motion, AnimatePresence } from "framer-motion";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pokemon Fusion Generator",
  "description": "Create new hybrid Pokémon by combining the types and stats of two species. Real-time fusion results.",
  "applicationCategory": "Tool",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/fusion-generator"
};

const ALL_IDS = Array.from({length:898},(_, i) => i + 1);
function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)]; }

function fuseName(a: string, b: string): string {
  const half1 = a.slice(0, Math.ceil(a.length / 2));
  const half2 = b.slice(Math.floor(b.length / 2));
  return (half1 + half2).replace(/[^a-z]/gi,"").slice(0,12);
}

interface MiniPoke { id: number; name: string; types: string[] }

export default function FusionGeneratorPage() {
  const { team: savedTeam } = useLab();
  const [pokemon, setPokemon] = useState<[MiniPoke,MiniPoke]|null>(null);
  const [loading, setLoading] = useState(false);
  const [fusing, setFusing] = useState(false);
  const [history, setHistory] = useState<Array<{name:string;types:string[];ids:[number,number]}>>([]);

  const fuse = useCallback(async (forcedA?: MiniPoke, forcedB?: MiniPoke) => {
    setLoading(true);
    setFusing(true);
    
    const idA = forcedA?.id || pickRandom(ALL_IDS);
    let idB = forcedB?.id || pickRandom(ALL_IDS);
    while (idB === idA) idB = pickRandom(ALL_IDS);

    try {
      const [resA, resB] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${idA}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${idB}`),
      ]);
      const [dA, dB] = await Promise.all([resA.json(), resB.json()]);
      
      const pA: MiniPoke = { id: idA, name: dA.name, types: dA.types.map((t:any)=>t.type.name) };
      const pB: MiniPoke = { id: idB, name: dB.name, types: dB.types.map((t:any)=>t.type.name) };
      
      // Short delay for better UX
      await new Promise(r => setTimeout(r, 800));
      
      setPokemon([pA, pB]);
      const fusedName = fuseName(pA.name, pB.name);
      const fusedTypes = [...new Set([...pA.types, ...pB.types])].slice(0,2);
      setHistory(prev => [{ name: fusedName, types: fusedTypes, ids:[idA,idB] as [number,number] }, ...prev].slice(0,6));
    } catch {
      setPokemon([{ id: idA, name: "MISSING", types: ["normal"] }, { id: idB, name: "MISSING", types: ["normal"] }]);
    } finally {
      setLoading(false);
      setTimeout(() => setFusing(false), 300);
    }
  }, []);

  const fusedName = pokemon ? fuseName(pokemon[0].name, pokemon[1].name) : null;
  const fusedTypes = pokemon ? [...new Set([...pokemon[0].types, ...pokemon[1].types])].slice(0,2) : [];

  return (
    <div className="w-full pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <Link href="/tools" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-lab-text-muted hover:text-lab-accent transition-colors mb-8">
              <Terminal className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 mb-6">
              <Zap className="w-3.5 h-3.5 text-lab-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent">Online Fusion Tool</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-lab-text tracking-tighter uppercase mb-6 italic">
              Random Pokémon <span className="text-lab-accent text-glow">Fusion Generator</span>
            </h1>
            
            <p className="text-lab-text-muted font-medium text-lg max-w-2xl leading-relaxed">
              Create entirely new Pokémon by merging the types and stats 
              of two different species.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Saved Team Quick Selection */}
        {savedTeam.length >= 2 && !pokemon && (
          <div className="mb-12 glass-card p-6 border-lab-accent/20">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-lab-accent mb-4 flex items-center gap-2">
              <Download className="w-3 h-3" />
              Saved Pokémon Team
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
               <button 
                onClick={() => fuse(savedTeam[0], savedTeam[1])}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-lab-text hover:border-lab-accent hover:text-lab-accent transition-all flex items-center gap-3"
              >
                Fuse {savedTeam[0].name} + {savedTeam[1].name}
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <button 
            onClick={() => fuse()} 
            disabled={loading}
            aria-label="Generate a new hybrid Pokémon fusion"
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-lab-accent text-lab-bg font-black rounded-2xl hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] transition-all active:scale-95 disabled:opacity-60 text-xs uppercase tracking-[0.2em] overflow-hidden"
          >
            <div className={`absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`} />
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin":""}`} />
            {loading ? "Generating Fusion..." : "Generate Random Fusion"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!pokemon && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 glass-card border-dashed border-white/10"
            >
              <Dna className="w-24 h-24 mx-auto mb-6 text-lab-accent/10" />
              <p className="font-black text-xl text-lab-text-muted uppercase tracking-[0.2em] italic">Ready to Fuse</p>
            </motion.div>
          )}

          {pokemon && !fusing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Chambers */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4 justify-center">
                <div className="glass-card p-6 text-center flex-1 w-full bg-white/5 border-lab-accent/20">
                  <div className="text-[10px] uppercase font-black tracking-widest text-lab-text-muted mb-4 italic opacity-50">Subject Alpha</div>
                  <div className="relative w-36 h-36 mx-auto mb-4 group">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon[0].id}.png`}
                      alt={`${pokemon[0].name} - Bio-Fusion Subject Alpha`} 
                      fill 
                      className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-black capitalize text-lab-text mb-2 italic">{pokemon[0].name}</h3>
                  <div className="flex gap-2 justify-center">
                    {pokemon[0].types.map(t=><span key={t} className={`text-[8px] font-black uppercase text-white px-2 py-0.5 rounded bg-type-${t} border border-white/10`}>{t}</span>)}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Dna className="w-8 h-8 text-lab-accent animate-pulse" />
                  <ArrowRight className="hidden md:block w-4 h-4 text-lab-text-muted/30" />
                </div>

                <div className="glass-card p-6 text-center flex-1 w-full bg-white/5 border-lab-accent/20">
                   <div className="text-[10px] uppercase font-black tracking-widest text-lab-text-muted mb-4 italic opacity-50">Subject Beta</div>
                  <div className="relative w-36 h-36 mx-auto mb-4">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon[1].id}.png`}
                      alt={`${pokemon[1].name} - Bio-Fusion Subject Beta`} 
                      fill 
                      className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-black capitalize text-lab-text mb-2 italic">{pokemon[1].name}</h3>
                  <div className="flex gap-2 justify-center">
                    {pokemon[1].types.map(t=><span key={t} className={`text-[8px] font-black uppercase text-white px-2 py-0.5 rounded bg-type-${t} border border-white/10`}>{t}</span>)}
                  </div>
                </div>
              </div>

              {/* Extraction Result */}
              <motion.div 
                layoutId="fusion-result"
                className="glass-card p-12 text-center relative overflow-hidden bg-gradient-to-br from-lab-accent/5 to-transparent border-lab-accent/30 shadow-[0_0_60px_rgba(0,242,255,0.15)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.08)_0%,transparent_70%)] animate-pulse" />
                <div className="absolute top-0 right-0 p-6 text-[10px] font-mono text-lab-accent/20 uppercase tracking-[0.4em] select-none pointer-events-none">
                  Splicing_Success // Stable
                </div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-lab-accent/60 mb-10 relative z-10 flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-lab-accent/20" />
                  Extracted Signature
                  <div className="h-[1px] w-8 bg-lab-accent/20" />
                </p>
                
                <div className="relative z-10 mb-10">
                  <div className="w-56 h-56 mx-auto relative group">
                    <Image
                      src={`https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${pokemon[0].id}/${pokemon[0].id}.${pokemon[1].id}.png`}
                      alt={`${fusedName || "Fusion"} - Hybrid Pokémon Signature Extraction`}
                      fill
                      className="object-contain drop-shadow-[0_0_40px_rgba(0,242,255,0.3)] group-hover:scale-110 transition-transform duration-700"
                      sizes="224px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement('div');
                          fallback.className = "flex items-center justify-center h-full text-8xl opacity-10 animate-pulse";
                          fallback.innerHTML = "🧬";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>

                <h2 className="text-5xl font-black capitalize mb-4 text-lab-text tracking-tighter italic text-glow">
                  {fusedName}
                </h2>
                <div className="flex gap-3 justify-center mb-10">
                  {fusedTypes.map(t=>(
                    <span key={t} className={`text-xs font-black uppercase text-white px-5 py-2 rounded-lg bg-type-${t} shadow-2xl border border-white/20 ring-1 ring-white/10`}>
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-lab-text-muted font-mono max-w-lg">
                  &gt; SUBJECT YIELD: HYBRID COMBINATION PERMITTED. <br />
                  &gt; DATA INTEGRITY: 98.4% STABLE.
                </div>
              </motion.div>

              {/* History Array */}
              {history.length > 1 && (
                <div className="pt-8 border-t border-lab-border">
                  <div className="flex items-center gap-3 mb-8">
                    <History className="w-4 h-4 text-lab-accent" />
                    <h3 className="font-black text-lab-text-muted text-[10px] uppercase tracking-[0.3em]">Previous Extractions</h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {history.slice(1).map((h,i) => (
                      <div key={i} className="glass-card p-4 text-center hover:bg-white/5 transition-all cursor-pointer border-white/5">
                        <div className="flex gap-2 justify-center mb-3">
                          <div className="w-10 h-10 relative">
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${h.ids[0]}.png`} alt="" fill className="object-contain" />
                          </div>
                          <div className="w-10 h-10 relative">
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${h.ids[1]}.png`} alt="" fill className="object-contain" />
                          </div>
                        </div>
                        <p className="font-black text-lab-text text-[10px] capitalize tracking-tighter mb-2 italic line-clamp-1">{h.name}</p>
                        <div className="flex gap-1 justify-center">
                          {h.types.map(t=><div key={t} className={`w-2 h-2 rounded-full bg-type-${t}`} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
