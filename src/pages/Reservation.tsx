import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageSEO from "@/components/seo/PageSEO";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Users,
  MapPin,
  User,
  Phone,
  Mail,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const STEPS = ["date", "time", "party", "table", "contact"] as const;
type Step = (typeof STEPS)[number];

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

const tablePreferences = [
  { key: "indoor", icon: "🏠" },
  { key: "outdoor", icon: "🌿" },
  { key: "private", icon: "🚪" },
  { key: "window", icon: "🪟" },
] as const;

type TablePref = (typeof tablePreferences)[number]["key"];

const t = {
  title: { en: "Reserve Your Table", uz: "Stol band qilish", ru: "Забронировать стол" },
  subtitle: {
    en: "An unforgettable evening awaits you",
    uz: "Unutilmas oqshom sizni kutmoqda",
    ru: "Вас ждёт незабываемый вечер",
  },
  steps: {
    date: { en: "Date", uz: "Sana", ru: "Дата" },
    time: { en: "Time", uz: "Vaqt", ru: "Время" },
    party: { en: "Guests", uz: "Mehmonlar", ru: "Гости" },
    table: { en: "Table", uz: "Stol", ru: "Стол" },
    contact: { en: "Contact", uz: "Aloqa", ru: "Контакт" },
  },
  dateLabel: { en: "Select a date", uz: "Sanani tanlang", ru: "Выберите дату" },
  timeLabel: { en: "Choose a time slot", uz: "Vaqtni tanlang", ru: "Выберите время" },
  partyLabel: { en: "How many guests?", uz: "Nechta mehmon?", ru: "Сколько гостей?" },
  tableLabel: { en: "Table preference", uz: "Stol turi", ru: "Предпочтение по столу" },
  tableTypes: {
    indoor: { en: "Indoor", uz: "Ichki", ru: "Внутри" },
    outdoor: { en: "Garden", uz: "Bog'", ru: "Сад" },
    private: { en: "Private Room", uz: "Xususiy xona", ru: "Отд. кабинет" },
    window: { en: "Window", uz: "Deraza yoni", ru: "У окна" },
  },
  contactLabel: { en: "Your details", uz: "Ma'lumotlaringiz", ru: "Ваши данные" },
  name: { en: "Full Name", uz: "To'liq ism", ru: "Полное имя" },
  phone: { en: "Phone Number", uz: "Telefon raqam", ru: "Номер телефона" },
  email: { en: "Email (optional)", uz: "Email (ixtiyoriy)", ru: "Email (необязательно)" },
  next: { en: "Continue", uz: "Davom etish", ru: "Продолжить" },
  back: { en: "Back", uz: "Orqaga", ru: "Назад" },
  confirm: { en: "Confirm Reservation", uz: "Band qilishni tasdiqlash", ru: "Подтвердить бронь" },
  successTitle: { en: "Reservation Confirmed!", uz: "Band qilish tasdiqlandi!", ru: "Бронь подтверждена!" },
  successMsg: {
    en: "We look forward to welcoming you. A confirmation has been sent.",
    uz: "Sizni kutib qolamiz. Tasdiqlash yuborildi.",
    ru: "Ждём вас с нетерпением. Подтверждение отправлено.",
  },
  newReservation: { en: "Make Another", uz: "Yana band qilish", ru: "Новая бронь" },
  guests: { en: "guests", uz: "mehmon", ru: "гостей" },
  pickDate: { en: "Pick a date", uz: "Sana tanlang", ru: "Выберите дату" },
};

