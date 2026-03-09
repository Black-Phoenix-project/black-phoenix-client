"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/types";
import { scoreProductSearch } from "@/lib/searchRank";

let cachedProducts: Product[] | null = null;
let productsPromise: Promise<Product[]> | null = null;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const loadProducts = useCallback(async () => {
    if (hasLoaded || isLoading) return;
    if (cachedProducts) {
      setAllProducts(cachedProducts);
      setHasLoaded(true);
      return;
    }

    setIsLoading(true);
    try {
      if (!productsPromise) {
        productsPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`)
          .then((res) => res.json())
          .then((data) =>
            Array.isArray(data) ? data : data.products || data.data || []
          );
      }

      const products = await productsPromise;
      cachedProducts = products;
      setAllProducts(products);
      setHasLoaded(true);
    } catch {
      productsPromise = null;
      // fail silently
    } finally {
      setIsLoading(false);
    }
  }, [hasLoaded, isLoading]);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const filtered = allProducts
        .map((product) => ({
          product,
          score: scoreProductSearch(product, q),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.product)
        .slice(0, 6);
      setResults(filtered);
    },
    [allProducts]
  );

  // Load all products on first interaction instead of initial page render
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (!hasLoaded) {
      void loadProducts();
      return;
    }

    search(query);
    setIsOpen(true);
  }, [query, hasLoaded, loadProducts, search]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (product: Product) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/products/${product._id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setQuery("");
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md" role="search">
      <label htmlFor="product-search" className="sr-only">
        Mahsulot qidirish
      </label>
      <div className="relative flex items-center">
        <Search
          size={16}
          className="absolute left-3 text-white/30 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="product-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            void loadProducts();
            if (query) setIsOpen(true);
          }}
          placeholder="Mahsulot qidirish..."
          autoComplete="off"
          aria-label="Mahsulotlarni qidirish"
          aria-autocomplete="list"
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-9 py-2 text-sm text-white placeholder-muted focus:outline-none focus:border-warning/50 focus:bg-white/8 transition-all min-h-0"
        />
        {isLoading && (
          <Loader2
            size={14}
            className="absolute right-3 text-white/30 animate-spin"
            aria-hidden="true"
          />
        )}
        {query && !isLoading && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-2 p-1 text-white/40 hover:text-white transition-colors rounded min-h-0 min-w-0"
            aria-label="Qidiruvni tozalash"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Qidiruv natijalari"
          className="absolute top-full left-0 right-0 mt-2 bg-brand-dark-2 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-up"
        >
          {results.length > 0 ? (
            <>
              {results.map((product) => (
                <button
                  key={product._id}
                  role="option"
                  aria-selected="false"
                  onClick={() => handleSelect(product)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left min-h-0 min-w-0"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-dark-3 flex-shrink-0">
                    {product.image?.[0] ? (
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-dark-3" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-warning font-semibold price-tag">
                      {product.price.toLocaleString("uz-UZ")} so&apos;m
                    </p>
                  </div>
                </button>
              ))}
              <div className="px-3 py-2 border-t border-white/5">
                <button
                  onClick={() => {
                    router.push(`/products?q=${encodeURIComponent(query)}`);
                    setIsOpen(false);
                  }}
                  className="text-xs text-warning hover:underline min-h-0 min-w-0"
                >
                  Barcha natijalarni ko&apos;rish →
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-white/40">
              <Search size={24} className="mx-auto mb-2 opacity-30" />
              <p>Mahsulot topilmadi</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
