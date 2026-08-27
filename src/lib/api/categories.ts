import { SERVER_API_URL } from "./baseUrl";
import apiClient from "./client";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  order: number;
  active: boolean;
}

export async function getCategoriesServer(): Promise<Category[]> {
  try {
    const res = await fetch(`${SERVER_API_URL}/api/category`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    const { data } = await apiClient.get("/api/category");
    return data.data || [];
  },
};
