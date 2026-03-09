import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati — Black Phoenix",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-white mb-6">
        Maxfiylik siyosati
      </h1>
      <div className="prose prose-invert prose-sm space-y-4 text-white/60">
        <p>
          Black Phoenix kompaniyasi foydalanuvchilarning shaxsiy ma&apos;lumotlarini
          himoya qilishga katta e&apos;tibor beradi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Qanday ma&apos;lumotlar to&apos;planadi?
        </h2>
        <p>
          Buyurtma berish jarayonida siz tomonidan kiritilgan telefon raqam va
          ism ma&apos;lumotlari yig&apos;iladi. Bu ma&apos;lumotlar faqat buyurtmangiz bo&apos;yicha
          siz bilan bog&apos;lanish uchun ishlatiladi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Ma&apos;lumotlar qanday ishlatiladi?
        </h2>
        <p>
          To&apos;plangan ma&apos;lumotlar uchinchi shaxslarga sotilmaydi va
          o&apos;tkazilmaydi. Faqat buyurtmani bajarish maqsadida ishlatiladi.
        </p>
        <h2 className="text-white font-semibold text-base mt-6">
          Cookie fayllar
        </h2>
        <p>
          Sayt ishlash sifatini oshirish uchun cookie fayllardan foydalanadi.
          Brauzer sozlamalaringizda cookie fayllarni o&apos;chirishingiz mumkin.
        </p>
        <p className="text-white/30 text-xs mt-8">
          Oxirgi yangilanish: 2024-yil
        </p>
      </div>
    </div>
  );
}
