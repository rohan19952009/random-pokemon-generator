import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Nickname Generator - Creative Names for Every Pokémon",
  description: "Generate creative, type-based nicknames for any Pokémon instantly. Search any Pokémon by name or ID and get 6 unique nickname suggestions. One-click copy!",
  alternates: { canonical: "https://randompokemongenerator.info/tools/nickname-generator" },
  openGraph: { title: "Pokémon Nickname Generator | Random Pokémon Generator", description: "Get fun, creative nicknames for any Pokémon based on their type and stats.", url: "https://randompokemongenerator.info/tools/nickname-generator" },
  keywords: ["pokemon nickname generator", "pokemon names", "nickname ideas pokemon", "best pokemon nicknames"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
