"use client";

import { useTranslation } from "react-i18next";

export default function OfertaContent() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-base-content mb-6">
        {t("oferta.title")}
      </h1>
      <div className="space-y-4 text-base-content/60 text-sm leading-relaxed">
        <p>{t("oferta.intro")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("oferta.goods")}
        </h2>
        <p>{t("oferta.goodsText")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("oferta.ordering")}
        </h2>
        <p>{t("oferta.orderingText")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("oferta.delivery")}
        </h2>
        <p>{t("oferta.deliveryText")}</p>
        <h2 className="text-base-content font-semibold text-base mt-6">
          {t("oferta.returns")}
        </h2>
        <p>{t("oferta.returnsText")}</p>
        <p className="text-base-content/30 text-xs mt-8">
          {t("oferta.updated")}
        </p>
      </div>
    </div>
  );
}
