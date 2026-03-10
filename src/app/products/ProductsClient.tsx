"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import { scoreProductSearch } from "@/lib/searchRank";

interface ProductsClientProps {
  initialProducts: Product[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filtered = useMemo(() => {
    let list = [...initialProducts];

    if (query.trim()) {
      list = list
        .map((product) => ({
          product,
          score: scoreProductSearch(product, query),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.product);
    }

    if (onlyInStock) {
      list = list.filter(
        (p) =>
          p.status !== "out_of_stock" && (p.stock === undefined || p.stock > 0),
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        );
        break;
    }

    return list;
  }, [initialProducts, query, sort, onlyInStock]);

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
            Barcha mahsulotlar
          </span>
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {initialProducts.length} ta mahsulot mavjud
        </p>
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
            placeholder="Mahsulot nomi yoki tavsif..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-warning/50 transition-all min-h-[44px]"
            aria-label="Mahsulotlarni qidirish"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors min-h-0 min-w-0 p-1"
              aria-label="Qidiruvni tozalash"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-white/30 flex-shrink-0"
            aria-hidden="true"
          />
          <label htmlFor="sort-select" className="sr-only">
            Tartiblash
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-warning/50 min-h-[44px] appearance-none cursor-pointer"
            aria-label="Mahsulotlarni tartiblash"
          >
            <option value="default">Standart tartib</option>
            <option value="price-asc">Narx: arzondan qimmatga</option>
            <option value="price-desc">Narx: qimmatdan arzonga</option>
            <option value="newest">Yangilari</option>
          </select>
        </div>

        {/* In-stock toggle */}
        <label className="flex items-center gap-2 cursor-pointer min-h-[44px] px-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-colors">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="checkbox checkbox-warning checkbox-sm"
            aria-label="Faqat mavjud mahsulotlar"
          />
          <span className="text-sm text-white/60 whitespace-nowrap">
            Faqat mavjud
          </span>
        </label>
      </div>

      {/* Results count */}
      {query && (
        <p
          className="text-sm text-white/40 mb-4"
          aria-live="polite"
          aria-atomic="true"
        >
          &ldquo;{query}&rdquo; bo&apos;yicha{" "}
          <span className="text-warning font-medium">{filtered.length}</span> ta
          natija
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          role="list"
          aria-label="Mahsulotlar ro'yxati"
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
          <p className="text-lg font-medium">Mahsulot topilmadi</p>
          <p className="text-sm mt-1">Boshqa kalit so&apos;z bilan qidiring</p>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-sm text-warning hover:underline min-h-0 min-w-0"
            >
              Filterni tozalash
            </button>
          )}
        </div>
      )}
    </div>
  );
}
