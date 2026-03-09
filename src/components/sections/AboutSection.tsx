import { Truck, UserCheck, ShieldCheck, Package2, PhoneCall } from "lucide-react";

export default function AboutSection() {
  const advantages = [
    {
      icon: Truck,
      title: "Tezkor yetkazib berish",
      desc: "Katta ombor zahiralari bizga har qanday hajmdagi buyurtmalarni 1–3 ish kuni ichida bajarishga imkon beradi.",
    },
    {
      icon: UserCheck,
      title: "Individual yondashuv",
      desc: "Menejer mato namunalari bilan korxonangizga kelib ko'rishi mumkin.",
    },
    {
      icon: ShieldCheck,
      title: "Sifat kafolatlari",
      desc: "Maxsus kiyimlarimiz e'lon qilingan xususiyatlarga mos keladi. Mustahkam, yirtilishga chidamli va parvarishda qulay. Sertifikatlar taqdim etiladi.",
    },
    {
      icon: Package2,
      title: "Minimal buyurtma yo'q",
      desc: "Siz bitta mahsulot ham, katta partiya ham xarid qilishingiz mumkin.",
    },
  ];

  const categories = [
    "Yozgi, qishki va mavsumiy maxsus kiyimlar",
    "Signal forma va inventar (yorug'lik qaytaruvchi elementlar bilan)",
    "Himoya vositalari: qo'lqop, ko'zoynak, niqob, dubulg'a, tizzalik",
    "Maxsus poyabzal va tegishli tovarlar",
  ];

  const services = [
    "Innovatsion matolar, pigmentlar va singdirgichlarni ishlab chiqish",
    "Soha, gavda tuzilishi va moda tendensiyalarini hisobga olib forma loyihalash",
    "Ishlab chiqarish",
    "Himoya to'plamlarini ishlab chiqish",
    "Himoya vositalariga logotip bosish va individuallashtirish",
  ];

  return (
    <section
      id="about"
      className="bg-brand-dark-2 border-y border-white/5 py-16 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-warning/60 uppercase tracking-widest font-medium mb-2">
            Kompaniya
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white"
          >
            Biz haqimizda
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Description */}
          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <p className="text-white/70 leading-relaxed text-base mb-6">
                <span className="text-warning font-semibold">
                  &ldquo;Blackphoenix&rdquo;
                </span>{" "}
                turli soha korxonalari uchun ishonchli ishchi kiyimlar va
                individual himoya vositalarini ishlab chiqaruvchi hamda
                yetkazib beruvchi kompaniya.
              </p>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
                Bizning xizmatlar
              </h3>
              <ul className="space-y-2.5" aria-label="Xizmatlar ro'yxati">
                {services.map((service, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/60">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assortiment */}
          <div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">
                Bizning assortiment
              </h3>
              <p className="text-sm text-white/50 mb-4">
                Biz xizmat ko&apos;rsatish sohasidagi korxonalar xodimlariga
                chiroyli va qulay kiyimlar taklif etamiz. Shuningdek,
                assortimentimizda kimyoviy moddalar bilan ishlashda, iflos
                havoda yoki yuqori xavfli sharoitlarda himoya qiluvchi maxsus
                kiyimlar ham mavjud.
              </p>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                Bizda siz quyidagilarni buyurtma qilishingiz mumkin:
              </p>
              <ul className="space-y-2.5" aria-label="Assortiment ro'yxati">
                {categories.map((cat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/60">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Advantages */}
        <div>
          <h3 className="text-center font-display text-xl sm:text-2xl font-bold text-white mb-6">
            Bizning afzalliklarimiz
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="list"
            aria-label="Afzalliklar"
          >
            {advantages.map((adv, i) => (
              <div
                key={i}
                role="listitem"
                className="glass-card rounded-2xl p-5 border border-white/5 hover:border-warning/15 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mb-3 group-hover:bg-warning/20 transition-colors">
                  <adv.icon
                    size={20}
                    className="text-warning"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">
                  {adv.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order CTA */}
        <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-warning/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <PhoneCall size={22} className="text-warning" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-1">
                Buyurtma berish
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Saytda mahsulotni tanlang va telefon raqamingizni to&apos;g&apos;ri
                kiriting. Buyurtma ma&apos;lumotlari adminlarga tushadi va ular siz
                bilan tez orada bog&apos;lanadi.
              </p>
              <p className="text-xs text-warning/70 mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
                Muhim: Telefon raqamingizni to&apos;g&apos;ri kiriting — adminlar aynan shu
                raqam orqali bog&apos;lanadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
