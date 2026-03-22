import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, 'public');

const logos = [
  { in: 'random-pokemon-generator.webp', out: 'logo-v2.webp' },
  { in: 'random-pokemon-generator-back.webp', out: 'logo-back-v2.webp' }
];

async function optimize() {
  for (const logo of logos) {
    const input = join(publicDir, logo.in);
    if (!fs.existsSync(input)) {
        console.log(`Skipping ${logo.in} - not found`);
        continue;
    }

    const output = join(publicDir, logo.out);

    console.log(`Creating ${logo.out}...`);
    await sharp(input)
      .resize(128, 128, { fit: 'inside' })
      .webp({ quality: 60, effort: 6 })
      .toFile(output);
    
    console.log(`Created ${logo.out}`);
  }
}

optimize().catch(console.error);
