import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Gamepad2, ChevronRight, Sparkles, Swords, Heart, Calculator, Dna, Star, Brain, HelpCircle, Flame, TrendingUp, Zap, BarChart3, GitCompare, ShieldCheck, Activity, Cpu, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Random Pokémon Discovery Tools | Random Pokemon Generator",
  description: "Access our collection of random Pokémon tools: Team Builder, IV Calculator, Shiny Odds, Catch Rate, Fusion Generator, and more.",
  alternates: { canonical: "https://randompokemongenerator.info/tools" },
  openGraph: {
    title: "Pokémon Tools | Random Pokemon Generator",
    description: "A complete collection of Pokémon utilities and random generators.",
    url: "https://randompokemongenerator.info/tools",
  },
};

const tools = [
  { title: "Random Pokémon Picker", description: "Generate random Pokémon from any region with advanced filters.", href: "/", icon: Sparkles, badge: "STABLE", emoji: "⚡" },
  { title: "Pokémon Team Builder", description: "Build and analyze a balanced team of 6 Pokémon. Real-time coverage and weakness checks.", href: "/tools/team-planner", icon: Swords, badge: "NEW", emoji: "🛡️" },
  { title: "Pokémon Comparison", description: "Compare base stats and data of any two Pokémon side-by-side.", href: "/tools/compare", icon: GitCompare, badge: "ELITE", emoji: "⚖️" },
  { title: "IV Calculator", description: "Calculate hidden Individual Values from level, EVs, and current stats.", href: "/tools/iv-calculator", icon: Calculator, badge: null, emoji: "📊" },
  { title: "Catch Rate Calculator", description: "Calculate exact catch probability based on HP, status, and Pokéball type.", href: "/tools/catch-rate", icon: TrendingUp, badge: "CORE", emoji: "🎯" },
  { title: "Shiny Odds Calculator", description: "Predict Shiny Pokémon encounter rates across all known generation methods.", href: "/tools/shiny-odds", icon: Zap, badge: "DATA", emoji: "✨" },
  { title: "Pokémon Fusion Generator", description: "Create new hybrid Pokémon by combining types and stats of two species.", href: "/tools/fusion-generator", icon: Dna, badge: "BETA", emoji: "🧬" },
  { title: "Type Weakness Chart", description: "Check single and dual-type defensive weaknesses. Gen 9 compliant logic.", href: "/tools/type-weakness", icon: ShieldCheck, badge: "NEW", emoji: "🛡️" },
  { title: "Nickname Generator", description: "Generate creative Pokémon nicknames for your team.", href: "/tools/nickname-generator", icon: Star, badge: null, emoji: "🏷️" },
  { title: "Favorite Pokémon Picker", description: "A fun way to pick your favorite Pokémon from any generation.", href: "/tools/favorite-picker", icon: Heart, badge: "UI", emoji: "❤️" },
];

const games = [
  { title: "Who's That Pokémon?", description: "The classic guessing game — identify the Pokémon from its shadow silhouette.", href: "/games/whos-that-pokemon", icon: HelpCircle, badge: "LEGACY", emoji: "👤" },
  { title: "Pokémon Wordle", description: "Guess the target Pokémon using type, generation, and weight clues in 6 attempts.", href: "/games/pokemon-wordle", icon: Brain, badge: "LOGIC", emoji: "🟩" },
  { title: "Smash or Pass", description: "Vote on every Pokémon and see community results.", href: "/games/smash-or-pass", icon: Flame, badge: "SOCIAL", emoji: "🔥" },
];

export default function ToolsPage() {
  return (
    <div className="w-full pb-32">
      {/* Header section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-lab-accent/30 bg-lab-accent/5 mb-8">
              <Activity className="w-3.5 h-3.5 text-lab-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent">All Pokémon Tools</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-lab-text tracking-tighter uppercase mb-6 italic">
              Pokémon <span className="text-lab-accent text-glow">Tools Collection</span>
            </h1>
            
            <p className="text-lab-text-muted font-medium text-lg max-w-2xl leading-relaxed">
              Explore our full range of professional Pokémon generators, calculators, and builders.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col gap-24">
          {/* Tools Section */}
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-lab-accent border-lab-accent/30">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-lab-text uppercase tracking-tight italic">Pokémon Tools</h2>
                <p className="text-xs text-lab-text-muted font-bold tracking-widest uppercase">Calculators & Builders</p>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-lab-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((t) => <ToolCard key={t.href} {...t} cta="Open Tool" />)}
            </div>
          </section>

          {/* Games Section */}
          <section>
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-lab-accent border-lab-accent/30">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-lab-text uppercase tracking-tight italic">Pokémon Games</h2>
                <p className="text-xs text-lab-text-muted font-bold tracking-widest uppercase">Quiz & Logic Games</p>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-lab-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((g) => <ToolCard key={g.href} {...g} cta="Play Game" />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ title, description, href, icon: Icon, badge, emoji, cta }: { title: string; description: string; href: string; icon: any; badge: string | null; emoji: string; cta: string }) {
  return (
    <Link href={href} className="group glass-card glass-card-hover p-8 flex flex-col h-full active:scale-95 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-lab-accent/10 transition-all duration-300 border border-white/10 group-hover:border-lab-accent/30 shadow-inner">
          {emoji}
        </div>
        {badge && (
          <span className="text-[9px] font-black uppercase tracking-widest bg-lab-accent/10 text-lab-accent border border-lab-accent/30 px-2 py-0.5 rounded-md">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-black text-lab-text mb-3 group-hover:text-lab-accent transition-colors uppercase tracking-tight italic">
        {title}
      </h3>
      
      <p className="text-sm text-lab-text-muted leading-relaxed mb-8 flex-1">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <span className="text-[10px] font-black text-lab-accent uppercase tracking-widest group-hover:text-glow transition-all">
          {cta}
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-lab-accent group-hover:text-lab-bg transition-all duration-300">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
