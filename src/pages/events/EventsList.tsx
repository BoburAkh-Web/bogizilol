import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { t, fadeUp, eventTypes, type Lang } from "./eventsData";

interface EventsListProps {
  lang: Lang;
}

const EventsList: React.FC<EventsListProps> = ({ lang }) => (
  <section className="py-24 lg:py-32">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-20"
      >
        <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
          {t({ en: "Our Offerings", uz: "Bizning takliflar", ru: "Наши предложения" }, lang)}
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          {t({ en: "Every Occasion, Perfected", uz: "Har bir voqea — mukammal", ru: "Каждое событие — безупречно" }, lang)}
        </motion.h2>
      </motion.div>

      <div className="space-y-24 lg:space-y-32">
        {eventTypes.map((event, i) => {
          const Icon = event.icon;
          const isReversed = i % 2 !== 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div className={isReversed ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    {t(event.title, lang)}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-6">
                  {t(event.desc, lang)}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.features[lang].map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={isReversed ? "lg:order-1" : ""}>
                <div className="relative">
                  <img
                    src={event.image}
                    alt={t(event.title, lang)}
                    className="rounded-lg w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/20 rounded-lg -z-10" />
                  <div className="absolute -top-3 -right-3 w-28 h-28 border border-accent/30 rounded-lg -z-10" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default EventsList;
