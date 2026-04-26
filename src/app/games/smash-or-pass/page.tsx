"use client";

import { useState, useCallback, useEffect } from "react";
import { Flame, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pokémon Smash or Pass - Infinite Edition",
  "description": "The ultimate Pokémon Smash or Pass game. Vote on your favorite species and see how your choices compare with the community! Infinite gameplay.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "url": "https://randompokemongenerator.info/games/smash-or-pass"
};

const ALL_IDS = Array.from({length: 1025}, (_, i) => i + 1);
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SmashOrPassPage() {
  const [queue] = useState(() => shuffle(ALL_IDS).slice(0, 60));
  const [current, setCurrent] = useState(0);
  const [smashes, setSmashes] = useState<number[]>([]);
  const [passes, setPasses] = useState<number[]>([]);
  const [swipe, setSwipe] = useState<"smash"|"pass"|null>(null);
  const [done, setDone] = useState(false);

  const vote = useCallback((choice: "smash"|"pass") => {
    setSwipe(choice);
    setTimeout(() => {
      if (choice === "smash") setSmashes(s => [...s, queue[current]]);
      else setPasses(p => [...p, queue[current]]);
      setSwipe(null);
      if (current + 1 >= queue.length) setDone(true);
      else setCurrent(c => c + 1);
    }, 300);
  }, [current, queue]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === "ArrowLeft" || e.key === "a") vote("pass");
      if (e.key === "ArrowRight" || e.key === "d") vote("smash");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [vote, done]);

  const total = smashes.length + passes.length;
  const progress = Math.round((total / queue.length) * 100);

  const getRandomRoast = (pct: number): string => {
    if (pct >= 80) return "You're extremely accepting! 😂";
    if (pct >= 60) return "Definitely a Pokémon fan! 🎊";
    if (pct >= 40) return "Pretty selective! 👀";
    if (pct >= 20) return "Harsh... but fair? 😅";
    return "You pass everything. Impossible to please! 😤";
  };

  const restart = () => window.location.reload();

  return (
    <div className="w-full pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/games" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Games</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">🔥 Smash <span className="text-poke-red italic">or Pass</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Would you add this Pokémon to your team? Smash (yes) or Pass (no)! Use arrow keys too.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-sm">
        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">
            <span>💀 Pass: {passes.length}</span>
            <span>{total}/{queue.length}</span>
            <span>❤️ Smash: {smashes.length}</span>
          </div>
          <div className="flex gap-1 h-2.5 rounded-full overflow-hidden bg-slate-100">
            <div className="h-full bg-poke-red transition-all duration-300" style={{width:`${(smashes.length/queue.length)*100}%`}} />
            <div className="h-full bg-slate-300 transition-all duration-300" style={{width:`${(passes.length/queue.length)*100}%`}} />
          </div>
        </div>

        {done ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Results!</h2>
            <p className="text-slate-500 mb-2 text-sm">{getRandomRoast(Math.round((smashes.length/queue.length)*100))}</p>
            <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-green-600">{smashes.length}</p>
                <p className="text-xs font-black text-green-500 uppercase mt-1">🔥 Smashed</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-3xl font-black text-red-500">{passes.length}</p>
                <p className="text-xs font-black text-red-400 uppercase mt-1">💀 Passed</p>
              </div>
            </div>

            <div className="mt-4 mb-6">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Your Smashes ❤️</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {smashes.map(id => (
                  <Image key={id} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`#${id}`} width={36} height={36} className="object-contain" loading="lazy" />
                ))}
              </div>
            </div>

            <button onClick={restart} className="inline-flex items-center gap-2 px-8 py-3.5 bg-poke-red text-white font-black rounded-2xl hover:bg-red-600 transition-colors active:scale-95 text-sm uppercase shadow-lg">
              <RefreshCw className="w-4 h-4" /> Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Card */}
            <div className={`bg-white border-2 border-slate-200 rounded-3xl p-8 text-center shadow-xl mb-6 transition-all duration-300 select-none ${
              swipe === "smash" ? "translate-x-12 rotate-6 opacity-0 border-green-400" :
              swipe === "pass" ? "-translate-x-12 -rotate-6 opacity-0 border-red-400" : ""
            }`}>
              {swipe === "smash" && <div className="absolute top-6 left-6 text-green-500 font-black text-xl rotate-[-12deg] border-4 border-green-500 px-3 py-1 rounded-lg">SMASH!</div>}
              {swipe === "pass" && <div className="absolute top-6 right-6 text-red-500 font-black text-xl rotate-[12deg] border-4 border-red-500 px-3 py-1 rounded-lg">PASS</div>}

              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${queue[current]}.png`}
                alt={`Pokémon #${queue[current]}`}
                width={180} height={180}
                className="object-contain mx-auto drop-shadow-2xl"
                priority
              />
              <p className="text-slate-400 text-sm font-bold mt-4">#{String(queue[current]).padStart(3,"0")}</p>
              <p className="text-[10px] text-slate-300 mt-1">Would you add this to your team?</p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => vote("pass")}
                className="flex flex-col items-center gap-2 py-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-red-400 hover:bg-red-50 hover:text-red-500 text-slate-400 transition-all active:scale-95 shadow-md"
              >
                <ThumbsDown className="w-6 h-6" />
                <span className="font-black text-xs uppercase tracking-wider">Pass ← </span>
              </button>
              <button
                onClick={() => vote("smash")}
                className="flex flex-col items-center gap-2 py-4 bg-white border-2 border-slate-200 rounded-2xl hover:border-green-400 hover:bg-green-50 hover:text-green-600 text-slate-400 transition-all active:scale-95 shadow-md"
              >
                <ThumbsUp className="w-6 h-6" />
                <span className="font-black text-xs uppercase tracking-wider">→ Smash</span>
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-300 font-black mt-3">← → arrow keys work too!</p>
          </>
        )}
      </div>
    </div>
  );
}
