import { type NextRequest, NextResponse } from "next/server";
import type { Product } from "@/types";
import { scoreProductSearch } from "@/lib/searchRank";

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://black-phoenixx-backend.onrender.com";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/product`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data.products) return data.products;
  if (data.data) return data.data;
  return [];
}

function applySearch(products: Product[], q: string): Product[] {
  if (!q.trim()) return products;
  return products
    .map((product) => ({ product, score: scoreProductSearch(product, q) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product);
}

function applyInStockFilter(products: Product[]): Product[] {
  return products.filter(
    (p) => p.status !== "out_of_stock" && (p.stock === undefined || p.stock > 0)
  );
}

function applySort(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "newest":
      return list.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
    default:
      return list;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const sort = (searchParams.get("sort") ?? "default") as SortOption;
  const inStock = searchParams.get("inStock") === "1";

  const products = await fetchProducts();

  let results = applySearch(products, q);
  if (inStock) results = applyInStockFilter(results);
  results = applySort(results, sort);

  return NextResponse.json({ results, total: results.length, query: q });
}