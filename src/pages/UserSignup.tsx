import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, ArrowRight, ArrowLeft, Send, MessageCircle, CalendarCheck, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupRequest, signupConfirm } from "@/lib/api";
import logo from "@/assets/bogi-zilol-premium-img.jpg";

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

const CODE_LENGTH = 4;

type Step = "form" | "telegram" | "code";

export default function UserSignup() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("form");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [signupToken, setSignupToken] = useState(""); // 1-qadamdan olingan token
  const [botLink, setBotLink] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "code") codeRefs.current[0]?.focus();
  }, [step]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    const local = onlyDigits.startsWith("998") ? onlyDigits.slice(3) : onlyDigits;
    setPhoneDigits(local.slice(0, 9));
    if (error) setError("");
  };

  // --- 1-qadam: signup so'rovi ---
  const handleFormSubmit = async () => {
    if (!firstname.trim() || !lastname.trim()) {
      setError("Ism va familiyani kiriting.");
      return;
    }
    if (phoneDigits.length !== 9) {
      setError("Telefon raqamni to'liq kiriting.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const res = await signupRequest({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        phone: "+998" + phoneDigits,
      });
      const extractedToken = res.botLink.split("start=")[1] || "";
      setSignupToken(extractedToken);
      setBotLink(res.botLink);
      setStep("telegram");
    } catch (err) {
      setError("Ro'yxatdan o'tishda xato. Bu raqam avval ro'yxatdan o'tган bo'lishi mumkin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBot = () => {
    if (botLink) window.open(botLink, "_blank");
    setStep("code");
  };

  // --- Kod katakchalari ---
  const handleCodeChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (error) setError("");
    if (digit && index < CODE_LENGTH - 1) codeRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => (next[i] = ch));
    setCode(next);
    codeRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  // --- 4-qadam: kodni tasdiqlash ---
  const handleConfirm = async () => {
    const codeStr = code.join("");
    if (codeStr.length !== CODE_LENGTH) {
      setError("Kodni to'liq kiriting.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const res = await signupConfirm({ token: signupToken, code: Number(codeStr) });
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      setError("Kod noto'g'ri yoki muddati o'tган. Qaytadan urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ==================== CHAP: Brend paneli ==================== */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(174_60%_12%)] via-primary to-[hsl(174_80%_16%)]" />
        <svg
          className="absolute -right-24 -bottom-24 w-[520px] h-[520px] text-accent opacity-[0.07] pointer-events-none"
          viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5"
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
          style={{ backgroundImage: "radial-gradient(circle at 25% 15%, hsl(var(--accent) / 0.12) 0%, transparent 30%)" }}
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
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }} className="mb-10"
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
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-heading text-4xl xl:text-5xl leading-[1.15] mb-5"
            >
              Bizga
              <br />
              <span className="text-gold-gradient">qo'shiling</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-primary-foreground/70 max-w-sm leading-relaxed"
            >
              Ro'yxatdan o'ting va stol band qilish, buyurtma berish imkoniyatiga ega bo'ling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-col gap-3 mt-8"
            >
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <CalendarCheck className="h-4 w-4 text-accent" />
                Tez va oson stol band qilish
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-primary-foreground/80">
                <UtensilsCrossed className="h-4 w-4 text-accent" />
                Sevimli taomlaringizni buyurtma qilish
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
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
          style={{ backgroundImage: "radial-gradient(circle at 15% 20%, hsl(var(--primary)) 0%, transparent 35%), radial-gradient(circle at 85% 80%, hsl(var(--accent)) 0%, transparent 35%)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10"
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
                {/* ============ 1-QADAM: FORMA ============ */}
                {step === "form" && (
                  <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="mb-8">
                      <h2 className="font-heading text-3xl text-foreground mb-2">Ro'yxatdan o'tish</h2>
                      <div className="h-0.5 w-10 bg-accent rounded-full mb-3" />
                      <p className="font-body text-muted-foreground">Ma'lumotlaringizni kiriting.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-body font-medium text-foreground mb-1.5">Ism</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input value={firstname} onChange={(e) => { setFirstname(e.target.value); if (error) setError(""); }} placeholder="Ism" className="pl-10 h-12 font-body" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-body font-medium text-foreground mb-1.5">Familiya</label>
                          <Input value={lastname} onChange={(e) => { setLastname(e.target.value); if (error) setError(""); }} placeholder="Familiya" className="h-12 font-body" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1.5">Telefon raqam</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel" inputMode="numeric" value={formatPhone(phoneDigits)}
                            onChange={handlePhoneChange}
                            onKeyDown={(e) => e.key === "Enter" && handleFormSubmit()}
                            placeholder="+998 (__) ___-__-__" className="pl-10 h-12 font-body" autoComplete="tel"
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-body text-destructive">{error}</motion.p>
                      )}

                      <Button onClick={handleFormSubmit} disabled={isSubmitting} className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5">
                        {isSubmitting ? "Yuborilmoqda..." : (<>Davom etish<ArrowRight className="h-4 w-4" /></>)}
                      </Button>

                      <p className="text-center text-sm font-body text-muted-foreground pt-2">
                        Hisobingiz bormi?{" "}
                        <Link to="/login" className="text-accent hover:underline">Kirish</Link>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ============ 2-QADAM: TELEGRAM ============ */}
                {step === "telegram" && (
                  <motion.div key="telegram" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <button onClick={() => setStep("form")} className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
                      <ArrowLeft className="h-4 w-4" /> Orqaga
                    </button>

                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                        <MessageCircle className="h-8 w-8 text-accent" />
                      </div>
                      <h2 className="font-heading text-3xl text-foreground mb-2">Telegram orqali tasdiqlash</h2>
                      <p className="font-body text-muted-foreground">
                        Tugmani bosing va Telegram botда <span className="text-foreground font-medium">"Raqamni ulashish"</span> tugmasini bosing. Keyin sizga tasdiqlash kodi yuboriladi.
                      </p>
                    </div>

                    <Button onClick={openBot} className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5">
                      <Send className="h-4 w-4" /> Telegram botni ochish
                    </Button>

                    <button onClick={() => setStep("code")} className="w-full text-center text-sm font-body text-accent hover:underline mt-4">
                      Botga o'tdim, kodni kiritaman →
                    </button>
                  </motion.div>
                )}

                {/* ============ 3-QADAM: KOD ============ */}
                {step === "code" && (
                  <motion.div key="code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <button onClick={() => setStep("telegram")} className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
                      <ArrowLeft className="h-4 w-4" /> Orqaga
                    </button>

                    <div className="mb-8">
                      <h2 className="font-heading text-3xl text-foreground mb-2">Kodni kiriting</h2>
                      <div className="h-0.5 w-10 bg-accent rounded-full mb-3" />
                      <p className="font-body text-muted-foreground">
                        Telegram botдан kelган {CODE_LENGTH} xonali kodni kiriting.
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 mb-5" onPaste={handleCodePaste}>
                      {code.map((digit, i) => (
                        <input
                          key={i} ref={(el) => (codeRefs.current[i] = el)}
                          type="text" inputMode="numeric" maxLength={1} value={digit}
                          onChange={(e) => handleCodeChange(i, e.target.value)}
                          onKeyDown={(e) => handleCodeKeyDown(i, e)}
                          className="w-14 h-16 text-center text-2xl font-heading rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      ))}
                    </div>

                    {error && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-body text-destructive mb-4">{error}</motion.p>
                    )}

                    <Button onClick={handleConfirm} disabled={isSubmitting} className="w-full h-12 font-body text-base gap-2 transition-transform hover:-translate-y-0.5">
                      {isSubmitting ? "Tekshirilmoqda..." : (<>Tasdiqlash<ArrowRight className="h-4 w-4" /></>)}
                    </Button>
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
