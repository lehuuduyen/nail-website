/**
 * Convert public/images PNG/JPG → WebP (quality 82). Run: node scripts/convert-images-to-webp.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public/images');

const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const inPath = path.join(dir, file);
  const base = file.replace(/\.[^.]+$/i, '');
  const outPath = path.join(dir, `${base}.webp`);
  const meta = await sharp(inPath).webp({ quality: 82, effort: 6 }).toFile(outPath);
  console.log(`${file} → ${base}.webp (${meta.width}×${meta.height}, ${(meta.size / 1024).toFixed(1)} KB)`);
}
