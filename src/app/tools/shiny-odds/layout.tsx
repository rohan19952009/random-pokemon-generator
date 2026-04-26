import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Shiny Odds Calculator - All Shiny Hunting Methods",
  description: "Calculate your exact shiny Pokémon hunting odds for every method: Full Odds, Masuda Method, Shiny Charm, Chain Fishing, SOS Chaining, DexNav and more. Free calculator.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/shiny-odds" },
  openGraph: { title: "Pokémon Shiny Odds Calculator | Random Pokémon Generator", description: "Find your exact shiny hunting probability for every method and game.", url: "https://randompokemongenerator.info/tools/shiny-odds" },
  keywords: ["pokemon shiny odds", "shiny hunting calculator", "shiny pokemon probability", "masuda method odds", "shiny charm calculator"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
