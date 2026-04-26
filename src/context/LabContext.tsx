"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type Pokemon } from "@/lib/pokeapi";

interface LabContextType {
  team: Pokemon[];
  addToTeam: (pokemon: Pokemon) => boolean;
  removeFromTeam: (id: number) => void;
  clearTeam: () => void;
  isPokemonInTeam: (id: number) => boolean;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

export function LabProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<Pokemon[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lab_team");
    if (saved) {
      try {
        setTeam(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load lab team:", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("lab_team", JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon: Pokemon) => {
    if (team.length >= 6) return false;
    if (team.some(p => p.id === pokemon.id)) return false;
    
    setTeam(prev => [...prev, pokemon]);
    return true;
  };

  const removeFromTeam = (id: number) => {
    setTeam(prev => prev.filter(p => p.id !== id));
  };

  const clearTeam = () => {
    setTeam([]);
  };

  const isPokemonInTeam = (id: number) => {
    return team.some(p => p.id === id);
  };

  return (
    <LabContext.Provider value={{ team, addToTeam, removeFromTeam, clearTeam, isPokemonInTeam }}>
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  const context = useContext(LabContext);
  if (context === undefined) {
    throw new Error("useLab must be used within a LabProvider");
  }
  return context;
}
