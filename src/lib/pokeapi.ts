export interface TypeRelation {
  doubleDamageFrom: string[];
  halfDamageFrom: string[];
  noDamageFrom: string[];
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  height: number;
  weight: number;
  isLegendary: boolean;
  isMythical: boolean;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  abilities: string[];
  flavorText: string;
  relations: TypeRelation;
}

export type PokemonCount = number | "all";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

export async function getPokemonById(idOrName: string | number): Promise<Pokemon> {
  const [res, speciesRes] = await Promise.all([
    fetch(`${POKEAPI_BASE}/pokemon/${idOrName}`),
    fetch(`${POKEAPI_BASE}/pokemon-species/${idOrName}`)
  ]);

  if (!res.ok) throw new Error(`Pokemon ${idOrName} not found`);
  const data = await res.json();
  const speciesData = speciesRes.ok ? await speciesRes.json() : { 
    is_legendary: false, 
    is_mythical: false, 
    flavor_text_entries: [] 
  };

  const flavorText = speciesData.flavor_text_entries
    .find((entry: any) => entry.language.name === "en")?.flavor_text.replace(/\f/g, " ") || "This Pokémon remains a mystery in the records.";

  // Fetch type relations for immediate use
  const typeResults = await Promise.all(
    data.types.map((t: any) => fetch(`${POKEAPI_BASE}/type/${t.type.name}`).then(r => r.json()))
  );

  const doubleDamageFrom = new Set<string>();
  const halfDamageFrom = new Set<string>();
  const noDamageFrom = new Set<string>();

  typeResults.forEach((typeData: any) => {
    typeData.damage_relations.double_damage_from.forEach((t: any) => doubleDamageFrom.add(t.name));
    typeData.damage_relations.half_damage_from.forEach((t: any) => halfDamageFrom.add(t.name));
    typeData.damage_relations.no_damage_from.forEach((t: any) => noDamageFrom.add(t.name));
  });

  const finalWeak = Array.from(doubleDamageFrom).filter(t => !halfDamageFrom.has(t) && !noDamageFrom.has(t));
  const finalResist = Array.from(halfDamageFrom).filter(t => !doubleDamageFrom.has(t) && !noDamageFrom.has(t));
  const finalImmune = Array.from(noDamageFrom);

  const formattedId = String(data.id).padStart(3, "0");
  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t: any) => t.type.name),
    imageUrl,
    height: data.height,
    weight: data.weight,
    isLegendary: speciesData.is_legendary || LEGENDARY_IDS.has(data.id),
    isMythical: speciesData.is_mythical || MYTHICAL_IDS.has(data.id),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
    abilities: data.abilities.map((a: any) => a.ability.name),
    flavorText,
    relations: {
      doubleDamageFrom: finalWeak,
      halfDamageFrom: finalResist,
      noDamageFrom: finalImmune,
    }
  };
}

export interface TypeRelation {
  doubleDamageFrom: string[];
  halfDamageFrom: string[];
  noDamageFrom: string[];
}

// DEPRECATED: Combined into getPokemonById for Zero-Latency performance.
export async function getEnhancedPokemonData(pokemon: Pokemon): Promise<Pokemon> {
  return pokemon;
}

import { LEGENDARY_IDS, MYTHICAL_IDS } from "./pokemon-data";

let BUNDLED_MAP_LITE: Map<number, any> | null = null;
let BUNDLED_POKEMON_LITE: any[] = [];
let BUNDLED_MAP_FULL: Map<number, Pokemon> | null = null;

async function ensureLiteBundleLoaded() {
  if (BUNDLED_MAP_LITE) return;
  const BUNDLE = (await import("./pokedex-bundle-lite.json")).default;
  BUNDLED_POKEMON_LITE = BUNDLE;
  BUNDLED_MAP_LITE = new Map(BUNDLED_POKEMON_LITE.map(p => [p.id, p]));
}

export async function getFullPokemonDetails(id: number): Promise<Pokemon> {
  if (!BUNDLED_MAP_FULL) {
    const FULL_BUNDLE = (await import("./pokedex-bundle.json")).default;
    BUNDLED_MAP_FULL = new Map((FULL_BUNDLE as Pokemon[]).map(p => [p.id, p]));
  }
  
  const fromFull = BUNDLED_MAP_FULL.get(id);
  if (fromFull) return fromFull;
  
  // Fallback to API if not in Gen 1-4 bundle
  return getPokemonById(id);
}

