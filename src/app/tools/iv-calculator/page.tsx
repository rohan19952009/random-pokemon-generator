"use client";

import { useState } from "react";
import { Calculator, Info } from "lucide-react";
import Link from "next/link";

const NATURES: Record<string, {up: string; down: string}> = {
  Hardy:   { up: "", down: "" },
  Lonely:  { up: "attack", down: "defense" },
  Brave:   { up: "attack", down: "speed" },
  Adamant: { up: "attack", down: "specialAttack" },
  Naughty: { up: "attack", down: "specialDefense" },
  Bold:    { up: "defense", down: "attack" },
  Docile:  { up: "", down: "" },
  Relaxed: { up: "defense", down: "speed" },
  Impish:  { up: "defense", down: "specialAttack" },
  Lax:     { up: "defense", down: "specialDefense" },
  Timid:   { up: "speed", down: "attack" },
  Hasty:   { up: "speed", down: "defense" },
  Serious: { up: "", down: "" },
  Jolly:   { up: "speed", down: "specialAttack" },
  Naive:   { up: "speed", down: "specialDefense" },
  Modest:  { up: "specialAttack", down: "attack" },
  Mild:    { up: "specialAttack", down: "defense" },
  Quiet:   { up: "specialAttack", down: "speed" },
  Bashful: { up: "", down: "" },
  Rash:    { up: "specialAttack", down: "specialDefense" },
  Calm:    { up: "specialDefense", down: "attack" },
  Gentle:  { up: "specialDefense", down: "defense" },
  Sassy:   { up: "specialDefense", down: "speed" },
  Careful: { up: "specialDefense", down: "specialAttack" },
  Quirky:  { up: "", down: "" },
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP", attack: "Attack", defense: "Defense",
  specialAttack: "Sp. Atk", specialDefense: "Sp. Def", speed: "Speed",
};

const STAT_COLORS: Record<string, string> = {
  hp: "#ff5555", attack: "#f08030", defense: "#6890f0",
  specialAttack: "#f85888", specialDefense: "#78c850", speed: "#f8d030",
};

function calcIV(stat: string, statValue: number, baseStat: number, ev: number, level: number, nature: string): number {
  const natureMult = NATURES[nature]?.up === stat ? 1.1 : NATURES[nature]?.down === stat ? 0.9 : 1;
  if (stat === "hp") {
    // HP formula: ((2*Base + IV + EV/4) * Level / 100) + Level + 10
    const iv = Math.round((((statValue - level - 10) * 100) / level - 2 * baseStat - ev / 4));
    return Math.max(0, Math.min(31, iv));
  }
  // Other stats: ((2*Base + IV + EV/4) * Level / 100 + 5) * nature
  const iv = Math.round((((statValue / natureMult - 5) * 100) / level - 2 * baseStat - ev / 4));
  return Math.max(0, Math.min(31, iv));
}

function ivGrade(iv: number): { label: string; color: string } {
  if (iv === 31) return { label: "Max ★★★", color: "text-yellow-500" };
  if (iv >= 28) return { label: "Excellent ★★", color: "text-green-500" };
  if (iv >= 20) return { label: "Good ★", color: "text-blue-500" };
  if (iv >= 10) return { label: "Fair", color: "text-slate-500" };
  return { label: "Poor", color: "text-red-500" };
}

const DEFAULT_BASE = { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 };
const DEFAULT_STATS = { hp: 50, attack: 45, defense: 45, specialAttack: 65, specialDefense: 65, speed: 40 };
const DEFAULT_EVS = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 };
const STAT_ORDER = ["hp","attack","defense","specialAttack","specialDefense","speed"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokémon IV Calculator | Individual Values Stat Tracker",
  "description": "Calculate your Pokémon's hidden Individual Values (IVs) from its in-game stats, level, EVs and nature. Critical tool for competitive breeding and battling.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/iv-calculator"
};

