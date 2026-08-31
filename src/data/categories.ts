export type CategorySlug =
  | 'kuhni'
  | 'shkafy'
  | 'prihozhie'
  | 'detskaya'
  | 'ofis';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  path: string;
  heroImage: string;
  features: string[];
}

export const categories: Category[] = [
  {
    slug: 'kuhni',
    name: 'Кухни на заказ',
    shortName: 'Кухни',
    headline: 'Кухня под вашу планировку и привычки',
    description:
      'Проектируем кухни по индивидуальным размерам: от компактных угловых до просторных с островом. Бесплатная консультация по планировке и материалам.',
    path: '/kuhni',
    heroImage: 'portfolio-kitchen-01',
    features: [
      'ЛДСП, МДФ и постформинг на выбор',
      'Учёт техники, розеток и коммуникаций',
      '3D-визуализация перед изготовлением',
    ],
  },
  {
    slug: 'shkafy',
    name: 'Шкафы-купе',
    shortName: 'Шкафы',
    headline: 'Шкаф-купе, который использует каждый сантиметр',
    description:
      'Встроенные и корпусные шкафы-купе для спальни, гостиной и ниш. Наполнение под ваш гардероб и быт.',
    path: '/shkafy',
    heroImage: 'portfolio-shkaf-01',
    features: [
      'Раздвижные системы с плавным ходом',
      'Зеркала, фото-печать и матовые фасады',
      'Наполнение: полки, штанги, корзины',
    ],
  },
  {
    slug: 'prihozhie',
    name: 'Прихожие',
    shortName: 'Прихожие',
    headline: 'Прихожая, которая встречает порядком',
    description:
      'Компактные и вместительные прихожие с обувными модулями, зеркалами и местом для верхней одежды.',
    path: '/prihozhie',
    heroImage: 'portfolio-prihozhaya-01',
    features: [
      'Модули под ваш коридор',
      'Встроенные зеркала и подсветка',
      'Сочетание с шкафами-купе',
    ],
  },
  {
    slug: 'detskaya',
    name: 'Детская мебель',
    shortName: 'Детская',
    headline: 'Детская, которая растёт вместе с ребёнком',
    description:
      'Столы, шкафы, кровати и системы хранения для детской комнаты по вашим размерам и расцветкам.',
    path: '/detskaya',
    heroImage: 'portfolio-detskaya-01',
    features: [
      'Безопасные материалы и кромки',
      'Эргономика под возраст ребёнка',
      'Комбинации с рабочей зоной',
    ],
  },
  {
    slug: 'ofis',
    name: 'Офисная мебель',
    shortName: 'Офис',
    headline: 'Офисная мебель под задачи бизнеса',
    description:
      'Стеллажи, шкафы, рабочие места и переговорные зоны для офисов и кабинетов в Йошкар-Оле.',
    path: '/ofis',
    heroImage: 'portfolio-ofis-01',
    features: [
      'Модули под планировку помещения',
      'Стойкие покрытия для интенсивной нагрузки',
      'Оптовые условия для юридических лиц',
    ],
  },
];

export function getCategory(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
