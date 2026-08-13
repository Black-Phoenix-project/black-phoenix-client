"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  titleKey?: string;
  showViewAll?: boolean;
}

export default function ProductGrid({
  products,
  title,
  titleKey,
  showViewAll = true,
}: ProductGridProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? (titleKey ? t(titleKey) : t("productGrid.title"));

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12" aria-label={t("productGrid.productsAria")}>
        <div className="text-center py-16 text-base-content/30">
          <p className="text-lg">{t("productGrid.empty")}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-8 sm:py-12"
      aria-label={resolvedTitle}
      id="products"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-1">
            {t("productGrid.assortment")}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            {resolvedTitle}
          </h2>
          <div className="w-12 h-1 bg-warning rounded-full mt-2" aria-hidden="true" />
        </div>
        {showViewAll && (
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors group min-h-[44px]"
            aria-label={t("productGrid.viewAllAria")}
          >
            {t("productGrid.viewAll")}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        role="list"
        aria-label={t("productGrid.listAria")}
      >
        {products.map((product) => (
          <div key={product._id} role="listitem">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
