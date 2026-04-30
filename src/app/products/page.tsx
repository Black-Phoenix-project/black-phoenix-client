import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Все товары — Спецодежда Black Phoenix",
  description:
    "Полный ассортимент Black Phoenix: спецодежда, средства защиты, сигнальная форма, обувь и другие товары. Спецодежда в Ташкенте.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz"}/products`,
  },
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient initialProducts={products} />;
}
