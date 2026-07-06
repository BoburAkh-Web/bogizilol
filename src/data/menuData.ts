export type MenuCategory = "appetizers" | "mains" | "grill" | "tea";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  categoryId?: string;        // 👈 shu qator BORmi?
  name: { en: string; uz: string; ru: string };
  description: { en: string; uz: string; ru: string };
  ingredients: { en: string; uz: string; ru: string };
  allergens: { en: string; uz: string; ru: string };
  price: number;
  image: string;
  isSpecial?: boolean;
}

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "app-1",
    category: "appetizers",
    name: { en: "Samsa", uz: "Somsa", ru: "Самса" },
    description: {
      en: "Flaky pastry filled with seasoned lamb and onions, baked in a tandoor oven",
      uz: "Tandirda pishirilgan, go'sht va piyoz solingan qatlamali pishiriq",
      ru: "Слоёная выпечка с приправленной бараниной и луком, запечённая в тандыре",
    },
    ingredients: {
      en: "Lamb, onion, flour, cumin, sesame seeds, butter",
      uz: "Qo'y go'shti, piyoz, un, zira, kunjut, sariyog'",
      ru: "Баранина, лук, мука, зира, кунжут, масло",
    },
    allergens: { en: "Gluten, Dairy", uz: "Gluten, Sut", ru: "Глютен, Молоко" },
    price: 18000,
    image: "/placeholder.svg",
  },
  {
    id: "app-2",
    category: "appetizers",
    name: { en: "Achichuk Salad", uz: "Achichuk", ru: "Ачичук" },
    description: {
      en: "Fresh tomato and onion salad with herbs, a classic Uzbek accompaniment",
      uz: "Yangi pomidor va piyoz salati, an'anaviy o'zbek qo'shimchasi",
      ru: "Свежий салат из помидоров и лука с зеленью, классическое узбекское блюдо",
    },
    ingredients: {
      en: "Tomato, onion, cilantro, basil, salt",
      uz: "Pomidor, piyoz, kashnich, rayhon, tuz",
      ru: "Помидор, лук, кинза, базилик, соль",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 12000,
    image: "/placeholder.svg",
  },
  {
    id: "app-3",
    category: "appetizers",
    name: { en: "Manti", uz: "Manti", ru: "Манты" },
    description: {
      en: "Steamed dumplings with spiced lamb and pumpkin, served with sour cream",
      uz: "Bug'langan tushbera, go'sht va oshqovoq bilan, qaymoq bilan",
      ru: "Паровые пельмени с бараниной и тыквой, подаются со сметаной",
    },
    ingredients: {
      en: "Lamb, pumpkin, onion, flour, cumin, sour cream",
      uz: "Qo'y go'shti, oshqovoq, piyoz, un, zira, qaymoq",
      ru: "Баранина, тыква, лук, мука, зира, сметана",
    },
    allergens: { en: "Gluten, Dairy", uz: "Gluten, Sut", ru: "Глютен, Молоко" },
    price: 22000,
    image: "/placeholder.svg",
  },
  {
    id: "app-4",
    category: "appetizers",
    name: { en: "Chuchvara", uz: "Chuchvara", ru: "Чучвара" },
    description: {
      en: "Tiny boiled dumplings in rich bone broth, garnished with fresh dill",
      uz: "Suyak sho'rvada qaynatilgan kichik tushbera, yangi ukrop bilan",
      ru: "Мелкие варёные пельмени в наваристом бульоне, украшенные укропом",
    },
    ingredients: {
      en: "Beef, onion, flour, bone broth, dill",
      uz: "Mol go'shti, piyoz, un, suyak sho'rva, ukrop",
      ru: "Говядина, лук, мука, костный бульон, укроп",
    },
    allergens: { en: "Gluten", uz: "Gluten", ru: "Глютен" },
    price: 20000,
    image: "/placeholder.svg",
  },

  // Mains
  {
    id: "main-1",
    category: "mains",
    name: { en: "Plov", uz: "Palov", ru: "Плов" },
    description: {
      en: "Uzbekistan's national treasure — rice with tender lamb, carrots, and aromatic spices",
      uz: "O'zbekistonning milliy taomi — guruch, go'sht, sabzi va xushbo'y ziravorlar",
      ru: "Национальное сокровище Узбекистана — рис с нежной бараниной, морковью и специями",
    },
    ingredients: {
      en: "Rice, lamb, carrot, onion, cumin, barberry, chickpeas",
      uz: "Guruch, qo'y go'shti, sabzi, piyoz, zira, zirk, no'xat",
      ru: "Рис, баранина, морковь, лук, зира, барбарис, нут",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 35000,
    image: "/placeholder.svg",
    isSpecial: true,
  },
  {
    id: "main-2",
    category: "mains",
    name: { en: "Lagman", uz: "Lag'mon", ru: "Лагман" },
    description: {
      en: "Hand-pulled noodles in a rich tomato and lamb broth with seasonal vegetables",
      uz: "Qo'lda cho'zilgan ugra, go'sht va pomidorli sho'rvada, mavsumiy sabzavotlar bilan",
      ru: "Лапша ручной работы в наваристом томатном бульоне с бараниной и овощами",
    },
    ingredients: {
      en: "Lamb, hand-pulled noodles, tomato, bell pepper, onion, garlic",
      uz: "Qo'y go'shti, qo'l ugra, pomidor, qalampir, piyoz, sarimsoq",
      ru: "Баранина, лапша ручной работы, помидор, перец, лук, чеснок",
    },
    allergens: { en: "Gluten", uz: "Gluten", ru: "Глютен" },
    price: 30000,
    image: "/placeholder.svg",
  },
  {
    id: "main-3",
    category: "mains",
    name: { en: "Dimlama", uz: "Dimlama", ru: "Димлама" },
    description: {
      en: "Slow-braised lamb layered with potatoes, cabbage, and tomatoes in natural juices",
      uz: "Kartoshka, karam va pomidor bilan sekin qaynatilgan go'sht",
      ru: "Томлёная баранина с картофелем, капустой и помидорами в собственном соку",
    },
    ingredients: {
      en: "Lamb, potato, cabbage, tomato, bell pepper, onion",
      uz: "Qo'y go'shti, kartoshka, karam, pomidor, qalampir, piyoz",
      ru: "Баранина, картофель, капуста, помидор, перец, лук",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 32000,
    image: "/placeholder.svg",
  },
  {
    id: "main-4",
    category: "mains",
    name: { en: "Norin", uz: "Norin", ru: "Норин" },
    description: {
      en: "Finely sliced hand-rolled pasta mixed with horse meat, served cold",
      uz: "Qo'lda yoyilgan yupqa ugra, ot go'shti bilan, sovuq holda",
      ru: "Тонко нарезанная домашняя лапша с кониной, подаётся холодным",
    },
    ingredients: {
      en: "Horse meat, hand-rolled pasta, onion, black pepper",
      uz: "Ot go'shti, qo'l ugrasi, piyoz, qora murch",
      ru: "Конина, домашняя лапша, лук, чёрный перец",
    },
    allergens: { en: "Gluten", uz: "Gluten", ru: "Глютен" },
    price: 38000,
    image: "/placeholder.svg",
  },

  // Grill
  {
    id: "grill-1",
    category: "grill",
    name: { en: "Lamb Shashlik", uz: "Qo'y kabob", ru: "Шашлык из баранины" },
    description: {
      en: "Tender marinated lamb skewers grilled over charcoal to perfection",
      uz: "Ko'mirda pishirilgan mayin qo'y go'shti kabobi",
      ru: "Нежные маринованные шампуры из баранины, приготовленные на углях",
    },
    ingredients: {
      en: "Lamb, onion, vinegar, salt, pepper, sumac",
      uz: "Qo'y go'shti, piyoz, sirka, tuz, murch, sumak",
      ru: "Баранина, лук, уксус, соль, перец, сумах",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 28000,
    image: "/placeholder.svg",
    isSpecial: true,
  },
  {
    id: "grill-2",
    category: "grill",
    name: { en: "Chicken Kebab", uz: "Tovuq kabob", ru: "Куриный кебаб" },
    description: {
      en: "Juicy chicken thigh pieces marinated in herbs and grilled on skewers",
      uz: "Ziravorlarda tuzlangan sochma tovuq kabobi",
      ru: "Сочные кусочки куриного бедра в маринаде из трав, на шампурах",
    },
    ingredients: {
      en: "Chicken thigh, garlic, lemon, herbs, olive oil",
      uz: "Tovuq soni, sarimsoq, limon, ko'katlar, zaytun moyi",
      ru: "Куриное бедро, чеснок, лимон, травы, оливковое масло",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 24000,
    image: "/placeholder.svg",
  },
  {
    id: "grill-3",
    category: "grill",
    name: { en: "Lyulya Kebab", uz: "Lyulya kabob", ru: "Люля-кебаб" },
    description: {
      en: "Spiced ground lamb molded onto skewers and char-grilled",
      uz: "Ziravorli qiyma go'sht, shampurda ko'mirda pishirilgan",
      ru: "Пряный бараний фарш на шампурах, приготовленный на углях",
    },
    ingredients: {
      en: "Ground lamb, onion, cumin, coriander, fat tail",
      uz: "Qiyma go'sht, piyoz, zira, kashnich, dumba",
      ru: "Фарш из баранины, лук, зира, кориандр, курдюк",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 26000,
    image: "/placeholder.svg",
  },
  {
    id: "grill-4",
    category: "grill",
    name: { en: "Tandoor Lamb Ribs", uz: "Tandir qovurg'a", ru: "Рёбра в тандыре" },
    description: {
      en: "Slow-roasted lamb ribs in a clay tandoor, falling off the bone",
      uz: "Tandirda sekin pishirilgan qo'y qovurg'alari",
      ru: "Томлёные бараньи рёбрышки в глиняном тандыре",
    },
    ingredients: {
      en: "Lamb ribs, salt, cumin, onion",
      uz: "Qo'y qovurg'a, tuz, zira, piyoz",
      ru: "Бараньи рёбра, соль, зира, лук",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 42000,
    image: "/placeholder.svg",
    isSpecial: true,
  },

  // Tea Ceremony
  {
    id: "tea-1",
    category: "tea",
    name: { en: "Green Tea (Kok Choy)", uz: "Ko'k choy", ru: "Зелёный чай" },
    description: {
      en: "Traditional Uzbek green tea served in a ceramic teapot with piala cups",
      uz: "An'anaviy o'zbek ko'k choyi, chinni choynakda piyola bilan",
      ru: "Традиционный узбекский зелёный чай в керамическом чайнике с пиалами",
    },
    ingredients: {
      en: "Green tea leaves",
      uz: "Ko'k choy barglari",
      ru: "Листья зелёного чая",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 8000,
    image: "/placeholder.svg",
  },
  {
    id: "tea-2",
    category: "tea",
    name: { en: "Black Tea with Lemon", uz: "Qora choy limonli", ru: "Чёрный чай с лимоном" },
    description: {
      en: "Rich black tea served with fresh lemon and rock sugar",
      uz: "Boy qora choy, yangi limon va navvot bilan",
      ru: "Насыщенный чёрный чай с лимоном и навватом",
    },
    ingredients: {
      en: "Black tea, lemon, rock sugar",
      uz: "Qora choy, limon, navvot",
      ru: "Чёрный чай, лимон, навват",
    },
    allergens: { en: "None", uz: "Yo'q", ru: "Нет" },
    price: 8000,
    image: "/placeholder.svg",
  },
  {
    id: "tea-3",
    category: "tea",
    name: { en: "Halva", uz: "Halvo", ru: "Халва" },
    description: {
      en: "Traditional handmade halva with pistachios and walnuts",
      uz: "An'anaviy qo'lda tayyorlangan halvo, pista va yong'oq bilan",
      ru: "Традиционная халва ручной работы с фисташками и грецкими орехами",
    },
    ingredients: {
      en: "Sugar, flour, butter, pistachios, walnuts",
      uz: "Shakar, un, sariyog', pista, yong'oq",
      ru: "Сахар, мука, масло, фисташки, грецкие орехи",
    },
    allergens: { en: "Gluten, Dairy, Nuts", uz: "Gluten, Sut, Yong'oq", ru: "Глютен, Молоко, Орехи" },
    price: 15000,
    image: "/placeholder.svg",
  },
  {
    id: "tea-4",
    category: "tea",
    name: { en: "Navvot & Dried Fruits", uz: "Navvot va quritilgan mevalar", ru: "Навват и сухофрукты" },
    description: {
      en: "Crystal rock sugar with an assortment of Uzbek dried apricots, raisins, and almonds",
      uz: "Navvot va o'zbek quritilgan o'rik, mayiz, bodom to'plami",
      ru: "Кристаллический сахар с узбекской курагой, изюмом и миндалём",
    },
    ingredients: {
      en: "Rock sugar, dried apricots, raisins, almonds",
      uz: "Navvot, quritilgan o'rik, mayiz, bodom",
      ru: "Навват, курага, изюм, миндаль",
    },
    allergens: { en: "Nuts", uz: "Yong'oq", ru: "Орехи" },
    price: 12000,
    image: "/placeholder.svg",
  },
];