export default function Reservation() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(0);
  const [tablePreference, setTablePreference] = useState<TablePref | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const canProceed = () => {
    switch (STEPS[currentStep]) {
      case "date": return !!date;
      case "time": return !!time;
      case "party": return partySize > 0;
      case "table": return !!tablePreference;
      case "contact": return name.trim().length >= 2 && phone.trim().length >= 7;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setDate(undefined);
    setTime("");
    setPartySize(0);
    setTablePreference("");
    setName("");
    setPhone("");
    setEmail("");
    setCurrentStep(0);
    setIsSuccess(false);
  };

  const stepIcons = [CalendarIcon, Clock, Users, MapPin, User];

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4 space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-heading text-3xl text-foreground">{t.successTitle[language]}</h1>
          <p className="text-muted-foreground font-body">{t.successMsg[language]}</p>

          <div className="bg-card border border-border/50 rounded-xl p-5 text-left space-y-3 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.steps.date[language]}</span>
              <span className="text-foreground font-medium">{date ? format(date, "PPP") : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.steps.time[language]}</span>
              <span className="text-foreground font-medium">{time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.steps.party[language]}</span>
              <span className="text-foreground font-medium">{partySize} {t.guests[language]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.steps.table[language]}</span>
              <span className="text-foreground font-medium">{tablePreference && t.tableTypes[tablePreference][language]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.name[language]}</span>
              <span className="text-foreground font-medium">{name}</span>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" className="mt-4">
            {t.newReservation[language]}
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <PageSEO
        title="Reservation"
        description="Reserve your table at Bogi Zilol — book an unforgettable Uzbek dining experience in Tashkent."
        path="/reservation"
      />
      <section className="relative bg-primary/5 py-12 mb-8">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-accent font-body text-sm tracking-[0.2em] uppercase mb-3"
          >
            {t.subtitle[language]}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl text-foreground"
          >
            {t.title[language]}
          </motion.h1>
        </div>
      </section>

      <div className="container max-w-xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((step, i) => {
            const Icon = stepIcons[i];
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : isDone
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-body font-medium hidden sm:block",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {t.steps[step][language]}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2 transition-colors duration-300",
                      isDone ? "bg-primary/40" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="min-h-[280px]"
          >
            {/* Date */}
            {STEPS[currentStep] === "date" && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-foreground">{t.dateLabel[language]}</h2>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-body h-12",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : t.pickDate[language]}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Time */}
            {STEPS[currentStep] === "time" && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-foreground">{t.timeLabel[language]}</h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={cn(
                        "py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200",
                        time === slot
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-card border border-border/50 text-foreground hover:border-primary/40"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Party Size */}
            {STEPS[currentStep] === "party" && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-foreground">{t.partyLabel[language]}</h2>
                <div className="grid grid-cols-5 gap-2">
                  {partySizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setPartySize(size)}
                      className={cn(
                        "py-3 rounded-lg text-sm font-body font-semibold transition-all duration-200",
                        partySize === size
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "bg-card border border-border/50 text-foreground hover:border-primary/40"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Table Preference */}
            {STEPS[currentStep] === "table" && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-foreground">{t.tableLabel[language]}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {tablePreferences.map((pref) => (
                    <button
                      key={pref.key}
                      onClick={() => setTablePreference(pref.key)}
                      className={cn(
                        "flex flex-col items-center gap-2 py-6 rounded-xl transition-all duration-200",
                        tablePreference === pref.key
                          ? "bg-primary/10 border-2 border-primary text-foreground shadow-md"
                          : "bg-card border border-border/50 text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      <span className="text-2xl">{pref.icon}</span>
                      <span className="text-sm font-body font-medium">
                        {t.tableTypes[pref.key][language]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {STEPS[currentStep] === "contact" && (
              <div className="space-y-4">
                <h2 className="font-heading text-xl text-foreground">{t.contactLabel[language]}</h2>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, 100))}
                      placeholder={t.name[language]}
                      className="pl-10 h-12 font-body"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-\s()]/g, "").slice(0, 20))}
                      placeholder={t.phone[language]}
                      className="pl-10 h-12 font-body"
                      type="tel"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                      placeholder={t.email[language]}
                      className="pl-10 h-12 font-body"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 gap-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2 font-body"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back[language]}
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 font-body bg-primary hover:bg-primary/90"
            >
              {t.next[language]}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="gap-2 font-body bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {t.confirm[language]}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
