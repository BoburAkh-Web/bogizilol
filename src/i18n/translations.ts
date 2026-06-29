export type Language = "en" | "uz" | "ru";

export const translations = {
  nav: {
    home: { en: "Home", uz: "Bosh sahifa", ru: "Главная" },
    menu: { en: "Menu", uz: "Menyu", ru: "Меню" },
    reservation: { en: "Reservation", uz: "Band qilish", ru: "Бронирование" },
    story: { en: "Our Story", uz: "Bizning tarix", ru: "Наша история" },
    events: { en: "Events", uz: "Tadbirlar", ru: "Мероприятия" },
  },
  hero: {
    title: {
      en: "Bogi Zilol",
      uz: "Bogi Zilol",
      ru: "Боги Зилол",
    },
    subtitle: {
      en: "A Modern Uzbek Culinary Experience",
      uz: "Zamonaviy o'zbek oshxona tajribasi",
      ru: "Современный узбекский кулинарный опыт",
    },
    cta: {
      en: "Reserve a Table",
      uz: "Stol band qilish",
      ru: "Забронировать стол",
    },
    explore: {
      en: "Explore Menu",
      uz: "Menyuni ko'rish",
      ru: "Посмотреть меню",
    },
  },
  about: {
    label: {
      en: "Our Philosophy",
      uz: "Bizning falsafa",
      ru: "Наша философия",
    },
    title: {
      en: "Where Tradition Meets Elegance",
      uz: "An'ana va nafislik uyg'unligi",
      ru: "Где традиции встречают элегантность",
    },
    description: {
      en: "Nestled in the heart of Tashkent, Bogi Zilol is a sanctuary of Uzbek culinary heritage. Our garden-inspired setting and time-honored recipes create an unforgettable dining experience that bridges centuries of Silk Road tradition with contemporary refinement.",
      uz: "Toshkent markazida joylashgan Bogi Zilol — o'zbek oshxona merosining beshigi. Bog'dan ilhomlangan muhit va asrlar sinab ko'rgan retseptlarimiz Buyuk Ipak yo'li an'analarini zamonaviy nafislik bilan birlashtirgan unutilmas tajriba yaratadi.",
      ru: "Расположенный в самом сердце Ташкента, Боги Зилол — это оазис узбекского кулинарного наследия. Наша обстановка, вдохновлённая садами, и проверенные временем рецепты создают незабываемый гастрономический опыт.",
    },
  },
  featured: {
    label: {
      en: "Featured Dishes",
      uz: "Tanlangan taomlar",
      ru: "Избранные блюда",
    },
    title: {
      en: "Culinary Masterpieces",
      uz: "Oshpazlik durdonalari",
      ru: "Кулинарные шедевры",
    },
    viewMenu: {
      en: "View Full Menu",
      uz: "To'liq menyuni ko'rish",
      ru: "Полное меню",
    },
  },
  reservation: {
    label: {
      en: "Reserve Your Experience",
      uz: "Tajribangizni band qiling",
      ru: "Забронируйте впечатления",
    },
    title: {
      en: "An Evening to Remember",
      uz: "Unutilmas oqshom",
      ru: "Незабываемый вечер",
    },
    description: {
      en: "Join us for an unforgettable journey through the flavors of Uzbekistan. Reserve your table and let us craft a memorable evening for you.",
      uz: "O'zbekiston ta'mlarining unutilmas sayohatiga qo'shiling. Stolingizni band qiling va biz siz uchun esda qolarli oqshom yarataylik.",
      ru: "Присоединяйтесь к незабываемому путешествию по вкусам Узбекистана. Забронируйте столик, и мы создадим для вас памятный вечер.",
    },
    cta: {
      en: "Make a Reservation",
      uz: "Band qilish",
      ru: "Забронировать",
    },
  },
  story: {
    label: {
      en: "Cultural Heritage",
      uz: "Madaniy meros",
      ru: "Культурное наследие",
    },
    title: {
      en: "The Art of Plov",
      uz: "Palov san'ati",
      ru: "Искусство плова",
    },
    description: {
      en: "Discover the centuries-old craft behind Uzbekistan's most iconic dish. From the selection of rice to the final garnish, every step is a celebration of culture.",
      uz: "O'zbekistonning eng mashhur taomining asriy hunari bilan tanishing. Guruchni tanlashdan tortib, oxirgi bezakkacha har bir qadam madaniyat bayramidir.",
      ru: "Откройте для себя вековое мастерство самого знакового блюда Узбекистана. От выбора риса до финального украшения — каждый шаг является торжеством культуры.",
    },
    cta: {
      en: "Read Our Story",
      uz: "Hikoyamizni o'qing",
      ru: "Читать историю",
    },
  },
  footer: {
    tagline: {
      en: "Modern Uzbek Culinary Experience",
      uz: "Zamonaviy o'zbek oshxona tajribasi",
      ru: "Современный узбекский кулинарный опыт",
    },
    hours: {
      en: "Opening Hours",
      uz: "Ish vaqti",
      ru: "Часы работы",
    },
    hoursDetail: {
      en: "Daily: 11:00 — 23:00",
      uz: "Har kuni: 11:00 — 23:00",
      ru: "Ежедневно: 11:00 — 23:00",
    },
    contact: {
      en: "Contact",
      uz: "Aloqa",
      ru: "Контакты",
    },
    follow: {
      en: "Follow Us",
      uz: "Bizni kuzating",
      ru: "Подпишитесь",
    },
    rights: {
      en: "All rights reserved.",
      uz: "Barcha huquqlar himoyalangan.",
      ru: "Все права защищены.",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;
