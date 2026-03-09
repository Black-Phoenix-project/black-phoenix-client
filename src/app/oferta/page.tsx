"use cleint"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ommaviy oferta — Black Phoenix",
};

export default function OfertaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-white mb-6">
        Ommaviy oferta
      </h1>
      <div className="space-y-4 text-white/60 text-sm leading-relaxed">
        <p>
          Ushbu ommaviy oferta Black Phoenix kompaniyasi va sayt foydalanuvchilari
          o&apos;rtasidagi shartnomani belgilaydi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          1. Mahsulot va narxlar
        </h2>
        <p>
          Saytdagi barcha mahsulot narxlari so&apos;m hisobida ko&apos;rsatilgan.
          Kompaniya narxlarni oldindan ogohlantirmasdan o&apos;zgartirish huquqini
          saqlab qoladi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          2. Buyurtma berish
        </h2>
        <p>
          Buyurtma saytdagi forma orqali qabul qilinadi. Buyurtma tasdiqlangach,
          menejerimiz siz bilan ko&apos;rsatilgan telefon raqami orqali bog&apos;lanadi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          3. Yetkazib berish
        </h2>
        <p>
          Buyurtmalar 1–3 ish kuni ichida yetkazib beriladi. Toshkent shahri
          bo&apos;ylab yetkazib berish shartlari menejer tomonidan kelishiladi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          4. Qaytarish siyosati
        </h2>
        <p>
          Mahsulot sifatiga oid muammolar yuzaga kelganda, menejerimiz bilan
          bog&apos;laning. Qaytarish shartlari alohida kelishiladi.
        </p>
        <p className="text-white/30 text-xs mt-8">
          Oxirgi yangilanish: 2024-yil
        </p>
      </div>
    </div>
  );
}
