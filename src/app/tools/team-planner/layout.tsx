import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Team Planner - Build & Analyze Random Teams",
  description: "Build a balanced Pokémon team of 6 random Pokémon and instantly analyze type coverage, weaknesses, and team balance. Free online Pokémon team builder tool.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/team-planner" },
  openGraph: {
    title: "Pokémon Team Planner | Random Pokémon Generator",
    description: "Generate and analyze a random Pokémon team. Check type coverage and weaknesses instantly.",
    url: "https://randompokemongenerator.info/tools/team-planner",
  },
  keywords: ["pokemon team planner", "pokemon team builder", "pokemon type coverage", "random pokemon team", "pokemon team weakness analyzer"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
