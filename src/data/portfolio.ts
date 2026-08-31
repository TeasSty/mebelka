import type { CategorySlug } from './categories';

export interface PortfolioItem {
  id: string;
  image: string;
  category: CategorySlug;
  alt: string;
  width: number;
  height: number;
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'k1',
    image: 'portfolio-kitchen-01',
    category: 'kuhni',
    alt: 'Кухня на заказ от МебельКа, Йошкар-Ола',
    width: 1080,
    height: 1440,
  },
  {
    id: 'k2',
    image: 'portfolio-kitchen-02',
    category: 'kuhni',
    alt: 'Светлая кухня с верхними и нижними шкафами',
    width: 1280,
    height: 960,
  },
  {
    id: 'k3',
    image: 'portfolio-kitchen-03',
    category: 'kuhni',
    alt: 'Кухонный гарнитур по индивидуальным размерам',
    width: 1280,
    height: 960,
  },
  {
    id: 's1',
    image: 'portfolio-shkaf-01',
    category: 'shkafy',
    alt: 'Шкаф-купе на заказ в Йошкар-Оле',
    width: 1080,
    height: 1440,
  },
  {
    id: 's2',
    image: 'portfolio-shkaf-02',
    category: 'shkafy',
    alt: 'Встроенный шкаф-купе с зеркальными дверями',
    width: 1080,
    height: 1440,
  },
  {
    id: 'p1',
    image: 'portfolio-prihozhaya-01',
    category: 'prihozhie',
    alt: 'Прихожая на заказ от МебельКа',
    width: 1080,
    height: 1440,
  },
  {
    id: 'p2',
    image: 'portfolio-prihozhaya-02',
    category: 'prihozhie',
    alt: 'Мебель для прихожей по индивидуальным размерам',
    width: 1080,
    height: 1440,
  },
  {
    id: 'd1',
    image: 'portfolio-detskaya-01',
    category: 'detskaya',
    alt: 'Детская мебель на заказ',
    width: 1080,
    height: 1440,
  },
  {
    id: 'o1',
    image: 'portfolio-ofis-01',
    category: 'ofis',
    alt: 'Офисная мебель на заказ в Йошкар-Оле',
    width: 1280,
    height: 960,
  },
];

export function getPortfolioByCategory(category?: CategorySlug): PortfolioItem[] {
  if (!category) return portfolio;
  return portfolio.filter((item) => item.category === category);
}
