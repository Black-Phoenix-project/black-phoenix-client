"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { searchProducts, type SortOption } from "@/lib/api/search";

const DEBOUNCE_MS = 350;

interface UseProductSearchOptions {
  initialProducts: Product[];
}

export function useProductSearch({ initialProducts }: UseProductSearchOptions) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [results, setResults] = useState<Product[]>(initialProducts);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFiltering = Boolean(query.trim()) || sort !== "default" || onlyInStock;

  useEffect(() => {
    if (!isFiltering) {
      setResults(initialProducts);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(() => {
      setIsSearching(true);
      setError(null);
      searchProducts(
        { q: query, sort, inStock: onlyInStock },
        controller.signal
      )
        .then((data) => setResults(data.results))
        .catch((err: Error) => {
          if (err.name !== "AbortError") {
            setError("Qidiruv xatosi yuz berdi");
            setResults(initialProducts);
          }
        })
        .finally(() => setIsSearching(false));
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, sort, onlyInStock, isFiltering, initialProducts]);

  return {
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
  };
}
