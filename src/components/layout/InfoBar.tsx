"use client";

import { Phone, Mail, Clock } from "lucide-react";

export default function InfoBar() {
  return (
    <div className="bg-brand-dark-2 border-b border-white/5 text-xs text-white/50 py-1.5 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="tel:+998901234567"
            className="flex items-center gap-1.5 hover:text-warning transition-colors min-h-0 min-w-0"
            aria-label="Номер телефона"
          >
            <Phone size={11} />
            <span>+998 90 123-45-67</span>
          </a>
          <a
            href="mailto:info@blackphoenix.uz"
            className="flex items-center gap-1.5 hover:text-warning transition-colors min-h-0 min-w-0"
            aria-label="Email адрес"
          >
            <Mail size={11} />
            <span>info@blackphoenix.uz</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span>Пн-Сб: 09:00-18:00</span>
        </div>
      </div>
    </div>
  );
}
