"use client";

import { useState, useEffect } from "react";
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, Info, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokémon Type Weakness & Resistance Calculator",
  "description": "Calculate exact type weaknesses, resistances, and immunities for any single or dual-type Pokémon. Gen 9 updated.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/type-weakness"
};

const TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
  "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
  grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
  ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
  steel: "#B7B7CE", fairy: "#D685AD"
};

// Defensive Type Chart (Multipliers for damage taken)
const TYPE_CHART: Record<string, Record<string, number>> = {
  normal: { fighting: 2, ghost: 0 },
  fire: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, ice: 0.5, bug: 0.5, steel: 0.5, fairy: 0.5 },
  water: { electric: 2, grass: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
  electric: { ground: 2, electric: 0.5, flying: 0.5, steel: 0.5 },
  grass: { fire: 2, ice: 2, poison: 2, flying: 2, bug: 2, water: 0.5, electric: 0.5, grass: 0.5, ground: 0.5 },
  ice: { fire: 2, fighting: 2, rock: 2, steel: 2, ice: 0.5 },
  fighting: { flying: 2, psychic: 2, fairy: 2, bug: 0.5, rock: 0.5, dark: 0.5 },
  poison: { ground: 2, psychic: 2, fighting: 0.5, poison: 0.5, grass: 0.5, bug: 0.5, fairy: 0.5 },
  ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5, electric: 0.0 },
  flying: { electric: 2, ice: 2, rock: 2, grass: 0.5, fighting: 0.5, bug: 0.5, ground: 0.0 },
  psychic: { bug: 2, ghost: 2, dark: 2, fighting: 0.5, psychic: 0.5 },
  bug: { fire: 2, flying: 2, rock: 2, fighting: 0.5, grass: 0.5, ground: 0.5 },
  rock: { water: 2, grass: 2, fighting: 2, ground: 2, steel: 2, normal: 0.5, fire: 0.5, poison: 0.5, flying: 0.5 },
  ghost: { ghost: 2, dark: 2, poison: 0.5, bug: 0.5, normal: 0.0, fighting: 0.0 },
  dragon: { ice: 2, dragon: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5 },
  dark: { fighting: 2, bug: 2, fairy: 2, ghost: 0.5, dark: 0.5, psychic: 0.0 },
  steel: { fire: 2, fighting: 2, ground: 2, normal: 0.5, grass: 0.5, ice: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, dragon: 0.5, steel: 0.5, fairy: 0.5, poison: 0.0 },
  fairy: { poison: 2, steel: 2, fighting: 0.5, bug: 0.5, dark: 0.5, dragon: 0.0 }
};

