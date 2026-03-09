"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";
import { likesApi } from "@/lib/api/likes";

interface FavoritesStore {
  items: Product[];
  likedIds: Set<string>;
  pendingIds: Set<string>;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product, userId?: string) => Promise<boolean>;
  isFavorited: (productId: string) => boolean;
  isPending: (productId: string) => boolean;
  syncFromServer: (userId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],
      likedIds: new Set<string>(),
      pendingIds: new Set<string>(),

      addFavorite: (product) => {
        set((state) => {
          if (state.likedIds.has(product._id)) return state;
          const newIds = new Set(state.likedIds);
          newIds.add(product._id);
          return {
            items: [...state.items, product],
            likedIds: newIds,
          };
        });
      },

      removeFavorite: (productId) => {
        set((state) => {
          const newIds = new Set(state.likedIds);
          newIds.delete(productId);
          return {
            items: state.items.filter((p) => p._id !== productId),
            likedIds: newIds,
          };
        });
      },

      toggleFavorite: async (product, userId) => {
        const productId = product._id;

        if (get().pendingIds.has(productId)) {
          return get().likedIds.has(productId);
        }

        set((state) => {
          const nextPending = new Set(state.pendingIds);
          nextPending.add(productId);
          return { pendingIds: nextPending };
        });

        try {
          if (!userId) {
            const isLiked = get().likedIds.has(productId);
            if (isLiked) {
              get().removeFavorite(productId);
              return false;
            }
            get().addFavorite(product);
            return true;
          }

          const response = await likesApi.toggleLike(userId, productId);
          const isLikedOnServer = Boolean(response.liked);

          if (isLikedOnServer) {
            get().addFavorite(product);
          } else {
            get().removeFavorite(productId);
          }

          return isLikedOnServer;
        } catch {
          return get().likedIds.has(productId);
        } finally {
          set((state) => {
            const nextPending = new Set(state.pendingIds);
            nextPending.delete(productId);
            return { pendingIds: nextPending };
          });
        }
      },

      isFavorited: (productId) => {
        return get().likedIds.has(productId);
      },

      isPending: (productId) => {
        return get().pendingIds.has(productId);
      },

      syncFromServer: async (userId) => {
        try {
          const likes = await likesApi.getUserLikes(userId);
          const ids = new Set<string>();
          const products: Product[] = [];

          likes.forEach((like) => {
            if (typeof like.productId === "object" && like.productId !== null) {
              const p = like.productId as Product;
              ids.add(p._id);
              products.push(p);
            } else if (typeof like.productId === "string") {
              ids.add(like.productId);
            }
          });

          set({ likedIds: ids, items: products });
        } catch {
          // Silently fail — keep local state
        }
      },
    }),
    {
      name: "bp-favorites",
      partialize: (state) => ({
        items: state.items,
        likedIds: Array.from(state.likedIds),
      }),
      merge: (persisted: unknown, current) => {
        const p = persisted as { items?: Product[]; likedIds?: string[] };
        return {
          ...current,
          items: p?.items ?? [],
          likedIds: new Set<string>(p?.likedIds ?? []),
          pendingIds: new Set<string>(),
        };
      },
    }
  )
);
