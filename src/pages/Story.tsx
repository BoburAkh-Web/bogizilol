import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import PageSEO from "@/components/seo/PageSEO";
import heroPlov from "@/assets/hero-plov.jpg";
import featuredSamsa from "@/assets/featured-samsa.jpg";
import featuredShashlik from "@/assets/featured-shashlik.jpg";
import featuredTea from "@/assets/featured-tea.jpg";
import restaurantInterior from "@/assets/restaurant-interior.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  }),
};

const timelineSteps = [
  {
    year: { en: "Step 1", uz: "1-qadam", ru: "Шаг 1" },
    title: { en: "Selecting the Rice", uz: "Guruchni tanlash", ru: "Выбор риса" },
    desc: {
      en: "The foundation of every great plov begins with devzira rice — a centuries-old variety grown in the Fergana Valley. Each grain is aged for months, developing a unique amber hue and the ability to absorb flavors without losing its shape.",
      uz: "Har bir ajoyib plovning asosi devzira guruchi — Farg'ona vodiysida asrlar davomida yetishtirilgan navdir. Har bir don oylar davomida saqlanadi, noyob qahrabo rangga ega bo'ladi.",
      ru: "Основа каждого великого плова начинается с риса девзира — многовекового сорта, выращиваемого в Ферганской долине. Каждое зёрнышко выдерживается месяцами.",
    },
    image: heroPlov,
  },
  {
    year: { en: "Step 2", uz: "2-qadam", ru: "Шаг 2" },
    title: { en: "The Zirvak Base", uz: "Zirvak tayyorlash", ru: "Основа зирвак" },
    desc: {
      en: "Lamb, onions, and carrots are slowly caramelized in a cast-iron kazan over wood fire. This zirvak — the aromatic base — builds layers of deep, smoky flavor that define authentic Uzbek plov.",
      uz: "Qo'y go'shti, piyoz va sabzi cho'yan qozonda o'tin olovida sekin karamellashtiriladi. Bu zirvak — xushbo'y asos — haqiqiy o'zbek plovini belgilovchi chuqur, tutunli ta'm qatlamlarini yaratadi.",
      ru: "Баранина, лук и морковь медленно карамелизируются в чугунном казане на дровяном огне. Этот зирвак — ароматная основа — создаёт слои глубокого, дымного вкуса.",
    },
    image: featuredShashlik,
  },
  {
    year: { en: "Step 3", uz: "3-qadam", ru: "Шаг 3" },
    title: { en: "Layering & Steaming", uz: "Qatlama va bug'lash", ru: "Слои и томление" },
    desc: {
      en: "Rice is carefully layered over the zirvak and steamed without stirring. The kazan is sealed, allowing each grain to absorb the rich broth below. Whole garlic heads and quince nestle within, infusing subtle sweetness.",
      uz: "Guruch ehtiyotkorlik bilan zirvak ustiga qatlanadi va aralashtirilmasdan bug'lanadi. Qozon yopilib, har bir don pastdagi boy sho'rvani shimadi. Butun sarimsoq va behi ichiga joylashtiriladi.",
      ru: "Рис аккуратно выкладывается поверх зирвака и томится без перемешивания. Казан закрывается, позволяя каждому зёрнышку впитать насыщенный бульон.",
    },
    image: featuredSamsa,
  },
  {
    year: { en: "Step 4", uz: "4-qadam", ru: "Шаг 4" },
    title: { en: "The Grand Reveal", uz: "Buyuk ochilish", ru: "Великое раскрытие" },
    desc: {
      en: "The finished plov is ceremonially flipped onto a grand platter — the lyagan. Meat is placed atop a golden mountain of rice, garnished with pomegranate seeds and fresh herbs. A ritual of sharing and celebration.",
      uz: "Tayyor palov tantanali ravishda katta laganga ag'dariladi. Go'sht oltin guruch tog'i ustiga qo'yiladi, anor donalari va yangi ko'katlar bilan bezatiladi. Bu — baham ko'rish va bayram marosimi.",
      ru: "Готовый плов торжественно переворачивается на большое блюдо — ляган. Мясо укладывается поверх золотой горы риса, украшенной зёрнами граната и свежей зеленью.",
    },
    image: featuredTea,
  },
];

