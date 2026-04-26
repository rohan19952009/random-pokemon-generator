"use client";

import { useState } from "react";
import { TrendingUp, Info } from "lucide-react";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pokémon Catch Rate Calculator",
  "description": "Determine your probability of catching any Pokémon using Poké Balls, Great Balls, Ultra Balls, and specialty variants across every game generation.",
  "applicationCategory": "Tool",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/tools/catch-rate"
};

// Catch rates for common Pokémon (base catch rates from official data)
const CATCH_RATES: Record<string, number> = {
  caterpie: 255, pidgey: 255, rattata: 255, zubat: 255, magikarp: 255,
  weedle: 255, ekans: 255, sandshrew: 255, clefairy: 150, jigglypuff: 170,
  psyduck: 190, growlithe: 190, abra: 200, machop: 180, geodude: 255,
  slowpoke: 190, gastly: 190, onix: 45, drowzee: 200, voltorb: 190,
  krabby: 225, exeggcute: 90, cubone: 190, lickitung: 45, koffing: 190,
  rhyhorn: 120, chansey: 30, kangaskhan: 45, goldeen: 225, staryu: 225,
  mr_mime: 45, scyther: 45, jynx: 45, electabuzz: 45, magmar: 45,
  pinsir: 45, tauros: 45, eevee: 45, porygon: 45, omanyte: 45,
  kabuto: 45, aerodactyl: 45, snorlax: 25, articuno: 3, zapdos: 3, moltres: 3,
  dratini: 45, dragonair: 45, dragonite: 45, mewtwo: 3, mew: 45,
  pikachu: 190, raichu: 75, bulbasaur: 45, ivysaur: 45, venusaur: 45,
  charmander: 45, charmeleon: 45, charizard: 45, squirtle: 45, blastoise: 45,
  caterpie_stat: 255, butterfree: 120, beedrill: 45, pidgeot: 45,
  nidoran_f: 235, nidoran_m: 235, nidoking: 45, nidoqueen: 45,
  vulpix: 190, ninetales: 75, wigglytuff: 50, oddish: 255, gloom: 120,
  vileplume: 45, meowth: 255, persian: 90, poliwag: 255, poliwhirl: 120,
  poliwrath: 45, alakazam: 50, machamp: 45, weepinbell: 120, victreebel: 45,
  tentacruel: 60, graveler: 120, golem: 45, ponyta: 190, rapidash: 60,
  slowbro: 75, magneton: 60, farfetchd: 45, doduo: 190, dodrio: 45,
  seel: 190, dewgong: 75, grimer: 190, muk: 75, shellder: 190, cloyster: 60,
  gengar: 45, haunter: 90, electrode: 60, exeggutor: 45, marowak: 75,
  hitmonlee: 45, hitmonchan: 45, starmie: 60, weezing: 60, rhydon: 60,
  blissey: 30, heracross: 45, sneasel: 60, teddiursa: 120, ursaring: 60,
  slugma: 190, magcargo: 75, swinub: 225, piloswine: 75, corsola: 60,
  remoraid: 190, octillery: 75, delibird: 225, mantine: 25, skarmory: 25,
  houndour: 120, houndoom: 45, kingdra: 45, phanpy: 120, donphan: 60,
  porygon2: 45, stantler: 45, smeargle: 45, tyrogue: 75, hitmontop: 45,
  smoochum: 45, elekid: 45, magby: 45, miltank: 45, raikou: 3, entei: 3,
  suicune: 3, larvitar: 45, pupitar: 45, tyranitar: 45, lugia: 3, hohoh: 3,
  celebi: 45, treecko: 45, torchic: 45, mudkip: 45, ralts: 235,
  gardevoir: 45, bagon: 45, salamence: 45, beldum: 3, metagross: 3,
  regirock: 3, regice: 3, registeel: 3, latias: 3, latios: 3, kyogre: 5,
  groudon: 5, rayquaza: 45, jirachi: 3, deoxys: 3, lucario: 45, garchomp: 45,
  dialga: 3, palkia: 3, giratina: 3, darkrai: 3, arceus: 3, reshiram: 3,
  zekrom: 3, kyurem: 3, xerneas: 45, yveltal: 45, zygarde: 3,
  greninja: 45, aegislash: 45, sylveon: 45, zacian: 10, zamazenta: 10,
};

