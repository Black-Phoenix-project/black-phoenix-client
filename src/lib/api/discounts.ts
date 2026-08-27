import apiClient from "./client";

export interface Discount {
  _id: string;
  title: string;
  type: "percent" | "fixed";
  value: number;
  scope: "global" | "product";
  productId: string | null;
  active: boolean;
}

export const discountsApi = {
  listActive: async (): Promise<Discount[]> => {
    const { data } = await apiClient.get("/api/discount?active=true");
    return data.data || [];
  },
};

export function pickDiscount(
  discounts: Discount[],
  productId: string
): Discount | null {
  if (!discounts.length) return null;
  const productDiscount = discounts.find(
    (d) => d.scope === "product" && d.productId === productId
  );
  if (productDiscount) return productDiscount;
  return discounts.find((d) => d.scope === "global") || null;
}

export function applyDiscount(
  price: number,
  discount: Discount | null | undefined
): number {
  if (!discount || !discount.active) return price;
  const p = Number(price) || 0;
  if (discount.type === "percent") {
    return Math.max(0, Math.round(p * (1 - discount.value / 100)));
  }
  return Math.max(0, p - discount.value);
}
