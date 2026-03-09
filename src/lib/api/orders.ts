import apiClient from "./client";
import type { CreateOrderPayload, Order } from "@/types";

export const ordersApi = {
  create: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post("/api/orders", payload);
    if (data.order) return data.order;
    if (data.data) return data.data;
    return data;
  },

  getByUsername: async (username: string): Promise<Order[]> => {
    const { data } = await apiClient.get(`/api/orders/username/${username}`);
    if (Array.isArray(data)) return data as Order[];
    if (Array.isArray(data.orders)) return data.orders as Order[];
    if (Array.isArray(data.data)) return data.data as Order[];
    return [];
  },
};
