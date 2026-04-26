import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pokémon Fusion Generator - Fuse Any Two Pokémon",
  description: "Fuse two random Pokémon together and create a brand new species! Combines names, types, and stats into a unique fusion. Inspired by the classic Pokémon Fusion game.",
  alternates: { canonical: "https://randompokemongenerator.info/tools/fusion-generator" },
  openGraph: { title: "Pokémon Fusion Generator | Random Pokémon Generator", description: "Create unique Pokémon fusions — combine names and types!", url: "https://randompokemongenerator.info/tools/fusion-generator" },
  keywords: ["pokemon fusion generator", "pokemon fusion", "fuse pokemon", "infinite fusion pokemon"],
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
