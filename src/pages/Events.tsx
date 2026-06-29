import React, { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import PageSEO from "@/components/seo/PageSEO";
import EventHero from "./events/EventHero";
import EventsList from "./events/EventsList";
import QuoteCalculator from "./events/QuoteCalculator";
import QuoteFormDialog from "./events/QuoteFormDialog";
import { menuTypes, extras, type Lang } from "./events/eventsData";

const Events: React.FC = () => {
  const { language } = useLanguage();
  const lang = language as Lang;

  const [guestCount, setGuestCount] = useState(50);
  const [menuType, setMenuType] = useState("standard");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const menu = menuTypes.find((m) => m.value === menuType)!;
    const menuCost = guestCount * menu.pricePerGuest;
    const extrasCost = extras
      .filter((e) => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
    return menuCost + extrasCost;
  }, [guestCount, menuType, selectedExtras]);

  return (
    <div>
      <PageSEO
        title="Events & Catering"
        description="Host your special event at Bogi Zilol — weddings, corporate gatherings, and private celebrations with authentic Uzbek cuisine."
        path="/events"
      />
      <EventHero lang={lang} />
      <EventsList lang={lang} />
      <div className="container mx-auto px-4">
        <div className="h-px bg-border" />
      </div>
      <QuoteCalculator
        lang={lang}
        guestCount={guestCount}
        setGuestCount={setGuestCount}
        menuType={menuType}
        setMenuType={setMenuType}
        selectedExtras={selectedExtras}
        toggleExtra={toggleExtra}
        estimate={estimate}
        onRequestQuote={() => setQuoteOpen(true)}
      />
      <QuoteFormDialog
        lang={lang}
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        estimate={estimate}
        guestCount={guestCount}
        menuType={menuType}
      />
    </div>
  );
};

export default Events;
