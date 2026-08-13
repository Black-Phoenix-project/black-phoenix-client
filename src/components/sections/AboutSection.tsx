"use client";

import { Truck, UserCheck, ShieldCheck, Package2, PhoneCall } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  const advantages = [
    { icon: Truck, titleKey: "about.advantagesList.deliveryTitle", descKey: "about.advantagesList.deliveryDesc" },
    { icon: UserCheck, titleKey: "about.advantagesList.approachTitle", descKey: "about.advantagesList.approachDesc" },
    { icon: ShieldCheck, titleKey: "about.advantagesList.qualityTitle", descKey: "about.advantagesList.qualityDesc" },
    { icon: Package2, titleKey: "about.advantagesList.noMinTitle", descKey: "about.advantagesList.noMinDesc" },
  ];

  const categories = [
    "about.categories.summer",
    "about.categories.signal",
    "about.categories.ppe",
    "about.categories.footwear",
  ];

  const services = [
    "about.servicesList.fabrics",
    "about.servicesList.design",
    "about.servicesList.production",
    "about.servicesList.kits",
    "about.servicesList.branding",
  ];

  return (
    <section
      id="about"
      className="bg-brand-light border-y border-base-300 py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-primary/60 uppercase tracking-widest font-medium mb-2">
            {t("about.company")}
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-base-content"
          >
            {t("about.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <p className="text-base-content/70 leading-relaxed text-base mb-6">
                <span className="text-primary font-semibold">
                  &ldquo;Blackphoenix&rdquo;
                </span>{" "}
                {t("about.intro")}
              </p>
              <h3 className="text-base-content font-semibold text-sm uppercase tracking-wider mb-3">
                {t("about.services")}
              </h3>
              <ul className="space-y-2.5" aria-label={t("about.services")}>
                {services.map((service, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-base-content/60">{t(service)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-base-content font-semibold text-sm uppercase tracking-wider mb-1">
                {t("about.assortmentTitle")}
              </h3>
              <p className="text-sm text-base-content/50 mb-4">
                {t("about.assortmentDesc")}
              </p>
              <p className="text-xs text-base-content/30 uppercase tracking-wider mb-3">
                {t("about.orderLabel")}
              </p>
              <ul className="space-y-2.5" aria-label={t("about.orderLabel")}>
                {categories.map((cat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-base-content/60">{t(cat)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center font-display text-xl sm:text-2xl font-bold text-base-content mb-6">
            {t("about.advantages")}
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="list"
            aria-label={t("about.advantages")}
          >
            {advantages.map((adv, i) => (
              <div
                key={i}
                role="listitem"
                className="glass-card rounded-2xl p-5 border border-base-300 hover:border-primary/15 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-warning/20 transition-colors">
                  <adv.icon
                    size={20}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="font-semibold text-base-content text-sm mb-2">
                  {t(adv.titleKey)}
                </h4>
                <p className="text-xs text-base-content/50 leading-relaxed">
                  {t(adv.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-primary/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PhoneCall size={22} className="text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base-content text-base mb-1">
                {t("about.order")}
              </h3>
              <p className="text-sm text-base-content/50 leading-relaxed">
                {t("about.orderDesc")}
              </p>
              <p className="text-xs text-primary/70 mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
                {t("about.orderNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
