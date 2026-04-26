import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Compare Tool - Compare Any Two Pokémon Stats",
  description: "Compare base stats of any two Pokémon side-by-side instantly. See HP, Attack, Defense, Speed and more in a visual bar chart. Search all 1025 Pokémon. Free online tool.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/compare" },
  openGraph: { title: "Pokémon Compare | Random Pokémon Generator", description: "Compare any two Pokémon stats side-by-side — who wins each stat?", url: "https://randompokemongenerator.info/tools/compare" },
  keywords: ["pokemon compare", "pokemon stat comparison", "pokemon vs pokemon", "best pokemon stats", "pokemon base stats comparison"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
