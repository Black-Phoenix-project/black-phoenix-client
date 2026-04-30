import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import { getSwiperSlides } from "@/lib/api/swiper";
import HeroSwiper from "@/components/sections/HeroSwiper";
import ProductGrid from "@/components/sections/ProductGrid";
import AboutSection from "@/components/sections/AboutSection";


const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz";

export const metadata: Metadata = {
  title: "Black Phoenix — спецодежда и средства защиты | Спецодежда Ташкент",
  description:
    "Black Phoenix — надежный производитель спецодежды и средств защиты в Узбекистане.",
  alternates: { canonical: SITE_URL },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/clothing.svg",
    apple: "/clothing.svg",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [products, slides] = await Promise.all([
    getProducts(),
    getSwiperSlides(),
  ]);

  const featuredProducts = products.slice(0, 8);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Black Phoenix",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Товары Black Phoenix",
    itemListElement: featuredProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: p.image?.[0],
        url: `${SITE_URL}/products/${p._id}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "UZS",
          price: p.price,
          availability:
            p.status === "out_of_stock"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />

      {/* Hero */}
      <HeroSwiper slides={slides} />

      {/* Product section */}
      <ProductGrid products={featuredProducts} title="Популярные товары" />

      {/* About */}
      <AboutSection />
    </>
  );
}
