"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { Product } from "@/types";
import toast from "react-hot-toast";
import clsx from "clsx";
import { formatPrice } from "@/lib/formatPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorited, isPending } = useFavoritesStore();
  const liked = mounted ? isFavorited(product._id) : false;
  const liking = mounted ? isPending(product._id) : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Sevimlilariga qo'shish uchun tizimga kiring");
      return;
    }

    const finalLiked = await toggleFavorite(product, user?.id);
    toast.success(
      finalLiked ? "Sevimlilarga qo'shildi" : "Sevimlilardan olib tashlandi"
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} savatga qo'shildi`);
  };

  const isOutOfStock =
    product.status === "out_of_stock" ||
    (product.stock !== undefined && product.stock <= 0);

  const primaryImage = product.image?.[0];

  return (
    <article className="product-card group relative bg-brand-dark-2 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
      <button
        onClick={handleLike}
        disabled={liking}
        aria-label={liked ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        aria-pressed={liked}
        className={clsx(
          "btn-icon-sm absolute top-3 right-3 z-10 rounded-full border transition-all shadow-lg",
          liking && "opacity-60 cursor-not-allowed",
          liked
            ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30"
            : "bg-black/40 backdrop-blur-sm border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/30 hover:bg-black/60"
        )}
      >
        <Heart
          size={16}
          className={clsx("transition-all", liked && "fill-red-400")}
          aria-hidden="true"
        />
      </button>

      {isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm text-red-400 text-[10px] font-semibold px-2 py-1 rounded-full border border-red-400/20">
          Tugagan
        </div>
      )}
      {!isOutOfStock && product.status === "active" && (
        <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-sm text-green-400 text-[10px] font-semibold px-2 py-1 rounded-full border border-green-400/20">
          Mavjud
        </div>
      )}

      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-[4/3] bg-brand-dark-3 overflow-hidden min-h-0 min-w-0"
        aria-label={product.name}
        tabIndex={0}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            quality={70}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-white/10" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/products/${product._id}`} className="min-h-0 min-w-0">
          <h3 className="font-semibold text-white text-sm sm:text-base leading-tight line-clamp-2 hover:text-warning transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-white/5">
          <div>
            <p className="text-base sm:text-lg font-bold text-warning price-tag">
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] text-white/30">so&apos;m</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`${product.name} savatga qo'shish`}
            className={clsx(
              "btn-icon-sm flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all",
              isOutOfStock
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-warning/10 text-warning border border-warning/20 hover:bg-warning hover:text-black"
            )}
          >
            <ShoppingCart size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Savat</span>
          </button>
        </div>
      </div>
    </article>
  );
}
