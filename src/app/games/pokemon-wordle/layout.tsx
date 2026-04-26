import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Wordle - Guess the Pokémon in 6 Tries",
  description: "Play Pokémon Wordle! Guess the secret Pokémon in 6 attempts using type, generation, and legendary clues. Color-coded feedback like the classic Wordle game. Free online!",
  alternates: { canonical: "https://randompokemongenerator.info/games/pokemon-wordle" },
  openGraph: { title: "Pokémon Wordle | Random Pokémon Generator", description: "Guess today's secret Pokémon in 6 attempts with type and generation clues!", url: "https://randompokemongenerator.info/games/pokemon-wordle" },
  keywords: ["pokemon wordle", "pokedle", "pokemon guessing game", "guess pokemon", "wordle pokemon"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
