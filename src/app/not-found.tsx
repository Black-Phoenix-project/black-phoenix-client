"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-8xl font-display font-bold text-primary/20 mb-4 leading-none">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-base-content mb-2">
          {t("notFound.title")}
        </h1>
        <p className="text-base-content/40 text-sm mb-8 max-w-xs mx-auto">
          {t("notFound.desc")}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-base-200 text-base-content font-medium px-5 py-2.5 rounded-xl hover:bg-base-300 transition-colors min-h-[44px] text-sm border border-base-300"
          >
            <ArrowLeft size={16} />
            {t("notFound.goHome")}
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-warning text-black font-bold px-5 py-2.5 rounded-xl hover:bg-warning/90 transition-colors min-h-[44px] text-sm"
          >
            <Search size={16} />
            {t("notFound.products")}
          </Link>
        </div>
      </div>
    </div>
  );
}
