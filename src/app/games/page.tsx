import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, ChevronRight, HelpCircle, Brain, Flame, Activity, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Pokémon Games | Random Pokemon Generator",
  description: "Play free Pokémon mini-games! Guess the silhouette in 'Who's That Pokémon', solve 'Pokémon Wordle', and vote in 'Smash or Pass'. No download required.",
  alternates: { canonical: "https://randompokemongenerator.info/games" },
  openGraph: {
    title: "Free Pokémon Games | Random Pokemon Generator",
    description: "Play Who's That Pokémon, Pokémon Wordle, and Smash or Pass for free in your browser.",
    url: "https://randompokemongenerator.info/games",
  },
  keywords: ["free pokemon games", "pokemon wordle online", "whos that pokemon game", "smash or pass pokemon", "random pokemon games"],
};

const games = [
  { title: "Who's That Pokémon?", description: "The classic guessing game — identify the Pokémon from its shadow silhouette. Use hints if you get stuck!", href: "/games/whos-that-pokemon", icon: HelpCircle, badge: "CLASSIC", emoji: "👤" },
  { title: "Pokémon Wordle", description: "Guess the target Pokémon using type, generation, and weight clues in 6 attempts. Fun and challenging logic.", href: "/games/pokemon-wordle", icon: Brain, badge: "LOGIC", emoji: "🟩" },
  { title: "Smash or Pass", description: "A fun community game — would you add this Pokémon to your dream team? See how others voted.", href: "/games/smash-or-pass", icon: Flame, badge: "SOCIAL", emoji: "🔥" },
];

export default function GamesPage() {
  return (
    <div className="w-full pb-32">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 mb-8">
              <Activity className="w-3.5 h-3.5 text-lab-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent">Pokémon Mini-Games</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-lab-text tracking-tighter uppercase mb-6 italic">
              Free Random Pokémon <span className="text-lab-accent text-glow">Games</span>
            </h1>
            
            <p className="text-lab-text-muted font-medium text-lg max-w-xl mx-auto leading-relaxed">
              Test your Pokémon knowledge with our fun collection of browser-based games. 
              No download or account required.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((g) => (
            <Link key={g.href} href={g.href} className="group glass-card glass-card-hover p-8 flex flex-col h-full active:scale-95 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-lab-accent/10 transition-all duration-300 border border-white/10 group-hover:border-lab-accent/30 shadow-inner">
                  {g.emoji}
                </div>
                {g.badge && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-lab-accent/10 text-lab-accent border border-lab-accent/30 px-2 py-0.5 rounded-md">
                    {g.badge}
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl font-black text-lab-text mb-3 group-hover:text-lab-accent transition-colors uppercase tracking-tight italic">
                {g.title}
              </h2>
              
              <p className="text-sm text-lab-text-muted leading-relaxed mb-8 flex-1">
                {g.description}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[10px] font-black text-lab-accent uppercase tracking-widest group-hover:text-glow transition-all">
                  Play Game
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lab-accent group-hover:text-lab-bg transition-all duration-300">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link href="/tools" className="group inline-flex items-center gap-3 text-xs font-black text-lab-text-muted hover:text-lab-accent transition-colors uppercase tracking-[0.3em] font-mono">
           <Terminal className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           &lt;&lt; View Pokémon Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
