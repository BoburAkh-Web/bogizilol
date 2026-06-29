import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

const navItems = [
  { path: "/", key: "home" },
  { path: "/menu", key: "menu" },
  { path: "/reservation", key: "reservation" },
  { path: "/story", key: "story" },
  { path: "/events", key: "events" },
];

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHome ? "bg-background/10 backdrop-blur-md" : "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm"}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-xl lg:text-2xl font-bold tracking-wide"
          >
            <span
              className={isHome ? "text-primary-foreground" : "text-foreground"}
            >
              Bogi
            </span>
            <span className="text-gold-gradient ml-1">Zilol</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-accent ${
                  location.pathname === item.path
                    ? "text-accent"
                    : isHome
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                }`}
              >
                {t("nav", item.key)}
              </Link>
            ))}
          </nav>

          {/* Language Switcher + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border/50 px-1 py-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    language === lang.code
                      ? "bg-primary text-primary-foreground"
                      : isHome
                        ? "text-primary-foreground/70 hover:text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              className={`lg:hidden p-2 ${isHome ? "text-primary-foreground" : "text-foreground"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium tracking-wide transition-colors ${
                    location.pathname === item.path
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {t("nav", item.key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
