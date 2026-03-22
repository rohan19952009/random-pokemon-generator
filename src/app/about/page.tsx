import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Pokémon Generator | High Performance Tools",
  description: "Learn about the mission, technical excellence, and the PokeGen community behind the world's most advanced random Pokémon picker.",
  alternates: {
    canonical: "https://randompokemongenerator.info/about",
  },
};

export default function About() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-black mb-8">About Random Pokémon Generator</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">Welcome to the world's most advanced and aesthetically pleasing Pokémon generator.</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p>Our mission is to provide Pokémon trainers, competitive players, and fans with high-quality tools to enhance their gaming experience. Whether you're running a Nuzlocke challenge, drafting for a league, or just looking for creative inspiration, we aim to deliver the most accurate and beautiful data available.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why We Built This</h2>
        <p>As long-time fans of the franchise, we found existing random generators to be dated in design and lacking in modern technical standards. We utilized Next.js and the official PokéAPI to build a tool that isn't just a utility, but a premium experience for the community.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Technical Excellence</h2>
        <p>This project is built with performance and SEO at its core. We use static site generation and incremental data fetching to ensure lightning-fast speeds, while adhering to the strictest web standards to provide a reliable service to millions of users.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Connect With Us</h2>
        <p>We are constantly improving our tools based on community feedback. If you have suggestions or find bugs, feel free to reach out. Thank you for choosing **randompokemongenerator.info** as your primary Pokémon resource.</p>
      </div>
    </main>
  );
}
