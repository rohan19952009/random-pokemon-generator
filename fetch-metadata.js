const fs = require('fs');

async function writeData() {
    const legendaries = [];
    const mythicals = [];
    const batchSize = 100;
    
    for (let i = 1; i <= 1025; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j <= 1025; j++) batch.push(j);
        
        await Promise.all(batch.map(async (id) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null);
            if (res && res.ok) {
                const data = await res.json();
                if (data.is_legendary) legendaries.push(id);
                if (data.is_mythical) mythicals.push(id);
            }
        }));
    }
    
    const content = `
export const LEGENDARY_IDS = new Set(${JSON.stringify(legendaries.sort((a,b) => a-b))});
export const MYTHICAL_IDS = new Set(${JSON.stringify(mythicals.sort((a,b) => a-b))});
`;
    fs.writeFileSync('src/lib/pokemon-data.ts', content);
    console.log("File written: src/lib/pokemon-data.ts");
}

writeData();
