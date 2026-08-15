"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Ru } from "./locales/ru";
import { ru } from "./locales/ru";

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
  },
  lng: "ru",
  fallbackLng: "ru",
  supportedLngs: ["ru", "uz", "en"],
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

// Only the default language ships in the initial bundle. uz/en are fetched
// on demand (dynamic chunks) and merged in via addResourceBundle, so a page
// never parses translations for languages the visitor isn't using.
const loadedLangs = new Set<LangCode>(["ru"]);

async function ensureLangResources(lng: LangCode) {
  if (loadedLangs.has(lng)) return;
  const mod =
    lng === "uz"
      ? await import("./locales/uz")
      : await import("./locales/en");
  const resources = (mod as Record<string, Ru>)[lng];
  i18n.addResourceBundle(lng, "translation", resources);
  loadedLangs.add(lng);
}

export async function changeLanguage(lng: LangCode) {
  await ensureLangResources(lng);
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
