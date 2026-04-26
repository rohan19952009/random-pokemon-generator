"use client";

import { useState, useCallback, useEffect } from "react";
import { Swords, RefreshCw, Shield, Zap, ChevronRight, Activity, Cpu, Monitor, Download, Save, Terminal, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLab } from "@/context/LabContext";
import { motion, AnimatePresence } from "framer-motion";

interface MiniPokemon {
  id: number;
  name: string;
  types: string[];
}

const ALL_IDS = Array.from({length: 1025}, (_, i) => i + 1);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokédex Lab Team Strategist",
  "description": "Professional tactical team coordination. Build balanced squads of 6 random signatures and analyze real-time type coverage.",
  "applicationCategory": "Professional Tool",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/team-planner"
};

export default function TeamPlannerPage() {
  const { team: labTeam, addToTeam, isPokemonInTeam } = useLab();
  const [team, setTeam] = useState<MiniPokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const generateTeam = useCallback(async () => {
    setLoading(true);
    setAnalyzing(true);
    const ids = shuffle(ALL_IDS).slice(0, 6);
    try {
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          return { id, name: data.name, types: data.types.map((t: any) => t.type.name) } as MiniPokemon;
        })
      );
      // Immersion delay
      await new Promise(r => setTimeout(r, 1200));
      setTeam(results);
    } catch {
      setTeam(ids.map(id => ({ id, name: `SIG_${id}`, types: ["normal"] })));
    } finally {
      setLoading(false);
      setTimeout(() => setAnalyzing(false), 500);
    }
  }, []);

  const importFromLab = () => {
    if (labTeam.length > 0) {
      setTeam(labTeam.map(p => ({ id: p.id, name: p.name, types: p.types })));
    }
  };

  const allTypes = team.flatMap(p => p.types);
  const typeCoverage = [...new Set(allTypes)];
  
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
              Return to Manifest
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 mb-6">
              <Activity className="w-3.5 h-3.5 text-lab-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent">Strategy Simulation // Alpha</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-lab-text tracking-tighter uppercase mb-6 italic">
              Random Pokémon <span className="text-lab-accent text-glow">Team Strategist</span>
            </h1>
            
            <p className="text-lab-text-muted font-medium text-lg max-w-2xl leading-relaxed">
              Coordinate high-fidelity squads and analyze critical telemetry overlaps for 
              optimal deployment in simulated combat environments.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-wrap gap-4 justify-center mb-16 relative z-20">
          <button
            onClick={generateTeam}
            disabled={loading}
            aria-label="Generate a new random Pokémon squad of six signatures"
            className="group relative flex items-center gap-3 px-10 py-5 bg-lab-accent text-lab-bg font-black rounded-2xl hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all active:scale-95 disabled:opacity-60 text-xs uppercase tracking-[0.2em] overflow-hidden"
          >
            <div className={`absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`} />
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Simulating..." : "Initialize Random Squad"}
          </button>
          
          {labTeam.length > 0 && (
            <button 
              onClick={importFromLab}
              className="flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 text-lab-text font-black rounded-2xl hover:bg-white/10 transition-all active:scale-95 text-xs uppercase tracking-[0.2em]"
            >
              <Download className="w-4 h-4 text-lab-accent" />
              Import from Lab ({labTeam.length})
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {team.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 glass-card border-dashed border-white/10"
            >
              <Swords className="w-20 h-20 mx-auto mb-6 text-lab-accent/20" />
              <p className="font-black text-xl text-lab-text-muted uppercase tracking-widest italic">Awaiting Module Initialization</p>
            </motion.div>
          )}

          {(loading || analyzing) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-56 flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white/5" />
                  <div className="w-20 h-3 bg-white/5 rounded-full" />
                </div>
              ))}
            </motion.div>
          )}

          {team.length === 6 && !loading && !analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Team Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((p, i) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={p.id} 
                    className="group glass-card glass-card-hover p-6 flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-4 text-[10px] font-mono text-white/5">0{i+1}</div>
                    <div className="relative w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                        alt={`${p.name} - Tactical Team Member ${i+1}`}
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-black capitalize text-lab-text text-lg tracking-tight mb-3 italic">{p.name}</h3>
                    <div className="flex gap-2 justify-center">
                      {p.types.map(type => (
                        <span key={type} className={`text-[9px] font-black uppercase text-white px-3 py-1 rounded border border-white/10 bg-type-${type} shadow-lg`}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Advanced Analysis Panels */}
              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-lab-border">
                <div className="glass-card p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Monitor className="w-20 h-20" />
                  </div>
                  <h3 className="font-black text-lab-text-muted text-[11px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Shield className="w-4 h-4 text-lab-accent" /> 
                    Genetic Type Coverage
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {typeCoverage.map(type => (
                      <span key={type} className={`text-[10px] font-black uppercase text-white px-3 py-1.5 rounded bg-type-${type} ring-1 ring-white/10`}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-10 relative overflow-hidden flex flex-col justify-center border-lab-accent/20">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Cpu className="w-20 h-20" />
                  </div>
                  <h3 className="font-black text-lab-accent text-[11px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <Zap className="w-4 h-4 animate-pulse" /> 
                    Tactical Summary
                  </h3>
                  <p className="text-sm text-lab-text-muted leading-relaxed font-mono">
                    &gt; COMPILING SQUAD DATA... <br />
                    &gt; SUCCESS: Squad contains {typeCoverage.length} unique tactical signatures. <br />
                    &gt; RECOMMENDATION: Balanced deployment protocol. Monitor speed tier overlaps.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
