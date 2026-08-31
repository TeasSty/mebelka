# МебельКа — сайт мебели на заказ

Коммерческий сайт для **МебельКа** (Йошкар-Ола): кухни, шкафы-купе, прихожие, детская и офисная мебель на заказ.

**Live:** https://teassty.github.io/mebelka112/

## Концепция дизайна

**Gallery Atelier** — светлая галерея с акцентом на реальные работы:

- Тёплые нейтральные тона и древесный акцент (`#a0522d`)
- Шрифты: **Cormorant Garamond** + **DM Sans**
- Фото в чистых сетках **без наложений**
- Hero с интерактивной 3D-моделью ([Google model-viewer](https://modelviewer.dev/) + CC0 Kitchen Cabinet от Kenney)
- Форма заявки через WhatsApp (GitHub Pages без backend)

## Стек

- [Astro 7](https://astro.build) + TypeScript
- Статическая сборка → GitHub Pages
- Реальные фото из сообщества [VK](https://vk.ru/mebelka112)

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:4321`.

### Сборка под GitHub Pages

```bash
set ASTRO_SITE=https://teassty.github.io
set ASTRO_BASE=/mebelka112/
npm run build
npm run preview
```

На Linux/macOS:

```bash
ASTRO_SITE=https://teassty.github.io ASTRO_BASE=/mebelka112/ npm run build
```

## Деплой на GitHub Pages

1. Репозиторий: https://github.com/TeasSty/mebelka112
2. Push в ветку `main` запускает `.github/workflows/deploy.yml`
3. В настройках репозитория: **Settings → Pages → Source: GitHub Actions**
4. Live URL: https://teassty.github.io/mebelka112/

## 3D-модель

- Библиотека: `@google/model-viewer` (CDN 4.0.0)
- Модель: CC0 Kitchen Counter by [KayKit](https://github.com/KayKit-Game-Assets/KayKit-Restaurant-Bits-1.0) (CC0)
- Файл: `public/models/kitchen-counter.gltf` (+ `.bin`, texture)
- При `prefers-reduced-motion: reduce` — без auto-rotate, статичный ракурс

## Форма заявки

**GitHub Pages не поддерживает серверную обработку форм.**

Текущее поведение:

- Клиентская валидация полей
- Кнопка «Отправить в WhatsApp» открывает мессенджер с готовым текстом заявки
- Заявка считается отправленной только после отправки сообщения в WhatsApp
- Альтернатива: звонок, Telegram, ВКонтакте

## Структура

```
src/
  components/   # HeroGallery, ModelViewer3D, CategoryGrid, PortfolioGrid…
  data/         # Контакты, категории, портфолио, FAQ
  layouts/      # BaseLayout (+ model-viewer script)
  pages/        # Маршруты сайта
  styles/       # Глобальные стили
public/
  images/       # Оптимизированные фото (AVIF/WebP/JPG)
  models/       # GLB для 3D hero
scripts/
  download-media.mjs  # Загрузка фото из VK
```

## Обновление фото

```bash
node scripts/download-media.mjs
```

## Конфигурация

| Файл | Назначение |
|------|------------|
| `astro.config.mjs` | `site`, `base`, sitemap |
| `.github/workflows/deploy.yml` | CI/CD GitHub Pages |
| `src/data/site.ts` | Телефоны, адрес, часы, VK |

## Что остаётся владельцу

- Проверить актуальность телефонов и WhatsApp в `src/data/site.ts`
- Добавлять новые фото из VK по мере появления проектов
- При смене домена — обновить `ASTRO_SITE` и `base` в `astro.config.mjs`
