import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Instagram, MapPin, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">
              Bogi <span className="text-gold-gradient">Zilol</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t("footer", "tagline")}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">{t("footer", "hours")}</h4>
            <p className="text-primary-foreground/70 text-sm">{t("footer", "hoursDetail")}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">{t("footer", "contact")}</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+998 71 123 45 67</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">{t("footer", "follow")}</h4>
            <a
              href="https://www.instagram.com/bogizilol/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <Instagram size={18} />
              @bogizilol
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Bogi Zilol. {t("footer", "rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
