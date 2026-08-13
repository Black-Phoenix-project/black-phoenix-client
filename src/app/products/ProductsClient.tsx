"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import { useProductSearch } from "@/lib/hooks/useProductSearch";
import { type SortOption } from "@/lib/api/search";
import { CATALOG_CATEGORIES } from "@/components/layout/CategoryBar";


interface ProductsClientProps {
  initialProducts: Product[];
}

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const urlQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    const cat = searchParams.get("category") ?? "";
    setCategory(cat);
  }, [searchParams]);

  const {
    query,
    setQuery,
    sort,
    setSort,
    onlyInStock,
    setOnlyInStock,
    results,
    isSearching,
    error,
    isFiltering,
  } = useProductSearch({ initialProducts, initialQuery: urlQuery });

  const filtered = category
    ? results.filter((p) => p.category === category)
    : results;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-base-content">
          <span className="inline-flex items-center gap-2">
            <Image
              src="/clothing.svg"
              alt="Black Phoenix icon"
              width={28}
              height={28}
              priority={false}
            />
            {t("productsPage.all")}
          </span>
        </h1>
        <p className="text-base-content/40 text-sm mt-1">
          {initialProducts.length} {t("productsPage.allCount")}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[{ value: "", label: t("catalog.all") }, ...CATALOG_CATEGORIES.map(c => ({ value: c.slug, label: t(`catalog.categories.${c.slug}`) }))].map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setCategory(cat.value);
              const params = new URLSearchParams(searchParams.toString());
              if (cat.value) params.set("category", cat.value);
              else params.delete("category");
              router.push(`/products?${params.toString()}`);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all min-h-0 min-w-0 ${
              category === cat.value
                ? "bg-warning text-black border-primary shadow-sm"
                : "bg-white border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-warning"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
            aria-hidden="true"
          />
          <label htmlFor="products-search" className="sr-only">
            {t("productsPage.searchLabel")}
          </label>
          <input
            id="products-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("productsPage.searchPlaceholder")}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-sm text-gray-900 placeholder-muted shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all min-h-[44px]"
            aria-label={t("productsPage.searchLabel")}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {isSearching ? (
              <Loader2 size={14} className="animate-spin text-warning" />
            ) : query ? (
              <button
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                aria-label={t("productsPage.clearSearch")}
              >
                <X size={14} />
              </button>
            ) : null}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-warning flex-shrink-0"
            aria-hidden="true"
          />
          <label htmlFor="sort-select" className="sr-only">
            {t("productsPage.sortLabel")}
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full sm:w-auto bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:border-yellow-400 min-h-[44px] appearance-none cursor-pointer"
            aria-label={t("productsPage.sort")}
          >
            <option value="default">{t("productsPage.sortDefault")}</option>
            <option value="price-asc">{t("productsPage.sortPriceAsc")}</option>
            <option value="price-desc">{t("productsPage.sortPriceDesc")}</option>
            <option value="newest">{t("productsPage.sortNewest")}</option>
          </select>
        </div>

        {/* In-stock toggle */}
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px] px-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-yellow-400 transition-colors">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="checkbox checkbox-warning checkbox-sm"
            aria-label={t("productsPage.inStockOnly")}
          />
          <span className="text-sm text-gray-700 whitespace-nowrap">
            {t("productsPage.inStock")}
          </span>
        </label>
      </div>

      {/* Results count / error */}
      {error ? (
        <p className="text-sm text-error/70 mb-4" role="alert">
          {error}
        </p>
      ) : isFiltering && !isSearching ? (
        <p
          className="text-sm text-base-content/40 mb-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {query && <>&laquo;{query}&raquo;: </>}
          <span className="text-primary font-medium">{filtered.length}</span> {t("productsPage.results")}
        </p>
      ) : null}

      {/* Grid */}
      {isSearching ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          aria-label={t("productsPage.loading")}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl bg-base-200 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          role="list"
          aria-label={t("productsPage.listAria")}
        >
          {filtered.map((product) => (
            <div key={product._id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-base-content/30">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">{t("productsPage.empty")}</p>
          <p className="text-sm mt-1">{t("productsPage.emptyHint")}</p>
          {isFiltering && (
            <button
              onClick={() => { setQuery(""); setOnlyInStock(false); setSort("default"); setCategory(""); router.push("/products"); }}
              className="mt-4 text-sm text-primary hover:underline min-h-0 min-w-0"
            >
              {t("productsPage.resetFilters")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
