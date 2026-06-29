import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import PageSEO, { restaurantJsonLd } from "@/components/seo/PageSEO";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const featuredDishes = [
  {
    image: featuredSamsa,
    name: { en: "Samsa", uz: "Somsa", ru: "Самса" },
    desc: { en: "Golden baked pastry with spiced lamb", uz: "Go'shtli pishirilgan somsa", ru: "Золотистая выпечка с бараниной" },
    price: "25,000",
  },
  {
    image: featuredShashlik,
    name: { en: "Lamb Shashlik", uz: "Qo'y shashlik", ru: "Шашлык из баранины" },
    desc: { en: "Charcoal-grilled lamb skewers", uz: "Ko'mirda pishirilgan qo'y kabob", ru: "Шашлык из баранины на углях" },
    price: "45,000",
  },
  {
    image: featuredTea,
    name: { en: "Tea Ceremony", uz: "Choy marosimi", ru: "Чайная церемония" },
    desc: { en: "Traditional green tea with sweets", uz: "An'anaviy ko'k choy shirinliklar bilan", ru: "Традиционный зелёный чай со сладостями" },
    price: "15,000",
  },
];

const Index: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div>
      <PageSEO
        title="Home"
        description="Bogi Zilol — A modern Uzbek culinary experience in the heart of Tashkent. Traditional recipes with contemporary refinement."
        path="/"
        jsonLd={restaurantJsonLd}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroPlov}
          alt="Traditional Uzbek Plov"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4"
          >
            ✦ Tashkent, Uzbekistan ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
          >
            {t("hero", "title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/80 font-body text-lg md:text-xl mb-10 font-light"
          >
            {t("hero", "subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-8">
              <Link to="/reservation">{t("hero", "cta")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-body text-base px-8">
              <Link to="/menu">{t("hero", "explore")}</Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-white/50 animate-bounce" size={28} />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
                {t("about", "label")}
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("about", "title")}
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                {t("about", "description")}
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={restaurantInterior}
                alt="Bogi Zilol interior"
                className="rounded-lg w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-lg -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-accent/30 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              {t("featured", "label")}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t("featured", "title")}
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                  <img
                    src={dish.image}
                    alt={dish.name[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  {dish.name[language]}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{dish.desc[language]}</p>
                <p className="text-accent font-semibold">{dish.price} so'm</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg" className="font-body">
              <Link to="/menu" className="inline-flex items-center gap-2">
                {t("featured", "viewMenu")} <ArrowRight size={16} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <img
          src={restaurantInterior}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              {t("reservation", "label")}
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("reservation", "title")}
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              {t("reservation", "description")}
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base px-10">
                <Link to="/reservation">{t("reservation", "cta")}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Teaser */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <img
                src={heroPlov}
                alt="The Art of Plov"
                className="rounded-lg w-full aspect-[4/3] object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
                {t("story", "label")}
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {t("story", "title")}
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-8">
                {t("story", "description")}
              </motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <Button asChild variant="outline" size="lg" className="font-body">
                  <Link to="/story" className="inline-flex items-center gap-2">
                    {t("story", "cta")} <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
