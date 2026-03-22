const fs = require('fs');
const path = require('path');

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

async function fetchPokemon(id) {
  try {
    const [res, speciesRes] = await Promise.all([
      fetch(`${POKEAPI_BASE}/pokemon/${id}`),
      fetch(`${POKEAPI_BASE}/pokemon-species/${id}`)
    ]);

    const data = await res.json();
    const speciesData = speciesRes.ok ? await speciesRes.json() : { 
      is_legendary: false, 
      is_mythical: false, 
      flavor_text_entries: [] 
    };

    let flavorText = speciesData.flavor_text_entries
      .find((entry) => entry.language.name === "en")?.flavor_text || "No description available.";
    
    flavorText = flavorText
      .replace(/\f/g, " ")
      .replace(/\n/g, " ")
      .replace(/\r/g, " ")
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
      .replace(/[^\x00-\x7F]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const typeResults = await Promise.all(
      data.types.map((t) => fetch(`${POKEAPI_BASE}/type/${t.type.name}`).then(r => r.json()))
    );

    const doubleDamageFrom = new Set();
    const halfDamageFrom = new Set();
    const noDamageFrom = new Set();

    typeResults.forEach((typeData) => {
      typeData.damage_relations.double_damage_from.forEach((t) => doubleDamageFrom.add(t.name));
      typeData.damage_relations.half_damage_from.forEach((t) => halfDamageFrom.add(t.name));
      typeData.damage_relations.no_damage_from.forEach((t) => noDamageFrom.add(t.name));
    });

    const finalWeak = Array.from(doubleDamageFrom).filter(t => !halfDamageFrom.has(t) && !noDamageFrom.has(t));
    const finalResist = Array.from(halfDamageFrom).filter(t => !doubleDamageFrom.has(t) && !noDamageFrom.has(t));
    const finalImmune = Array.from(noDamageFrom);

    const formattedId = String(data.id).padStart(3, "0");

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t) => t.type.name),
      imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`,
      height: data.height,
      weight: data.weight,
      isLegendary: speciesData.is_legendary,
      isMythical: speciesData.is_mythical,
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      abilities: data.abilities.map((a) => a.ability.name),
      flavorText,
      relations: {
        doubleDamageFrom: finalWeak,
        halfDamageFrom: finalResist,
        noDamageFrom: finalImmune,
      }
    };
  } catch (e) {
    console.error(`Error fetching ${id}:`, e);
    return null;
  }
}

async function run() {
  const results = [];
  const chunkSize = 20;
  for (let i = 1; i <= 493; i += chunkSize) {
    const chunk = [];
    for (let j = i; j < i + chunkSize && j <= 493; j++) {
      chunk.push(fetchPokemon(j));
    }
    const chunkResults = await Promise.all(chunk);
    results.push(...chunkResults.filter(r => r !== null));
    console.warn(`Chunk ${i}-${i + chunkSize - 1} done...`);
  }
  
  const targetPath = path.join(__dirname, '..', 'src', 'lib', 'pokedex-bundle.json');
  fs.writeFileSync(targetPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Successfully wrote ${results.length} entries to ${targetPath}`);
}

run();
