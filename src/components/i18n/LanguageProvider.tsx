"use client";

import { useEffect, useRef } from "react";
import i18n, { getInitialLang } from "@/i18n";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const lang = getInitialLang();
      if (lang !== i18n.resolvedLanguage) {
        i18n.changeLanguage(lang);
      }
      document.documentElement.lang = lang;
    }
  }, []);

  return <>{children}</>;
}
