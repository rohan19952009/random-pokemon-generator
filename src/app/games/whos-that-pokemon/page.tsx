"use client";

import { useState, useCallback, useEffect } from "react";
import { HelpCircle, RefreshCw, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Who's That Pokémon? - Trivia Game",
  "description": "The classic Pokémon guessing game. Identify the Pokémon from its silhouette! Test your knowledge across all generations (Gen 1-9).",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/games/whos-that-pokemon"
};

const ALL_IDS = Array.from({length: 898}, (_, i) => i + 1);
function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)]; }

type GameState = "playing" | "correct" | "wrong";

export default function WhosThatPokemonPage() {
  const [pokemonId, setPokemonId] = useState<number|null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState<GameState>("playing");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hint, setHint] = useState("");

  const loadNewPokemon = useCallback(async () => {
    setLoading(true);
    setGameState("playing");
    setGuess("");
    setHintsUsed(0);
    setHint("");
    const id = pickRandom(ALL_IDS);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemonId(id);
      setPokemonName(data.name);
      setLoading(false);
    } catch {
      setPokemonId(id);
      setPokemonName(`pokemon-${id}`);
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadNewPokemon(); }, [loadNewPokemon]);

  const submitGuess = () => {
    const normalized = guess.toLowerCase().replace(/[^a-z0-9-]/g,"");
    const correct = pokemonName.toLowerCase();
    if (normalized === correct || correct.includes(normalized) && normalized.length > 2) {
      setGameState("correct");
      setScore(s => s + Math.max(1, 3 - hintsUsed));
      setStreak(s => s + 1);
    } else {
      setGameState("wrong");
      setStreak(0);
    }
  };

  const revealHint = () => {
    const hintLevel = hintsUsed;
    if (hintLevel === 0) setHint(`It has ${pokemonName.length} letters`);
    else if (hintLevel === 1) setHint(`It starts with "${pokemonName[0].toUpperCase()}"`);
    else if (hintLevel === 2) setHint(`Its name is: ${pokemonName.split("").map((c,i)=> i===0||i===pokemonName.length-1?c.toUpperCase():"_").join(" ")}`);
    setHintsUsed(h => h + 1);
  };

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/games" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Games</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">👤 Who's That <span className="text-poke-red italic">Pokémon?</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Can you identify the Pokémon from its silhouette?</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Score bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Score</p>
            <p className="text-2xl font-black text-slate-900">{score}</p>
          </div>
          <div className="text-3xl">👤</div>
          <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Streak 🔥</p>
            <p className="text-2xl font-black text-slate-900">{streak}</p>
          </div>
        </div>

        {/* Silhouette card */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 text-center mb-6 shadow-lg">
          {loading ? (
            <div className="w-48 h-48 bg-slate-100 rounded-2xl mx-auto animate-pulse" />
          ) : pokemonId ? (
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                alt="Who's that Pokémon?"
                fill
                className={`object-contain transition-all duration-500 ${gameState === "playing" ? "brightness-0" : "brightness-100"}`}
                priority
              />
            </div>
          ) : null}

          {gameState !== "playing" && (
            <div className={`mt-4 font-black text-xl capitalize ${gameState === "correct" ? "text-green-500" : "text-poke-red"}`}>
              {gameState === "correct" ? "✅ Correct!" : "❌ Wrong!"} It's <span className="capitalize">{pokemonName}</span>!
            </div>
          )}

          {hint && gameState === "playing" && (
            <div className="mt-4 text-sm text-slate-500 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2">
              💡 Hint: {hint}
            </div>
          )}
        </div>

        {/* Input */}
        {gameState === "playing" ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type the Pokémon name..."
                value={guess}
                onChange={e => setGuess(e.target.value)}
                onKeyDown={e => e.key === "Enter" && guess && submitGuess()}
                className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-poke-red placeholder:text-slate-300"
              />
              <button onClick={submitGuess} disabled={!guess} className="px-6 py-3.5 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 transition-colors active:scale-95 disabled:opacity-40">
                Guess!
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={revealHint} disabled={hintsUsed >= 3} className="flex-1 py-2.5 bg-yellow-50 border border-yellow-200 text-yellow-700 font-black rounded-xl text-xs uppercase tracking-wider hover:bg-yellow-100 transition-colors disabled:opacity-40">
                💡 Hint ({3 - hintsUsed} left)
              </button>
              <button onClick={() => setGameState("wrong")} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 font-black rounded-xl text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors">
                Give Up
              </button>
            </div>
          </div>
        ) : (
          <button onClick={loadNewPokemon} className="w-full flex items-center justify-center gap-2 py-4 bg-poke-red text-white font-black rounded-2xl hover:bg-red-600 transition-colors active:scale-95 text-sm uppercase tracking-wider shadow-lg">
            <RefreshCw className="w-4 h-4" /> Next Pokémon
          </button>
        )}
      </div>
    </div>
  );
}
