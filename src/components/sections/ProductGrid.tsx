import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export default function ProductGrid({
  products,
  title = "Товары",
  showViewAll = true,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12" aria-label="Товары">
        <div className="text-center py-16 text-white/30">
          <p className="text-lg">Товары не найдены</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-8 sm:py-12"
      aria-label={title}
      id="products"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <p className="text-xs text-warning/60 uppercase tracking-widest font-medium mb-1">
            Ассортимент
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            {title}
          </h2>
        </div>
        {showViewAll && (
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm text-warning hover:text-warning/80 transition-colors group min-h-[44px]"
            aria-label="Смотреть все товары"
          >
            Все товары
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        role="list"
        aria-label="Список товаров"
      >
        {products.map((product) => (
          <div key={product._id} role="listitem">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
