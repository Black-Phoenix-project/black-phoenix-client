"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "./locales/ru";
import { uz } from "./locales/uz";
import { en } from "./locales/en";

export const LANGS = [
  { code: "ru", label: "Русский" },
  { code: "uz", label: "O'zbekcha" },
  { code: "en", label: "English" },
] as const;

export type LangCode = (typeof LANGS)[number]["code"];

const STORAGE_KEY = "bp-lang";

export const getInitialLang = (): LangCode => {
  if (typeof window === "undefined") return "ru";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "uz" || saved === "en") return saved;
  const nav = window.navigator.language?.toLowerCase() || "";
  if (nav.startsWith("uz")) return "uz";
  if (nav.startsWith("en")) return "en";
  return "ru";
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    uz: { translation: uz },
    en: { translation: en },
  },
  lng: "ru",
  fallbackLng: "ru",
  supportedLngs: ["ru", "uz", "en"],
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export function changeLanguage(lng: LangCode) {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
}

export function getCurrentLang(): LangCode {
  const lng = i18n.language;
  if (lng === "uz" || lng === "en") return lng;
  return "ru";
}

export default i18n;
