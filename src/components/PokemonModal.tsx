import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Pokemon, getFullPokemonDetails } from "@/lib/pokeapi";
import { X, Sword, Shield, Zap, Heart, Activity, Info, Loader2, Database, Laptop, Terminal, Target, Plus, Check } from "lucide-react";
import Image from "next/image";
import { useLab } from "@/context/LabContext";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export function PokemonModal({ pokemon: litePokemon, onClose }: PokemonModalProps) {
  const { addToTeam, isPokemonInTeam } = useLab();
  const [pokemon, setPokemon] = useState<Pokemon | null>(litePokemon);
  const [loading, setLoading] = useState(false);

  const inTeam = pokemon ? isPokemonInTeam(pokemon.id) : false;

  useEffect(() => {
    if (!litePokemon) {
      setPokemon(null);
      return;
    }

    if (litePokemon.flavorText !== "") {
      setPokemon(litePokemon);
      return;
    }

    const loadDetails = async () => {
      setLoading(true);
      try {
        const fullData = await getFullPokemonDetails(litePokemon.id);
        await new Promise(resolve => setTimeout(resolve, 600));
        setPokemon(fullData);
      } catch (e) {
        console.error("Failed to load details:", e);
        setPokemon(litePokemon);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [litePokemon]);

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-lab-bg/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="glass-card w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative border-lab-accent/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* Header Controls */}
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => {
              if (!inTeam && pokemon) addToTeam(pokemon);
            }}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl ${
              inTeam 
              ? "bg-lab-accent text-lab-bg shadow-lab-accent/20" 
              : "bg-white/5 border border-white/10 text-lab-text hover:border-lab-accent hover:text-lab-accent"
            }`}
          >
            {inTeam ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {inTeam ? "Captured" : "Add to Lab"}
          </button>
          
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-lab-accent hover:border-lab-accent transition-all active:scale-95 shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Left Side: Visuals & Scanning */}
        <div className={`w-full md:w-2/5 p-8 flex flex-col items-center justify-center relative overflow-hidden bg-white/5 border-r border-lab-border`}>
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          <div className="relative w-full h-80 z-10 transition-transform duration-1000 ease-out group">
            <div className="absolute inset-0 bg-gradient-to-t from-lab-accent/10 to-transparent blur-3xl rounded-full opacity-50" />
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, "0")}.png`}
              alt={`${pokemon.name} - ${pokemon.types.join("/")} Type Detailed Signature Metadata`}
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(0,242,255,0.4)] relative z-10"
              priority
            />
          </div>
          
          <div className="mt-12 text-center relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-lab-accent/10 border border-lab-accent/30 text-lab-accent text-[10px] font-black tracking-[0.3em] uppercase mb-4">
              <Target className="w-3 h-3" />
              Signature Verified
            </div>
            <h2 className="text-5xl font-black capitalize text-lab-text tracking-tighter mb-4 text-glow">
              {pokemon.name}
            </h2>
            <div className="flex gap-3 justify-center">
              {pokemon.types.map((type: string) => (
                <span key={type} className={`px-4 py-1 rounded-md text-[10px] font-black uppercase text-white bg-type-${type} shadow-lg ring-1 ring-white/20`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Data Mainframe */}
        <div className="w-full md:w-3/5 p-8 md:p-14 overflow-y-auto relative bg-transparent scrollbar-thin scrollbar-thumb-lab-border">
          {loading && (
            <div className="absolute inset-0 bg-lab-bg/80 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-lab-accent animate-spin" />
                <div className="absolute inset-0 blur-xl bg-lab-accent/20 animate-pulse" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-lab-accent text-glow">Deep Data Scan</p>
                <p className="text-[10px] text-lab-text-muted mt-2 font-mono">ACCESSING SIG_{pokemon.id}_CORE...</p>
              </div>
            </div>
          )}

          {/* Entry Protocol */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-lab-accent" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-lab-accent italic">Extraction Entry</h3>
            </div>
            <p className="text-xl text-lab-text-muted leading-relaxed font-medium italic border-l-2 border-lab-accent/20 pl-8 py-2">
              "{pokemon.flavorText || "Synchronizing with the main encrypted archive... Data yield incoming."}"
            </p>
          </div>

          {/* Stats Analysis */}
          <div className="mb-12">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-lab-accent" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-lab-accent italic">Telemetry Readouts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <StatItem label="Vitality (HP)" value={pokemon.stats.hp} color="bg-hp" />
              <StatItem label="Power (ATK)" value={pokemon.stats.attack} color="bg-atk" />
              <StatItem label="Armor (DEF)" value={pokemon.stats.defense} color="bg-def" />
              <StatItem label="Response (SPD)" value={pokemon.stats.speed} color="bg-spe" />
            </div>
          </div>

          {/* Type Effectiveness Mainframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-t border-lab-border pt-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-lab-text-muted mb-6 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-lab-accent" />
                Compromised Under
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {pokemon.relations.doubleDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} />
                ))}
                {!loading && pokemon.relations.doubleDamageFrom.length === 0 && <span className="text-[9px] font-bold text-lab-text-muted italic lowercase">Zero vulnerabilities detected.</span>}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-lab-text-muted mb-6 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-lab-accent" />
                Resistant Protocols
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {pokemon.relations.halfDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} />
                ))}
                {pokemon.relations.noDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} pulse />
                ))}
              </div>
            </div>
          </div>

          {/* Strategic Terminal */}
          <div className="p-8 rounded-2xl bg-white/5 border border-lab-accent/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Laptop className="w-4 h-4 text-lab-accent" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-lab-text">Mission Strategy</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-4">
                <div className="w-1 h-auto bg-lab-accent/30 rounded-full flex-shrink-0" />
                <div>
                   <p className="text-[11px] text-lab-text-muted leading-relaxed font-mono">
                    {loading ? "> RUNNING ANALYSIS..." : `> Subject ${pokemon.name} classified as ${pokemon.types.join("/")} hybrid. Recommended tactical role: ${pokemon.stats.attack > pokemon.stats.specialAttack ? "PHYSICAL STRIKER" : "ELEMENTAL SPECIALIST"}. Monitor Speed tiers closely for turn priority advantage.`}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-2 opacity-5">
              <Database className="w-24 h-24" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: number; color: string }) {
  const percentage = Math.min(100, (value / 255) * 100);
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3 text-sm font-bold">
        <div className="flex items-center gap-2 uppercase tracking-widest text-[9px] text-lab-text-muted group-hover:text-lab-text transition-colors">
          {label}
        </div>
        <span className="text-lab-text font-black text-xs font-mono">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${color} shadow-[0_0_15px_rgba(255,255,255,0.1)] relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </motion.div>
      </div>
    </div>
  );
}

function TypeBadge({ type, pulse }: { type: string; pulse?: boolean }) {
  return (
    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase text-white bg-type-${type} ${pulse ? "animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.2)]" : ""} border border-white/10`}>
      {type}
    </span>
  );
}
