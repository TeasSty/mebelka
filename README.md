# МебельКа — сайт мебели на заказ

Коммерческий сайт для **МебельКа** (Йошкар-Ола): кухни, шкафы-купе, прихожие, детская и офисная мебель на заказ.

**Live:** https://teassty.github.io/mebelka112/

## Концепция дизайна

**Gallery Atelier + Aurora** — современная «живая» галерея:

- Тёплые нейтральные тона и древесный акцент
- Шрифты: **Cormorant Garamond** + **DM Sans**
- Фото в чистых сетках **без наложений**
- Hero: **WebGL-градиент** ([@firecms/neat](https://github.com/FireCMSco/neat)) — эффект в духе Evervault, ~60 KB, GPU-ускорение
- Glassmorphism, scroll-reveal, 3D-tilt карточек (desktop)
- `prefers-reduced-motion` → статичный CSS-фон вместо WebGL
- Форма заявки через WhatsApp (GitHub Pages без backend)

## Стек

- [Astro 7](https://astro.build) + TypeScript
- [@firecms/neat](https://www.npmjs.com/package/@firecms/neat) — WebGL shader gradient
- Статическая сборка → GitHub Pages
- Реальные фото из сообщества [VK](https://vk.ru/mebelka112)

## Локальный запуск

```bash
npm install
npm run dev
```

### Сборка под GitHub Pages

```bash
set ASTRO_SITE=https://teassty.github.io
set ASTRO_BASE=/mebelka112/
npm run build
```

## Деплой

Push в `main` → `.github/workflows/deploy.yml` → https://teassty.github.io/mebelka112/

## Эффекты и производительность

| Эффект | Технология | Бюджет |
|--------|------------|--------|
| Hero aurora | Neat WebGL | ~60 KB JS, resolution 0.4–0.65 |
| Scroll reveal | Intersection Observer + CSS | ~0 KB |
| Card tilt | Vanilla JS perspective | ~0 KB |
| Grain overlay | CSS SVG noise | ~0 KB |

- Пауза анимации при скрытой вкладке
- На мобильных — пониженное resolution WebGL
- Без Three.js, без тяжёлых 3D-моделей

> Neat показывает небольшой watermark без лицензии. Для коммерческого использования без watermark: [neat.firecms.co](https://neat.firecms.co)

## Форма заявки

GitHub Pages не поддерживает backend. Заявка уходит через WhatsApp после отправки сообщения пользователем.

## Обновление фото

```bash
node scripts/download-media.mjs
```

## Конфигурация

| Файл | Назначение |
|------|------------|
| `src/scripts/effects.ts` | Aurora, scroll reveal, card tilt |
| `src/data/site.ts` | Контакты, оффер, VK |
| `astro.config.mjs` | `site`, `base` |
