import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена — Black Phoenix",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-8xl font-display font-bold text-warning/20 mb-4 leading-none">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Страница не найдена
        </h1>
        <p className="text-white/40 text-sm mb-8 max-w-xs mx-auto">
          Страница, которую вы ищете, не существует или была удалена.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/5 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors min-h-[44px] text-sm border border-white/10"
          >
            <ArrowLeft size={16} />
            На главную
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-warning text-black font-bold px-5 py-2.5 rounded-xl hover:bg-warning/90 transition-colors min-h-[44px] text-sm"
          >
            <Search size={16} />
            Товары
          </Link>
        </div>
      </div>
    </div>
  );
}
