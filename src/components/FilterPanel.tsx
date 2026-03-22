"use client";

import { POKEMON_TYPES, REGIONS, type PokemonCount } from "@/lib/pokeapi";
import { ChevronDown, RefreshCw } from "lucide-react";

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
    <div className="glass-card p-4 md:p-6 rounded-2xl mb-6 md:mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 items-end">
        <div className="col-span-1">
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Region</label>
          <div className="relative group">
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="w-full h-11 md:h-12 px-3 md:px-4 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-poke-red outline-none capitalize text-sm md:text-base shadow-sm text-slate-900 transition-all"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region} className="bg-white text-slate-900">
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-poke-red transition-colors" />
          </div>
        </div>
        
        <div className="col-span-1">
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Type</label>
          <div className="relative group">
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full h-11 md:h-12 px-3 md:px-4 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-poke-red outline-none capitalize text-sm md:text-base shadow-sm text-slate-900 transition-all"
            >
              <option value="all" className="bg-white text-slate-900">All Types</option>
              {POKEMON_TYPES.map((type) => (
                <option key={type} value={type} className="bg-white text-slate-900">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-poke-red transition-colors" />
          </div>
        </div>
        
        <div className="col-span-1">
          <label className="block text-[10px] md:text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Amount</label>
          <div className="relative group">
            <select
              value={filters.count}
              onChange={(e) => setFilters({ ...filters, count: e.target.value === "all" ? "all" : parseInt(e.target.value) })}
              className="w-full h-11 md:h-12 px-3 md:px-4 bg-white border border-slate-200 rounded-lg md:rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-poke-red outline-none text-sm md:text-base shadow-sm text-slate-900 transition-all font-bold"
            >
              {[1, 3, 6, 9, 12, 18, 24, 36, 48, 60, 100].map((num) => (
                <option key={num} value={num} className="bg-white text-slate-900">
                  {num} Pokémon
                </option>
              ))}
              <option value="all" className="bg-white text-slate-900 font-bold">Show All</option>
            </select>
            <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-poke-red transition-colors" />
          </div>
        </div>

        <div className="col-span-1 flex gap-2">
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
            className="poke-button poke-button-primary h-11 md:h-12 w-full flex items-center justify-center gap-2 group disabled:opacity-50 text-sm font-black tracking-widest uppercase"
          >
            <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            {loading ? "..." : "Generate"}
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
      className={`flex-1 h-11 md:h-12 rounded-lg md:rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-0.5 ${
        checked 
        ? "bg-poke-yellow/10 border-poke-gold text-poke-gold" 
        : "bg-slate-50 border-transparent text-slate-400 hover:border-slate-200"
      }`}
    >
      <span className="text-[9px] font-black uppercase tracking-tighter leading-none">{label}</span>
      <span className={`text-[10px] font-bold leading-none ${checked ? "opacity-100" : "opacity-30"}`}>
        {checked ? "ON" : "OFF"}
      </span>
    </button>
  );
}
