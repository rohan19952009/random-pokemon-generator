"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Pokemon, getPokemonById } from "@/lib/pokeapi";
import { PokemonCard } from "./PokemonCard";
import { Sparkles, Zap } from "lucide-react";

export function DailySurprise({ onShowDetails }: { onShowDetails: (p: Pokemon) => void }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDaily() {
      // Deterministic selection based on date
      const date = new Date();
      const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
      
      // Feature mostly Pikachu variants or legendary/mythicals for "surprise" factor
      const pikachuVariants = [25, 10030, 10031, 10032, 10080, 10081, 10082, 10083, 10084, 10085, 10094, 10095, 10096, 10097, 10098, 10099];
      const selectedId = pikachuVariants[seed % pikachuVariants.length];
      
      try {
        const data = await getPokemonById(selectedId);
        setPokemon(data);
      } catch (e) {
        // Fallback to standard Pikachu
        const data = await getPokemonById(25);
        setPokemon(data);
      } finally {
        setLoading(false);
      }
    }
    fetchDaily();
  }, []);

  if (loading) return null;
  if (!pokemon) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-poke-yellow/20 rounded-lg">
          <Zap className="w-5 h-5 text-poke-yellow fill-poke-yellow animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            Pikachu's Daily Surprise
            <Sparkles className="w-4 h-4 text-poke-gold" />
          </h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">A new lucky encounter every 24 hours</p>
        </div>
      </div>
      
      <div className="max-w-sm">
        <PokemonCard 
          pokemon={pokemon} 
          index={0} 
          onShowDetails={onShowDetails}
        />
      </div>
    </div>
  );
}
