"use client";

import { useTranslation } from "react-i18next";

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-base-content mb-6">
        {t("privacy.title")}
      </h1>
      <div className="prose prose-sm space-y-4 text-base-content/60">
        <p>{t("privacy.intro")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("privacy.dataTitle")}
        </h2>
        <p>{t("privacy.dataText")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("privacy.useTitle")}
        </h2>
        <p>{t("privacy.useText")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("privacy.cookiesTitle")}
        </h2>
        <p>{t("privacy.cookiesText")}</p>
        <p className="text-base-content/30 text-xs mt-8">
          {t("privacy.updated")}
        </p>
      </div>
    </div>
  );
}
