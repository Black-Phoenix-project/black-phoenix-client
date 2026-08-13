"use client";

import { Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InfoBar() {
  const { t } = useTranslation();

  return (
    <div className="bg-yellow-50 border-b border-yellow-100 text-xs text-yellow-900 py-1.5 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="tel:+998901234567"
            className="flex items-center gap-1.5 hover:text-yellow-950 transition-colors min-h-0 min-w-0"
            aria-label={t("nav.phone")}
          >
            <Phone size={11} />
            <span>+998 90 123-45-67</span>
          </a>
          <a
            href="mailto:info@blackphoenix.uz"
            className="flex items-center gap-1.5 hover:text-yellow-950 transition-colors min-h-0 min-w-0"
            aria-label="Email"
          >
            <Mail size={11} />
            <span>info@blackphoenix.uz</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span>{t("infoBar.schedule")}</span>
        </div>
      </div>
    </div>
  );
}
