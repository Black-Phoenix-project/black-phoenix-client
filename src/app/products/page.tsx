import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Barcha mahsulotlar — Спецодежда Black Phoenix",
  description:
    "Black Phoenix toʻliq assortimenti: maxsus kiyimlar, himoya vositalari, signal forma, poyabzal va boshqalar. Спецодежда в Ташкенте.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz"}/products`,
  },
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient initialProducts={products} />;
}
