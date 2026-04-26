import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon IV Calculator - Calculate Individual Values Free",
  description: "Calculate your Pokémon's hidden Individual Values (IVs) from in-game stats, level, EVs and nature. Supports all 6 stats with nature multipliers. Free online tool.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/iv-calculator" },
  openGraph: { title: "Pokémon IV Calculator | Random Pokémon Generator", description: "Free IV calculator — find your Pokémon's hidden stat potential instantly.", url: "https://randompokemongenerator.info/tools/iv-calculator" },
  keywords: ["pokemon iv calculator", "individual values pokemon", "pokemon iv checker", "pokemon stats calculator"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
