"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled ? "py-2 bg-white/90 backdrop-blur-md border-slate-100 shadow-sm" : "py-4 bg-white/60 border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-start items-center h-20 md:h-24">
          <Link 
            href="https://randompokemongenerator.info/"
            title="Return to Random Pokémon Generator Home"
            aria-label="Pokémon Generator Home"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={scrolled ? "logo-back" : "logo-front"}
              className={`relative flex items-center justify-center p-0 cursor-pointer transition-all duration-500 ${
                scrolled ? "h-16 w-16 md:h-20 md:w-20" : "h-20 w-20 md:h-28 md:w-28"
              }`}
            >
              <Image
                src={scrolled ? "/logo-back-v2.webp" : "/logo-v2.webp"}
                alt="Random Pokémon Generator Logo"
                fill
                className="object-contain drop-shadow-sm transition-opacity duration-300"
                priority
              />
            </motion.div>
          </Link>
        </div>
      </header>
      {/* Spacing Offset for Fixed Header */}
      <div className={`transition-all duration-500 ${scrolled ? "h-20 md:h-24" : "h-24 md:h-32"}`} />
    </>
  );
}
