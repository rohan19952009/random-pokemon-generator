"use client";

import { useState } from "react";
import { GitCompare, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokémon Compare Tool - Stat vs Stat",
  "description": "Compare two Pokémon side-by-side! Analyze base stats, type matchings, and differences to decide which Pokémon is better for your team.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/compare"
};

interface PokemonStats {
  id: number; name: string; types: string[];
  hp: number; attack: number; defense: number;
  specialAttack: number; specialDefense: number; speed: number;
  total: number;
}

const STAT_ORDER = ["hp","attack","defense","specialAttack","specialDefense","speed"] as const;
const STAT_LABELS: Record<string, string> = { hp:"HP", attack:"Attack", defense:"Defense", specialAttack:"Sp. Atk", specialDefense:"Sp. Def", speed:"Speed" };
const STAT_COLORS: Record<string, string> = { hp:"#ff5555", attack:"#f08030", defense:"#6890f0", specialAttack:"#f85888", specialDefense:"#78c850", speed:"#f8d030" };
const TYPE_COLORS: Record<string, string> = { normal:"#A8A77A",fire:"#EE8130",water:"#6390F0",electric:"#F7D02C",grass:"#7AC74C",ice:"#96D9D6",fighting:"#C22E28",poison:"#A33EA1",ground:"#E2BF65",flying:"#A98FF3",psychic:"#F95587",bug:"#A6B91A",rock:"#B6A136",ghost:"#735797",dragon:"#6F35FC",dark:"#705746",steel:"#B7B7CE",fairy:"#D685AD" };

const POPULAR = [
  {id:25,name:"pikachu"},{id:6,name:"charizard"},{id:150,name:"mewtwo"},
  {id:149,name:"dragonite"},{id:448,name:"lucario"},{id:282,name:"gardevoir"},
  {id:445,name:"garchomp"},{id:248,name:"tyranitar"},{id:384,name:"rayquaza"},
];

