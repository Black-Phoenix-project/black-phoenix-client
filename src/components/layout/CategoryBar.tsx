"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronRight, X, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { categoriesApi, type Category } from "@/lib/api/categories";

/* ─── Статические подкатегории (резерв + суб-список) ─────────────────────────── */
export const CATALOG_CATEGORIES = [
  {
    label: "Спецодежда",
    slug: "spetsodezhda",
    sub: [
      "Летняя спецодежда", "Зимняя спецодежда", "Демисезонная одежда",
      "Влагозащитная одежда", "Сигнальная одежда", "Одноразовая и защитная одежда",
      "Одежда для охраны", "Одежда для сварщиков", "Защита от электрической дуги",
      "Одежда из антистатических тканей", "Одежда для медицины",
      "Одежда для отелей, ресторанов и кафе", "Пищевые производства", "Головные уборы", "Большие размеры",
    ],
  },
  { label: "Спецобувь", slug: "spetsobov", sub: ["Защитная обувь", "Резиновые сапоги", "Зимняя обувь", "Летняя обувь", "Антистатическая обувь", "Диэлектрическая обувь"] },
  { label: "Средства защиты", slug: "sredstva-zashchity", sub: ["Перчатки", "Маски и очки", "Защита органов слуха", "Средства защиты дыхания", "Страховочные пояса", "Защита от падения", "Каски защитные"] },
  { label: "Трикотаж", slug: "trikotazh", sub: ["Футболки и поло", "Свитшоты и толстовки", "Термобельё", "Флисовые изделия", "Носки и чулки"] },
  { label: "Хозяйственные товары", slug: "khoztovary", sub: ["Уборочный инвентарь", "Мешки и контейнеры", "Хозяйственные перчатки", "Средства гигиены"] },
  { label: "Униформа", slug: "uniforma", sub: ["Корпоративная одежда", "Рестораны и гостиницы", "Медицинская форма", "Спортивная форма", "Служба безопасности", "Школьная форма"] },
  { label: "Новинки", slug: "novinki", sub: [] },
];

const SUBS: Record<string, string[]> = Object.fromEntries(
  CATALOG_CATEGORIES.map((c) => [c.slug, c.sub])
);

const QUICK_LINKS_STATIC = [
  { label: "Спецодежда", slug: "spetsodezhda" },
  { label: "Спецобувь", slug: "spetsobov" },
  { label: "Средства защиты", slug: "sredstva-zashchity" },
  { label: "Трикотаж", slug: "trikotazh" },
  { label: "Хозтовары", slug: "khoztovary" },
  { label: "Новинки", slug: "novinki" },
];

interface CatItem {
  label: string;
  slug: string;
  sub: string[];
}

