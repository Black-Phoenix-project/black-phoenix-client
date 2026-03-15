import type { Product } from "@/types";

export type SortOption = "default" | "price-asc" | "price-desc" | "newest";

export interface SearchParams {
  q?: string;
  sort?: SortOption;
  inStock?: boolean;
}

export interface SearchResult {
  success: boolean;
  query: string;
  results: Product[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export async function searchProducts(
  params: SearchParams,
  signal?: AbortSignal
): Promise<SearchResult> {
  const qs = new URLSearchParams();
  if (params.q?.trim()) qs.set("q", params.q.trim());
  if (params.sort && params.sort !== "default") qs.set("sort", params.sort);
  if (params.inStock) qs.set("inStock", "1");

  const res = await fetch(`/api/search?${qs}`, { signal });
  if (!res.ok) throw new Error("Qidiruv xatosi");
  return res.json();
}
