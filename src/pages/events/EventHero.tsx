import React from "react";
import { motion } from "framer-motion";
import heroPlov from "@/assets/hero-plov.jpg";
import { t, type Lang } from "./eventsData";

interface EventHeroProps {
  lang: Lang;
}

const EventHero: React.FC<EventHeroProps> = ({ lang }) => (
  <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
    <img src={heroPlov} alt="Events at Bogi Zilol" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-hero-overlay" />
    <div className="relative z-10 text-center px-4 max-w-3xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-accent font-body text-sm tracking-[0.3em] uppercase mb-4"
      >
        {t({ en: "Celebrate with Us", uz: "Biz bilan nishonlang", ru: "Празднуйте с нами" }, lang)}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4"
      >
        {t({ en: "Events & Banquets", uz: "Tadbirlar va Ziyofatlar", ru: "Мероприятия и Банкеты" }, lang)}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-primary-foreground/70 font-body text-lg md:text-xl font-light"
      >
        {t({
          en: "From intimate gatherings to grand celebrations, let us create an unforgettable experience",
          uz: "Samimiy uchrashuvlardan katta bayramlargacha — biz sizga unutilmas tajriba yaratamiz",
          ru: "От камерных встреч до грандиозных торжеств — мы создадим незабываемый праздник",
        }, lang)}
      </motion.p>
    </div>
  </section>
);

export default EventHero;
