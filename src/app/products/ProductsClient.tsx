"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import Image from "next/image";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.get("category") ?? "");

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
  } = useProductSearch({ initialProducts });

  const filtered = category
    ? results.filter((p) => p.category === category)
    : results;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          <span className="inline-flex items-center gap-2">
            <Image
              src="/clothing.svg"
              alt="Black Phoenix icon"
              width={28}
              height={28}
              priority={false}
            />
            Все товары
          </span>
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {initialProducts.length} товаров в каталоге
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[{ value: "", label: "Все" }, ...CATALOG_CATEGORIES.map(c => ({ value: c.slug, label: c.label }))].map((cat) => (
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
                ? "bg-amber-400 text-gray-900 border-amber-400"
                : "bg-white/5 border-white/10 text-white/60 hover:border-amber-400/50 hover:text-white"
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            aria-hidden="true"
          />
          <label htmlFor="products-search" className="sr-only">
            Mahsulot qidirish
          </label>
          <input
            id="products-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название или описание товара..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-warning/50 transition-all min-h-[44px]"
            aria-label="Поиск товаров"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {isSearching ? (
              <Loader2 size={14} className="animate-spin text-warning/60" />
            ) : query ? (
              <button
                onClick={() => setQuery("")}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Очистить поиск"
              >
                <X size={14} />
              </button>
            ) : null}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-white/30 flex-shrink-0"
            aria-hidden="true"
          />
          <label htmlFor="sort-select" className="sr-only">
            Сортировка
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-warning/50 min-h-[44px] appearance-none cursor-pointer"
            aria-label="Сортировка товаров"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: от низкой к высокой</option>
            <option value="price-desc">Цена: от высокой к низкой</option>
            <option value="newest">Новинки</option>
          </select>
        </div>

        {/* In-stock toggle */}
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px] px-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-colors">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="checkbox checkbox-warning checkbox-sm"
            aria-label="Только в наличии"
          />
          <span className="text-sm text-white/60 whitespace-nowrap">
            В наличии
          </span>
        </label>
      </div>

      {/* Results count / error */}
      {error ? (
        <p className="text-sm text-red-400/70 mb-4" role="alert">
          {error}
        </p>
      ) : isFiltering && !isSearching ? (
        <p
          className="text-sm text-white/40 mb-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {query && <>&laquo;{query}&raquo;: </>}
          <span className="text-warning font-medium">{filtered.length}</span> результатов
        </p>
      ) : null}

      {/* Grid */}
      {isSearching ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          aria-label="Загрузка"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          role="list"
          aria-label="Список товаров"
        >
          {filtered.map((product) => (
            <div key={product._id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-white/30">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Товары не найдены</p>
          <p className="text-sm mt-1">Попробуйте другой запрос</p>
          {isFiltering && (
            <button
              onClick={() => { setQuery(""); setOnlyInStock(false); setSort("default"); setCategory(""); router.push("/products"); }}
              className="mt-4 text-sm text-warning hover:underline min-h-0 min-w-0"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      )}
    </div>
  );
}
