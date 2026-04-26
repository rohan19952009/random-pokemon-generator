import { Metadata } from "next";
import { Gavel, FileText, Scale, ShieldAlert, Cpu, Terminal } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Random Pokemon Generator",
  description: "Official usage terms for Random Pokemon Generator. Review the rules governing your use of our Pokémon tools and games.",
  alternates: {
    canonical: "https://randompokemongenerator.info/terms-of-service",
  },
};

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-6 py-24 max-w-4xl min-h-[80vh]">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-[1px] bg-lab-accent" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Terms of <span className="text-lab-accent text-glow">Service</span></h1>
      </div>

      <div className="space-y-16">
        <section className="glass-card p-8 md:p-12 relative overflow-hidden border-lab-accent/10">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Gavel className="w-24 h-24" />
          </div>
          <p className="text-xl text-lab-text font-medium leading-relaxed italic border-l-2 border-lab-accent/30 pl-8">
            "Welcome to Random Pokemon Generator. These terms govern your use of the Pokémon tools and games located at **randompokemongenerator.info**."
          </p>
        </section>

        <div className="grid gap-12 text-lab-text-muted leading-relaxed">
          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Terminal className="w-4 h-4" />
              1.0 Website Usage
            </h2>
            <p>
              By accessing this website, we assume you accept these terms of service in their entirety. Do not continue to use Random Pokemon Generator if you do not agree to the terms stated on this page.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Cpu className="w-4 h-4" />
              2.0 Intellectual Property
            </h2>
            <p>
              Unless otherwise stated, Random Pokemon Generator and/or its licensors own all intellectual property rights for the data algorithms and visual interfaces. All rights are reserved. You are authorized for personal use only, subject to the following restrictions:
            </p>
            <ul className="list-disc pl-10 space-y-2 mt-4 marker:text-lab-accent">
              <li>Republishing website content is strictly prohibited.</li>
              <li>Attempting to sell or sub-license our data is forbidden.</li>
              <li>Replicating our Fusion Generator logic is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Scale className="w-4 h-4" />
              3.0 Liability
            </h2>
            <p>
              We shall not be held responsible for any data issues or connectivity errors that occur on your device. You agree to protect Random Pokemon Generator against all claims arising from your use of these tools.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <ShieldAlert className="w-4 h-4" />
              4.0 Disclaimer
            </h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all warranties relating to the absolute accuracy of the random results. While we sync with official databases (PokéAPI), results are for entertainment and strategic planning only. We will not be liable for any data loss or strategy failures in competitive play.
            </p>
          </section>

          <section className="pt-10 border-t border-lab-border flex justify-center">
            <Link href="/" className="text-xs font-black uppercase tracking-[0.4em] text-lab-text hover:text-lab-accent transition-colors">
              [ RETURN TO GENERATOR ]
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
