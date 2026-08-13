"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SwiperSlide as SwiperSlideType } from "@/types";

interface HeroSwiperProps {
  slides: SwiperSlideType[];
}

export default function HeroSwiper({ slides }: HeroSwiperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (slides.length === 0) return <HeroFallback />;

  // Show a real hero slide immediately for faster LCP, then hydrate full swiper.
  if (!mounted) return <HeroStatic slides={slides} />;

  return <HeroSwiperClient slides={slides} />;
}

function HeroStatic({ slides }: { slides: SwiperSlideType[] }) {
  const { t } = useTranslation();
  const first = slides[0];

  return (
    <section className="relative w-full" aria-label={t("hero.aria")}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          <div className="flex-1 relative rounded-2xl overflow-hidden bg-base-200 min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
            <div
              className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`1 / ${slides.length}: ${first.title || t("hero.banner")}`}
            >
              <Image
                src={first.image}
                alt={first.title || "Black Phoenix banner"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                className="object-cover"
                priority
                quality={70}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                {first.title && (
                  <h2 className="hero-swiper-title font-display text-2xl sm:text-4xl font-bold mb-2 leading-tight max-w-lg">
                    {first.title}
                  </h2>
                )}
                {first.description && (
                  <p className="hero-swiper-description text-sm sm:text-base mb-4 max-w-md line-clamp-2">
                    {first.description}
                  </p>
                )}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 hero-overlay-chip backdrop-blur-sm hero-overlay-text text-xs px-2.5 py-1 rounded-full z-10 pointer-events-none">
              1 / {slides.length}
            </div>
          </div>

          <HeroSidebar />
        </div>
      </div>
    </section>
  );
}

function HeroSwiperClient({ slides }: { slides: SwiperSlideType[] }) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [SwiperComp, setSwiperComp] = useState<any>(null);
  const [SwiperSlideComp, setSwiperSlideComp] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    type IdleWindow = Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      };

    const browser = globalThis as IdleWindow;

    const load = () => {
      Promise.all([import("swiper/react"), import("swiper/modules")]).then(
        ([swiperReact, swiperModules]) => {
          setSwiperComp(() => swiperReact.Swiper);
          setSwiperSlideComp(() => swiperReact.SwiperSlide);
          setModules([
            swiperModules.Autoplay,
            swiperModules.Pagination,
          ]);
        }
      );

      import("swiper/css");
      import("swiper/css/pagination");
    };

    if (typeof browser.requestIdleCallback === "function") {
      const id = browser.requestIdleCallback(load, { timeout: 350 });
      return () => {
        browser.cancelIdleCallback?.(id);
      };
    }

    const t = setTimeout(load, 120);
    return () => clearTimeout(t);
  }, []);

  if (!SwiperComp || !SwiperSlideComp || modules.length === 0) {
    return <HeroStatic slides={slides} />;
  }

  const Swiper = SwiperComp;
  const SwiperSlide = SwiperSlideComp;

  return (
    <section className="relative w-full" aria-label={t("hero.aria")}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          <div className="flex-1 relative rounded-2xl overflow-hidden bg-base-200 min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]">
            <Swiper
              modules={modules}
              slidesPerView={1}
              loop={slides.length > 1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              onSwiper={setSwiper}
              onSlideChange={(s: any) => setActiveIndex(s.realIndex)}
              style={{ height: "100%", minHeight: "320px" }}
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={slide._id}>
                  <div
                    className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px]"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} / ${slides.length}: ${slide.title || t("hero.banner")}`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title || "Black Phoenix banner"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                      className="object-cover"
                      priority={i === 0}
                      quality={70}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                      {slide.title && (
                        <h2 className="hero-swiper-title font-display text-2xl sm:text-4xl font-bold mb-2 leading-tight max-w-lg">
                          {slide.title}
                        </h2>
                      )}
                      {slide.description && (
                        <p className="hero-swiper-description text-sm sm:text-base mb-4 max-w-md line-clamp-2">
                          {slide.description}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label={t("hero.prev")}
              onClick={() => swiper?.slidePrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-warning text-black shadow-lg hover:shadow-warning/40 focus-visible:outline-warning"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label={t("hero.next")}
              onClick={() => swiper?.slideNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 btn btn-circle btn-warning text-black shadow-lg hover:shadow-warning/40 focus-visible:outline-warning"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-4 right-4 hero-overlay-chip backdrop-blur-sm hero-overlay-text text-xs px-2.5 py-1 rounded-full z-10 pointer-events-none">
              {activeIndex + 1} / {slides.length}
            </div>
          </div>

          <HeroSidebar />
        </div>
      </div>
    </section>
  );
}

function HeroSidebar() {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex flex-col gap-3 w-[220px] xl:w-[260px] flex-shrink-0">
      <div className="flex-1 glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-primary/10 hover:border-primary/20 transition-colors">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Zap size={22} className="text-primary" aria-hidden="true" />
        </div>
        <p className="text-xs text-base-content/30 uppercase tracking-wider mb-1">{t("hero.promotion")}</p>
        <p className="font-display text-3xl font-bold text-primary leading-none mb-1">20%</p>
        <p className="text-sm text-base-content font-medium">{t("hero.discount")}</p>
        <p className="text-xs text-base-content/40 mt-2">{t("hero.firstOrder")}</p>
      </div>

      <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-base-300">
        <p className="text-xs text-base-content/30 uppercase tracking-wider mb-1">{t("hero.delivery")}</p>
        <p className="font-display text-xl font-bold text-base-content leading-tight">{t("hero.deliveryDays")}</p>
        <p className="text-xs text-base-content/40 mt-1">{t("hero.inTashkent")}</p>
      </div>

      <div className="glass-card rounded-2xl p-5 border border-base-300">
        <p className="text-xs text-base-content/30 uppercase tracking-wider mb-2">{t("hero.minOrder")}</p>
        <p className="font-display text-xl font-bold text-primary">{t("hero.none")}</p>
        <p className="text-xs text-base-content/40 mt-1">{t("hero.minOrderNote")}</p>
      </div>
    </div>
  );
}

function HeroFallback() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-base-200 to-base-100" aria-label={t("hero.aria")}>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-base-content mb-4">
          <span className="text-primary">BLACK</span> PHOENIX
        </h1>
        <p className="text-base-content/60 text-lg mb-8 max-w-xl mx-auto">
          {t("hero.fallbackTitle")}
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-warning text-black font-semibold px-6 py-3 rounded-xl hover:bg-warning/90 transition-colors text-base min-h-[48px]"
        >
          {t("hero.viewProducts")}
          <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  );
}
