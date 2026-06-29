import restaurantInterior from "@/assets/restaurant-interior.jpg";
import featuredTea from "@/assets/featured-tea.jpg";
import featuredShashlik from "@/assets/featured-shashlik.jpg";
import { Heart, Building2, Users } from "lucide-react";

export type Lang = "en" | "uz" | "ru";

export const t = (obj: Record<Lang, string>, lang: Lang) => obj[lang];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  }),
};

export const eventTypes = [
  {
    icon: Heart,
    title: { en: "Weddings", uz: "To'ylar", ru: "Свадьбы" },
    desc: {
      en: "Celebrate your union in a setting that blends Uzbek grandeur with modern elegance. Our garden halls host intimate gatherings of 50 to grand celebrations of 500, complete with bespoke menus and traditional ceremonies.",
      uz: "Nikohingizni o'zbek ulug'vorligi va zamonaviy nafislikni birlashtirgan muhitda nishonlang. Bog' zallarimiz 50 kishilik samimiy to'ylardan 500 kishilik katta tantanalargacha qabul qiladi.",
      ru: "Отпразднуйте союз в обстановке, сочетающей узбекское великолепие и современную элегантность. Наши садовые залы принимают от 50 до 500 гостей с индивидуальным меню.",
    },
    image: restaurantInterior,
    features: {
      en: ["Custom floral arrangements", "Live traditional music", "Bridal suite access", "Personalized menu tasting"],
      uz: ["Maxsus gul bezaklari", "Jonli an'anaviy musiqa", "Kelin xonasi", "Shaxsiy menyu tatib ko'rish"],
      ru: ["Индивидуальные цветочные композиции", "Живая традиционная музыка", "Номер для невесты", "Дегустация меню"],
    },
  },
  {
    icon: Users,
    title: { en: "Gap Gatherings", uz: "Gap yig'ilishlari", ru: "Гап — дружеские встречи" },
    desc: {
      en: "Revive the cherished Uzbek tradition of 'gap' — intimate gatherings of friends who meet regularly to share a meal, stories, and support. Our private rooms create the perfect atmosphere for these meaningful connections.",
      uz: "Gap — do'stlarning muntazam yig'ilib, ovqat, hikoyalar va qo'llab-quvvatlashni baham ko'rish an'anasini qayta tiklang. Xususiy xonalarimiz bu mazmunli uchrashuvlar uchun mukammal muhit yaratadi.",
      ru: "Возродите традицию «гап» — дружеских встреч, где друзья регулярно собираются за столом, чтобы делиться едой, историями и поддержкой. Наши приватные залы создают идеальную атмосферу.",
    },
    image: featuredTea,
    features: {
      en: ["Private dining rooms", "Traditional tea service", "Customizable set menus", "Hookah lounge available"],
      uz: ["Xususiy ovqatlanish xonalari", "An'anaviy choy marosimi", "Moslashtirilgan set menyu", "Chillim zali mavjud"],
      ru: ["Приватные обеденные залы", "Традиционная чайная церемония", "Настраиваемые сет-меню", "Кальянная зона"],
    },
  },
  {
    icon: Building2,
    title: { en: "Corporate Events", uz: "Korporativ tadbirlar", ru: "Корпоративные мероприятия" },
    desc: {
      en: "Impress your colleagues and clients with a distinctive venue that combines professional service with extraordinary cuisine. From board dinners to team celebrations, we handle every detail with precision.",
      uz: "Hamkasblaringiz va mijozlaringizni professional xizmat va ajoyib oshxonani birlashtirgan noyob joy bilan hayratda qoldiring. Kengash kechki ovqatlaridan tortib jamoa bayramlarigacha har bir tafsilotni aniqlik bilan boshqaramiz.",
      ru: "Впечатлите коллег и клиентов уникальной площадкой, сочетающей профессиональный сервис и выдающуюся кухню. От деловых ужинов до корпоративных праздников — мы продумаем каждую деталь.",
    },
    image: featuredShashlik,
    features: {
      en: ["AV equipment & projection", "Flexible seating layouts", "Branded event packages", "Dedicated event coordinator"],
      uz: ["AV jihozlari va proyeksiya", "Moslashuvchan o'rindiq joylashuvi", "Brendli tadbir paketlari", "Maxsus tadbir koordinatori"],
      ru: ["AV-оборудование и проекция", "Гибкая рассадка", "Брендированные пакеты", "Выделенный координатор"],
    },
  },
];

export const menuTypes = [
  { value: "standard", label: { en: "Standard", uz: "Standart", ru: "Стандарт" }, pricePerGuest: 25 },
  { value: "premium", label: { en: "Premium", uz: "Premium", ru: "Премиум" }, pricePerGuest: 45 },
  { value: "luxury", label: { en: "Luxury", uz: "Lyuks", ru: "Люкс" }, pricePerGuest: 75 },
];

export const extras = [
  { id: "liveMusic", label: { en: "Live Traditional Music", uz: "Jonli an'anaviy musiqa", ru: "Живая традиционная музыка" }, price: 500 },
  { id: "floral", label: { en: "Floral Decorations", uz: "Gul bezaklari", ru: "Цветочные композиции" }, price: 350 },
  { id: "photo", label: { en: "Photography Package", uz: "Fotografiya paketi", ru: "Фотопакет" }, price: 400 },
  { id: "hookah", label: { en: "Hookah Lounge", uz: "Chillim zali", ru: "Кальянная зона" }, price: 200 },
  { id: "tea", label: { en: "Premium Tea Ceremony", uz: "Premium choy marosimi", ru: "Премиум чайная церемония" }, price: 150 },
];