export default function IVCalculatorPage() {
  const [level, setLevel] = useState(50);
  const [nature, setNature] = useState("Hardy");
  const [baseStats, setBaseStats] = useState({ ...DEFAULT_BASE });
  const [actualStats, setActualStats] = useState({ ...DEFAULT_STATS });
  const [evs, setEvs] = useState({ ...DEFAULT_EVS });
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [pokemonName, setPokemonName] = useState("Bulbasaur");
  const [pokemonId, setPokemonId] = useState(1);

  const fetchPokemon = async () => {
    if (!pokemonSearch.trim()) return;
    setLoadingPokemon(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch.toLowerCase().trim()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const newBase: any = {};
      data.stats.forEach((s: any) => {
        const key = s.stat.name.replace("-","").replace("special-attack","specialAttack").replace("special-defense","specialDefense");
        newBase[key] = s.base_stat;
      });
      setBaseStats(newBase);
      setPokemonName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
      setPokemonId(data.id);
    } catch {
      alert("Pokémon not found!");
    } finally {
      setLoadingPokemon(false);
    }
  };

  const ivs = STAT_ORDER.reduce((acc, stat) => {
    acc[stat] = calcIV(stat, (actualStats as any)[stat], (baseStats as any)[stat], (evs as any)[stat], level, nature);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">📊 IV <span className="text-poke-red italic">Calculator</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Calculate your Pokémon's Individual Values (IVs) from its in-game stats, level, EVs and nature.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Pokémon search */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <h3 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">Load Base Stats</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Pokémon name or ID (e.g. pikachu)"
              value={pokemonSearch}
              onChange={e => setPokemonSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchPokemon()}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-poke-red"
            />
            <button onClick={fetchPokemon} disabled={loadingPokemon} className="px-5 py-2.5 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 transition-colors text-sm disabled:opacity-60">
              {loadingPokemon ? "..." : "Load"}
            </button>
          </div>
          {pokemonName && <p className="text-xs text-slate-400 mt-2">Currently using: <span className="font-black text-slate-700">{pokemonName} (#{pokemonId})</span></p>}
        </div>

        {/* Level & Nature */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">Level</label>
            <input type="number" min={1} max={100} value={level} onChange={e => setLevel(Number(e.target.value))}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-lg font-black text-slate-800 outline-none focus:border-poke-red" />
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">Nature</label>
            <select value={nature} onChange={e => setNature(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-slate-800 outline-none focus:border-poke-red">
              {Object.keys(NATURES).map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Stats Input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <h3 className="font-black text-slate-900 mb-5 text-sm uppercase tracking-wider">In-Game Stats</h3>
          <div className="space-y-3">
            {STAT_ORDER.map(stat => (
              <div key={stat} className="grid grid-cols-4 gap-2 items-center">
                <label className="text-xs font-black text-slate-500 uppercase col-span-1" style={{color: STAT_COLORS[stat]}}>{STAT_LABELS[stat]}</label>
                <div className="col-span-1">
                  <input type="number" placeholder="Stat" value={(actualStats as any)[stat]}
                    onChange={e => setActualStats(prev => ({...prev, [stat]: Number(e.target.value)}))}
                    className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-black text-slate-700 text-center outline-none focus:border-poke-red" />
                </div>
                <div className="col-span-1">
                  <input type="number" placeholder="EV (0-252)" min={0} max={252} value={(evs as any)[stat]}
                    onChange={e => setEvs(prev => ({...prev, [stat]: Number(e.target.value)}))}
                    className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-500 text-center outline-none focus:border-poke-red" />
                </div>
                <div className="col-span-1 text-center">
                  <span className="text-xs font-black" style={{color: STAT_COLORS[stat]}}>Base: {(baseStats as any)[stat]}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-300 mt-3">Columns: Actual Stat | EVs | Base Stat</p>
        </div>

        {/* Results */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-black text-slate-900 mb-5 text-sm uppercase tracking-wider">📊 Calculated IVs</h3>
          <div className="space-y-3">
            {STAT_ORDER.map(stat => {
              const iv = ivs[stat];
              const { label, color } = ivGrade(iv);
              const pct = (iv / 31) * 100;
              return (
                <div key={stat} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-black uppercase" style={{color: STAT_COLORS[stat]}}>{STAT_LABELS[stat]}</span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{width:`${pct}%`, backgroundColor: STAT_COLORS[stat]}} />
                  </div>
                  <span className="w-7 text-center font-black text-slate-800 text-sm">{iv}</span>
                  <span className={`text-[10px] font-black w-20 text-right ${color}`}>{label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 flex items-start gap-1"><Info className="w-3 h-3 mt-0.5 flex-shrink-0" /> IVs are estimates based on the formula. Exact values may vary ±1 due to rounding.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