/* ─── Компонент ──────────────────────────────────────────────────────────── */
export default function CategoryBar() {
  const { t } = useTranslation();
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [cats, setCats] = useState<CatItem[] | null>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* Категории с сервера (Nuriddin Aka ro'yxati admin'dan) */
  useEffect(() => {
    let active = true;
    categoriesApi
      .list()
      .then((data: Category[]) => {
        if (!active) return;
        if (data.length) {
          const mapped: CatItem[] = data
            .slice()
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((c) => ({
              label: c.name,
              slug: c.slug,
              sub: SUBS[c.slug] || [],
            }));
          setCats(mapped);
        } else {
          setCats(
            CATALOG_CATEGORIES.map((c) => ({ ...c }))
          );
        }
      })
      .catch(() => {
        if (active) setCats(CATALOG_CATEGORIES.map((c) => ({ ...c })));
      });
    return () => {
      active = false;
    };
  }, []);

  const list: CatItem[] = cats ?? CATALOG_CATEGORIES.map((c) => ({ ...c }));
  const quickLinks = list.slice(0, 6).map((c) => ({ label: c.label, slug: c.slug }));

  /* Закрытие по клику вне */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Закрытие по Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCatalogOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const goToCategory = useCallback(
    (slug: string) => {
      setCatalogOpen(false);
      setMobileOpen(false);
      if (slug) {
        router.push(`/products?category=${slug}`);
      } else {
        router.push("/products");
      }
    },
    [router]
  );

  return (
    <>
      {/* ─── Desktop bar ─────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-base-100 border-b border-base-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-stretch h-11">
            <div ref={catalogRef} className="relative flex-shrink-0">
              <button
                onClick={() => setCatalogOpen((v) => !v)}
                className="h-full flex items-center gap-2 px-4 bg-warning hover:bg-warning/90 text-black font-bold text-sm transition-colors select-none"
                aria-expanded={catalogOpen}
                aria-haspopup="true"
              >
                {catalogOpen ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
                {t("catalog.catalog")}
              </button>

              {catalogOpen && (
                <div
                  className="absolute top-full left-0 z-50 flex bg-base-100 border border-base-300 shadow-2xl"
                  style={{ minWidth: 680 }}
                  role="dialog"
                  aria-label={t("catalog.aria")}
                >
                  <ul className="w-56 border-r border-base-200 py-1 flex-shrink-0">
                    {list.map((cat, i) => (
                      <li key={cat.slug}>
                        <button
                          onMouseEnter={() => setHoveredCat(i)}
                          onClick={() => goToCategory(cat.slug)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                            hoveredCat === i
                              ? "bg-warning/10 text-warning font-semibold"
                              : "text-base-content/70 hover:bg-base-200"
                          }`}
                        >
                          <span>{t(`catalog.categories.${cat.slug}`)}</span>
                          <ChevronRight
                            size={14}
                            className={hoveredCat === i ? "text-warning" : "text-base-content/30"}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="flex-1 p-5">
                    <h3 className="text-sm font-bold text-warning mb-3 uppercase tracking-wide">
                      {t(`catalog.categories.${list[hoveredCat]?.slug}`)}
                    </h3>
                    {list[hoveredCat]?.sub.length > 0 ? (
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                        {list[hoveredCat].sub.map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => goToCategory(list[hoveredCat].slug)}
                              className="text-sm text-base-content/60 hover:text-warning transition-colors text-left w-full"
                            >
                              {t(`catalog.sub.${item}`)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-base-content/30">{t("catalog.newArrivals")}</p>
                    )}
                    <button
                      onClick={() => goToCategory(list[hoveredCat].slug)}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-warning hover:text-warning border border-warning hover:border-warning px-3 py-1.5 rounded transition-colors"
                    >
                      {t("catalog.viewAll")}
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <nav className="flex items-center flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {quickLinks.map((link) => (
                <button
                  key={link.slug}
                  onClick={() => goToCategory(link.slug)}
                  className="flex-shrink-0 h-full flex items-center px-3.5 text-sm font-medium text-base-content/70 hover:text-warning hover:bg-warning/10 transition-colors whitespace-nowrap border-r border-base-200 last:border-r-0"
                >
                  {t(`catalog.categories.${link.slug}`)}
                </button>
              ))}
            </nav>

            <button
              onClick={() => router.push("/products")}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 bg-red-500 hover:bg-red-600 text-base-content font-bold text-sm transition-colors whitespace-nowrap"
            >
              <Tag size={14} />
              {t("catalog.sale")}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile ──────────────────────────────────────────────────────── */}
      <div className="md:hidden bg-base-100 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-warning text-black font-bold text-sm"
          >
            <Menu size={18} />
            {t("catalog.catalog")}
            <ChevronRight
              size={16}
              className={`ml-auto transition-transform ${mobileOpen ? "rotate-90" : ""}`}
            />
          </button>

          {mobileOpen && (
            <div className="bg-base-100 border-t border-base-200 max-h-96 overflow-y-auto">
              {list.map((cat) => (
                <div key={cat.slug} className="border-b border-base-200 last:border-b-0">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-base-content"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === cat.slug ? null : cat.slug)
                    }
                  >
                    <span>{t(`catalog.categories.${cat.slug}`)}</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform text-base-content/30 ${
                        mobileExpanded === cat.slug ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {mobileExpanded === cat.slug && (
                    <div className="pb-2 bg-base-200">
                      <button
                        onClick={() => goToCategory(cat.slug)}
                        className="block w-full text-left px-6 py-1.5 text-sm font-semibold text-warning"
                      >
                        {t("catalog.viewAll")} →
                      </button>
                      {cat.sub.map((item) => (
                        <button
                          key={item}
                          onClick={() => goToCategory(cat.slug)}
                          className="block w-full text-left px-6 py-1.5 text-sm text-base-content/60 hover:text-warning"
                        >
                          {t(`catalog.sub.${item}`)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
