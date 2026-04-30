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
import { useAuthStore } from "@/store/authStore";
import { ordersApi } from "@/lib/api/orders";
import toast from "react-hot-toast";

export default function BasketPage() {
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
      toast.error("Введите номер телефона");
      return;
    }
    if (items.length === 0) return;

    setIsOrdering(true);

    try {
      await Promise.all(
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

      clearCart();
      toast.success("Ваш заказ принят! Администратор свяжется с вами.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Произошла ошибка";
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
          className="mx-auto mb-4 text-white/10"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-bold text-white mb-2">Корзина пуста</h1>
        <p className="text-white/40 mb-6">Добавьте товары в корзину</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Перейти к товарам
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Корзина</h1>
        <p className="text-white/40 text-sm mt-1">{count} товаров</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="bg-white/5 rounded-2xl p-4 flex gap-4"
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
                <h3 className="text-white font-medium">{product.name}</h3>
                <p className="text-yellow-400 font-bold mt-1">
                  {(product.price * quantity).toLocaleString("ru-RU")} сум
                </p>
                <p className="text-xs text-white/40">
                  {product.price.toLocaleString("ru-RU")} x {quantity}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 flex items-center justify-center text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:bg-white/10"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(product._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-2xl p-5 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-white mb-4">Заказ</h2>

          {isLoggedIn ? (
            <div className="space-y-2 rounded-xl bg-white/5 border border-white/10 p-3 mb-1">
              <p className="text-xs text-white/40">Заказ из аккаунта</p>
              <p className="text-sm font-medium text-white">{resolvedName}</p>
              <p className="text-sm text-white/70">{resolvedPhone}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full bg-white/10 rounded-xl px-3 py-2 text-white"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя (необязательно)"
                className="w-full bg-white/10 rounded-xl px-3 py-2 text-white"
              />
            </div>
          )}

          <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-white/50">
              <span>{count} товаров</span>
              <span>{totalAmount.toLocaleString("ru-RU")} сум</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Доставка</span>
              <span className="text-green-400">Бесплатно</span>
            </div>
            <div className="flex justify-between text-white font-bold">
              <span>Итого</span>
              <span className="text-yellow-400">
                {totalAmount.toLocaleString("ru-RU")} сум
              </span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={isOrdering || (!isLoggedIn && !phone.trim())}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 disabled:opacity-50"
          >
            {isOrdering ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                Оформить заказ
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
