import { type Pokemon } from "@/lib/pokeapi";
import Image from "next/image";
import { ChevronRight, Plus, Check, Database } from "lucide-react";
import { useLab } from "@/context/LabContext";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
  onShowDetails: (p: Pokemon) => void;
}

export function PokemonCard({ pokemon, index, onShowDetails }: PokemonCardProps) {
  const { addToTeam, isPokemonInTeam } = useLab();
  const mainType = pokemon.types[0];
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const inTeam = isPokemonInTeam(pokemon.id);

  return (
    <div
      onClick={() => onShowDetails(pokemon)}
      className="glass-card glass-card-hover group max-w-[280px] mx-auto w-full relative overflow-hidden flex flex-col active:scale-95 hero-fade-in"
      style={{ animationDelay: `${(index % 8) * 50}ms` }}
    >
      {/* Header Info */}
      <div className="flex justify-between items-center p-3 border-b border-lab-border/50 bg-white/5">
        <span className="text-[10px] font-black tracking-widest text-lab-accent/60 uppercase">
          SIG_{String(pokemon.id).padStart(4, "0")}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!inTeam) addToTeam(pokemon);
          }}
          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
            inTeam 
            ? "bg-lab-accent text-lab-bg shadow-[0_0_15px_rgba(0,242,255,0.4)]" 
            : "bg-white/5 border border-white/10 text-lab-text hover:border-lab-accent hover:text-lab-accent"
          }`}
        >
          {inTeam ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {inTeam ? "SAVED" : "CAPTURE"}
        </button>
      </div>

      <div className={`h-40 w-full relative flex items-center justify-center overflow-hidden`}>
        {/* Decorative Background Elements */}
        <div className={`absolute inset-0 bg-type-${mainType}/5 opacity-20`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05)_0%,transparent_70%)]" />
        
        {/* Floating ID Indicator */}
        <div className="absolute bottom-2 left-4 text-[40px] font-black text-white/[0.03] select-none pointer-events-none">
          #{String(pokemon.id).padStart(3, "0")}
        </div>

        <div className="relative w-36 h-36 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out z-10">
          <Image
            src={spriteUrl}
            alt={`${pokemon.name} - ${pokemon.types.join("/")} Type Pokémon Signature Extraction`}
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            priority={index < 8}
            loading={index < 8 ? "eager" : "lazy"}
            sizes="144px"
          />
        </div>
      </div>
      
      <div className="p-4 pt-3 flex-1 flex flex-col">
        <h3 className="text-lg font-black uppercase tracking-tighter mb-2 text-lab-text truncate group-hover:text-lab-accent transition-colors">
          {pokemon.name}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase text-white bg-type-${type} shadow-[0_2px_10px_rgba(0,0,0,0.2)] border border-white/10`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="space-y-2 mb-6">
          <StatBar label="VIT" value={pokemon.stats.hp} max={255} type="hp" />
          <StatBar label="POW" value={pokemon.stats.attack} max={190} type="atk" />
          <StatBar label="DEF" value={pokemon.stats.defense} max={230} type="def" />
        </div>

        <div className="mt-auto pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails(pokemon);
            }}
            className="w-full py-2.5 bg-lab-accent/5 border border-lab-accent/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent hover:bg-lab-accent hover:text-lab-bg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            <span>Deep Analysis</span>
            <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,100,0.06))] bg-[size:100%_4px,3px_100%]" />
    </div>
  );
}

function StatBar({ label, value, max, type }: { label: string; value: number; max: number; type: string }) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[9px] font-black text-lab-text-muted tracking-widest">{label}</span>
        <span className="text-[10px] font-bold text-lab-text/80">{value}</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/[0.03]">
        <div
          className={`h-full rounded-full stat-bar-fill bg-type-${type === 'hp' ? 'fire' : type === 'atk' ? 'fighting' : 'water'} bg-stat-${type}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
