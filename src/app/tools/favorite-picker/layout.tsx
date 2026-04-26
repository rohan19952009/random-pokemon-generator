import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Favorite Picker - Vote on Your Favorite Pokémon",
  description: "Swipe through 50 random Pokémon and pick your favorites! Like or pass on each Pokémon, then see your complete favorites list. Free, fun and addictive.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/favorite-picker" },
  openGraph: { title: "Pokémon Favorite Picker | Random Pokémon Generator", description: "Vote on 50 random Pokémon and find your favorites!", url: "https://randompokemongenerator.info/tools/favorite-picker" },
  keywords: ["pokemon favorite picker", "pick favorite pokemon", "best pokemon", "pokemon rating"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
