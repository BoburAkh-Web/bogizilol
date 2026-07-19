import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Lock, Eye, EyeOff, ArrowRight, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/bogi-zilol-premium-img.jpg";
import { loginAdmin } from "@/lib/api";
/** Xom raqamlardan "+998 (90) 123-45-67" yasaydi (9 ta raqam saqlanadi). */
const formatPhone = (digits: string) => {
  const d = digits.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += " (" + d.slice(0, 2);
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
};

export default function AdminLogin() {
  const navigate = useNavigate();

  const [phoneDigits, setPhoneDigits] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const local = onlyDigits.startsWith("998") ? onlyDigits.slice(3) : onlyDigits;
    setPhoneDigits(local.slice(0, 9));
    if (error) setError("");
  };

  const isValid = phoneDigits.length === 9 && password.length >= 1;

  const handleSubmit = async () => {
  if (!isValid) {
    setError("Telefon raqam va parolni to'liq kiriting.");
    return;
  }
  setIsSubmitting(true);
  setError("");

  try {
    const res = await loginAdmin({
      phone: "+998" + phoneDigits,
      password: password,
    });
    // Token'ni saqlaymiz
    localStorage.setItem("token", res.token);
    navigate("/admin");
  } catch (err) {
    setError("Telefon raqam yoki parol noto'g'ri.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ==================== CHAP: Brend paneli ==================== */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary">
        {/* Qatlam 1: chuqurlik gradienti */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(174_60%_12%)] via-primary to-[hsl(174_80%_16%)]" />

        {/* Qatlam 2: Signature — botanik motiv (oltin, past shaffoflik) */}
        <svg
          className="absolute -right-24 -bottom-24 w-[520px] h-[520px] text-accent opacity-[0.07] pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M100 20 C100 80 100 140 100 190" />
          <path d="M100 60 C70 55 55 70 50 95 C80 95 95 85 100 60 Z" />
          <path d="M100 60 C130 55 145 70 150 95 C120 95 105 85 100 60 Z" />
          <path d="M100 105 C72 100 58 114 54 138 C82 138 96 128 100 105 Z" />
          <path d="M100 105 C128 100 142 114 146 138 C118 138 104 128 100 105 Z" />
          <circle cx="100" cy="30" r="8" />
        </svg>

        {/* Qatlam 3: nozik yorug'lik dog'i */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 15%, hsl(var(--accent) / 0.12) 0%, transparent 30%)",
          }}
        />

        {/* Kontent */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-primary-foreground w-full">
          {/* Yuqori: wordmark */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-heading text-2xl tracking-wide">
              Bogi <span className="text-gold-gradient">Zilol</span>
            </span>
            <div className="h-px w-12 bg-accent/50 mt-3" />
          </motion.div>

          {/* O'rta: logo medalyon + sarlavha */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl scale-110" />
                <div className="relative w-36 h-36 rounded-full bg-white shadow-2xl ring-1 ring-accent/40 flex items-center justify-center p-5">
                  <img src={logo} alt="Bog'i Zilol logotipi" className="w-full h-full object-contain" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-primary-foreground/15" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-heading text-4xl xl:text-5xl leading-[1.15] mb-5"
            >
              Restoraningizni
              <br />
              <span className="text-gold-gradient">bir joydan</span> boshqaring
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-primary-foreground/70 max-w-sm leading-relaxed"
            >
              Menyu, kategoriyalar va bronlarni bitta oynadan oson boshqaring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-3 mt-8"
            >
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <UtensilsCrossed className="h-4 w-4 text-accent" />
                Menyu va kategoriyalarni real vaqtda tahrirlash
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Bronlarni ko'rish va boshqarish
              </div>
            </motion.div>
          </div>

          {/* Past: copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-body text-xs text-primary-foreground/40"
          >
            © {new Date().getFullYear()} Bog'i Zilol. Barcha huquqlar himoyalangan.
          </motion.div>
        </div>
      </div>

      {/* ==================== O'NG: Forma ==================== */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-gradient-to-br from-secondary/40 via-background to-secondary/20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, hsl(var(--primary)) 0%, transparent 35%), radial-gradient(circle at 85% 80%, hsl(var(--accent)) 0%, transparent 35%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="relative bg-card rounded-2xl border border-border/60 shadow-xl shadow-primary/5 overflow-hidden">
            {/* Yuqori oltin aksent chizig'i */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-primary" />

            <div className="p-8 sm:p-10">
              {/* Mobil brend medalyon (lg'da yashirin) */}
              <div className="lg:hidden flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-white shadow-lg ring-1 ring-accent/30 flex items-center justify-center p-3 mb-4">
                  <img src={logo} alt="Bog'i Zilol" className="w-full h-full object-contain" />
                </div>
                <span className="font-heading text-2xl text-foreground">
                  Bogi <span className="text-gold-gradient">Zilol</span>
                </span>
              </div>

              <div className="mb-8">
                <h2 className="font-heading text-3xl text-foreground mb-2">Xush kelibsiz</h2>
                <div className="h-0.5 w-10 bg-accent rounded-full mb-3" />
                <p className="font-body text-muted-foreground">Davom etish uchun tizimga kiring</p>
              </div>

              <div className="space-y-5" onKeyDown={handleKeyDown}>
                {/* Telefon */}
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                    Telefon raqam
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      inputMode="numeric"
                      value={formatPhone(phoneDigits)}
                      onChange={handlePhoneChange}
                      placeholder="+998 (__) ___-__-__"
                      className="pl-10 h-12 font-body"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Parol */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-body font-medium text-foreground">Parol</label>
                    <button
                      type="button"
                      onClick={() => alert("Parolni tiklash keyinroq qo'shiladi.")}
                      className="text-xs font-body text-accent hover:underline"
                    >
                      Parolni unutdingizmi?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Parolingiz"
                      className="pl-10 pr-10 h-12 font-body"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Xato */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-body text-destructive"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Kirish */}
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    "Kirish..."
                  ) : (
                    <>
                      Kirish
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs font-body text-muted-foreground mt-6">
            Faqat vakolatli xodimlar uchun.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
