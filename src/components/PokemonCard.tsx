"use client";

import { motion } from "framer-motion";
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
  
  return (
    <motion.div
      initial={index < 8 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index < 8 ? 0 : (index - 8) * 0.05 }}
      className={`glass-card group hover:scale-[1.02] transition-all duration-300 max-w-[280px] mx-auto w-full cursor-pointer relative overflow-hidden active:scale-95`}
    >
      <div className={`h-40 w-full bg-type-${mainType}/15 relative flex items-center justify-center rounded-t-2xl`}>
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/60 backdrop-blur-md rounded-lg text-[10px] font-black z-20">
          #{String(pokemon.id).padStart(3, "0")}
        </div>
        <div className="relative w-36 h-36 translate-y-2 group-hover:-translate-y-1 transition-transform duration-500 will-change-transform">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={pokemon.name}
            fill
            className="z-10 animate-float object-contain drop-shadow-2xl"
            priority={index < 2}
            sizes="144px"
          />
        </div>
      </div>
      
      <div className="p-4 md:p-5 pt-8">
        <h3 className="text-base md:text-lg font-black capitalize mb-1 text-slate-800 truncate">{pokemon.name}</h3>
        
        <div className="flex gap-1.5 mb-4 font-sans">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase text-white bg-type-${type}`}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="space-y-1.5 md:space-y-2 mb-6">
          <StatBar label="HP" value={pokemon.stats.hp} max={255} color="bg-hp" />
          <StatBar label="ATK" value={pokemon.stats.attack} max={190} color="bg-atk" />
          <StatBar label="DEF" value={pokemon.stats.defense} max={230} color="bg-def" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowDetails(pokemon);
          }}
          className="w-full py-2.5 bg-white border-2 border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-poke-red hover:text-white hover:border-poke-red transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Show Details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs">
      <span className="w-6 md:w-8 font-bold text-slate-500">{label}</span>
      <div className="flex-1 h-1.5 md:h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full ${color} will-change-[width]`}
        />
      </div>
      <span className="w-6 md:w-8 text-right font-medium opacity-80">{value}</span>
    </div>
  );
}