export default function TypeWeaknessPage() {
  const [type1, setType1] = useState<string>("fire");
  const [type2, setType2] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState<{ name: string; id: number } | null>(null);

  const calculateMultipliers = () => {
    const mults: Record<string, number> = {};
    TYPES.forEach(t => mults[t] = 1);

    // Apply first type
    const chart1 = TYPE_CHART[type1];
    Object.entries(chart1).forEach(([atkType, mult]) => {
      mults[atkType] *= mult;
    });

    // Apply second type if exists
    if (type2) {
      const chart2 = TYPE_CHART[type2];
      Object.entries(chart2).forEach(([atkType, mult]) => {
        mults[atkType] *= mult;
      });
    }

    return mults;
  };

  const results = calculateMultipliers();
  const sortedByMult = Object.entries(results).reduce((acc, [type, mult]) => {
    if (!acc[mult]) acc[mult] = [];
    acc[mult].push(type);
    return acc;
  }, {} as Record<number, string[]>);

  const fetchPokemon = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setType1(data.types[0].type.name);
      setType2(data.types[1]?.type.name || null);
      setPokemonInfo({ name: data.name, id: data.id });
    } catch {
      alert("Pokémon not found!");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setType1("normal");
    setType2(null);
    setSearch("");
    setPokemonInfo(null);
  }

  const toggleType = (t: string) => {
    if (type1 === t) {
      if (type2) { setType1(type2); setType2(null); }
      return;
    }
    if (type2 === t) { setType2(null); return; }
    if (!type2) setType2(t);
    else setType1(t);
    setPokemonInfo(null);
  };

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-black uppercase tracking-widest mb-4 inline-block transition-colors">← All Tools</Link>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            🛡️ Type Weakness <span className="text-poke-red italic">Calculator</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Instantly analyze any Pokémon's defensive profile. Find weaknesses, resistances, and immunities for battle success.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Input Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Search */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <Search className="w-4 h-4 text-poke-red" /> Load Pokémon Data
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter name (e.g. charizard)"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && fetchPokemon()}
                  className="flex-1 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-poke-red transition-all"
                />
                <button
                  onClick={fetchPokemon}
                  disabled={loading}
                  className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "..." : "Load"}
                </button>
              </div>
            </div>

            {/* Manual Selection */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">Select Types</h3>
                <button onClick={reset} className="text-[10px] font-black text-slate-300 hover:text-poke-red uppercase tracking-widest">Reset</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    style={{
                      backgroundColor: (type1 === t || type2 === t) ? TYPE_COLORS[t] : "white",
                      borderColor: (type1 === t || type2 === t) ? TYPE_COLORS[t] : "#e2e8f0",
                      color: (type1 === t || type2 === t) ? "white" : "#64748b"
                    }}
                    className={`py-2.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Profile */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Defensive Profile</p>
              {pokemonInfo && (
                <div className="mb-4">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
                    alt={pokemonInfo.name} width={120} height={120} className="mx-auto drop-shadow-2xl"
                  />
                  <h2 className="text-xl font-black capitalize mt-2">{pokemonInfo.name}</h2>
                </div>
              )}
              <div className="flex gap-2 justify-center">
                <div className="px-4 py-2 rounded-xl text-xs font-black uppercase" style={{ backgroundColor: TYPE_COLORS[type1] }}>{type1}</div>
                {type2 && <div className="px-4 py-2 rounded-xl text-xs font-black uppercase" style={{ backgroundColor: TYPE_COLORS[type2] }}>{type2}</div>}
              </div>
            </div>
          </div>

          {/* Right: Results Panel */}
          <div className="lg:col-span-7 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-100 rounded-3xl p-5 text-center">
                <ShieldAlert className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-black text-red-600">{ (sortedByMult[4]?.length || 0) + (sortedByMult[2]?.length || 0) }</p>
                <p className="text-[10px] font-black uppercase text-red-400 tracking-wider">Weaknesses</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-3xl p-5 text-center">
                <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-black text-green-600">{ (sortedByMult[0.5]?.length || 0) + (sortedByMult[0.25]?.length || 0) + (sortedByMult[0]?.length || 0) }</p>
                <p className="text-[10px] font-black uppercase text-green-400 tracking-wider">Resistances</p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
              <h3 className="font-black text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> Type Multipliers
              </h3>

              <div className="space-y-6">
                {/* 4x Weak */}
                {sortedByMult[4] && (
                  <div>
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> 4× Ultra Weak
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sortedByMult[4].map(t => <span key={t} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                    </div>
                  </div>
                )}

                {/* 2x Weak */}
                {sortedByMult[2] && (
                  <div>
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">2× Weakness</p>
                    <div className="flex flex-wrap gap-2">
                      {sortedByMult[2].map(t => <span key={t} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                    </div>
                  </div>
                )}

                {/* Neutral */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">1× Neutral Damage</p>
                  <div className="flex flex-wrap gap-1.5 opacity-60">
                    {sortedByMult[1]?.map(t => <span key={t} className="px-2 py-1 rounded-md text-white text-[9px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                  </div>
                </div>

                {/* 0.5x Resistant */}
                {sortedByMult[0.5] && (
                  <div>
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">0.5× Resistant</p>
                    <div className="flex flex-wrap gap-2">
                      {sortedByMult[0.5].map(t => <span key={t} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                    </div>
                  </div>
                )}

                {/* 0.25x Resistant */}
                {sortedByMult[0.25] && (
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full" /> 0.25× Super Resistant
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sortedByMult[0.25].map(t => <span key={t} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                    </div>
                  </div>
                )}

                {/* 0x Immune */}
                {sortedByMult[0] && (
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">0× Immune</p>
                    <div className="flex flex-wrap gap-2">
                      {sortedByMult[0].map(t => <span key={t} className="px-3 py-1.5 rounded-lg text-white text-[10px] font-black uppercase" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose prose-slate max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mb-6 underline decoration-poke-red decoration-4 transition-all hover:decoration-slate-900">How to Use the Pokémon Type Calculator</h2>
          <div className="grid md:grid-cols-2 gap-10 text-slate-600 leading-relaxed">
            <div>
              <p className="mb-4">Our Pokémon Type Weakness Calculator is built for competitive trainers and casual players alike. To find any Pokémon's weaknesses, simply type its name in the search bar or manually select up to two types from the grid.</p>
              <p>Knowing your immunities (0× damage) is the key to safe switching in battles. For example, a <strong>Ground</strong> type is completely immune to <strong>Electric</strong> attacks, giving you a free turn to set up or attack.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="font-black text-slate-900 mb-3 uppercase tracking-wider text-xs">💡 Pro Tip for Trainers</h4>
              <p className="text-sm italic">"Always be wary of 4× weaknesses! Pokémon like Charizard (Fire/Flying) take quadruple damage from Rock moves like Stealth Rock. Use our <strong>Catch Rate Calculator</strong> to secure these heavy hitters during your journey."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
