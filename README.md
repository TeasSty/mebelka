# МебельКа — сайт мебели на заказ

Коммерческий сайт для **МебельКа** (Йошкар-Ола): кухни, шкафы-купе, прихожие, детская и офисная мебель на заказ.

**Live:** https://teassty.github.io/mebelka/

## Концепция дизайна — «Тёплая мастерская»

Простой, честный сайт локальной мебельной мастерской — без «AI landing page» эффектов:

- Светлый тёплый фон `#faf8f5`
- Шрифты: **Source Serif 4** (заголовки) + **Source Sans 3** (текст)
- Акцент `#c8102e` только на кнопках
- Hero: заголовок, факты, CTA и **одно** фото — без WebGL, glass и градиентов
- Фото в чистых сетках без наложений
- Форма заявки через WhatsApp (GitHub Pages без backend)

## Стек

- [Astro 7](https://astro.build) + TypeScript + sharp
- Статическая сборка → GitHub Pages
- Фото: реальные работы из [VK](https://vk.ru/mebelka112)

## Локальный запуск

```bash
npm install
npm run dev
```

### Сборка

```bash
npm run build
```

## Деплой

Push в `main` → `.github/workflows/deploy.yml` → https://teassty.github.io/mebelka/

## Обновление фото

```bash
# Скачать фото из VK
node scripts/download-media.mjs

# Подготовить hero и карточки категорий из локальных VK-фото
node scripts/generate-stock-local.mjs

# (Опционально) сток с Unsplash, если доступен интернет
node scripts/download-stock.mjs
```

## Конфигурация

| Файл | Назначение |
|------|------------|
| `src/data/site.ts` | Контакты, оффер, VK |
| `src/data/categories.ts` | Категории и hero-фото |
| `src/data/portfolio.ts` | Портфолио (VK) |
| `astro.config.mjs` | `site`, `base` для GitHub Pages |
