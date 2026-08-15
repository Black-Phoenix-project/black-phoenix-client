"use client";

// Side-effect import that guarantees the i18n instance (and its bundled
// resources) is initialized as part of the shell's synchronous load path,
// before any shell component calls useTranslation(). Without it the i18n
// init can end up in a lazily-loaded chunk and shell components hydrate
// with an uninitialized i18next instance (raw translation keys).
import "@/i18n";

export default function I18nInit() {
  return null;
}
