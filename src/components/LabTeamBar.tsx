"use client";

import { useLab } from "@/context/LabContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ChevronUp, ChevronDown, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LabTeamBar() {
  const { team, removeFromTeam, clearTeam } = useLab();
  const [isExpanded, setIsExpanded] = useState(true);

  if (team.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-4xl">
      <div className="relative">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-lab-accent/10 backdrop-blur-md border border-lab-accent/30 rounded-t-xl text-[10px] font-black uppercase tracking-[0.2em] text-lab-accent flex items-center gap-2 hover:bg-lab-accent hover:text-lab-bg transition-all"
        >
          {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          {isExpanded ? "Minimize Lab" : `Lab Team (${team.length}/6)`}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="glass-card p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-lab-accent/30 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex flex-col items-center md:items-start gap-1 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-lab-accent animate-pulse" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-lab-text">Current Extraction Team</h3>
                </div>
                <p className="text-[9px] text-lab-text-muted font-bold">{team.length} of 6 slots occupied</p>
              </div>

              <div className="flex-1 flex justify-center md:justify-start gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {Array.from({ length: 6 }).map((_, i) => {
                  const p = team[i];
                  return (
                    <div 
                      key={i} 
                      className={`relative w-14 h-14 md:w-20 md:h-20 rounded-2xl border-2 transition-all flex items-center justify-center overflow-hidden flex-shrink-0 ${
                        p 
                        ? `bg-type-${p.types[0]}/10 border-lab-accent/40 shadow-[0_0_15px_rgba(0,242,255,0.1)]` 
                        : "bg-white/5 border-white/5 border-dashed"
                      }`}
                    >
                      {p ? (
                        <>
                          <div className="relative w-12 h-12 md:w-16 md:h-16 z-10">
                            <Image
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                              alt={p.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <button
                            onClick={() => removeFromTeam(p.id)}
                            className="absolute top-1 right-1 p-1 bg-black/40 text-white/60 hover:text-white rounded-md z-20 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <div className="text-white/5 text-[10px] font-black uppercase tracking-tighter">Empty Slot</div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={clearTeam}
                  className="p-3 text-lab-text-muted hover:text-lab-accent transition-colors group"
                  title="Clear All Slots"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
