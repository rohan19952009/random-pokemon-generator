import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Who's That Pokémon? - Silhouette Guessing Game",
  description: "Can you identify the Pokémon from its shadow? Play the classic Who's That Pokémon silhouette guessing game online! 898 Pokémon, 3 hints, score tracker. Free to play!",
  alternates: { canonical: "https://randompokemongenerator.info/games/whos-that-pokemon" },
  openGraph: { title: "Who's That Pokémon? | Random Pokémon Generator", description: "Classic Pokémon silhouette guessing game — test your Pokédex knowledge!", url: "https://randompokemongenerator.info/games/whos-that-pokemon" },
  keywords: ["whos that pokemon", "pokemon silhouette game", "guess the pokemon", "pokemon quiz"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
