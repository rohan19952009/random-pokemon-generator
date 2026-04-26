"use client";

import { useState, useCallback } from "react";
import { Heart, X, RefreshCw, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ALL_IDS = Array.from({length: 1025}, (_, i) => i + 1);
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FavoritePickerPage() {
  const [queue, setQueue] = useState<number[]>(() => shuffle(ALL_IDS).slice(0, 50));
  const [current, setCurrent] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);
  const [swipeDir, setSwipeDir] = useState<"left"|"right"|null>(null);
  const [done, setDone] = useState(false);

  const currentId = queue[current];

  const vote = useCallback((like: boolean) => {
    setSwipeDir(like ? "right" : "left");
    setTimeout(() => {
      if (like) setFavorites(prev => [...prev, currentId]);
      else setPassed(prev => [...prev, currentId]);
      setSwipeDir(null);
      if (current + 1 >= queue.length) setDone(true);
      else setCurrent(c => c + 1);
    }, 250);
  }, [current, currentId, queue.length]);

  const restart = () => {
    setQueue(shuffle(ALL_IDS).slice(0, 50));
    setCurrent(0);
    setFavorites([]);
    setPassed([]);
    setDone(false);
    setSwipeDir(null);
  };

  const progress = Math.round((current / queue.length) * 100);

  return (
    <div className="w-full pb-20">
      <section className="py-8 bg-[#F8FAFC] border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <Link href="/tools" className="text-xs text-slate-400 hover:text-poke-red font-bold uppercase tracking-widest mb-4 inline-block">← All Tools</Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">❤️ Favorite <span className="text-poke-red italic">Picker</span></h1>
          <p className="text-slate-500 max-w-md mx-auto">Swipe through 50 random Pokémon and pick your favorites. Fast, fun, and addictive!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-lg">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-black text-slate-500 mb-1.5 uppercase tracking-wider">
            <span>{current}/{queue.length}</span>
            <span>❤️ {favorites.length} Favorites</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-poke-red rounded-full transition-all duration-300" style={{width: `${progress}%`}} />
          </div>
        </div>

        {done ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Done! Your Favorites:</h2>
            {favorites.length === 0 ? (
              <p className="text-slate-500 mb-6">No favorites — tough crowd! 😄</p>
            ) : (
              <div className="grid grid-cols-4 gap-3 mb-6 mt-4">
                {favorites.map(id => (
                  <div key={id} className="bg-white border border-slate-200 rounded-xl p-2 text-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                      alt={`#${id}`} width={60} height={60} className="object-contain mx-auto" loading="lazy"
                    />
                    <p className="text-[9px] text-slate-500 font-bold mt-1">#{String(id).padStart(3,"0")}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={restart} className="flex items-center gap-2 mx-auto px-8 py-3.5 bg-poke-red text-white font-black rounded-2xl hover:bg-red-600 transition-colors active:scale-95 text-sm uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" /> Play Again
            </button>
          </div>
        ) : (
          <>
            {/* Card */}
            <div
              className={`relative bg-white border-2 border-slate-200 rounded-3xl p-8 text-center shadow-xl transition-all duration-250 select-none ${
                swipeDir === "right" ? "translate-x-16 rotate-6 opacity-0 border-green-400" :
                swipeDir === "left"  ? "-translate-x-16 -rotate-6 opacity-0 border-red-400" : ""
              }`}
            >
              {swipeDir === "right" && <div className="absolute top-6 left-6 text-green-500 font-black text-2xl rotate-[-15deg] border-4 border-green-500 px-3 py-1 rounded-lg">LIKE!</div>}
              {swipeDir === "left" && <div className="absolute top-6 right-6 text-red-500 font-black text-2xl rotate-[15deg] border-4 border-red-500 px-3 py-1 rounded-lg">PASS</div>}

              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentId}.png`}
                alt={`Pokémon #${currentId}`}
                width={180} height={180}
                className="object-contain mx-auto drop-shadow-xl"
                priority
              />
              <p className="text-slate-400 text-sm font-bold mt-3">#{String(currentId).padStart(3,"0")}</p>
              <p className="text-xs text-slate-300 mt-1">Would you add this to your team?</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-5 justify-center mt-8">
              <button
                onClick={() => vote(false)}
                className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90 shadow-md"
              >
                <X className="w-7 h-7" />
              </button>
              <button
                onClick={() => vote(true)}
                className="w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition-all active:scale-90 shadow-md"
              >
                <Heart className="w-7 h-7" />
              </button>
            </div>
            <div className="flex justify-between text-[10px] text-slate-300 font-black uppercase tracking-wider mt-3 px-4">
              <span>Pass</span>
              <span>Like ❤️</span>
            </div>

            <button onClick={restart} className="mx-auto mt-8 flex items-center gap-1.5 text-xs text-slate-400 hover:text-poke-red transition-colors font-bold">
              <RefreshCw className="w-3 h-3" /> Restart with new Pokémon
            </button>
          </>
        )}
      </div>
    </div>
  );
}
