const fs = require('fs');
const path = require('path');

const files = [
  'src/app/tools/team-planner/page.tsx',
  'src/app/tools/favorite-picker/page.tsx',
  'src/app/tools/nickname-generator/page.tsx',
  'src/app/tools/iv-calculator/page.tsx',
  'src/app/tools/fusion-generator/page.tsx',
  'src/app/tools/catch-rate/page.tsx',
  'src/app/tools/shiny-odds/page.tsx',
  'src/app/tools/compare/page.tsx',
  'src/app/games/whos-that-pokemon/page.tsx',
  'src/app/games/pokemon-wordle/page.tsx',
  'src/app/games/smash-or-pass/page.tsx',
];

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (!fs.existsSync(fullPath)) { console.log('SKIP (not found):', f); return; }
  let content = fs.readFileSync(fullPath, 'utf8');
  // Remove metadata import
  content = content.replace(/import type \{ Metadata \} from ['"]next['"];\s*\n/g, '');
  // Remove export const metadata block  
  content = content.replace(/export const metadata: Metadata = \{[^}]*(\{[^}]*\}[^}]*)*\};\s*\n/g, '');
  fs.writeFileSync(fullPath, content);
  console.log('Cleaned:', f);
});
console.log('Done!');
