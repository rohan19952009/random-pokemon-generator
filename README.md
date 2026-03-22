# 🎮 Random Pokémon Generator

> **The world's most advanced & fastest random Pokémon generator** — built with Next.js, powered by PokéAPI, and deployed on Cloudflare Pages.

🔗 **Live Site**: [randompokemongenerator.info](https://randompokemongenerator.info)

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)

---

## ✨ Features

- ⚡ **Extreme Speed v3** — 90KB core bundle with Just-In-Time hydration
- 🌍 **All 9 Regions** — Kanto to Paldea (Gen 1 to Gen 9)
- 🔍 **Advanced Filters** — Filter by Type, Region, Stage, and Legendary status
- 📱 **Mobile-First** — GPU-optimized CSS for zero-jank scrolling
- 🎴 **Pokémon Cards** — Click any card for detailed stats, lore, and artwork
- 🔝 **Scroll-to-Top** — Smooth navigation for large result sets
- 🌙 **Dark Mode** — Premium glassmorphism UI

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/random-pokemon-generator.git
cd random-pokemon-generator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (Turbopack)** | React Framework |
| **TypeScript** | Type Safety |
| **PokéAPI** | Pokémon Data |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Cloudflare Pages** | Hosting & CDN |
| **Wrangler** | Deployment |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main generator page
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── about/            # About page
│   ├── privacy-policy/   # Privacy policy
│   └── terms-of-service/ # Terms of service
├── components/
│   ├── PokemonCard.tsx   # Individual Pokémon card
│   ├── PokemonModal.tsx  # Detailed view modal
│   ├── GlobalHeader.tsx  # Site navigation
│   ├── GlobalFooter.tsx  # Site footer
│   └── ScrollToTop.tsx   # Scroll button
public/
├── sitemap_index.xml     # Google Search Console sitemap
├── robots.txt            # Crawler instructions
└── ads.txt               # Google AdSense verification
```

---

## 📦 Deployment

This project is deployed to **Cloudflare Pages** using Wrangler:

```bash
# Build the static export
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name poke-generator-ultra
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Credits

- Pokémon data from [PokéAPI](https://pokeapi.co/)
- Pokémon sprites from [assets.pokemon.com](https://assets.pokemon.com)
- Pokémon and all related names are trademarks of Nintendo
