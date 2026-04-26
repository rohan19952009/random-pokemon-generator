"use client";

import { POKEMON_TYPES, REGIONS, type PokemonCount } from "@/lib/pokeapi";
import { ChevronDown, RefreshCw, Layers, Map, Trash2, Cpu } from "lucide-react";

interface FilterPanelProps {
  onGenerate: () => void;
  filters: {
    region: string;
    type: string;
    count: PokemonCount;
    isLegendary: boolean;
    isMythical: boolean;
  };
  setFilters: (filters: {
    region: string;
    type: string;
    count: PokemonCount;
    isLegendary: boolean;
    isMythical: boolean;
  }) => void;
  loading: boolean;
}

export function FilterPanel({ onGenerate, filters, setFilters, loading }: FilterPanelProps) {
  return (
    <div className="glass-card p-6 md:p-8 relative overflow-hidden">
      {/* Technical Header Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lab-accent/40 to-transparent" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-end relative z-10">
        <div className="col-span-1">
          <label className="flex items-center gap-2 text-[10px] font-black text-lab-accent mb-3 uppercase tracking-[0.2em]">
            <Map className="w-3 h-3" />
            Region Buffer
          </label>
          <div className="relative group">
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              aria-label="Select Pokémon search region"
              className="w-full h-12 px-4 bg-white/5 border border-lab-border rounded-xl appearance-none cursor-pointer focus:border-lab-accent focus:ring-1 focus:ring-lab-accent outline-none capitalize text-sm font-bold text-lab-text transition-all"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region} className="bg-lab-bg text-lab-text">
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-text-muted pointer-events-none group-hover:text-lab-accent transition-colors" />
          </div>
        </div>
        
        <div className="col-span-1">
          <label className="flex items-center gap-2 text-[10px] font-black text-lab-accent mb-3 uppercase tracking-[0.2em]">
            <Layers className="w-3 h-3" />
            Type Filter
          </label>
          <div className="relative group">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              aria-label="Filter signatures by Pokémon type"
              className="w-full h-12 px-4 bg-white/5 border border-lab-border rounded-xl appearance-none cursor-pointer focus:border-lab-accent focus:ring-1 focus:ring-lab-accent outline-none capitalize text-sm font-bold text-lab-text transition-all"
            >
              <option value="all" className="bg-lab-bg text-lab-text">All Types</option>
              {POKEMON_TYPES.map((type) => (
                <option key={type} value={type} className="bg-lab-bg text-lab-text">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-text-muted pointer-events-none group-hover:text-lab-accent transition-colors" />
          </div>
        </div>
        
        <div className="col-span-1">
          <label className="flex items-center gap-2 text-[10px] font-black text-lab-accent mb-3 uppercase tracking-[0.2em]">
            <Cpu className="w-3 h-3" />
            Signal Count
          </label>
          <div className="relative group">
            <select
              value={filters.count}
              onChange={(e) => setFilters({ ...filters, count: e.target.value === "all" ? "all" : parseInt(e.target.value) })}
              aria-label="Select extraction unit count"
              className="w-full h-12 px-4 bg-white/5 border border-lab-border rounded-xl appearance-none cursor-pointer focus:border-lab-accent focus:ring-1 focus:ring-lab-accent outline-none text-sm font-black text-lab-text transition-all"
            >
              {[1, 3, 6, 9, 12, 18, 24, 36, 48, 60, 100].map((num) => (
                <option key={num} value={num} className="bg-lab-bg text-lab-text">
                  {num} Units
                </option>
              ))}
              <option value="all" className="bg-lab-bg text-lab-text font-black">Full Array</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lab-text-muted pointer-events-none group-hover:text-lab-accent transition-colors" />
          </div>
        </div>

        <div className="col-span-1 flex gap-3">
          <Toggle
            label="Legend"
            checked={filters.isLegendary}
            onChange={(checked) => setFilters({ ...filters, isLegendary: checked })}
          />
          <Toggle
            label="Mythic"
            checked={filters.isMythical}
            onChange={(checked) => setFilters({ ...filters, isMythical: checked })}
          />
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <button
            onClick={onGenerate}
            disabled={loading}
            aria-label="Initialize high-fidelity Pokémon signature extraction"
            className="lab-button lab-button-primary h-12 w-full text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,242,255,0.2)]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-700"}`} />
            {loading ? "SCANNING..." : "INITIALIZE"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`flex-1 h-12 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden ${
        checked 
        ? "bg-lab-accent/10 border-lab-accent text-lab-accent shadow-[inset_0_0_10px_rgba(0,242,255,0.1)]" 
        : "bg-white/5 border-lab-border text-lab-text-muted hover:border-lab-accent/40"
      }`}
    >
      <span className="text-[9px] font-black uppercase tracking-widest leading-none z-10">{label}</span>
      <span className={`text-[8px] font-black leading-none z-10 ${checked ? "text-lab-accent" : "text-white/20"}`}>
        {checked ? "[ ACTIVE ]" : "[ OFFLINE ]"}
      </span>
      {checked && (
        <div className="absolute inset-0 bg-lab-accent/5 animate-pulse" />
      )}
    </button>
  );
}

