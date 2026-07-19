import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, ArrowLeft, Send, CalendarCheck, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/bogi-zilol-premium-img.jpg";
import { loginRequest, loginVerify } from "@/lib/api";

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

const OTP_LENGTH = 4;
const RESEND_SECONDS = 60;

export default function UserLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Qayta yuborish taymeri
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // OTP qadamiga o'tganda birinchi katakchaga fokus
  useEffect(() => {
    if (step === "otp") otpRefs.current[0]?.focus();
  }, [step]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const local = onlyDigits.startsWith("998") ? onlyDigits.slice(3) : onlyDigits;
    setPhoneDigits(local.slice(0, 9));
    if (error) setError("");
  };

  // --- 1-qadam: kod yuborish ---
  const handleSendCode = async () => {
  if (phoneDigits.length !== 9) {
    setError("Telefon raqamni to'liq kiriting.");
    return;
  }
  setIsSubmitting(true);
  setError("");

  try {
    await loginRequest({ phone: "+998" + phoneDigits });
    setStep("otp");
    setSecondsLeft(RESEND_SECONDS);
  } catch (err) {
    setError("Bu raqam ro'yxatdan o'tmagan. Avval ro'yxatdan o'ting.");
  } finally {
    setIsSubmitting(false);
  }
};

  // --- OTP katakchalari ---
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1); // faqat oxirgi raqam
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (error) setError("");
    // Raqam kiritilsa keyingisiga o't
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  // --- 2-qadam: kodni tasdiqlash ---
const handleVerify = async () => {
  const code = otp.join("");
  if (code.length !== OTP_LENGTH) {
    setError("Kodni to'liq kiriting.");
    return;
  }
  setIsSubmitting(true);
  setError("");

  try {
    const res = await loginVerify({ phone: "+998" + phoneDigits, code });
    localStorage.setItem("token", res.token);
    navigate("/");
  } catch (err) {
    setError("Kod noto'g'ri yoki muddati o'tgan.");
  } finally {
    setIsSubmitting(false);
  }
};

const handleResend = async () => {
  if (secondsLeft > 0) return;
  setOtp(Array(OTP_LENGTH).fill(""));
  try {
    await loginRequest({ phone: "+998" + phoneDigits });
    setSecondsLeft(RESEND_SECONDS);
    otpRefs.current[0]?.focus();
  } catch {
    setError("Kodni qayta yuborishда xato.");
  }
};
  const goBack = () => {
    setStep("phone");
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ==================== CHAP: Brend paneli ==================== */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(174_60%_12%)] via-primary to-[hsl(174_80%_16%)]" />

        {/* Signature botanik motiv */}
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

        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 15%, hsl(var(--accent) / 0.12) 0%, transparent 30%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-primary-foreground w-full">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="font-heading text-2xl tracking-wide">
              Bogi <span className="text-gold-gradient">Zilol</span>
            </span>
            <div className="h-px w-12 bg-accent/50 mt-3" />
          </motion.div>

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
              Ta'mli lahzalar
              <br />
              <span className="text-gold-gradient">sizni kutmoqda</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-primary-foreground/70 max-w-sm leading-relaxed"
            >
              Kiring va stol band qiling, sevimli taomlaringizni buyurtma bering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-3 mt-8"
            >
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <CalendarCheck className="h-4 w-4 text-accent" />
                Bir necha soniyada stol band qilish
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <UtensilsCrossed className="h-4 w-4 text-accent" />
                Menyudan tanlab buyurtma berish
              </div>
            </motion.div>
          </div>

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
            <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-primary" />

            <div className="p-8 sm:p-10">
              {/* Mobil brend medalyon */}
              <div className="lg:hidden flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-white shadow-lg ring-1 ring-accent/30 flex items-center justify-center p-3 mb-4">
                  <img src={logo} alt="Bog'i Zilol" className="w-full h-full object-contain" />
                </div>
                <span className="font-heading text-2xl text-foreground">
                  Bogi <span className="text-gold-gradient">Zilol</span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* ============ 1-QADAM: TELEFON ============ */}
                {step === "phone" && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl text-foreground mb-2">Kirish</h2>
                      <div className="h-0.5 w-10 bg-accent rounded-full mb-3" />
                      <p className="font-body text-muted-foreground">
                        Telefon raqamingizni kiriting — Telegram orqali tasdiqlash kodi yuboramiz.
                      </p>
                    </div>

                    <div className="space-y-5">
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
                            onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                            placeholder="+998 (__) ___-__-__"
                            className="pl-10 h-12 font-body"
                            autoComplete="tel"
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm font-body text-destructive"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button
                        onClick={handleSendCode}
                        disabled={isSubmitting}
                        className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5"
                      >
                        {isSubmitting ? (
                          "Yuborilmoqda..."
                        ) : (
                          <>
                            Kod yuborish
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* ============ 2-QADAM: OTP ============ */}
                {step === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Raqamni o'zgartirish
                    </button>

                    <div className="mb-8">
                      <h2 className="font-heading text-3xl text-foreground mb-2">Kodni kiriting</h2>
                      <div className="h-0.5 w-10 bg-accent rounded-full mb-3" />
                      <p className="font-body text-muted-foreground">
                        <span className="text-foreground font-medium">{formatPhone(phoneDigits)}</span> raqamiga
                        Telegram orqali 6 xonali kod yubordik.
                      </p>
                    </div>

                    {/* OTP katakchalari */}
                    <div className="flex justify-between gap-2 mb-5" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-12 h-14 text-center text-xl font-heading rounded-lg border border-input bg-background
                                     focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      ))}
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-body text-destructive mb-4"
                      >
                        {error}
                      </motion.p>
                    )}

                    <Button
                      onClick={handleVerify}
                      disabled={isSubmitting}
                      className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        "Tekshirilmoqda..."
                      ) : (
                        <>
                          Tasdiqlash
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* Qayta yuborish */}
                    <div className="text-center mt-6">
                      {secondsLeft > 0 ? (
                        <p className="text-sm font-body text-muted-foreground">
                          Qayta yuborish{" "}
                          <span className="text-foreground font-medium tabular-nums">
                            0:{secondsLeft.toString().padStart(2, "0")}
                          </span>
                        </p>
                      ) : (
                        <button
                          onClick={handleResend}
                          className="text-sm font-body text-accent hover:underline"
                        >
                          Kodni qayta yuborish
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-xs font-body text-muted-foreground mt-6">
            Davom etish orqali siz shartlarga rozilik bildirasiz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