const POKEBALLS = [
  { name: "Poké Ball", multiplier: 1, emoji: "🔴" },
  { name: "Great Ball", multiplier: 1.5, emoji: "🔵" },
  { name: "Ultra Ball", multiplier: 2, emoji: "⚫" },
  { name: "Master Ball", multiplier: 255, emoji: "🟣" },
  { name: "Net Ball", multiplier: 3.5, emoji: "🔵", note: "vs Water/Bug" },
  { name: "Dive Ball", multiplier: 3.5, emoji: "💙", note: "in water" },
  { name: "Dusk Ball", multiplier: 3, emoji: "⚫", note: "at night/cave" },
  { name: "Quick Ball", multiplier: 5, emoji: "🟡", note: "1st turn" },
  { name: "Timer Ball", multiplier: 4, emoji: "⚪", note: "30+ turns" },
  { name: "Repeat Ball", multiplier: 3.5, emoji: "🔴", note: "if owned before" },
  { name: "Heavy Ball", multiplier: 2, emoji: "⚫", note: "heavy Pokémon" },
];

const STATUS_MULTIPLIERS: Record<string, number> = {
  none: 1, sleep: 2.5, frozen: 2.5, paralyzed: 1.5, poisoned: 1.5, burned: 1.5,
};

function calcCatchRate(catchRate: number, ballMultiplier: number, hpPercent: number, statusMult: number): number {
  // Simplified catch rate formula from Gen 7+
  const a = ((3 * 255 - 2 * (hpPercent / 100) * 255) / (3 * 255)) * catchRate * ballMultiplier * statusMult;
  const b = Math.min(a, 255);
  const probability = (b / 255) * 100;
  return Math.min(100, Math.max(0, probability));
}

