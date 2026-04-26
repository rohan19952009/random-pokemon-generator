"use client";

import { useState, useCallback, useEffect } from "react";
import { Brain, RefreshCw, Check, X } from "lucide-react";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pokémon Wordle - Daily Guesser",
  "description": "Guess the mystery Pokémon in 6 tries! A unique wordle-style game using Pokémon names from every generation. Test your memory and knowledge.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/games/pokemon-wordle"
};

// Wordle-style: guess the Pokémon by type/region/height clues
// We use a curated list of well-known Pokémon for fairness

interface PokemonData {
  id: number; name: string; types: string[];
  generation: number; legendary: boolean; height: number;
}

type ClueResult = "correct" | "partial" | "wrong";

interface GuessResult {
  name: string;
  clues: {
    name: ClueResult;
    type1: ClueResult;
    type2: ClueResult;
    generation: ClueResult | "higher" | "lower";
    legendary: ClueResult;
  };
  data: PokemonData;
}

const GEN_RANGES = [
  [1,151],[152,251],[252,386],[387,493],[494,649],[650,721],[722,809],[810,905],[906,1025]
];
function getGen(id: number): number {
  return GEN_RANGES.findIndex(([s,e]) => id >= s && id <= e) + 1;
}

// Known Pokémon data for a clean offline-capable wordle
const POKEMON_LIST: PokemonData[] = [
  {id:1,name:"bulbasaur",types:["grass","poison"],generation:1,legendary:false,height:7},
  {id:4,name:"charmander",types:["fire"],generation:1,legendary:false,height:6},
  {id:7,name:"squirtle",types:["water"],generation:1,legendary:false,height:5},
  {id:25,name:"pikachu",types:["electric"],generation:1,legendary:false,height:4},
  {id:39,name:"jigglypuff",types:["normal","fairy"],generation:1,legendary:false,height:5},
  {id:52,name:"meowth",types:["normal"],generation:1,legendary:false,height:4},
  {id:63,name:"abra",types:["psychic"],generation:1,legendary:false,height:9},
  {id:94,name:"gengar",types:["ghost","poison"],generation:1,legendary:false,height:15},
  {id:131,name:"lapras",types:["water","ice"],generation:1,legendary:false,height:25},
  {id:143,name:"snorlax",types:["normal"],generation:1,legendary:false,height:21},
  {id:149,name:"dragonite",types:["dragon","flying"],generation:1,legendary:false,height:22},
  {id:150,name:"mewtwo",types:["psychic"],generation:1,legendary:true,height:20},
  {id:152,name:"chikorita",types:["grass"],generation:2,legendary:false,height:9},
  {id:155,name:"cyndaquil",types:["fire"],generation:2,legendary:false,height:5},
  {id:158,name:"totodile",types:["water"],generation:2,legendary:false,height:6},
  {id:196,name:"espeon",types:["psychic"],generation:2,legendary:false,height:9},
  {id:197,name:"umbreon",types:["dark"],generation:2,legendary:false,height:10},
  {id:249,name:"lugia",types:["psychic","flying"],generation:2,legendary:true,height:52},
  {id:250,name:"ho-oh",types:["fire","flying"],generation:2,legendary:true,height:38},
  {id:252,name:"treecko",types:["grass"],generation:3,legendary:false,height:5},
  {id:255,name:"torchic",types:["fire"],generation:3,legendary:false,height:4},
  {id:258,name:"mudkip",types:["water"],generation:3,legendary:false,height:4},
  {id:282,name:"gardevoir",types:["psychic","fairy"],generation:3,legendary:false,height:16},
  {id:384,name:"rayquaza",types:["dragon","flying"],generation:3,legendary:true,height:70},
  {id:448,name:"lucario",types:["fighting","steel"],generation:4,legendary:false,height:12},
  {id:445,name:"garchomp",types:["dragon","ground"],generation:4,legendary:false,height:19},
  {id:483,name:"dialga",types:["steel","dragon"],generation:4,legendary:true,height:54},
  {id:484,name:"palkia",types:["water","dragon"],generation:4,legendary:true,height:42},
  {id:571,name:"zoroark",types:["dark"],generation:5,legendary:false,height:16},
  {id:609,name:"chandelure",types:["ghost","fire"],generation:5,legendary:false,height:10},
  {id:643,name:"reshiram",types:["dragon","fire"],generation:5,legendary:true,height:32},
  {id:644,name:"zekrom",types:["dragon","electric"],generation:5,legendary:true,height:29},
  {id:658,name:"greninja",types:["water","dark"],generation:6,legendary:false,height:15},
  {id:681,name:"aegislash",types:["steel","ghost"],generation:6,legendary:false,height:17},
  {id:716,name:"xerneas",types:["fairy"],generation:6,legendary:true,height:30},
  {id:717,name:"yveltal",types:["dark","flying"],generation:6,legendary:true,height:58},
  {id:724,name:"decidueye",types:["grass","ghost"],generation:7,legendary:false,height:16},
  {id:800,name:"necrozma",types:["psychic"],generation:7,legendary:true,height:24},
  {id:818,name:"inteleon",types:["water"],generation:8,legendary:false,height:19},
  {id:888,name:"zacian",types:["fairy"],generation:8,legendary:true,height:28},
  {id:889,name:"zamazenta",types:["fighting"],generation:8,legendary:true,height:29},
];

