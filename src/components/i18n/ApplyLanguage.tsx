"use client";

import { useEffect } from "react";
import i18n, { getInitialLang } from "@/i18n";

// Must be rendered INSIDE the page segment (not the layout/shell). Its effect
// only fires after the page segment has fully hydrated, so switching the
// i18n language here can never race with hydration of sibling components.
export default function ApplyLanguage() {
  useEffect(() => {
    const lang = getInitialLang();
    if (lang !== i18n.resolvedLanguage) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, []);

  return null;
}
