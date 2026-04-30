import { type NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types";
import { scoreProductSearch } from "@/lib/searchRank";
import { SERVER_API_URL } from "@/lib/api/baseUrl";

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

const BACKEND_URL = SERVER_API_URL;

// ─── Try backend /api/search ───────────────────────────────────────────────────

async function tryBackendSearch(searchParams: URLSearchParams) {
  const upstream = new URL(`${BACKEND_URL}/api/search`);
  searchParams.forEach((value, key) => upstream.searchParams.set(key, value));

  const res = await fetch(upstream.toString(), { next: { revalidate: 0 } });

  // Backend search endpoint exists and responded OK
  if (res.ok) return res.json();

  // Backend doesn't have the search endpoint yet (404) → signal fallback
  if (res.status === 404) return null;

  // Other error → throw so we can show a proper message
  throw new Error(`Backend error: ${res.status}`);
}

// ─── Fallback: fetch all products + JS filtering ───────────────────────────────

async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BACKEND_URL}/api/product`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data.products) return data.products;
  if (data.data) return data.data;
  return [];
}

function jsSearch(products: Product[], q: string, sort: SortOption, inStock: boolean) {
  let list = [...products];

  if (q.trim()) {
    list = list
      .map((p) => ({ p, score: scoreProductSearch(p, q) }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((e) => e.p);
  }

  if (inStock) {
    list = list.filter(
      (p) => p.status !== "out_of_stock" && (p.stock === undefined || p.stock > 0)
    );
  }

  switch (sort) {
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "newest":
      list.sort((a, b) =>
        new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
      );
      break;
  }

  return list;
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    // 1. Try real backend search
    const backendResult = await tryBackendSearch(searchParams);
    if (backendResult !== null) {
      return NextResponse.json(backendResult);
    }

    // 2. Fallback: backend doesn't have /api/search yet
    const q       = searchParams.get("q") ?? "";
    const sort    = (searchParams.get("sort") ?? "default") as SortOption;
    const inStock = searchParams.get("inStock") === "1";

    const products = await fetchAllProducts();
    const results  = jsSearch(products, q, sort, inStock);

    return NextResponse.json({
      success: true,
      query: q,
      results,
      total: results.length,
      page: 1,
      pages: 1,
      limit: results.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Search service unavailable" },
      { status: 503 }
    );
  }
}
