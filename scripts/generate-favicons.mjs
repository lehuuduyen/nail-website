/**
 * Build favicons from public/_favicon-source.png (center square crop → resize).
 * Setup: place logo PNG at public/_favicon-source.png, then: npm run favicons
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, '../public');
const src = path.join(pub, '_favicon-source.png');

async function getExtractParams() {
  const meta = await sharp(src).metadata();
  const w = meta.width ?? 1024;
  const h = meta.height ?? 1024;
  const size = Math.min(w, h);
  const left = Math.floor((w - size) / 2);
  const top = Math.floor((h - size) / 2);
  return { left, top, width: size, height: size };
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Missing public/_favicon-source.png');
    process.exit(1);
  }

  const extract = await getExtractParams();
  const base = () => sharp(src).extract(extract);

  const outputs = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['apple-touch-icon.png', 180],
    ['android-chrome-192x192.png', 192],
    ['android-chrome-512x512.png', 512],
  ];

  for (const [filename, px] of outputs) {
    await base()
      .resize(px, px, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(pub, filename));
    console.log('wrote', filename);
  }

  const buf16 = await base()
    .resize(16, 16, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  const buf32 = await base()
    .resize(32, 32, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  const ico = await toIco([buf16, buf32]);
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico);
  console.log('wrote favicon.ico (16+32)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
