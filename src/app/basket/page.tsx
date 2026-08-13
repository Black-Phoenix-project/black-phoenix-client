"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import { useAuthStore } from "@/store/authStore";
import { ordersApi } from "@/lib/api/orders";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function BasketPage() {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } =
    useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setPhone(String(user.phoneNumber || ""));
      setName(user.fullName || "");
    }
  }, [user]);

  const totalAmount = total();
  const count = itemCount();
  const isLoggedIn = isAuthenticated && !!user;
  const resolvedPhone = isLoggedIn ? String(user?.phoneNumber || "") : phone.trim();
  const resolvedName = isLoggedIn
    ? (user?.fullName || String(user?.phoneNumber || "Guest")).trim()
    : name.trim() || "Guest";

  if (!mounted) return null;

  const handleOrder = async () => {
    if (!resolvedPhone) {
      toast.error(t("basket.needPhone"));
      return;
    }
    if (items.length === 0) return;

    setIsOrdering(true);

    try {
      const results = await Promise.allSettled(
        items.map((i) =>
          ordersApi.create({
            username: resolvedName,
            phoneNumber: resolvedPhone,
            product: {
              productId: i.product._id,
              productName: i.product.name,
              price: i.product.price,
              quantity: i.quantity,
              image: i.product.image?.[0],
            },
            userId: user?.id,
          })
        )
      );

      const failedCount = results.filter((r) => r.status === "rejected").length;

      if (failedCount > 0) {
        const firstError = results.find((r) => r.status === "rejected");
        const msg =
          firstError && firstError.status === "rejected"
            ? firstError.reason?.message
            : "";

        const invalidPattern = /не найден|productId|цена|price/i;
        const invalidIds = items
          .map((i, idx) => ({ item: i, result: results[idx] }))
          .filter(
            ({ result }) =>
              result.status === "rejected" &&
              result.reason?.message &&
              invalidPattern.test(String(result.reason.message))
          )
          .map(({ item }) => item.product._id);

        if (invalidIds.length > 0) {
          invalidIds.forEach((id) => removeItem(id));
          toast.error(t("basket.removedUnavailable"));
          return;
        }

        toast.error(
          t("basket.orderFailed", {
            failed: String(failedCount),
            total: String(items.length),
            msg: msg ? msg + " " : "",
          })
        );
        return;
      }

      clearCart();
      toast.success(t("basket.orderSuccess"));
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("basket.error");
      toast.error(msg);
    } finally {
      setIsOrdering(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart
          size={64}
          className="mx-auto mb-4 text-yellow-300"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("basket.emptyTitle")}</h1>
        <p className="text-gray-500 mb-6">{t("basket.emptyDesc")}</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-warning text-black font-bold px-6 py-3 rounded-xl hover:bg-warning/90 transition"
        >
          {t("basket.goToProducts")}
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("basket.title")}</h1>
        <p className="text-gray-500 text-sm mt-1">{count} {t("basket.items")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200/80 shadow-sm rounded-2xl p-4 flex gap-4 hover:border-yellow-300 transition-colors"
            >
              <Link
                href={`/products/${product._id}`}
                className="relative w-24 h-24 rounded-xl overflow-hidden"
              >
                {product.image?.[0] ? (
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package size={24} />
                  </div>
                )}
              </Link>

              <div className="flex-1">
                <h3 className="text-gray-900 font-medium">{product.name}</h3>
                <p className="text-success font-bold mt-1">
                  {formatPrice(product.price * quantity)} {t("common.sum")}
                </p>
                <p className="text-xs text-gray-500">
                  {formatPrice(product.price)} x {quantity}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-yellow-50 hover:text-gray-900"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 flex items-center justify-center text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-yellow-50 hover:text-gray-900"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-error hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200/80 shadow-md rounded-2xl p-5 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t("basket.order")}</h2>

          {isLoggedIn ? (
            <div className="space-y-2 rounded-xl bg-yellow-50 border border-yellow-200 p-3 mb-1">
              <p className="text-xs text-gray-500">{t("basket.orderFromAccount")}</p>
              <p className="text-sm font-medium text-gray-900">{resolvedName}</p>
              <p className="text-sm text-gray-600">{resolvedPhone}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("basket.phonePlaceholder")}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder-muted focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("basket.namePlaceholder")}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-900 placeholder-muted focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
              />
            </div>
          )}

          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-500">
              <span>{count} {t("basket.items")}</span>
              <span>{formatPrice(totalAmount)} {t("common.sum")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t("basket.delivery")}</span>
              <span className="text-success">{t("basket.free")}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold">
              <span>{t("basket.total")}</span>
              <span className="text-success font-bold">
                {formatPrice(totalAmount)} {t("common.sum")}
              </span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={isOrdering || (!isLoggedIn && !phone.trim())}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-warning text-black font-bold py-3 rounded-xl hover:bg-warning/90 disabled:opacity-50"
          >
            {isOrdering ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              <>
                {t("basket.placeOrder")}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
