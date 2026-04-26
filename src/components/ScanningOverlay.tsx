"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ScanningOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function ScanningOverlay({ isVisible, message = "EXTRACTING DATA..." }: ScanningOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 overflow-hidden rounded-2xl md:rounded-3xl pointer-events-none"
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-lab-bg/60 backdrop-blur-[2px]" />

          {/* Scanning Beam */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute left-0 w-full h-12 bg-gradient-to-b from-transparent via-lab-accent/30 to-transparent shadow-[0_0_20px_rgba(0,242,255,0.4)] z-50"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Status Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                    className="w-2 h-2 rounded-full bg-lab-accent shadow-[0_0_8px_rgba(0,242,255,0.8)]"
                  />
                ))}
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] text-lab-accent text-glow uppercase animate-pulse">
                {message}
              </span>
            </div>
          </div>

          {/* Corner Decors */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-lab-accent/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-lab-accent/40" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-lab-accent/40" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-lab-accent/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
