import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const images = ['car-innova'];

  for (const name of images) {
    const inPath = path.join(__dirname, `src/assets/images/${name}.png`);
    const outPath = path.join(__dirname, `src/assets/images/${name}.webp`);

    if (fs.existsSync(inPath)) {
      await sharp(inPath)
        .webp({ quality: 80, alphaQuality: 80 })
        .toFile(outPath);
      const stats = fs.statSync(outPath);
      console.log(`Created: ${name}.webp - Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`Missing: ${inPath}`);
    }
  }
}

optimizeImages();