const gardenSections = [
  {
    title: { en: "A Garden Born of Water", uz: "Suvdan tug'ilgan bog'", ru: "Сад, рождённый водой" },
    text: {
      en: "In the ancient Uzbek tradition, 'zilol' means crystal-clear water — the lifeblood of every garden. Our restaurant's name, Bogi Zilol, pays homage to the lush gardens that once lined the banks of Tashkent's canals, where families gathered under mulberry trees to share meals and stories.",
      uz: "'Zilol' qadimgi o'zbek an'anasida tiniq suv — har bir bog'ning hayot manbai. Restoranimiz nomi Bogi Zilol — Toshkent kanallarining bo'ylarida joylashgan hashamatli bog'larga hurmat ifodasi.",
      ru: "В древней узбекской традиции «зилол» означает кристально чистую воду — источник жизни каждого сада. Название нашего ресторана, Боги Зилол, отдаёт дань пышным садам на берегах ташкентских каналов.",
    },
    image: restaurantInterior,
    reverse: false,
  },
  {
    title: { en: "Reviving the Dastarkhan", uz: "Dasturxonni tiklash", ru: "Возрождение дастархана" },
    text: {
      en: "The dastarkhan — a generous spread laid upon an embroidered cloth — is more than a table setting. It's a philosophy of abundance and hospitality. At Bogi Zilol, we've reimagined this tradition for the modern era, marrying the warmth of home with the refinement of haute cuisine.",
      uz: "Dasturxon — kashtali matoga yozilgan saxovatli dasturxon — oddiy tuzilishdan ko'proqdir. Bu — mo'l-ko'llik va mehmondo'stlik falsafasi. Bogi Zilolda biz bu an'anani zamonaviy davr uchun qayta tasavvur qildik.",
      ru: "Дастархан — щедрая скатерть, расстеленная на вышитой ткани — это больше, чем сервировка стола. Это философия изобилия и гостеприимства. В Боги Зилол мы переосмыслили эту традицию для современной эпохи.",
    },
    image: heroPlov,
    reverse: true,
  },
  {
    title: { en: "From Soil to Soul", uz: "Tuproqdan ruhga", ru: "От земли к душе" },
    text: {
      en: "We source our ingredients from local farmers in the Fergana, Samarkand, and Surkhandarya regions. Our lamb comes from highland pastures, our spices from centuries-old bazaar merchants. Every dish tells the story of the land and the hands that cultivated it.",
      uz: "Biz mahsulotlarimizni Farg'ona, Samarqand va Surxondaryo viloyatlarining mahalliy fermerlaridan olamiz. Qo'y go'shtimiz tog' yaylovlaridan, ziravorlarimiz asriy bozor savdogarlaridan keladi.",
      ru: "Мы получаем ингредиенты от местных фермеров из Ферганской, Самаркандской и Сурхандарьинской областей. Наша баранина — с горных пастбищ, специи — от вековых базарных торговцев.",
    },
    image: featuredShashlik,
    reverse: false,
  },
];

const Story: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div>
      <PageSEO
        title="Our Story"
        description="Discover the heritage behind Bogi Zilol — centuries of Uzbek culinary tradition brought to life in Tashkent."
        path="/story"
      />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={heroPlov} alt="The Art of Plov" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4"
          >
            {language === "en" ? "Cultural Heritage" : language === "uz" ? "Madaniy meros" : "Культурное наследие"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            {language === "en" ? "Our Story" : language === "uz" ? "Bizning hikoya" : "Наша история"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 font-body text-lg md:text-xl font-light"
          >
            {language === "en"
              ? "A journey through centuries of tradition, flavor, and hospitality"
              : language === "uz"
                ? "Asrlar davomidagi an'analar, ta'm va mehmondo'stlik sayohati"
                : "Путешествие сквозь века традиций, вкусов и гостеприимства"}
          </motion.p>
        </div>
      </section>

      {/* Art of Plov Timeline */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              {language === "en" ? "The Ritual" : language === "uz" ? "Marosim" : "Ритуал"}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {language === "en" ? "The Art of Plov" : language === "uz" ? "Palov san'ati" : "Искусство плова"}
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            <div className="space-y-16 lg:space-y-24">
              {timelineSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1.5 lg:-translate-x-1.5 top-2 z-10 ring-4 ring-background" />

                    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center pl-12 lg:pl-0`}>
                      <div className={isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:col-start-2"}>
                        <span className="text-accent font-body text-xs tracking-[0.2em] uppercase font-semibold">
                          {step.year[language]}
                        </span>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
                          {step.title[language]}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.desc[language]}
                        </p>
                      </div>
                      <div className={isEven ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-1 lg:row-start-1 lg:pr-16"}>
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={step.image}
                            alt={step.title[language]}
                            className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-border" />
      </div>

      {/* Our Garden History */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              {language === "en" ? "Our Roots" : language === "uz" ? "Bizning ildizlar" : "Наши корни"}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {language === "en" ? "Our Garden History" : language === "uz" ? "Bog'imiz tarixi" : "История нашего сада"}
            </motion.h2>
          </motion.div>

          <div className="space-y-24 lg:space-y-32">
            {gardenSections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div className={section.reverse ? "lg:order-2" : ""}>
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                    {section.title[language]}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    {section.text[language]}
                  </p>
                </div>
                <div className={section.reverse ? "lg:order-1" : ""}>
                  <div className="relative">
                    <img
                      src={section.image}
                      alt={section.title[language]}
                      className="rounded-lg w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/20 rounded-lg -z-10" />
                    <div className="absolute -top-3 -right-3 w-28 h-28 border border-accent/30 rounded-lg -z-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;
