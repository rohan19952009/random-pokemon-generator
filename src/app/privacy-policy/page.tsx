import { Metadata } from "next";
import { Shield, Lock, Eye, Cookie, Info, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Random Pokemon Generator",
  description: "Official privacy policy for Random Pokemon Generator. Learn how we handle your data and session information.",
  alternates: {
    canonical: "https://randompokemongenerator.info/privacy-policy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-6 py-24 max-w-4xl min-h-[80vh]">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-[1px] bg-lab-accent" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Privacy <span className="text-lab-accent text-glow">Policy</span></h1>
      </div>

      <div className="space-y-16">
        <section className="glass-card p-8 md:p-12 relative overflow-hidden border-lab-accent/10">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Shield className="w-24 h-24" />
          </div>
          <p className="text-xl text-lab-text font-medium leading-relaxed italic border-l-2 border-lab-accent/30 pl-8">
            "Last Updated: March 20, 2026. At Random Pokemon Generator, our primary goal is the security of your data and session information."
          </p>
        </section>

        <div className="grid gap-12 text-lab-text-muted leading-relaxed">
          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Activity className="w-4 h-4" />
              1.0 Log File Analysis
            </h2>
            <p>
              Random Pokemon Generator follows standard procedures for log file generation. These logs document visitors during their session on our website. This data includes IP addresses, browser information, ISP identifiers, and timestamps. This data remains non-identifiable and is used solely for optimizing the website experience.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Cookie className="w-4 h-4" />
              2.0 Cookies & Data
            </h2>
            <p>
              Our website uses cookies to store your preferences and session state (such as your saved team). These are used to optimize your experience by remembering your settings across different visits.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Info className="w-4 h-4" />
              3.0 Third-Party Services
            </h2>
            <p>
              We use Google as a secondary service provider. They may use cookies (like DART cookies) to serve relevant advertisements based on your visit to **randompokemongenerator.info**. Users may choose to opt-out of these protocols via the official Google Ad Network Privacy page.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-lab-accent mb-6 italic">
              <Eye className="w-4 h-4" />
              4.0 Children's Privacy
            </h2>
            <p>
              Random Pokemon Generator does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe such data has been collected, please contact us immediately for prompt deletion.
            </p>
          </section>

          <section className="pt-10 border-t border-lab-border">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-lab-text mb-4">5.0 Your Consent</h2>
            <p className="italic">
              By using our website, you hereby consent to our Privacy Policy and agree to our Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
