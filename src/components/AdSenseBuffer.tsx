"use client";

import { Info } from "lucide-react";

interface AdSenseBufferProps {
  id: string;
  height?: string;
  className?: string;
  label?: string;
}

/**
 * AdSenseBuffer Component
 * 
 * Prevents Layout Shift (CLS) by reserving exact pixel height for AdSense units.
 * Styled to maintain the Pokédex Lab aesthetic even when empty.
 */
export function AdSenseBuffer({ 
  id, 
  height = "280px", 
  className = "", 
  label = "Sponsored Lab Signature" 
}: AdSenseBufferProps) {
  return (
    <div 
      className={`relative w-full overflow-hidden glass-card border-lab-accent/5 my-12 ${className}`}
      style={{ minHeight: height }}
    >
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Ad Label */}
      <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 border-b border-l border-white/10 rounded-bl-xl text-[9px] font-black uppercase tracking-widest text-white/20 select-none">
        {label}
      </div>

      {/* Internal Ad Rendering Node */}
      <div className="flex items-center justify-center h-full min-h-[inherit]">
        <div id={id} className="adsbygoogle-container w-full h-full flex items-center justify-center">
            {/* AdSense ins tag will be injected here during runtime */}
            <div className="flex flex-col items-center gap-2 opacity-5">
                <Info className="w-5 h-5 text-lab-accent" />
                <span className="text-[10px] uppercase font-black tracking-widest">Telemetry Buffer</span>
            </div>
        </div>
      </div>

      {/* Lab Accent Glow */}
      <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-lab-accent/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