async function fetchStats(nameOrId: string): Promise<PokemonStats> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase().trim()}`);
  if (!res.ok) throw new Error("Not found");
  const data = await res.json();
  const s = data.stats;
  return {
    id: data.id, name: data.name,
    types: data.types.map((t: any) => t.type.name),
    hp: s[0].base_stat, attack: s[1].base_stat, defense: s[2].base_stat,
    specialAttack: s[3].base_stat, specialDefense: s[4].base_stat, speed: s[5].base_stat,
    total: s.reduce((sum: number, st: any) => sum + st.base_stat, 0),
  };
}

export default function ComparePage() {
  const [pokemonA, setPokemonA] = useState<PokemonStats | null>(null);
  const [pokemonB, setPokemonB] = useState<PokemonStats | null>(null);
  const [inputA, setInputA] = useState("pikachu");
  const [inputB, setInputB] = useState("charizard");
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [errorA, setErrorA] = useState("");
  const [errorB, setErrorB] = useState("");

  const load = async (which: "A"|"B") => {
    const input = which === "A" ? inputA : inputB;
    const setLoading = which === "A" ? setLoadingA : setLoadingB;
    const setError = which === "A" ? setErrorA : setErrorB;
    const setPokemon = which === "A" ? setPokemonA : setPokemonB;
    setLoading(true); setError("");
    try {
      const data = await fetchStats(input);
      setPokemon(data);
    } catch {
      setError("Pokémon not found!");
    } finally {
      setLoading(false);
    }
  };

  const loadBoth = async () => {
    await Promise.all([load("A"), load("B")]);
  };

  const quickPick = async (p: {id:number,name:string}, which: "A"|"B") => {
    if (which === "A") { setInputA(p.name); }
    else { setInputB(p.name); }
    const setLoading = which === "A" ? setLoadingA : setLoadingB;
    const setPokemon = which === "A" ? setPokemonA : setPokemonB;
    setLoading(true);
    try { const data = await fetchStats(p.name); setPokemon(data); }
    catch {}
    finally { setLoading(false); }
  };

  const getStat = (p: PokemonStats, stat: string): number => (p as any)[stat];

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">⚖️ Pokémon <span className="text-poke-red italic">Compare</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Compare the base stats of any two Pokémon side-by-side. Find out who wins each stat!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Search inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {(["A","B"] as const).map(which => (
            <div key={which} className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pokémon {which}</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Name or ID" value={which === "A" ? inputA : inputB}
                  onChange={e => which === "A" ? setInputA(e.target.value) : setInputB(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && load(which)}
                  className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-poke-red min-w-0"
                />
                <button onClick={() => load(which)} disabled={which === "A" ? loadingA : loadingB}
                  className="px-3 py-2 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 text-xs disabled:opacity-60"
                >
                  {(which === "A" ? loadingA : loadingB) ? "..." : "Go"}
                </button>
              </div>
              {(which === "A" ? errorA : errorB) && <p className="text-[10px] text-red-500 font-bold mt-1">{which === "A" ? errorA : errorB}</p>}
            </div>
          ))}
        </div>

        <button onClick={loadBoth} className="w-full mb-6 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-700 transition-colors active:scale-95 text-sm uppercase tracking-wider">
          <GitCompare className="w-4 h-4" /> Compare Now
        </button>

        {/* Quick picks */}
        <div className="mb-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Popular Picks</p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map(p => (
              <div key={p.id} className="flex gap-1">
                <button onClick={() => quickPick(p,"A")} className="flex items-center gap-1 px-2 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-black hover:bg-blue-100 transition-colors capitalize">A: {p.name}</button>
                <button onClick={() => quickPick(p,"B")} className="flex items-center gap-1 px-2 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-black hover:bg-red-100 transition-colors capitalize">B: {p.name}</button>
              </div>
            ))}
          </div>
        </div>

        {(!pokemonA && !pokemonB) && (
          <div className="text-center py-16 text-slate-300">
            <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-slate-400 text-lg">Enter two Pokémon names to compare them!</p>
          </div>
        )}

        {(pokemonA || pokemonB) && (
          <>
            {/* Pokémon headers */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[pokemonA, pokemonB].map((p, idx) => (
                <div key={idx} className={`bg-white border-2 rounded-2xl p-5 text-center ${p ? "border-slate-200" : "border-dashed border-slate-200"}`}>
                  {p ? (
                    <>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                        alt={p.name} width={100} height={100} className="object-contain mx-auto drop-shadow-xl" loading="lazy"
                      />
                      <h2 className="font-black capitalize text-slate-800 mt-2">{p.name}</h2>
                      <p className="text-xs text-slate-400 mb-2">#{String(p.id).padStart(3,"0")}</p>
                      <div className="flex gap-1 justify-center flex-wrap">
                        {p.types.map(t => <span key={t} className="text-[9px] font-black uppercase text-white px-2 py-0.5 rounded-full" style={{backgroundColor:TYPE_COLORS[t]||"#999"}}>{t}</span>)}
                      </div>
                      <p className="text-xs font-black text-slate-500 mt-3">Total: <span className="text-slate-800">{p.total}</span></p>
                    </>
                  ) : (
                    <div className="py-8 text-slate-300">
                      <p className="font-bold">No Pokémon {idx === 0 ? "A" : "B"}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Total comparison */}
            {pokemonA && pokemonB && (
              <div className="bg-slate-900 text-white rounded-2xl p-4 mb-6 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Base Stat Total</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-2xl font-black" style={{color: pokemonA.total >= pokemonB.total ? "#22c55e" : "#ef4444"}}>{pokemonA.total}</span>
                  <span className="text-slate-500 font-black">vs</span>
                  <span className="text-2xl font-black" style={{color: pokemonB.total >= pokemonA.total ? "#22c55e" : "#ef4444"}}>{pokemonB.total}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {pokemonA.total > pokemonB.total ? `${pokemonA.name} wins by ${pokemonA.total - pokemonB.total} points!` :
                   pokemonB.total > pokemonA.total ? `${pokemonB.name} wins by ${pokemonB.total - pokemonA.total} points!` : "Tie!"}
                </p>
              </div>
            )}

            {/* Stat bars */}
            {pokemonA && pokemonB && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
                {STAT_ORDER.map(stat => {
                  const valA = getStat(pokemonA, stat);
                  const valB = getStat(pokemonB, stat);
                  const max = Math.max(valA, valB, 255);
                  const pctA = (valA / 255) * 100;
                  const pctB = (valB / 255) * 100;
                  const winnerA = valA > valB;
                  const winnerB = valB > valA;
                  return (
                    <div key={stat}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-black text-sm" style={{ color: STAT_COLORS[stat] }}>
                          {winnerA ? "🏆" : ""} {valA}
                        </span>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{STAT_LABELS[stat]}</span>
                        <span className="font-black text-sm" style={{ color: STAT_COLORS[stat] }}>
                          {valB} {winnerB ? "🏆" : ""}
                        </span>
                      </div>
                      <div className="flex gap-1 h-3">
                        {/* A bar (right-aligned) */}
                        <div className="flex-1 flex justify-end items-center">
                          <div className="h-full bg-slate-100 rounded-l-full overflow-hidden w-full flex justify-end">
                            <div className="h-full rounded-l-full" style={{ width:`${pctA}%`, backgroundColor: STAT_COLORS[stat], opacity: winnerA || valA === valB ? 1 : 0.4 }} />
                          </div>
                        </div>
                        <div className="w-0.5 bg-slate-300 flex-shrink-0" />
                        {/* B bar */}
                        <div className="flex-1 flex items-center">
                          <div className="h-full bg-slate-100 rounded-r-full overflow-hidden w-full">
                            <div className="h-full rounded-r-full" style={{ width:`${pctB}%`, backgroundColor: STAT_COLORS[stat], opacity: winnerB || valA === valB ? 1 : 0.4 }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
