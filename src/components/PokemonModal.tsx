import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { type Pokemon, getFullPokemonDetails } from "@/lib/pokeapi";
import { X, Sword, Shield, Zap, Heart, Activity, Info, Loader2 } from "lucide-react";
import Image from "next/image";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export function PokemonModal({ pokemon: litePokemon, onClose }: PokemonModalProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(litePokemon);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!litePokemon) {
      setPokemon(null);
      return;
    }

    // Check if it's already full data (from API or pre-hydrated)
    // Lite data from the bundle has flavorText as an empty string
    if (litePokemon.flavorText !== "") {
      setPokemon(litePokemon);
      return;
    }

    // Otherwise, fetch the full details lazily
    const loadDetails = async () => {
      setLoading(true);
      try {
        const fullData = await getFullPokemonDetails(litePokemon.id);
        setPokemon(fullData);
      } catch (e) {
        console.error("Failed to load details:", e);
        setPokemon(litePokemon); // Fallback to lite
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [litePokemon]);

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 bg-white md:bg-slate-100 rounded-full shadow-lg md:shadow-none hover:bg-poke-red hover:text-white transition-all active:scale-95"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Visuals */}
        <div className={`w-full md:w-2/5 p-2 md:p-8 flex flex-col items-center justify-center relative overflow-hidden bg-type-${pokemon.types[0]}/10`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          
          <div className="relative w-full h-[320px] md:h-80 z-10 transition-transform duration-700 hover:rotate-6">
            <Image
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, "0")}.png`}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              priority
            />
          </div>
          
          <div className="mt-8 text-center">
            <span className="text-sm font-black text-slate-400 tracking-widest uppercase">#{String(pokemon.id).padStart(3, "0")}</span>
            <h2 className="text-4xl font-black capitalize mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
              {pokemon.name}
            </h2>
            <div className="flex gap-2 justify-center">
              {pokemon.types.map((type: string) => (
                <span key={type} className={`px-4 py-1.5 rounded-full text-xs font-black uppercase text-white bg-type-${type} shadow-lg shadow-type-${type}/20`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Data */}
        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-slate-50/50 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-poke-red animate-spin" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Catching Data...</p>
            </div>
          )}

          {/* Lore Section */}
          <div className="mb-10">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-poke-red mb-4">
              <Info className="w-4 h-4" />
              Pokédex Entry
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-poke-red/20 pl-6 h-18">
              "{pokemon.flavorText || "Loading elite lore entry..."}"
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-10">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-poke-blue mb-4">
              <Activity className="w-4 h-4" />
              Base Stats
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <StatItem icon={<Heart className="text-red-500" />} label="HP" value={pokemon.stats.hp} color="bg-red-500" />
              <StatItem icon={<Sword className="text-orange-500" />} label="Attack" value={pokemon.stats.attack} color="bg-orange-500" />
              <StatItem icon={<Shield className="text-blue-500" />} label="Defense" value={pokemon.stats.defense} color="bg-blue-500" />
              <StatItem icon={<Zap className="text-yellow-500" />} label="Speed" value={pokemon.stats.speed} color="bg-yellow-500" />
            </div>
          </div>

          {/* Effectiveness Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Sword className="w-3 h-3 text-red-500" />
                Weaknesses
              </h3>
              <div className="flex flex-wrap gap-2 min-h-6">
                {pokemon.relations.doubleDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} />
                ))}
                {!loading && pokemon.relations.doubleDamageFrom.length === 0 && <span className="text-sm text-slate-400">Stable entry.</span>}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3 text-blue-500" />
                Resistances
              </h3>
              <div className="flex flex-wrap gap-2 min-h-6">
                {pokemon.relations.halfDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} />
                ))}
                {pokemon.relations.noDamageFrom.map((type: string) => (
                  <TypeBadge key={type} type={type} pulse />
                ))}
              </div>
            </div>
          </div>

          {/* Battle Strategy */}
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200">
            <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-poke-yellow mb-4">
              <Zap className="w-4 h-4" />
              Battle Strategy
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1.5 h-auto bg-poke-red rounded-full flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Combat Analysis</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {loading ? "Analyzing genetic markers..." : `As a ${pokemon.types.join("/")} type, this Pokémon is ideally suited for ${pokemon.stats.attack > pokemon.stats.specialAttack ? "physical" : "elemental"} tactical engagements.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatItem({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  const percentage = Math.min(100, (value / 255) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1 text-sm font-bold">
        <div className="flex items-center gap-2 uppercase tracking-tighter text-[10px] text-slate-500">
          {icon}
          {label}
        </div>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </div>
  );
}

function TypeBadge({ type, pulse }: { type: string; pulse?: boolean }) {
  return (
    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase text-white bg-type-${type} ${pulse ? "animate-pulse" : ""} ring-1 ring-white/20`}>
      {type}
    </span>
  );
}
