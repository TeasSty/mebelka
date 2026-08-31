// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'mebelka112';
const base = process.env.ASTRO_BASE ?? `/${repo}/`;

export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://teassty.github.io',
  base,
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
