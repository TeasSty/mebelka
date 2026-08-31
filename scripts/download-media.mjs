import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images');

const assets = [
  {
    id: 'logo',
    url: 'https://sun9-72.vkuserphoto.ru/s/v1/ig2/dk9lbR89sj21bRMnmsXjQjiMUJDZ6bo8og4w3nfHtgjYa3CEAWdYlatGD46B6W3io1PNynZ7vuFDGTcwsTkCPwp2.jpg?quality=95&crop=408,6,1034,1034&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&u=NSRFvcBCZVuACeJTdfkS82vi_h6KPPMhxZ81whB6tiw&cs=720x720',
    width: 720,
    height: 720,
  },
  {
    id: 'cover',
    url: 'https://sun9-31.vkuserphoto.ru/impg/UYPxXBRULw3wngxjgz7d3kEBD5qNAcJ9rKFKcQ/wN3DHaZ3wTQ.jpg?quality=95&crop=0.011764705882353,0.13333333333333,0.98039215686275,0.73333333333333&sign=95bd450730498bf5225fa0d05d3ef85e&c_uniq_tag=bbLsJ6NXCi8X9bwhMkjC5sP6KxrTxwQ1lounjI2has8',
    width: 1920,
    height: 640,
  },
  {
    id: 'hero-kitchen',
    url: 'https://sun9-80.vkuserphoto.ru/s/v1/ig2/AL6FyyOk65t7w-Hu3BBdeE6YH9fUja1q1-ysIjsDEF13uRc5ayxg3j7I2Am5tqlaBAwiNSZpNjAsyPkFRuhEAnYS.jpg?quality=95&crop=0,0,2160,1620&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2160x1620&from=bu&u=rk9SslTpBQJtvC5xhzlHOu2-ngciYjTSNQNbwGEmL5Y&cs=1280x0',
    width: 1280,
    height: 960,
  },
  {
    id: 'portfolio-kitchen-01',
    url: 'https://sun9-9.vkuserphoto.ru/s/v1/ig2/7SW8tYG_DC7CqDltKwJvQJa7WtiW_yWnVUsRt4QdI8mCYXB4b1PfFILQPhlL2zC-2g-miHsKuNtz4FghpSclAQfb.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=tB5vU0uGKYHlqnFLcaZVfjtBvhMOJK2Uw-BeO1HN6XU&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'kuhni',
  },
  {
    id: 'portfolio-kitchen-02',
    url: 'https://sun9-80.vkuserphoto.ru/s/v1/ig2/hF_ez97L4gb6I-eOxyzB1k9d7ooKnC0us9hT1u2qku-4rVaakZvKg52seQQYY_u8SxjOoNMYClAMDSn-Onb83fjL.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2160x1620&from=bu&u=QJotd3Phu5RsPq4khcof0xF588FPiScs_xXX7OGzMvY&cs=1280x0',
    width: 1280,
    height: 960,
    category: 'kuhni',
  },
  {
    id: 'portfolio-kitchen-03',
    url: 'https://sun9-24.vkuserphoto.ru/s/v1/ig2/MEGEXREYtiumKjhJ7vE97zSUup6WerwcM8-F1g-eyav-U6jMRfmcwdggTeKzB-snLOdNTP-yVTviKJOMUu04e-Bs.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2160x1620&from=bu&u=nFF2a4vBZ5biN4I-C7g8dASdvg1ZkEafbDn4xra6a68&cs=1280x0',
    width: 1280,
    height: 960,
    category: 'kuhni',
  },
  {
    id: 'portfolio-shkaf-01',
    url: 'https://sun9-32.vkuserphoto.ru/s/v1/ig2/SEmzL1SdYHSfyllb0YHmB6ev3qnIm_xaEw2AK81ja6yatNzQimNw9sFeMuWW5SQYdDN1DHVP2rtX1E6ASwUfLwld.jpg?quality=95&crop=0,0,1620,2160&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=-fsYqHSHdxqG7l1fVPL8n-NbkEzMYW-HMAfgSNcEf4A&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'shkafy',
  },
  {
    id: 'portfolio-shkaf-02',
    url: 'https://sun9-56.vkuserphoto.ru/s/v1/ig2/heorvq2yJ4hbHj5iSc3XEijMa6esVZ228Zl_LbDHSXhawvsdXgNqbCjKei9gMaqDVe3UAZS5eUOrwLYEW6HwP-Pd.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=z44jZlTBaf-nMszDbC4KJMsmIJ3oSefecTJtSUy-LM0&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'shkafy',
  },
  {
    id: 'portfolio-shkaf-03',
    url: 'https://sun9-50.vkuserphoto.ru/s/v1/ig2/Xa4xyL7hApLr9IxpJJ-H7z8loYDyKvITV2tylucgzu-WV3YuvDzryooGmORwS7e1HU0nOq89JkmOrTXStlz64JBI.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=r_RyDMhsCGK8FbkVAIg8TkdUYJNj20FQ84y4otews3g&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'shkafy',
  },
  {
    id: 'portfolio-prihozhaya-01',
    url: 'https://sun9-48.vkuserphoto.ru/s/v1/ig2/T3qpdhDIQMZA1CdSvDXh4MTt6X-LZq-oQ-JUsEii6hRukGGeVqqLBtmidV2k5p3jMZ2aT2aN7FBnJ2aPQlHdN7SF.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=KVSZ2NobnTJPpSAkknHLMudWTYjp9RlEtPR14fCm_pI&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'prihozhie',
  },
  {
    id: 'portfolio-prihozhaya-02',
    url: 'https://sun9-68.vkuserphoto.ru/s/v1/ig2/OwOyJAjk-OMFR6D9bKRtPd8HBjGJPlb6KR99cL7la3zUpF4l7tqEYURun_yFIlOk4mQ1CclDLJ-NgTuzP2LwV3rK.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1620x2160&from=bu&u=Kx8YoXwdTehZiZObWC7MwG3J_lm3p7ttJ3nSeY2IzWQ&cs=1080x0',
    width: 1080,
    height: 1440,
    category: 'prihozhie',
  },
  {
    id: 'portfolio-detskaya-01',
    url: 'https://sun9-84.vkuserphoto.ru/s/v1/ig2/KGnaW1ntfm66Y_E0c9vKvDUz9fpstlhUyXlrkaDPqCKKWvEVVPTmxgZrIT0slS0A_FG_xDMN72DqjhkaccuI9x3f.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2160x1620&from=bu&u=kCMkOGeOaRKHz5T7IKb2_9xsUYBSpymkmMN_mrLseOI&cs=1280x0',
    width: 1280,
    height: 960,
    category: 'detskaya',
  },
  {
    id: 'portfolio-ofis-01',
    url: 'https://sun9-19.vkuserphoto.ru/s/v1/ig2/BhBQgnNGh93o5HhbkJKSAI9gFv0nQSPT_C6NpvC6ayLmjyjhRr0IlGWy4pJpBxCfdsgi-mcju4mmbeqzpvjiXUmu.jpg?quality=95&crop=0,0,2160,1620&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2160x1620&from=bu&u=swVBIfaMp6dMSuQz7fvbE-xUPdhYDrJFoK50TtrYZQk&cs=1280x0',
    width: 1280,
    height: 960,
    category: 'ofis',
  },
];

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Referer: 'https://vk.ru/mebelka112',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function optimize(id, buffer, width) {
  const base = path.join(OUT, id);
  const resized = sharp(buffer).resize({
    width: Math.min(width, 1280),
    withoutEnlargement: true,
  });
  await resized.clone().webp({ quality: 82 }).toFile(`${base}.webp`);
  await resized.clone().avif({ quality: 65 }).toFile(`${base}.avif`);
  const meta = await resized
    .clone()
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${base}.jpg`);
  return { width: meta.width, height: meta.height };
}

await fs.mkdir(OUT, { recursive: true });
const manifest = {};

for (const asset of assets) {
  process.stdout.write(`Downloading ${asset.id}... `);
  try {
    const buf = await download(asset.url);
    const dims = await optimize(asset.id, buf, asset.width);
    manifest[asset.id] = { ...dims, category: asset.category ?? null };
    console.log('ok');
  } catch (err) {
    console.log('failed:', err.message);
  }
}

await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Done.', Object.keys(manifest).length, 'images.');
