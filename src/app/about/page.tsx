import { Metadata } from "next";
import { Terminal, Activity, Info, Shield, Cpu, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Random Pokemon Generator",
  description: "Learn about the mission, technical features, and the team behind the world's most advanced Random Pokemon Generator.",
  alternates: {
    canonical: "https://randompokemongenerator.info/about",
  },
};

export default function About() {
  return (
    <main className="container mx-auto px-6 py-24 max-w-4xl min-h-[80vh]">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-[1px] bg-lab-accent" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">About <span className="text-lab-accent text-glow">Our Mission</span></h1>
      </div>

      <div className="space-y-16">
        <section className="glass-card p-8 md:p-12 relative overflow-hidden border-lab-accent/10">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Info className="w-24 h-24" />
          </div>
          <p className="text-xl text-lab-text font-medium leading-relaxed italic border-l-2 border-lab-accent/30 pl-8">
            "Welcome to the world's most advanced and fastest Random Pokemon Generator. Our goal is to provide accurate and high-quality Pokémon data for every fan and player."
          </p>
        </section>
        
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Target className="w-4 h-4" />
              Our Core Goal
            </h2>
            <p className="text-lab-text-muted leading-relaxed">
              Our mission is to provide Pokémon trainers, competitive players, and casual fans with professional-grade tools to enhance their experience. Whether you're running a Nuzlocke challenge or building a team for a friendly match, we deliver the most accurate Pokémon data available.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Cpu className="w-4 h-4" />
              Technical Excellence
            </h2>
            <p className="text-lab-text-muted leading-relaxed">
              As long-time fans of the franchise, we found existing generators to be slow or outdated. We utilized Next.js and the official Pokémon database (PokéAPI) to build a platform that isn't just a utility, but a premium hub for the modern era.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Activity className="w-4 h-4" />
              Performance Standards
            </h2>
            <p className="text-lab-text-muted leading-relaxed">
              This website is optimized for speed. We use modern web technologies to ensure instant results, providing you with a smooth and responsive experience across all your devices.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Shield className="w-4 h-4" />
              Community Support
            </h2>
            <p className="text-lab-text-muted leading-relaxed">
              We are constantly refining our tools based on your feedback. If you find any issues or have suggestions for new features, please reach out to us. Thank you for choosing **Random Pokemon Generator**.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
