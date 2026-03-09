"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";
import ProductCard from "@/components/ui/ProductCard";

export default function FavoritesPage() {

  const { items } = useFavoritesStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs text-warning/60 uppercase tracking-widest font-medium mb-1">
          Mening
        </p>

        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          Sevimlilar
          {items.length > 0 && (
            <span className="text-lg font-normal text-white/40">
              ({items.length})
            </span>
          )}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">

          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Heart size={36} className="text-white/20" />
          </div>

          <h2 className="font-display text-xl font-bold text-white mb-2">
            Sevimlilar bo&apos;sh
          </h2>

          <p className="text-white/40 text-sm mb-6">
            Mahsulot kartochkasidagi yurak belgisini bosib sevimlilaringizga qo&apos;shing
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-warning text-black font-bold px-6 py-3 rounded-xl hover:bg-warning/90 transition-colors"
          >
            Mahsulotlarga o&apos;tish
            <ArrowRight size={18} />
          </Link>

        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </div>
      )}

    </div>
  );
}
