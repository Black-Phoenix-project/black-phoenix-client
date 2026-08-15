"use client";

import { useEffect } from "react";
import i18n, { getInitialLang } from "@/i18n";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const applyLang = () => {
      const lang = getInitialLang();
      if (lang !== i18n.resolvedLanguage) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.lang = lang;
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(applyLang, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(applyLang, 3000);
    return () => window.clearTimeout(id);
  }, []);

  return <>{children}</>;
}
