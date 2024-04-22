import {
  banerAuto,
  banerTwo,
  bannerThree,
  bannerFour,
  Hurma,
  Dracon,
} from '../assets/images';
import {
  Bizuteria,
  Clothes,
  Decor,
  Keramika,
  Kosmetika,
  Misteztvo,
  TekstilniVirobi,
  Present,
} from '../assets/icons';

export const slides = [
  { id: 1, photo: banerAuto },
  { id: 2, photo: banerTwo },
  { id: 3, photo: bannerThree },
  { id: 4, photo: bannerFour },
];

export const categories = [
  { title: 'Біжутерія', icon: Bizuteria },
  { title: 'Інтер’єр та декор', icon: Decor },
  { title: 'Подарункові набори', icon: Present },
  { title: 'Текстильні вироби', icon: TekstilniVirobi },
  { title: 'Кераміка та фарфор', icon: Keramika },
  { title: 'Косметика та мило', icon: Kosmetika },
  { title: 'Мистецтво', icon: Misteztvo },
  { title: 'Одяг та аксесуари', icon: Clothes },
];

export const products = [
  {
    id: 1,
    title: 'Хурма',
    photo: Hurma,
    price: 350,
    description:
      'Оригінал живопису олією на полотні та ґрунтованому картоні, 30*30 см. Потребує встановлення у раму. Картина української мисткині Пчельникової Тетяни. Це подарунок для близької людини або для вашого неповторного дому. Можливе подарункове пакування.Картина професійно упакована.',
  },
  {
    id: 2,
    title: 'Дракон фентезі кулон',
    photo: Dracon,
    price: 650,
    description:
      'Ідеальний подарунок для фанів фентезі! Пересил НП по Україні♥️🇺🇦 за рахунок покупця по передплаті. Пересилка можлива як на  відділення, так і на поштомат.',
  },
  {
    id: 3,
    title: 'Хурма',
    photo: Hurma,
    price: 350,
    description:
      'Оригінал живопису олією на полотні та ґрунтованому картоні, 30*30 см. Потребує встановлення у раму. Картина української мисткині Пчельникової Тетяни. Це подарунок для близької людини або для вашого неповторного дому. Можливе подарункове пакування.Картина професійно упакована.',
  },
  {
    id: 4,
    title: 'Дракон фентезі кулон',
    photo: Dracon,
    price: 650,
    description:
      'Ідеальний подарунок для фанів фентезі! Пересил НП по Україні♥️🇺🇦 за рахунок покупця по передплаті. Пересилка можлива як на  відділення, так і на поштомат.',
  },
  {
    id: 5,
    title: 'Хурма',
    photo: Hurma,
    price: 350,
    description:
      'Оригінал живопису олією на полотні та ґрунтованому картоні, 30*30 см. Потребує встановлення у раму. Картина української мисткині Пчельникової Тетяни. Це подарунок для близької людини або для вашого неповторного дому. Можливе подарункове пакування.Картина професійно упакована.',
  },
  {
    id: 6,
    title: 'Дракон фентезі кулон',
    photo: Dracon,
    price: 650,
    description:
      'Ідеальний подарунок для фанів фентезі! Пересил НП по Україні♥️🇺🇦 за рахунок покупця по передплаті. Пересилка можлива як на  відділення, так і на поштомат.',
  },
];

export const footerLinks = [
  {
    title: 'links1',
    links: [
      { name: 'Політика конфеденціності', link: '/' },
      { name: 'Умови користування', link: '/' },
      { name: 'Реклама на сайті', link: '/' },
      { name: 'Популярні запити', link: '/' },
    ],
  },
  {
    title: 'links2',
    links: [
      { name: 'Правила безпеки', link: '/' },
      { name: 'Карта сайту', link: '/' },
      { name: 'Допомога та зворотній зв’язок', link: '/' },
      { name: 'Блог Pashtet', link: '/' },
    ],
  },
];

// -----------------------------------------------------------------------
export const products_1 = [
  {
    id: 1,
    title: 'Handmade Wooden Clock',
    description: 'Eco-friendly wall clock made from recycled wood.',
    price: 1500,
    zsuPrice: 1200.5,
    reviewsQty: 5,
    rating: 4.3,
    createdAt: '2024-04-20T00:00:00Z',
    categoryId: 1,
    userId: 1,
  },
  {
    id: 2,
    title: 'Artisan Ceramic Vase',
    description: 'Handcrafted ceramic vase inspired by modern art.',
    price: 2500,
    zsuPrice: 2000.75,
    reviewsQty: 3,
    rating: 4.8,
    createdAt: '2024-04-20T00:00:00Z',
    categoryId: 1,
    userId: 1,
  },
];

export const comments = [
  {
    id: 1,
    text: 'Absolutely beautiful clock, the craftsmanship is top-notch!',
    grade: 5,
    createdAt: '2024-04-20T00:00:00Z',
    productId: 1,
    userId: 1,
  },
  {
    id: 2,
    text: 'The vase is even more stunning in person. A perfect addition to my home.',
    grade: 5,
    createdAt: '2024-04-20T00:00:00Z',
    productId: 2,
    userId: 1,
  },
];
