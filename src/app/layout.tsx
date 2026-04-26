import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LabProvider } from "@/context/LabContext";
import LabTeamBar from "@/components/LabTeamBar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Random Pokemon Generator | Official #1 Pokémon Discovery Tool",
    template: "%s | Random Pokemon Generator"
  },
  description: "The most advanced and user-friendly Random Pokemon Generator! Generate random Pokémon from any region (Kanto to Paldea) with real-time stats, team building tools, and competitive data.",
  keywords: ["random pokemon generator", "pokemon generator", "nuzlocke pokemon generator", "random pokemon picker", "pokemon team builder", "pokemon stats database"],
  authors: [{ name: "Random Pokemon Generator Team" }],
  creator: "Random Pokemon Generator",
  publisher: "Random Pokemon Generator",
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
    title: "Advanced Random Pokemon Generator",
    description: "The ultimate tool for generating random Pokémon. Perfect for Nuzlockes, teambuilding, and discovery.",
    url: "https://randompokemongenerator.info",
    siteName: "Random Pokemon Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Random Pokemon Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Random Pokemon Generator",
    description: "The most advanced and beautiful Random Pokemon Generator on the web.",
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
      "@type": "SoftwareApplication",
      "name": "Random Pokemon Generator",
      "description": "The internet's #1 tool for generating random Pokémon results. Professional stats, team builder logic, and Gen 9 compliance.",
      "url": "https://randompokemongenerator.info",
      "applicationCategory": "Tool",
      "softwareVersion": "5.0.0",
      "author": {
        "@type": "Organization",
        "name": "Random Pokemon Generator Team",
        "url": "https://randompokemongenerator.info/about"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Random Pokemon Generator",
      "url": "https://randompokemongenerator.info",
      "logo": "https://randompokemongenerator.info/logo-v2.webp",
      "sameAs": [
        "https://github.com/Aegide/autogen-fusion-sprites"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://randompokemongenerator.info"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://randompokemongenerator.info/tools"
        }
      ]
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://assets.pokemon.com" />
        <link rel="dns-prefetch" href="https://assets.pokemon.com" />
        <link rel="dns-prefetch" href="https://pokeapi.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="sitemap" type="application/xml" href="https://randompokemongenerator.info/sitemap_index.xml" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6965739133010633" crossOrigin="anonymous"></script>
        
        {/* Google Analytics 4 (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FNDZ8GXBKP" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FNDZ8GXBKP');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <LabProvider>
          <div className="min-h-screen flex flex-col bg-lab-bg text-lab-text">
            <GlobalHeader />
            <main className="flex-grow">
              {children}
            </main>
            <GlobalFooter />
            <LabTeamBar />
          </div>
        </LabProvider>
      </body>
    </html>
  );
}