function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random()*arr.length)]; }

function getClue(guess: PokemonData, target: PokemonData): GuessResult["clues"] {
  return {
    name: guess.name === target.name ? "correct" : "wrong",
    type1: guess.types[0] === target.types[0] ? "correct" : (target.types.includes(guess.types[0]) ? "partial" : "wrong"),
    type2: !guess.types[1] && !target.types[1] ? "correct" :
           guess.types[1] === target.types[1] ? "correct" :
           (target.types.includes(guess.types[1]||"") ? "partial" : "wrong"),
    generation: guess.generation === target.generation ? "correct" : guess.generation < target.generation ? "higher" : "lower",
    legendary: guess.legendary === target.legendary ? "correct" : "wrong",
  };
}

const CLUE_STYLE: Record<string, string> = {
  correct: "bg-green-500 text-white",
  partial: "bg-yellow-400 text-white",
  wrong: "bg-slate-200 text-slate-500",
  higher: "bg-blue-400 text-white",
  lower: "bg-orange-400 text-white",
};
const CLUE_ICON: Record<string, string> = {
  correct:"✅", partial:"🟡", wrong:"❌", higher:"⬆️", lower:"⬇️"
};

export default function PokemonWordlePage() {
  const [target] = useState(() => pickRandom(POKEMON_LIST));
  const [current, setCurrent] = useState(target); // reset on new game
  const [inputName, setInputName] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [error, setError] = useState("");
  const [key, setKey] = useState(0);

  const submitGuess = () => {
    const found = POKEMON_LIST.find(p => p.name === inputName.toLowerCase().trim());
    if (!found) { setError("Pokémon not in list — try another!"); return; }
    setError("");
    const clues = getClue(found, current);
    const result: GuessResult = { name: inputName.toLowerCase().trim(), clues, data: found };
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setInputName("");
    if (clues.name === "correct") { setWon(true); setGameOver(true); }
    else if (newGuesses.length >= 6) setGameOver(true);
  };

  const restart = () => {
    setKey(k => k+1);
    window.location.reload();
  };

  return (
    <div className="w-full pb-20" key={key}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/games" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Games</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">🟩 Pokémon <span className="text-poke-red italic">Wordle</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Guess the secret Pokémon in 6 attempts. Color clues show how close you are!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-xl">
        {/* Legend */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-wider">
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-500 rounded inline-block" /> Correct</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-400 rounded inline-block" /> Partial match</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-400 rounded inline-block" /> ⬆️ Higher</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-400 rounded inline-block" /> ⬇️ Lower</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-slate-200 rounded inline-block" /> Wrong</span>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-5 gap-2 mb-3 text-[9px] font-black uppercase text-slate-400 text-center tracking-wider">
          <span>Name</span><span>Type 1</span><span>Type 2</span><span>Gen</span><span>Legend?</span>
        </div>

        {/* Guesses */}
        <div className="space-y-2 mb-6">
          {guesses.map((g, i) => (
            <div key={i} className="grid grid-cols-5 gap-2">
              <div className={`${CLUE_STYLE[g.clues.name]} rounded-xl py-2 px-1 text-[10px] font-black text-center capitalize`}>{g.name}</div>
              <div className={`${CLUE_STYLE[g.clues.type1]} rounded-xl py-2 px-1 text-[10px] font-black text-center capitalize`}>{g.data.types[0]}</div>
              <div className={`${CLUE_STYLE[g.clues.type2]} rounded-xl py-2 px-1 text-[10px] font-black text-center capitalize`}>{g.data.types[1] || "—"}</div>
              <div className={`${CLUE_STYLE[g.clues.generation]} rounded-xl py-2 px-1 text-[10px] font-black text-center`}>
                {CLUE_ICON[g.clues.generation]} Gen {g.data.generation}
              </div>
              <div className={`${CLUE_STYLE[g.clues.legendary]} rounded-xl py-2 px-1 text-[10px] font-black text-center`}>
                {g.data.legendary ? "Yes" : "No"}
              </div>
            </div>
          ))}
          {/* Empty rows */}
          {Array.from({length: Math.max(0, 6 - guesses.length)}).map((_, i) => (
            <div key={`empty-${i}`} className="grid grid-cols-5 gap-2">
              {Array.from({length:5}).map((_,j) => (
                <div key={j} className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-10" />
              ))}
            </div>
          ))}
        </div>

        {/* Hints */}
        {guesses.length > 0 && !gameOver && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-xs text-slate-500 font-medium">
            💡 Try: <span className="font-black text-slate-700">{POKEMON_LIST.filter(p=>!guesses.find(g=>g.name===p.name)).map(p=>p.name).slice(0,8).join(", ")}</span>...
          </div>
        )}

        {/* Input */}
        {!gameOver ? (
          <div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                list="pokemon-list"
                placeholder={`Guess ${guesses.length + 1} of 6...`}
                value={inputName}
                onChange={e => { setInputName(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && inputName && submitGuess()}
                className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-poke-red placeholder:text-slate-300"
              />
              <button onClick={submitGuess} disabled={!inputName} className="px-6 py-3.5 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 transition-colors active:scale-95 disabled:opacity-40">
                Guess
              </button>
            </div>
            <datalist id="pokemon-list">
              {POKEMON_LIST.map(p => <option key={p.id} value={p.name} />)}
            </datalist>
            {error && <p className="text-xs text-poke-red font-bold">{error}</p>}
            <p className="text-[10px] text-slate-300 mt-1">Pick from the dropdown or type a Pokémon name</p>
          </div>
        ) : (
          <div className="text-center">
            <div className={`text-4xl mb-3`}>{won ? "🎉" : "😭"}</div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {won ? `Got it in ${guesses.length}!` : "Better luck next time!"}
            </h2>
            <p className="text-slate-500 text-sm mb-5">
              The Pokémon was: <span className="font-black text-slate-800 capitalize">{current.name}</span> (Gen {current.generation}, {current.legendary?"Legendary":"Normal"})
            </p>
            <button onClick={restart} className="inline-flex items-center gap-2 px-8 py-3.5 bg-poke-red text-white font-black rounded-2xl hover:bg-red-600 transition-colors active:scale-95 text-sm uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}

        {/* Attempts counter */}
        {!gameOver && (
          <div className="mt-4 text-center text-xs text-slate-400 font-black">
            {6 - guesses.length} attempts remaining
          </div>
        )}
      </div>
    </div>
  );
}
