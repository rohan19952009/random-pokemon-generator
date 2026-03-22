import Image from "next/image";
import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="bg-white text-slate-900 py-12 px-6 border-t border-slate-100 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link 
            href="https://randompokemongenerator.info/"
            title="Return to Random Pokémon Generator Home"
            aria-label="Pokémon Generator Home"
          >
            <div className="relative h-20 w-20 md:h-24 md:w-24 mx-auto md:mx-0 opacity-100 transition-opacity cursor-pointer">
              <Image
                src="/logo-v2.webp"
                alt="Random Pokémon Generator"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </Link>
          <p className="text-sm font-bold text-slate-800 mt-4 max-w-[200px]">
            The world's most advanced Random Pokémon picker
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-black uppercase tracking-widest text-slate-900">
          <Link href="/" className="hover:text-poke-red transition-colors">Generator</Link>
          <Link href="/about" className="hover:text-poke-red transition-colors">About</Link>
          <Link href="/privacy-policy" className="hover:text-poke-red transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-poke-red transition-colors">Terms</Link>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] text-slate-900 font-black uppercase tracking-wider">
            © 2026 Random Pokémon Generator
          </p>
          <p className="text-[9px] text-slate-600 mt-1 italic font-medium">
            Pokémon and Pokémon character names are trademarks of Nintendo.
          </p>
        </div>
      </div>
    </footer>
  );
}
