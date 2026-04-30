import type { Product } from "@/types";
import { SERVER_API_URL } from "./baseUrl";

// Server-side fetch (for SSR/ISR) — no axios to keep it edge-compatible
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${SERVER_API_URL}/api/product`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Backend may return array directly or wrapped
    if (Array.isArray(data)) return data;
    if (data.products) return data.products;
    if (data.data) return data.data;
    return [];
  } catch {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${SERVER_API_URL}/api/product/${id}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.product) return data.product;
    if (data.data) return data.data;
    return data;
  } catch {
    return null;
  }
}

// Client-side (used in hooks/components)
import apiClient from "./client";

export const productsApi = {
  list: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/api/product");
    if (Array.isArray(data)) return data;
    if (data.products) return data.products;
    if (data.data) return data.data;
    return [];
  },

  get: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/api/product/${id}`);
    if (data.product) return data.product;
    if (data.data) return data.data;
    return data;
  },
};
