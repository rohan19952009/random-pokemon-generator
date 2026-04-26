"use client";

import { useState } from "react";
import { Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ShinyMethod {
  name: string;
  game: string;
  baseOdds: number;
  withCharm: number;
  description: string;
  emoji: string;
  tips: string;
}

const METHODS: ShinyMethod[] = [
  { name: "Full Odds (No method)", game: "All Games", baseOdds: 1/4096, withCharm: 3/4096, description: "Standard encounter without any shiny hunting method.", emoji: "🎲", tips: "Save before encounter, soft-reset if not shiny." },
  { name: "Masuda Method", game: "Gen 4+", baseOdds: 6/4096, withCharm: 8/4096, description: "Breed two Pokémon from games in different real-world languages.", emoji: "🌍", tips: "Use a foreign Ditto from the GTS or trading for easiest setup." },
  { name: "Chain Fishing", game: "Gen 6 (XY)", baseOdds: 300/4096, withCharm: 300/4096, description: "Fish in the same spot repeatedly without breaking the chain.", emoji: "🎣", tips: "Don't move from the spot. Use a Pokémon with Suction Cups ability." },
  { name: "DexNav Chaining", game: "Gen 6 (ORAS)", baseOdds: 40/4096, withCharm: 43/4096, description: "Sneak up on wild Pokémon and build up DexNav search chains.", emoji: "📟", tips: "Chain to 40+ for best odds. Crouch in tall grass to avoid breaking chain." },
  { name: "SOS Chaining", game: "Gen 7 (SM/USUM)", baseOdds: 1/683, withCharm: 1/512, description: "Force a Pokémon to call allies by chaining SOS battles to 31+.", emoji: "📞", tips: "Use a Pokémon with Harvest + Leppa Berry to never run out of PP." },
  { name: "Poké Radar Chaining", game: "Gen 4 (DPPt)", baseOdds: 1/200, withCharm: 1/200, description: "Build a chain of 40 with the Poké Radar in grass for best odds.", emoji: "📡", tips: "Always enter the shaking patch that is farthest from you." },
  { name: "Random Encounter (Charm)", game: "Gen 6+", baseOdds: 1/4096, withCharm: 3/4096, description: "Standard wild encounter with Shiny Charm active.", emoji: "✨", tips: "Complete the Pokédex to get the Shiny Charm from the game director." },
  { name: "Horde Encounter", game: "Gen 6 (XY/ORAS)", baseOdds: 5/4096, withCharm: 15/4096, description: "5 Pokémon appear at once, giving 5× the chances per encounter.", emoji: "👥", tips: "Use Sweet Scent to trigger hordes. Bring a Pokémon with Pressure." },
  { name: "Consecutive Outbreaks", game: "Gen 9 (SV)", baseOdds: 1/100, withCharm: 1/50, description: "Battle or catch 60 of the same species in Mass Outbreaks.", emoji: "🌊", tips: "Battle 60 in the outbreak, then save and reload for best spawn odds." },
];

export default function ShinyOddsPage() {
  const [encounters, setEncounters] = useState(100);
  const [useCharm, setUseCharm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0]);

  const odds = useCharm ? selectedMethod.withCharm : selectedMethod.baseOdds;
  const oddsDisplay = Math.round(1 / odds);
  const probability = (1 - Math.pow(1 - odds, encounters)) * 100;
  const expectedEncounters = Math.round(1 / odds);

  const getShinyEmoji = (p: number) => p >= 90 ? "🌟" : p >= 50 ? "✨" : p >= 25 ? "⭐" : p >= 10 ? "💫" : "🎲";
  const getColor = (p: number) => p >= 80 ? "#22c55e" : p >= 50 ? "#eab308" : p >= 25 ? "#f97316" : "#ef4444";

  return (
    <div className="w-full pb-20">
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">✨ Shiny Odds <span className="text-poke-red italic">Calculator</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Calculate your exact shiny Pokémon hunting probability for every method across all games.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Shiny Charm Toggle */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-black text-yellow-900 text-sm">✨ Shiny Charm</p>
            <p className="text-xs text-yellow-700">Obtained by completing the Pokédex</p>
          </div>
          <button onClick={() => setUseCharm(c => !c)}
            className={`w-14 h-7 rounded-full transition-colors relative ${useCharm ? "bg-yellow-400" : "bg-slate-300"}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform shadow ${useCharm ? "translate-x-7" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Method selector */}
        <div className="mb-6">
          <h2 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">Select Hunting Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {METHODS.map(m => (
              <button key={m.name} onClick={() => setSelectedMethod(m)}
                className={`flex items-start gap-2 p-3 rounded-xl border text-left transition-all ${selectedMethod.name === m.name ? "bg-poke-red text-white border-poke-red" : "bg-white border-slate-200 hover:border-poke-red/40 text-slate-700"}`}
              >
                <span className="text-lg flex-shrink-0">{m.emoji}</span>
                <div>
                  <p className="font-black text-xs">{m.name}</p>
                  <p className={`text-[9px] font-bold ${selectedMethod.name === m.name ? "text-white/70" : "text-slate-400"}`}>{m.game}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected method info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">{selectedMethod.emoji}</span>
            <div>
              <h3 className="font-black text-slate-900">{selectedMethod.name}</h3>
              <p className="text-xs text-slate-500">{selectedMethod.game}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-3">{selectedMethod.description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs font-black text-blue-800">💡 Tip: {selectedMethod.tips}</p>
          </div>
        </div>

        {/* Encounter counter */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <h3 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">How many encounters?</h3>
          <div className="flex gap-3 items-center">
            <input type="range" min={1} max={10000} value={encounters} onChange={e => setEncounters(Number(e.target.value))} className="flex-1 accent-poke-red" />
            <input type="number" min={1} max={99999} value={encounters} onChange={e => setEncounters(Number(e.target.value))}
              className="w-24 border border-slate-200 rounded-xl px-3 py-2 text-sm font-black text-slate-700 text-center outline-none focus:border-poke-red"
            />
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {[50,100,200,500,1000,4096].map(n => (
              <button key={n} onClick={() => setEncounters(n)} className={`px-3 py-1.5 rounded-full text-xs font-black transition-colors ${encounters === n ? "bg-poke-red text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {n.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 text-center shadow-lg">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">After {encounters.toLocaleString()} encounters</p>
          <div className="text-7xl mb-2">{getShinyEmoji(probability)}</div>
          <div className="text-6xl font-black mb-3" style={{color: getColor(probability)}}>
            {probability < 0.01 ? "<0.01" : probability > 99.99 ? ">99.99" : probability.toFixed(2)}%
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div className="h-full rounded-full transition-all duration-500" style={{width:`${Math.min(100,probability)}%`, backgroundColor: getColor(probability)}} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xl font-black text-slate-800">1/{oddsDisplay.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Base Odds</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xl font-black text-slate-800">{expectedEncounters.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Expected Avg</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xl font-black" style={{color: useCharm ? "#eab308" : "#94a3b8"}}>{useCharm ? "✨ ON" : "OFF"}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Shiny Charm</p>
            </div>
          </div>
        </div>

        {/* All methods comparison */}
        <div className="mt-8">
          <h3 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-wider">📊 All Methods Comparison</h3>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-black text-slate-600 uppercase tracking-wider">Method</th>
                  <th className="text-right px-4 py-3 font-black text-slate-600 uppercase tracking-wider">Odds</th>
                  <th className="text-right px-4 py-3 font-black text-slate-600 uppercase tracking-wider">With Charm</th>
                </tr>
              </thead>
              <tbody>
                {METHODS.map((m, i) => (
                  <tr key={m.name} className={`border-b border-slate-100 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                    <td className="px-4 py-3 font-bold text-slate-700">{m.emoji} {m.name}</td>
                    <td className="px-4 py-3 text-right font-black text-slate-800">1/{Math.round(1/m.baseOdds).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-black text-yellow-600">1/{Math.round(1/m.withCharm).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
