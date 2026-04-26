import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Catch Rate Calculator - Find Your Catch Probability",
  description: "Calculate the exact catch probability for any Pokémon with any Poké Ball, HP level, and status condition. Supports all Poké Balls from all generations. Free tool.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/catch-rate" },
  openGraph: { title: "Pokémon Catch Rate Calculator | Random Pokémon Generator", description: "Find the exact catch chance for any Pokémon with any ball and HP condition.", url: "https://randompokemongenerator.info/tools/catch-rate" },
  keywords: ["pokemon catch rate calculator", "pokemon catch probability", "pokeball catch rate", "how to catch pokemon"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