export default function CatchRateCalculatorPage() {
  const [pokemonInput, setPokemonInput] = useState("pikachu");
  const [catchRate, setCatchRate] = useState(190);
  const [pokemonName, setPokemonName] = useState("Pikachu");
  const [pokemonId, setPokemonId] = useState(25);
  const [loading, setLoading] = useState(false);
  const [selectedBall, setSelectedBall] = useState(POKEBALLS[0]);
  const [hpPercent, setHpPercent] = useState(100);
  const [status, setStatus] = useState("none");

  const fetchPokemon = async () => {
    const key = pokemonInput.toLowerCase().trim().replace(" ", "_");
    if (CATCH_RATES[key] !== undefined) {
      setCatchRate(CATCH_RATES[key]);
      setPokemonName(pokemonInput.charAt(0).toUpperCase() + pokemonInput.slice(1));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonInput.toLowerCase().trim()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCatchRate(data.capture_rate);
      setPokemonName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
      // Get ID
      const pRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput.toLowerCase().trim()}`);
      if (pRes.ok) { const pd = await pRes.json(); setPokemonId(pd.id); }
    } catch {
      alert("Pokémon not found! Try another name.");
    } finally {
      setLoading(false);
    }
  };

  const probability = calcCatchRate(catchRate, selectedBall.multiplier, hpPercent, STATUS_MULTIPLIERS[status]);
  const shakesNeeded = Math.max(1, Math.ceil(100 / probability));

  const getColor = (p: number) => p >= 80 ? "text-green-500" : p >= 50 ? "text-yellow-500" : p >= 25 ? "text-orange-500" : "text-red-500";
  const getBg = (p: number) => p >= 80 ? "bg-green-500" : p >= 50 ? "bg-yellow-400" : p >= 25 ? "bg-orange-500" : "bg-red-500";

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 md:py-12 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">🎯 Catch Rate <span className="text-poke-red italic">Calculator</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Find the exact catch probability for any Pokémon with any Poké Ball and status condition.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Pokémon search */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <h2 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">Search Pokémon</h2>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter Pokémon name (e.g. pikachu, mewtwo)"
              value={pokemonInput} onChange={e => setPokemonInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchPokemon()}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-poke-red"
            />
            <button onClick={fetchPokemon} disabled={loading} className="px-5 py-2.5 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 text-sm disabled:opacity-60">
              {loading ? "..." : "Search"}
            </button>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-xs text-slate-500">Base catch rate: <span className="font-black text-slate-800">{catchRate}/255</span> for <span className="font-black capitalize">{pokemonName}</span></p>
            {catchRate < 10 && <span className="text-[9px] bg-red-100 text-red-600 font-black px-2 py-0.5 rounded-full uppercase">LEGENDARY - Very Hard!</span>}
            {catchRate >= 200 && <span className="text-[9px] bg-green-100 text-green-600 font-black px-2 py-0.5 rounded-full uppercase">Common - Easy Catch!</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* HP */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <h3 className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">❤️ HP Remaining</h3>
            <input type="range" min={1} max={100} value={hpPercent} onChange={e => setHpPercent(Number(e.target.value))}
              className="w-full accent-poke-red" />
            <p className="text-center text-2xl font-black text-slate-800 mt-1">{hpPercent}%</p>
            <p className="text-[10px] text-center text-slate-400">Lower HP = higher catch chance</p>
          </div>

          {/* Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <h3 className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">💤 Status</h3>
            <div className="space-y-1.5">
              {Object.keys(STATUS_MULTIPLIERS).map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-colors ${status === s ? "bg-poke-red text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                >
                  {s === "none" ? "No Status" : s} {STATUS_MULTIPLIERS[s] > 1 ? `(×${STATUS_MULTIPLIERS[s]})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Ball selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <h3 className="font-black text-slate-900 mb-2 text-xs uppercase tracking-wider">⚾ Poké Ball</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {POKEBALLS.map(ball => (
                <button key={ball.name} onClick={() => setSelectedBall(ball)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-black transition-colors flex items-center gap-2 ${selectedBall.name === ball.name ? "bg-poke-red text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                >
                  <span>{ball.emoji}</span>
                  <span>{ball.name}</span>
                  {ball.note && <span className="text-[8px] opacity-70 ml-auto">{ball.note}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 text-center shadow-lg">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Catch Probability</p>
          <div className={`text-7xl font-black mb-2 ${getColor(probability)}`}>
            {probability.toFixed(1)}%
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div className={`h-full rounded-full transition-all duration-500 ${getBg(probability)}`} style={{width:`${probability}%`}} />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-slate-800">~{shakesNeeded}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase">Avg. tries needed</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{selectedBall.emoji}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase">{selectedBall.name}</p>
            </div>
            <div>
              <p className="text-2xl font-black" style={{color: probability >= 50 ? "#22c55e" : "#ef4444"}}>
                {probability >= 100 ? "✅ Sure" : probability >= 80 ? "😊 Easy" : probability >= 50 ? "😐 Fair" : probability >= 25 ? "😰 Hard" : "😱 Rare"}
              </p>
              <p className="text-[10px] text-slate-400 font-black uppercase">Difficulty</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-300 mt-4 flex items-center justify-center gap-1">
            <Info className="w-3 h-3" /> Using simplified Gen 7+ formula. Actual results may vary.
          </p>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-black text-blue-800 mb-3 text-sm">💡 Pro Tips to Maximize Catch Rate</h3>
          <ul className="space-y-1.5 text-xs text-blue-700 font-medium">
            <li>• Inflict <strong>Sleep or Freeze</strong> status for a 2.5× catch boost</li>
            <li>• Reduce HP to <strong>1–10%</strong> (red zone) for a massive probability increase</li>
            <li>• Use <strong>Quick Ball</strong> on turn 1 — it has 5× multiplier!</li>
            <li>• <strong>Timer Ball</strong> becomes 4× multiplier after 30+ turns</li>
            <li>• <strong>Dusk Ball</strong> gives 3× when used in caves or at night</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
