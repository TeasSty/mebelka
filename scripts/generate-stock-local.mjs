import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images');

/** Локальные исходники (VK) → варианты для hero и карточек категорий */
const map = [
  { id: 'stock-hero-kitchen', source: 'hero-kitchen.jpg', width: 1400, credit: 'МебельКа · ВКонтакте' },
  { id: 'stock-kuhni', source: 'portfolio-kitchen-02.jpg', width: 1200, credit: 'МебельКа · ВКонтакте' },
  { id: 'stock-shkafy', source: 'portfolio-shkaf-01.jpg', width: 1200, credit: 'МебельКа · ВКонтакте' },
  { id: 'stock-prihozhie', source: 'portfolio-prihozhaya-01.jpg', width: 1200, credit: 'МебельКа · ВКонтакте' },
  { id: 'stock-detskaya', source: 'portfolio-detskaya-01.jpg', width: 1200, credit: 'МебельКа · ВКонтакте' },
  { id: 'stock-ofis', source: 'portfolio-ofis-01.jpg', width: 1200, credit: 'МебельКа · ВКонтакте' },
];

async function optimize(id, inputPath, width) {
  const base = path.join(OUT, id);
  const resized = sharp(inputPath).resize({
    width,
    withoutEnlargement: true,
  });
  await resized.clone().webp({ quality: 82 }).toFile(`${base}.webp`);
  await resized.clone().avif({ quality: 65 }).toFile(`${base}.avif`);
  const meta = await resized.clone().jpeg({ quality: 85, mozjpeg: true }).toFile(`${base}.jpg`);
  return { width: meta.width, height: meta.height };
}

await fs.mkdir(OUT, { recursive: true });
const credits = {};

for (const item of map) {
  const src = path.join(OUT, item.source);
  process.stdout.write(`${item.id}... `);
  try {
    await fs.access(src);
    await optimize(item.id, src, item.width);
    credits[item.id] = item.credit;
    console.log('ok');
  } catch (e) {
    console.log('fail', e.message);
  }
}

await fs.writeFile(path.join(OUT, 'stock-credits.json'), JSON.stringify(credits, null, 2), 'utf8');
