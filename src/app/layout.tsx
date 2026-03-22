import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ff1f1f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Random Pokémon Generator | Ultra Modern & Fast",
    template: "%s | Random Pokémon Generator"
  },
  description: "The ultimate Pokémon generator! Generate random Pokémon from any region (Kanto to Paldea), filter by type, stage, legends, and more. Modern, fast, and mobile-friendly.",
  keywords: ["pokemon generator", "random pokemon", "pokeapi", "pokemon filters", "pokemon team builder", "pokemon tools"],
  authors: [{ name: "PokeGen Team" }],
  creator: "PokeGen Team",
  publisher: "PokeGen Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://randompokemongenerator.info"),
  alternates: {
    canonical: "https://randompokemongenerator.info",
  },
  openGraph: {
    title: "Random Pokémon Generator",
    description: "Generate and discover random Pokémon with ease. The most advanced Pokemon selection tool on the web.",
    url: "https://randompokemongenerator.info",
    siteName: "Random Pokémon Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Random Pokémon Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Pokémon Generator",
    description: "The most advanced and beautiful Pokémon generator on the web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Random Pokémon Generator",
      "description": "The most advanced and visually stunning Pokémon generator on the web. Generate random Pokémon with custom filters for regions, types, and legendary status.",
      "url": "https://randompokemongenerator.info",
      "applicationCategory": "DeveloperApplication",
      "genre": "Pokemon Tool",
      "browserRequirements": "Requires JavaScript",
      "softwareVersion": "1.0.0",
      "author": {
        "@type": "Organization",
        "name": "PokeGen Experts",
        "url": "https://randompokemongenerator.info/about"
      },
      "featureList": [
        "Random Pokémon generation from Kanto to Paldea",
        "Advanced filtering by Region, Type, and Rarity",
        "Real-time Base Stat visualization",
        "Nuzlocke-ready teambuilder compatibility",
        "Mobile-optimized progressive experience"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many Pokémon can I generate at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can generate up to 24 Pokémon in a single click. This is ideal for quickly drafting multiple teams or populating a large roster for a draft league."
          }
        },
        {
          "@type": "Question",
          "name": "Does this include Gen 9 Paldea Pokémon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our generator is fully updated with the latest entries from the Paldea region (Gen 9), including the newest legendaries and regional variants."
          }
        },
        {
          "@type": "Question",
          "name": "Which regions are supported by the generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support every major region in the franchise: Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea."
          }
        },
        {
          "@type": "Question",
          "name": "Are the stats accurate for competitive play?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. The base stats (HP, ATK, DEF, SPE) are pulled directly from PokéAPI game data, making this a reliable tool for competitive theory-crafting."
          }
        }
      ]
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://assets.pokemon.com" />
        <link rel="dns-prefetch" href="https://assets.pokemon.com" />
        <link rel="preload" as="image" href="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" fetchPriority="high" />
        <link rel="preload" as="image" href="https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://pokeapi.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="sitemap" type="application/xml" href="https://randompokemongenerator.info/sitemap_index.xml" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6965739133010633" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col bg-slate-100">
          <GlobalHeader />
          {children}
          <GlobalFooter />
        </div>
      </body>
    </html>
  );
}
