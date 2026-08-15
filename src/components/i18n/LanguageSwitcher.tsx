"use client";

import { useState, useEffect, useRef } from "react";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGS, changeLanguage, getCurrentLang, type LangCode } from "@/i18n";
import clsx from "clsx";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<LangCode>("ru");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(getCurrentLang());
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (code: LangCode) => {
    void changeLanguage(code);
    setCurrent(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${current.toUpperCase()} - ${t("language.choose")}`}
        className="btn-icon-sm flex items-center gap-1.5 px-2.5 rounded-lg hover:bg-base-200 transition-colors text-sm font-semibold uppercase text-base-content/70 hover:text-base-content min-h-0"
      >
        <Languages size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">{current.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={clsx(
            "transition-transform hidden sm:block",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t("language.switcher")}
          className="absolute right-0 top-full mt-1 z-50 menu menu-sm bg-white border border-base-300 rounded-xl shadow-2xl w-44 p-2"
        >
          {LANGS.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={current === lang.code}
                onClick={() => select(lang.code)}
                className={clsx(
                  "flex items-center justify-between gap-2 text-sm rounded-lg px-3 py-2 min-h-0 w-full text-left",
                  current === lang.code
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-base-content/70 hover:bg-base-200"
                )}
              >
                <span>{lang.label}</span>
                {current === lang.code && (
                  <Check size={14} aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
