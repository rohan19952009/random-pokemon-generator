import { type Pokemon } from "@/lib/pokeapi";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
  onShowDetails: (p: Pokemon) => void;
}

export function PokemonCard({ pokemon, index, onShowDetails }: PokemonCardProps) {
  const mainType = pokemon.types[0];
  // Use official PokeAPI sprite CDN — fast, reliable, no rate-limits
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div
      className={`poke-card group max-w-[280px] mx-auto w-full cursor-pointer relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95`}
      style={{ animationDelay: index < 8 ? '0ms' : `${(index - 8) * 40}ms` }}
    >
      <div className={`h-36 w-full bg-type-${mainType}/10 relative flex items-center justify-center rounded-t-2xl`}>
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 rounded-lg text-[10px] font-black z-20">
          #{String(pokemon.id).padStart(3, "0")}
        </div>
        <div className="relative w-32 h-32 group-hover:-translate-y-1 transition-transform duration-300">
          <Image
            src={spriteUrl}
            alt={`${pokemon.name} sprite`}
            fill
            className="object-contain drop-shadow-xl"
            priority={index < 4}
            loading={index < 4 ? "eager" : "lazy"}
            sizes="128px"
          />
        </div>
      </div>
      
      <div className="p-4 pt-3">
        <h3 className="text-base font-black capitalize mb-1 text-slate-800 truncate">{pokemon.name}</h3>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-white bg-type-${type}`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="space-y-1.5 mb-4">
          <StatBar label="HP" value={pokemon.stats.hp} max={255} color="#ff5555" />
          <StatBar label="ATK" value={pokemon.stats.attack} max={190} color="#f08030" />
          <StatBar label="DEF" value={pokemon.stats.defense} max={230} color="#6890f0" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowDetails(pokemon);
          }}
          className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-600 hover:bg-poke-red hover:text-white hover:border-poke-red transition-colors duration-200 flex items-center justify-center gap-1.5"
        >
          <span>Show Details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// Pure CSS stat bar — zero JS animation overhead
function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="w-7 font-bold text-slate-400">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full stat-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-6 text-right font-semibold text-slate-600">{value}</span>
    </div>
  );
}
