import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pokémon Type Weakness & Resistance Calculator | Ultimate Type Chart",
  description: "Calculate exact type weaknesses, resistances, and immunities for any single or dual-type Pokémon. Gen 9 updated type chart for competitive play.",
  keywords: "pokemon type weakness, type resistance calculator, pokemon type chart, dual type calculator, pokemon battle tools",
};

export default function TypeWeaknessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
