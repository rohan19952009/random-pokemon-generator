"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrench, Gamepad2, ChevronDown, Sparkles, Swords, Heart, Star, Calculator, Dna, HelpCircle, Brain, Flame, Menu, X, TrendingUp, Zap, GitCompare, ShieldCheck } from "lucide-react";

const TOOLS = [
  { href: "/", label: "Random Picker", icon: Sparkles, desc: "Generate random Pokémon" },
  { href: "/tools/team-planner", label: "Team Planner", icon: Swords, desc: "Build & analyze a team of 6" },
  { href: "/tools/compare", label: "Pokémon Compare", icon: GitCompare, desc: "Compare stats side-by-side" },
  { href: "/tools/iv-calculator", label: "IV Calculator", icon: Calculator, desc: "Calculate hidden IVs" },
  { href: "/tools/catch-rate", label: "Catch Rate", icon: TrendingUp, desc: "Find catch probability" },
  { href: "/tools/shiny-odds", label: "Shiny Odds", icon: Zap, desc: "Shiny hunting probability" },
  { href: "/tools/type-weakness", label: "Type Weakness", icon: ShieldCheck, desc: "Calculate type effectiveness" },
  { href: "/tools/fusion-generator", label: "Fusion Generator", icon: Dna, desc: "Fuse two Pokémon together" },
  { href: "/tools/nickname-generator", label: "Nickname Generator", icon: Star, desc: "Creative Pokémon nicknames" },
  { href: "/tools/favorite-picker", label: "Favorite Picker", icon: Heart, desc: "Like or pass on Pokémon" },
];

const GAMES = [
  { href: "/games/whos-that-pokemon", label: "Who's That Pokémon?", icon: HelpCircle, desc: "Silhouette guessing game" },
  { href: "/games/pokemon-wordle", label: "Pokémon Wordle", icon: Brain, desc: "Guess in 6 attempts" },
  { href: "/games/smash-or-pass", label: "Smash or Pass", icon: Flame, desc: "Vote on every Pokémon" },
];

function DropdownMenu({ items, onClose }: { items: typeof TOOLS; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 mt-3 w-80 glass-card p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="grid gap-1">
        {items.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href} onClick={onClose}
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-lab-accent/10 flex items-center justify-center group-hover:bg-lab-accent/20 transition-colors">
              <Icon className="w-5 h-5 text-lab-accent group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-sm font-bold text-lab-text group-hover:text-lab-accent transition-colors">{label}</p>
              <p className="text-[11px] text-lab-text-muted mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const gamesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
      if (gamesRef.current && !gamesRef.current.contains(e.target as Node)) setGamesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "py-2 bg-lab-bg/80 backdrop-blur-xl border-lab-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
            : "py-4 bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group">
            <div className={`relative flex items-center gap-3 transition-all duration-300 ${
              scrolled ? "scale-90" : "scale-100"
            }`}>
              <div className="relative h-12 w-12 md:h-14 md:w-14">
                <Image
                  src="/logo-v2.webp"
                  alt="Random Pokémon Generator Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(0,242,255,0.35)] group-hover:scale-110 transition-transform"
                  priority
                />
              </div>
              <div className="hidden lg:block">
                <span className="block text-sm font-black tracking-tighter text-lab-accent uppercase leading-none">Random Pokémon</span>
                <span className="block text-[10px] font-bold text-lab-text-muted uppercase tracking-[0.2em]">Generator</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => { setToolsOpen(o => !o); setGamesOpen(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  toolsOpen 
                    ? "bg-lab-accent/10 text-lab-accent shadow-[0_0_15px_rgba(0,242,255,0.1)]" 
                    : "text-lab-text-muted hover:text-lab-text hover:bg-white/5"
                }`}
              >
                <Wrench className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              {toolsOpen && <DropdownMenu items={TOOLS} onClose={() => setToolsOpen(false)} />}
            </div>

            <div ref={gamesRef} className="relative">
              <button
                onClick={() => { setGamesOpen(o => !o); setToolsOpen(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  gamesOpen 
                    ? "bg-lab-accent/10 text-lab-accent shadow-[0_0_15px_rgba(0,242,255,0.1)]" 
                    : "text-lab-text-muted hover:text-lab-text hover:bg-white/5"
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                Games
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${gamesOpen ? "rotate-180" : ""}`} />
              </button>
              {gamesOpen && <DropdownMenu items={GAMES} onClose={() => setGamesOpen(false)} />}
            </div>

            <Link href="/about" className="px-5 py-2.5 rounded-xl text-sm font-bold text-lab-text-muted hover:text-lab-text hover:bg-white/5 transition-all">About</Link>

            <div className="w-[1px] h-6 bg-lab-border mx-2" />

            <Link
              href="/"
              className="lab-button lab-button-primary scale-90"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-3 rounded-xl glass-card text-lab-accent hover:bg-white/10 active:scale-95 transition-all"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-lab-bg/95 backdrop-blur-2xl border-b border-lab-border p-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-lab-accent/10 border border-lab-accent/20">
              <Sparkles className="w-5 h-5 text-lab-accent" />
              <span className="font-bold text-lab-accent">Random Generator</span>
            </Link>
            
            <div className="pt-2">
              <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-widest text-lab-text-muted">Tools</p>
              <div className="grid grid-cols-1 gap-1">
                {TOOLS.slice(1).map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <Icon className="w-5 h-5 text-lab-text-muted" />
                    <span className="font-bold text-sm text-lab-text">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-widest text-lab-text-muted">Games</p>
              <div className="grid grid-cols-1 gap-1">
                {GAMES.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                    <Icon className="w-5 h-5 text-lab-text-muted" />
                    <span className="font-bold text-sm text-lab-text">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
              <span className="font-bold text-sm text-lab-text">About</span>
            </Link>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className={`transition-all duration-300 ${scrolled ? "h-[64px] md:h-[72px]" : "h-[80px] md:h-[96px]"}`} />
    </>
  );
}
