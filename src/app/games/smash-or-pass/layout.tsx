import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Smash or Pass - Vote on All 1025 Pokémon",
  description: "Play the viral Pokémon Smash or Pass game! Vote on all 1025 Pokémon — would you add them to your team? Use arrow keys or buttons. See your final results!",
  alternates: { canonical: "https://randompokemongenerator.info/games/smash-or-pass" },
  openGraph: { title: "Pokémon Smash or Pass | Random Pokémon Generator", description: "The viral Pokémon voting game — all 1025 Pokémon, arrow key controls!", url: "https://randompokemongenerator.info/games/smash-or-pass" },
  keywords: ["pokemon smash or pass", "pokemon yes or no", "pokemon rate game", "pokemon vote"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
