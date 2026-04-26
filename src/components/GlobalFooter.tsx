import Image from "next/image";
import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="bg-lab-bg/50 border-t border-lab-border py-16 px-6 mt-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lab-accent/20 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group inline-block mb-6">
              <div className="relative h-16 w-16 cursor-pointer opacity-80 group-hover:opacity-100 transition-opacity">
                <Image src="/logo-v2.webp" alt="Random Pokemon Generator" fill className="object-contain drop-shadow-[0_0_10px_rgba(0,242,255,0.2)]" loading="lazy" />
              </div>
            </Link>
            <p className="text-sm font-bold text-lab-text-muted max-w-[200px] leading-relaxed">
              The world's #1 <span className="text-lab-accent">Random Pokemon Generator</span> featuring professional tools and games.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-lab-accent mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-pulse" />
              Advanced Tools
            </h4>
            <div className="space-y-3">
              {[
                { name: "Random Generator", href: "/" },
                { name: "Team Planner", href: "/tools/team-planner" },
                { name: "Pokémon Compare", href: "/tools/compare" },
                { name: "IV Calculator", href: "/tools/iv-calculator" },
                { name: "Catch Rate Calc", href: "/tools/catch-rate" },
                { name: "Shiny Odds Calc", href: "/tools/shiny-odds" },
                { name: "Type Weakness Calc", href: "/tools/type-weakness" },
                { name: "Fusion Generator", href: "/tools/fusion-generator" },
                { name: "Nickname Generator", href: "/tools/nickname-generator" },
                { name: "Favorite Picker", href: "/tools/favorite-picker" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm font-bold text-lab-text-muted hover:text-lab-accent transition-all hover:translate-x-1">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-lab-accent mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-pulse" />
              Training Games
            </h4>
            <div className="space-y-3">
              {[
                { name: "Who's That Pokémon?", href: "/games/whos-that-pokemon" },
                { name: "Pokémon Wordle", href: "/games/pokemon-wordle" },
                { name: "Smash or Pass", href: "/games/smash-or-pass" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm font-bold text-lab-text-muted hover:text-lab-accent transition-all hover:translate-x-1">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Foundation */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-lab-accent mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-pulse" />
              Terminal Access
            </h4>
            <div className="space-y-3">
              {[
                { name: "About Station", href: "/about" },
                { name: "Privacy Protocol", href: "/privacy-policy" },
                { name: "Service Terms", href: "/terms-of-service" },
                { name: "All Tools Hub", href: "/tools" },
                { name: "All Games Hub", href: "/games" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm font-bold text-lab-text-muted hover:text-lab-accent transition-all hover:translate-x-1">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-lab-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-lab-text-muted font-bold uppercase tracking-[0.2em]">
            © 2026 <span className="text-lab-accent">Random Pokemon Generator</span>
          </p>
          <p className="text-[11px] text-lab-text-muted/60 italic font-medium text-center max-w-lg leading-relaxed">
            Pokémon and all related names are trademarks of Nintendo / Game Freak. Fan-driven technical project — not affiliated with official entities.
          </p>
        </div>
      </div>
    </footer>
  );
}
