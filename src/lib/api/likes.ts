import apiClient from "./client";
import type { Like, LikeResponse } from "@/types";

export const likesApi = {
  getUserLikes: async (userId: string): Promise<Like[]> => {
    const { data } = await apiClient.get(`/api/likes?userId=${userId}`);
    if (Array.isArray(data)) return data;
    if (data.likes) return data.likes;
    if (data.data) return data.data;
    return [];
  },

  checkLike: async (
    userId: string,
    productId: string
  ): Promise<{ liked: boolean }> => {
    const { data } = await apiClient.get(
      `/api/likes/check?userId=${userId}&productId=${productId}`
    );
    return { liked: data.liked ?? false };
  },

  toggleLike: async (
    userId: string,
    productId: string
  ): Promise<LikeResponse> => {
    const { data } = await apiClient.post("/api/likes/toggle", {
      userId,
      productId,
    });
    return data;
  },

  addLike: async (
    userId: string,
    productId: string
  ): Promise<LikeResponse> => {
    const { data } = await apiClient.post("/api/likes", { userId, productId });
    return data;
  },

  removeLike: async (
    userId: string,
    productId: string
  ): Promise<LikeResponse> => {
    const { data } = await apiClient.delete("/api/likes", {
      data: { userId, productId },
    });
    return data;
  },
};
