"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="h-40 w-full bg-slate-200 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="h-6 w-3/4 bg-slate-200 rounded-md animate-pulse" />
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-3 w-8 bg-slate-100 rounded animate-pulse" />
              <div className="flex-1 h-2 bg-slate-100 rounded-full animate-pulse" />
              <div className="h-3 w-6 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
