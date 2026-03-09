import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Mahsulot topilmadi" };

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz";

  return {
    title: `${product.name} — Black Phoenix`,
    description: product.description?.slice(0, 155) || product.name,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image?.[0]
        ? [{ url: product.image[0], alt: product.name }]
        : [],
      url: `${SITE_URL}/products/${id}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/products/${id}`,
    },
  };
}

// Generate static paths for top products
export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.slice(0, 20).map((p) => ({ id: p._id }));
  } catch {
    return [];
  }
}

export const revalidate = 120;

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product._id,
    url: `${SITE_URL}/products/${id}`,
    brand: {
      "@type": "Brand",
      name: "Black Phoenix",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "UZS",
      price: product.price,
      availability:
        product.status === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Black Phoenix",
        url: SITE_URL,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
