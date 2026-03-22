import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Random Pokémon Generator",
  description: "By using our website, you agree to these legal terms and conditions. Learn about our service, usage rules, and content reliability.",
  alternates: {
    canonical: "https://randompokemongenerator.info/terms-of-service",
  },
};

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">Welcome to Random Pokémon Generator!</p>
        <p>These terms and conditions outline the rules and regulations for the use of Random Pokémon Generator's Website, located at **randompokemongenerator.info**.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Random Pokémon Generator if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cookies</h2>
        <p>We employ the use of cookies. By accessing Random Pokémon Generator, you agreed to use cookies in agreement with the Random Pokémon Generator's Privacy Policy.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">License</h2>
        <p>Unless otherwise stated, Random Pokémon Generator and/or its licensors own the intellectual property rights for all material on Random Pokémon Generator. All intellectual property rights are reserved. You may access this from Random Pokémon Generator for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from Random Pokémon Generator</li>
          <li>Sell, rent or sub-license material from Random Pokémon Generator</li>
          <li>Reproduce, duplicate or copy material from Random Pokémon Generator</li>
          <li>Redistribute content from Random Pokémon Generator</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Content Liability</h2>
        <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
        <ul>
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
        <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
      </div>
    </main>
  );
}
