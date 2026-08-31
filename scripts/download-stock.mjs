import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images');

/** Unsplash — бесплатно для коммерческого использования (Unsplash License) */
const assets = [
  {
    id: 'stock-hero-kitchen',
    url: 'https://images.unsplash.com/photo-1556912173-46c336c0fdde?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    credit: 'Unsplash / Nathan Fertig',
  },
  {
    id: 'stock-kuhni',
    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    credit: 'Unsplash',
  },
  {
    id: 'stock-shkafy',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    credit: 'Unsplash',
  },
  {
    id: 'stock-prihozhie',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    credit: 'Unsplash',
  },
  {
    id: 'stock-detskaya',
    url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    credit: 'Unsplash',
  },
  {
    id: 'stock-ofis',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    width: 1200,
    height: 800,
    credit: 'Unsplash',
  },
];

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mebelka112-site/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function optimize(id, buffer, width) {
  const base = path.join(OUT, id);
  const resized = sharp(buffer).resize({
    width: Math.min(width, 1400),
    withoutEnlargement: true,
  });
  await resized.clone().webp({ quality: 82 }).toFile(`${base}.webp`);
  await resized.clone().avif({ quality: 65 }).toFile(`${base}.avif`);
  const meta = await resized.clone().jpeg({ quality: 85, mozjpeg: true }).toFile(`${base}.jpg`);
  return { width: meta.width, height: meta.height };
}

await fs.mkdir(OUT, { recursive: true });
const credits = {};

for (const asset of assets) {
  process.stdout.write(`${asset.id}... `);
  try {
    const buf = await download(asset.url);
    await optimize(asset.id, buf, asset.width);
    credits[asset.id] = asset.credit;
    console.log('ok');
  } catch (e) {
    console.log('fail', e.message);
  }
}

await fs.writeFile(
  path.join(OUT, 'stock-credits.json'),
  JSON.stringify(credits, null, 2),
  'utf8',
);
