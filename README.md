# МебельКа — сайт мебели на заказ

Коммерческий сайт для **МебельКа** (Йошкар-Ола): кухни, шкафы-купе, прихожие, детская и офисная мебель на заказ.

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
set ASTRO_SITE=https://YOUR_USERNAME.github.io
set ASTRO_BASE=/mebelka112/
npm run build
npm run preview
```

На Linux/macOS:

```bash
ASTRO_SITE=https://YOUR_USERNAME.github.io ASTRO_BASE=/mebelka112/ npm run build
```

## Деплой на GitHub Pages

1. Репозиторий: `mebelka112` (или измените `ASTRO_BASE` в `astro.config.mjs` и workflow)
2. Push в ветку `main` запускает `.github/workflows/deploy.yml`
3. В настройках репозитория: **Settings → Pages → Source: GitHub Actions**
4. Live URL: `https://teassty.github.io/mebelka112/`

## Форма заявки

**GitHub Pages не поддерживает серверную обработку форм.**

Текущее поведение (честный fallback):

- Клиентская валидация полей
- Кнопка «Отправить в WhatsApp» открывает мессенджер с готовым текстом заявки
- Заявка считается отправленной только после отправки сообщения в WhatsApp
- Альтернатива: звонок, Telegram, ВКонтакте (ссылки на странице контактов)

Для автоматического приёма заявок на email можно позже подключить [Formspree](https://formspree.io), Netlify Forms или свой backend.

## Структура

```
src/
  components/   # UI-компоненты
  data/         # Контакты, категории, портфолио, FAQ
  layouts/      # BaseLayout
  pages/        # Маршруты сайта
  styles/       # Глобальные стили
public/
  images/       # Оптимизированные фото (AVIF/WebP/JPG)
scripts/
  download-media.mjs  # Загрузка фото из VK
```

## Обновление фото

```bash
node scripts/download-media.mjs
```

Источник — альбомы VK сообщества. После загрузки обновите `src/data/portfolio.ts` при необходимости.

## Конфигурация

| Файл | Назначение |
|------|------------|
| `astro.config.mjs` | `site`, `base`, sitemap |
| `.github/workflows/deploy.yml` | CI/CD GitHub Pages |
| `src/data/site.ts` | Телефоны, адрес, часы, VK |
| `netlify.toml` | Опционально для Netlify (не используется на GH Pages) |

## Переменные окружения (CI)

| Переменная | Описание |
|------------|----------|
| `ASTRO_SITE` | `https://username.github.io` |
| `ASTRO_BASE` | `/mebelka112/` |

## Что остаётся владельцу

- Заменить `YOUR_USERNAME` в README на свой GitHub-логин после первого деплоя
- Проверить, что номера WhatsApp/Telegram актуальны в `src/data/site.ts`
- При смене домена — обновить `ASTRO_SITE` и `base`
- Добавить новые фото из VK по мере появления проектов