export async function getRandomPokemon(count: PokemonCount = 1, filters: {
  region?: string;
  type?: string;
  isLegendary?: boolean;
  isMythical?: boolean;
}): Promise<Pokemon[]> {
  await ensureLiteBundleLoaded();
  const regions: Record<string, { start: number; end: number; gen: number }> = {
    all: { start: 1, end: 1025, gen: 0 },
    kanto: { start: 1, end: 151, gen: 1 },
    johto: { start: 152, end: 251, gen: 2 },
    hoenn: { start: 252, end: 386, gen: 3 },
    sinnoh: { start: 387, end: 493, gen: 4 },
    unova: { start: 494, end: 649, gen: 5 },
    kalos: { start: 650, end: 721, gen: 6 },
    alola: { start: 722, end: 809, gen: 7 },
    galar: { start: 810, end: 905, gen: 8 },
    paldea: { start: 906, end: 1025, gen: 9 },
  };

  const range = regions[filters.region || "all"];
  let poolIds: number[] = [];

  // Check if we can satisfy the request entirely from the bundle
  const isRequestBundled = filters.region && ["kanto", "johto", "hoenn", "sinnoh"].includes(filters.region);

  // 1. Resolve Initial Pool with 'Local-First' Type Filtering
  if (filters.type && filters.type !== "all") {
    if (isRequestBundled) {
      // Deep Local Filtering - 0 Network calls
      poolIds = BUNDLED_POKEMON_LITE
        .filter(p => p.id >= range.start && p.id <= range.end && p.types.includes(filters.type!.toLowerCase()))
        .map(p => p.id);
    } else {
      // Fallback for newer generations
      const res = await fetch(`${POKEAPI_BASE}/type/${filters.type.toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        poolIds = data.pokemon
          .map((p: any) => parseInt(p.pokemon.url.split("/").slice(-2, -1)[0]))
          .filter((id: number) => id >= range.start && id <= range.end);
      }
    }
  } else {
    // Basic range pool
    for (let i = range.start; i <= range.end; i++) poolIds.push(i);
  }

  // 2. Filter for Legendary/Mythical if requested - TURBO O(1) LOOKUP
  if (filters.isLegendary || filters.isMythical) {
    poolIds = poolIds.filter(id => {
      if (filters.isLegendary && LEGENDARY_IDS.has(id)) return true;
      if (filters.isMythical && MYTHICAL_IDS.has(id)) return true;
      return false;
    });
  }

  // 3. Final Selection
  if (poolIds.length === 0) return [];

  // Shuffle and slice
  const finalCount = count === "all" ? Math.min(poolIds.length, 2000) : Math.min(count, poolIds.length);
  const selectedIds = poolIds
    .sort(() => 0.5 - Math.random())
    .slice(0, finalCount);

  // 4. Ultra-Fast Hybrid Fetching (Bundled + Parallel Pool)
  const results: Pokemon[] = [];
  const queue: number[] = [];

  selectedIds.forEach(id => {
    if (BUNDLED_MAP_LITE!.has(id)) {
      const liteData = BUNDLED_MAP_LITE!.get(id)!;
      // Synthesize a minimal Pokemon object for the grid
      results.push({
        ...liteData,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
        height: 0,
        weight: 0,
        abilities: [],
        flavorText: "",
        relations: { doubleDamageFrom: [], halfDamageFrom: [], noDamageFrom: [] }
      } as Pokemon);
    } else {
      queue.push(id);
    }
  });

  if (queue.length > 0) {
    const concurrencyLevel = 60;
    const workers = Array.from({ length: Math.min(concurrencyLevel, queue.length) }).map(async () => {
      while (queue.length > 0) {
        const id = queue.shift();
        if (!id) break;
        try {
          const p = await getPokemonById(id);
          results.push(p);
        } catch (e) {
          console.error(`Failed to fetch ${id}:`, e);
        }
      }
    });
    await Promise.all(workers);
  }

  // Maintain original random order
  const orderMap = new Map(selectedIds.map((id, index) => [id, index]));
  return results.sort((a, b) => (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0));
}

export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
  "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export const REGIONS = [
  "all", "kanto", "johto", "hoenn", "sinnoh", "unova", "kalos", "alola", "galar", "paldea"
];
