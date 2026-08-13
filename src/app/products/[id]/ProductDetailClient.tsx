"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useTranslation } from "react-i18next";
import type { Product } from "@/types";
import toast from "react-hot-toast";
import clsx from "clsx";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { addItem } = useCartStore();
  const { toggleFavorite, isFavorited, isPending } = useFavoritesStore();
  const liked = mounted ? isFavorited(product._id) : false;
  const liking = mounted ? isPending(product._id) : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOutOfStock =
    product.status === "out_of_stock" ||
    (product.stock !== undefined && product.stock <= 0);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error(t("productDetail.needLogin"));
      return;
    }
    const finalLiked = await toggleFavorite(product, user?.id);
    toast.success(
      finalLiked ? t("productDetail.addedToFavorites") : t("productDetail.removedFromFavorites")
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`${product.name} — ${qty} ${t("productDetail.addedToCart")}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-base-content/40">
          <li>
            <Link href="/" className="hover:text-primary transition-colors min-h-0 min-w-0">
              {t("productDetail.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-primary transition-colors min-h-0 min-w-0"
            >
              {t("productDetail.breadcrumbProducts")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-base-content/70 truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/40 hover:text-primary transition-colors mb-6 min-h-[44px]"
        aria-label={t("productDetail.backAria")}
      >
        <ChevronLeft size={16} />
        {t("common.back")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        <div>
          <div
            className="relative aspect-square bg-base-200 rounded-2xl overflow-hidden mb-3"
            aria-label={t("productDetail.productImageAria")}
          >
            {product.image?.[activeImg] ? (
              <Image
                src={product.image[activeImg]}
                alt={`${product.name} - ${t("productDetail.imageAria")} ${activeImg + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={80} className="text-base-content/20" aria-hidden="true" />
              </div>
            )}
          </div>

          {product.image && product.image.length > 1 && (
            <div className="flex gap-2" role="list" aria-label={t("productDetail.productImageAria")}>
              {product.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`${t("productDetail.imageAria")} ${i + 1}`}
                  aria-pressed={activeImg === i}
                  className={clsx(
                    "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                    activeImg === i
                      ? "border-primary"
                      : "border-base-300 hover:border-base-content/30"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-base-content leading-tight">
              {product.name}
            </h1>
            <button
              onClick={handleLike}
              disabled={liking}
              aria-label={liked ? t("productCard.removeFromFavorites") : t("productCard.addToFavorites")}
              aria-pressed={liked}
              className={clsx(
                "btn-icon-sm rounded-xl border transition-all flex-shrink-0",
                liking && "opacity-60 cursor-not-allowed",
                liked
                  ? "bg-red-500/15 border-red-500/30 text-error"
                  : "bg-base-200 border-base-300 text-base-content/50 hover:text-error hover:border-red-400/30"
              )}
            >
              <Heart
                size={20}
                className={clsx(liked && "fill-red-400")}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-error">
                <XCircle size={15} aria-hidden="true" />
                {t("productDetail.outOfStock")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm text-success">
                <CheckCircle size={15} aria-hidden="true" />
                {t("productDetail.inStock")}
              </span>
            )}
          </div>

          <div className="mb-5 pb-5 border-b border-base-300">
            <p
              className="text-3xl sm:text-4xl font-bold text-success price-tag"
              aria-label={`${formatPrice(product.price)} ${t("common.sum")}`}
            >
              {formatPrice(product.price)}
              <span className="text-base font-normal text-base-content/40 ml-1">
                {t("common.sum")}
              </span>
            </p>
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-xs text-base-content/30 uppercase tracking-wider mb-2">
                {t("productDetail.description")}
              </h2>
              <p className="text-base-content/60 leading-relaxed text-sm">{product.description}</p>
            </div>
          )}

          {!isOutOfStock && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-base-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="btn-icon-sm px-3 text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors"
                  aria-label={t("productDetail.decrease")}
                >
                  -
                </button>
                <span
                  className="px-4 py-2 text-sm font-medium text-base-content min-w-[40px] text-center"
                  aria-label={`${t("productDetail.qty")}: ${qty}`}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="btn-icon-sm px-3 text-base-content/60 hover:text-base-content hover:bg-base-200 transition-colors"
                  aria-label={t("productDetail.increase")}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-warning text-black font-bold py-3 rounded-xl hover:bg-warning/90 transition-colors text-sm min-h-[44px]"
                aria-label={`${t("productDetail.addToCart")} - ${qty} ${t("productDetail.qty")}.`}
              >
                <ShoppingCart size={18} aria-hidden="true" />
                {t("productDetail.addToCart")}
              </button>
            </div>
          )}

          {isOutOfStock && (
            <div className="p-4 bg-red-400/5 border border-red-400/10 rounded-xl text-sm text-error/80 mb-4">
              {t("productDetail.unavailable")}
            </div>
          )}

          <div className="glass-card rounded-xl p-4 text-xs text-base-content/40 space-y-1.5">
            <p>{t("productDetail.delivery")}</p>
            <p>{t("productDetail.warranty")}</p>
            <p>{t("productDetail.noMinOrder")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
