"use client";

import { useEffect } from "react";
import i18n, { changeLanguage, getInitialLang } from "@/i18n";

// Must be rendered INSIDE the page segment (not the layout/shell). Its effect
// only fires after the page segment has fully hydrated, so switching the
// i18n language here can never race with hydration of sibling components.
export default function ApplyLanguage() {
  useEffect(() => {
    const lang = getInitialLang();
    document.documentElement.lang = lang;
    if (lang !== i18n.resolvedLanguage) {
      void changeLanguage(lang);
    }
  }, []);

  return null;
}
