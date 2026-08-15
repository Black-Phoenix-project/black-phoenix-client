"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import clsx from "clsx";
import { formatPrice } from "@/lib/formatPrice";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
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
      toast.error(t("productCard.needLogin"));
      return;
    }

    const finalLiked = await toggleFavorite(product, user?.id);
    toast.success(
      finalLiked ? t("productCard.addedToFavorites") : t("productCard.removedFromFavorites")
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} ${t("productCard.addedToCart")}`);
  };

  const isOutOfStock =
    product.status === "out_of_stock" ||
    (product.stock !== undefined && product.stock <= 0);

  const primaryImage = product.image?.[0];

  return (
    <article className="product-card group relative bg-white border border-gray-200/80 shadow-sm hover:border-yellow-300 rounded-2xl overflow-hidden flex flex-col">
      <button
        onClick={handleLike}
        disabled={liking}
        aria-label={liked ? t("productCard.removeFromFavorites") : t("productCard.addToFavorites")}
        aria-pressed={liked}
        className={clsx(
          "btn-icon-sm absolute top-3 right-3 z-10 rounded-full border transition-all shadow-lg",
          liking && "opacity-60 cursor-not-allowed",
          liked
            ? "bg-red-500/10 border-red-500/40 text-error hover:bg-red-500/20"
            : "bg-base-2000 backdrop-blur-sm border-gray-200 text-gray-500 hover:text-error hover:border-red-400/40 hover:bg-white"
        )}
      >
        <Heart
          size={16}
          className={clsx("transition-all", liked && "fill-red-500")}
          aria-hidden="true"
        />
      </button>

      {isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-error text-[10px] font-semibold px-2 py-1 rounded-full border border-red-400/30 shadow-sm">
          {t("productCard.outOfStock")}
        </div>
      )}
      {!isOutOfStock && product.status === "active" && (
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-success text-[10px] font-semibold px-2 py-1 rounded-full border border-green-500/30 shadow-sm">
          {t("productCard.inStock")}
        </div>
      )}

      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-[3/4] sm:aspect-[4/3] bg-gray-100 overflow-hidden min-h-0 min-w-0"
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
            <Package size={40} className="text-gray-300" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/products/${product._id}`} className="min-h-0 min-w-0">
          <h3 className="font-semibold text-base-content text-sm sm:text-base leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.category && (
          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium w-fit">
            {t(`catalog.categories.${product.category}`)}
          </span>
        )}

        <p className="text-xs text-base-content/40 line-clamp-2 leading-relaxed flex-1 min-h-[2rem]">
          {product.description ?? ""}
        </p>

        <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-base-300">
          <div className="min-w-0">
            <p className="text-xs min-[360px]:text-sm lg:text-lg font-bold text-success price-tag">
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] text-base-content/30">{t("common.sum")}</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`${t("common.addToCart")} - ${product.name}`}
            className={clsx(
              "btn-icon-sm flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all",
              isOutOfStock
                ? "bg-base-200 text-base-content/20 cursor-not-allowed"
                : "bg-primary/10 text-primary border border-primary/20 hover:bg-warning hover:text-black"
            )}
          >
            <ShoppingCart size={14} aria-hidden="true" />
            <span className="hidden sm:inline">{t("common.addToCart")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
