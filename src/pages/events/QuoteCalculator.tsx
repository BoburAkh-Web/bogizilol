import React from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { t, fadeUp, menuTypes, extras, type Lang } from "./eventsData";

interface QuoteCalculatorProps {
  lang: Lang;
  guestCount: number;
  setGuestCount: (count: number) => void;
  menuType: string;
  setMenuType: (type: string) => void;
  selectedExtras: string[];
  toggleExtra: (id: string) => void;
  estimate: number;
  onRequestQuote: () => void;
}

const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  lang,
  guestCount,
  setGuestCount,
  menuType,
  setMenuType,
  selectedExtras,
  toggleExtra,
  estimate,
  onRequestQuote,
}) => (
  <section className="py-24 lg:py-32 bg-muted/50">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <motion.p variants={fadeUp} custom={0} className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
          <Calculator className="inline w-4 h-4 mr-2 -mt-0.5" />
          {t({ en: "Plan Your Event", uz: "Tadbiringizni rejalashtiring", ru: "Спланируйте мероприятие" }, lang)}
        </motion.p>
        <motion.h2 variants={fadeUp} custom={1} className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          {t({ en: "Request a Quote", uz: "Narx so'rash", ru: "Запросить цену" }, lang)}
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8 md:p-10 space-y-8">
            {/* Guest Count */}
            <div className="space-y-3">
              <Label className="text-base font-heading font-semibold">
                {t({ en: "Number of Guests", uz: "Mehmonlar soni", ru: "Количество гостей" }, lang)}
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min={10}
                  max={500}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(10, Math.min(500, Number(e.target.value) || 10)))}
                  className="w-32 text-center text-lg font-semibold"
                />
                <span className="text-sm text-muted-foreground">
                  {t({ en: "guests (10–500)", uz: "mehmon (10–500)", ru: "гостей (10–500)" }, lang)}
                </span>
              </div>
            </div>

            {/* Menu Type */}
            <div className="space-y-3">
              <Label className="text-base font-heading font-semibold">
                {t({ en: "Menu Type", uz: "Menyu turi", ru: "Тип меню" }, lang)}
              </Label>
              <RadioGroup value={menuType} onValueChange={setMenuType} className="grid sm:grid-cols-3 gap-3">
                {menuTypes.map((m) => (
                  <Label
                    key={m.value}
                    htmlFor={m.value}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      menuType === m.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={m.value} id={m.value} />
                    <div>
                      <p className="font-semibold text-foreground">{t(m.label, lang)}</p>
                      <p className="text-xs text-muted-foreground">${m.pricePerGuest}/{t({ en: "guest", uz: "mehmon", ru: "гость" }, lang)}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Extras */}
            <div className="space-y-3">
              <Label className="text-base font-heading font-semibold">
                <Sparkles className="inline w-4 h-4 mr-1.5 -mt-0.5 text-accent" />
                {t({ en: "Extras", uz: "Qo'shimchalar", ru: "Дополнения" }, lang)}
              </Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {extras.map((extra) => (
                  <Label
                    key={extra.id}
                    htmlFor={extra.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedExtras.includes(extra.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Checkbox
                      id={extra.id}
                      checked={selectedExtras.includes(extra.id)}
                      onCheckedChange={() => toggleExtra(extra.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{t(extra.label, lang)}</p>
                      <p className="text-xs text-muted-foreground">+${extra.price}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </div>

            {/* Estimate */}
            <div className="border-t border-border pt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t({ en: "Estimated Total", uz: "Taxminiy jami", ru: "Ориентировочная сумма" }, lang)}
                  </p>
                  <p className="font-heading text-4xl md:text-5xl font-bold text-gold-gradient">
                    ${estimate.toLocaleString()}
                  </p>
                </div>
                <Button size="lg" className="bg-emerald-gradient text-primary-foreground font-semibold" onClick={onRequestQuote}>
                  {t({ en: "Get a Detailed Quote", uz: "Batafsil narx olish", ru: "Получить подробный расчёт" }, lang)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>
);

export default QuoteCalculator;
