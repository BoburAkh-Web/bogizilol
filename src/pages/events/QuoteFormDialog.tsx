import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Send, CalendarIcon } from "lucide-react";
import { t, menuTypes, type Lang } from "./eventsData";

interface QuoteFormDialogProps {
  lang: Lang;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estimate: number;
  guestCount: number;
  menuType: string;
}

const QuoteFormDialog: React.FC<QuoteFormDialogProps> = ({
  lang,
  open,
  onOpenChange,
  estimate,
  guestCount,
  menuType,
}) => {
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", requests: "" });
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validatePhone = (phone: string): boolean => {
    return /^\+?[\d\s\-()]{7,20}$/.test(phone.trim());
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name.trim() || !quoteForm.email.trim() || !quoteForm.phone.trim() || !eventDate) {
      toast.error(t({ en: "Please fill in all required fields", uz: "Iltimos, barcha maydonlarni to'ldiring", ru: "Пожалуйста, заполните все обязательные поля" }, lang));
      return;
    }
    if (!validatePhone(quoteForm.phone)) {
      setPhoneError(t({ en: "Invalid phone number format", uz: "Telefon raqami formati noto'g'ri", ru: "Неверный формат номера телефона" }, lang));
      return;
    }
    setPhoneError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      setQuoteForm({ name: "", email: "", phone: "", requests: "" });
      setEventDate(undefined);
      toast.success(t({ en: "Quote request sent! We'll contact you soon.", uz: "So'rov yuborildi! Tez orada siz bilan bog'lanamiz.", ru: "Запрос отправлен! Мы свяжемся с вами в ближайшее время." }, lang));
    }, 1000);
  };

  const menuLabel = menuTypes.find(m => m.value === menuType)!.label[lang];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            {t({ en: "Get a Detailed Quote", uz: "Batafsil narx olish", ru: "Получить подробный расчёт" }, lang)}
          </DialogTitle>
          <DialogDescription>
            {t({
              en: `Estimated total: $${estimate.toLocaleString()} · ${guestCount} guests · ${menuLabel}`,
              uz: `Taxminiy jami: $${estimate.toLocaleString()} · ${guestCount} mehmon · ${menuLabel}`,
              ru: `Ориентировочно: $${estimate.toLocaleString()} · ${guestCount} гостей · ${menuLabel}`,
            }, lang)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleQuoteSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="quote-name">{t({ en: "Full Name *", uz: "To'liq ism *", ru: "Полное имя *" }, lang)}</Label>
            <Input id="quote-name" value={quoteForm.name} onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))} maxLength={100} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-email">{t({ en: "Email *", uz: "Email *", ru: "Email *" }, lang)}</Label>
              <Input id="quote-email" type="email" value={quoteForm.email} onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))} maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-phone">{t({ en: "Phone *", uz: "Telefon *", ru: "Телефон *" }, lang)}</Label>
              <Input
                id="quote-phone"
                type="tel"
                value={quoteForm.phone}
                onChange={(e) => {
                  setQuoteForm(prev => ({ ...prev, phone: e.target.value }));
                  if (phoneError) setPhoneError("");
                }}
                maxLength={20}
                placeholder="+998 90 123 4567"
              />
              {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t({ en: "Event Date *", uz: "Tadbir sanasi *", ru: "Дата мероприятия *" }, lang)}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !eventDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventDate ? format(eventDate, "PPP") : <span>{t({ en: "Pick a date", uz: "Sanani tanlang", ru: "Выберите дату" }, lang)}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={eventDate}
                  onSelect={setEventDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote-requests">{t({ en: "Special Requests", uz: "Maxsus so'rovlar", ru: "Особые пожелания" }, lang)}</Label>
            <Textarea id="quote-requests" value={quoteForm.requests} onChange={(e) => setQuoteForm(prev => ({ ...prev, requests: e.target.value }))} maxLength={1000} rows={3} placeholder={t({ en: "Any specific requirements or questions...", uz: "Maxsus talablar yoki savollar...", ru: "Особые требования или вопросы..." }, lang)} />
          </div>
          <Button type="submit" size="lg" className="w-full bg-emerald-gradient text-primary-foreground font-semibold" disabled={submitting}>
            <Send className="w-4 h-4 mr-2" />
            {submitting
              ? t({ en: "Sending...", uz: "Yuborilmoqda...", ru: "Отправка..." }, lang)
              : t({ en: "Send Quote Request", uz: "So'rov yuborish", ru: "Отправить запрос" }, lang)}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormDialog;
