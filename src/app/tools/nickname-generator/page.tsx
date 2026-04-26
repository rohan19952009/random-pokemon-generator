"use client";

import { useState } from "react";
import { Star, RefreshCw, Copy, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TYPE_NICKNAMES: Record<string, string[]> = {
  fire: ["Blaze","Ember","Cinder","Scorch","Inferno","Vulcan","Ignis","Pyro","Ash","Flicker"],
  water: ["Aqua","Tide","Splash","Marina","Coral","Ripple","Torrent","Brine","Poseidon","Reef"],
  electric: ["Volt","Spark","Zap","Bolt","Static","Thunder","Flash","Amp","Surge","Neon"],
  grass: ["Leaf","Verd","Sprout","Flora","Clover","Mossy","Fern","Sage","Grove","Bloom"],
  ice: ["Frost","Sleet","Crystal","Glacier","Blizzard","Rime","Tundra","Floe","Arctic","Slush"],
  psychic: ["Mystic","Psi","Vision","Oracle","Sage","Zen","Mirage","Enigma","Omen","Aura"],
  dark: ["Shadow","Dusk","Raven","Noir","Shade","Umbra","Phantom","Vex","Gloom","Spectre"],
  ghost: ["Wisp","Haunt","Spook","Banshee","Wraith","Phantom","Specter","Lurch","Dread","Eerie"],
  dragon: ["Drake","Ryuu","Fafnir","Sobek","Smaug","Viper","Coil","Wyvern","Draco","Titan"],
  fighting: ["Titan","Grit","Brawl","Fist","Iron","Valor","Forge","Bruiser","Clash","Roc"],
  normal: ["Buddy","Ace","Pal","Chip","Scout","Dash","Bolt","Rex","Max","Zip"],
  poison: ["Venom","Toxic","Envy","Vex","Rue","Blight","Plague","Sludge","Slime","Noxia"],
  ground: ["Terra","Dusty","Boulder","Grit","Rover","Dune","Clay","Pebble","Rocky","Crater"],
  flying: ["Zephyr","Gale","Cirrus","Nimbus","Breeze","Aero","Swoop","Glide","Talon","Skye"],
  bug: ["Cricket","Chitin","Buzz","Stinger","Larvae","Cocoon","Swarm","Antenna","Exo","Carapace"],
  rock: ["Boulder","Slate","Cobalt","Flint","Obsidian","Granite","Shale","Chunk","Mason","Pebble"],
  steel: ["Chrome","Alloy","Rivet","Forge","Titanium","Axle","Zinc","Sterling","Cobalt","Ferro"],
  fairy: ["Pixie","Luna","Glimmer","Petal","Fable","Celeste","Mochi","Twinkle","Lumi","Blossom"],
};

const SUFFIXES = ["-chan","-kun","-kun","the Great","Jr.","II","X","Prime","Ultra","Hyper","Max","Jr","the Bold","the Swift","Smol","Big Chungus","Bean","Noodle"];
const PREFIXES = ["Lil","Big","Sir","Lady","Captain","Lord","Mega","Ultra","Hyper","Neo","Mighty","Tiny","Iron","Golden","Silver"];
const PATTERNS = [
  (base: string) => base,
  (base: string) => `${PREFIXES[Math.floor(Math.random()*PREFIXES.length)]} ${base}`,
  (base: string) => `${base}${SUFFIXES[Math.floor(Math.random()*SUFFIXES.length)]}`,
  (base: string) => `${base} ${["the Great","the Bold","the Brave","the Wise","the Swift"][Math.floor(Math.random()*5)]}`,
];

function generateNicknames(types: string[], pokemonName: string, count = 6): string[] {
  const nicknames = new Set<string>();
  const allBases: string[] = [];

  types.forEach(type => {
    const pool = TYPE_NICKNAMES[type] || TYPE_NICKNAMES.normal;
    allBases.push(...pool);
  });

  // Add name-based ones
  const capitalName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  allBases.push(capitalName.slice(0,4)+"y", capitalName+"ster", "The "+capitalName);

  while (nicknames.size < count && allBases.length > 0) {
    const base = allBases[Math.floor(Math.random()*allBases.length)];
    const pattern = PATTERNS[Math.floor(Math.random()*PATTERNS.length)];
    nicknames.add(pattern(base));
  }
  return Array.from(nicknames).slice(0, count);
}

const SAMPLE_POKEMON = [
  { id: 25, name: "pikachu", types: ["electric"] },
  { id: 6, name: "charizard", types: ["fire","flying"] },
  { id: 149, name: "dragonite", types: ["dragon","flying"] },
  { id: 196, name: "espeon", types: ["psychic"] },
  { id: 248, name: "tyranitar", types: ["rock","dark"] },
  { id: 282, name: "gardevoir", types: ["psychic","fairy"] },
  { id: 445, name: "garchomp", types: ["dragon","ground"] },
  { id: 609, name: "chandelure", types: ["ghost","fire"] },
];

export default function NicknameGeneratorPage() {
  const [selected, setSelected] = useState(SAMPLE_POKEMON[0]);
  const [customId, setCustomId] = useState("");
  const [customPokemon, setCustomPokemon] = useState<{id:number,name:string,types:string[]} | null>(null);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [nicknames, setNicknames] = useState(() => generateNicknames(SAMPLE_POKEMON[0].types, SAMPLE_POKEMON[0].name));
  const [copied, setCopied] = useState<string|null>(null);

  const current = customPokemon || selected;

  const regenerate = () => {
    setNicknames(generateNicknames(current.types, current.name));
  };

  const copyNickname = (n: string) => {
    navigator.clipboard.writeText(n).catch(()=>{});
    setCopied(n);
    setTimeout(() => setCopied(null), 1500);
  };

  const fetchCustom = async () => {
    if (!customId.trim()) return;
    setLoadingCustom(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${customId.toLowerCase().trim()}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      const p = { id: data.id, name: data.name, types: data.types.map((t:any)=>t.type.name) };
      setCustomPokemon(p);
      setNicknames(generateNicknames(p.types, p.name));
    } catch {
      alert("Pokémon not found. Try a name like 'pikachu' or ID like '25'.");
    } finally {
      setLoadingCustom(false);
    }
  };

  return (
    <div className="w-full pb-20">
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">✨ Nickname <span className="text-poke-red italic">Generator</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Generate creative nicknames for any Pokémon based on its type and personality.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Custom search */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
          <h3 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">🔍 Enter Any Pokémon</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name or ID (e.g. pikachu, 25)"
              value={customId}
              onChange={e => setCustomId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && fetchCustom()}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-poke-red"
            />
            <button onClick={fetchCustom} disabled={loadingCustom} className="px-5 py-2.5 bg-poke-red text-white font-black rounded-xl hover:bg-red-600 transition-colors text-sm disabled:opacity-60">
              {loadingCustom ? "..." : "Search"}
            </button>
          </div>
        </div>

        {/* Quick picks */}
        <div className="mb-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Quick Pick</p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_POKEMON.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setCustomPokemon(null); setNicknames(generateNicknames(p.types, p.name)); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black capitalize transition-all ${
                  !customPokemon && selected.id === p.id ? "bg-poke-red text-white border-poke-red" : "bg-white text-slate-600 border-slate-200 hover:border-poke-red"
                }`}
              >
                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} alt={p.name} width={20} height={20} className="object-contain" loading="lazy" />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pokémon */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 mb-6 flex items-center gap-5">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${current.id}.png`}
            alt={current.name} width={100} height={100} className="object-contain drop-shadow-xl"
          />
          <div>
            <h2 className="text-2xl font-black capitalize text-slate-900">{current.name}</h2>
            <p className="text-xs text-slate-400 mb-2">#{String(current.id).padStart(3,"0")}</p>
            <div className="flex gap-1.5 flex-wrap">
              {current.types.map(t => (
                <span key={t} className="text-[10px] font-black uppercase text-white px-2 py-0.5 rounded-full bg-slate-700">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Nicknames */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-black text-slate-900">Generated Nicknames</h3>
            <button onClick={regenerate} className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-200 transition-colors active:scale-95">
              <RefreshCw className="w-3 h-3" /> Regenerate
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {nicknames.map((n, i) => (
              <button
                key={i}
                onClick={() => copyNickname(n)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-poke-red/5 border border-slate-200 hover:border-poke-red/30 rounded-xl text-sm font-black text-slate-800 transition-all active:scale-95 group"
              >
                <span>{n}</span>
                {copied === n ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-poke-red" />}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-300 text-center mt-4">Click any nickname to copy it!</p>
        </div>
      </div>
    </div>
  );
}
