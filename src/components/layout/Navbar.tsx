"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const SearchBar = dynamic(() => import("@/components/ui/SearchBar"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md h-10 rounded-lg bg-gray-100 border border-gray-200" aria-hidden="true" />
  ),
});
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import clsx from "clsx";


export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user, isAuthenticated, logout } = useAuthStore();
  const cartCountRaw = useCartStore((s) => s.itemCount());
  const favCountRaw = useFavoritesStore((s) => s.items.length);

  const cartCount = mounted ? cartCountRaw : 0;
  const favCount = mounted ? favCountRaw : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const syncFavorites = useFavoritesStore((s) => s.syncFromServer);
  useEffect(() => {
    if (mounted && isAuthenticated && user?.id) {
      type IdleWindow = Window & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      const browser = window as IdleWindow;
      const run = () => void syncFavorites(user.id);
      if (typeof browser.requestIdleCallback === "function") {
        const id = browser.requestIdleCallback(run, { timeout: 600 });
        return () => browser.cancelIdleCallback?.(id);
      }
      const timer = window.setTimeout(run, 250);
      return () => window.clearTimeout(timer);
    }
  }, [mounted, isAuthenticated, user?.id, syncFavorites]);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "#about", label: t("nav.about") },
  ];

  const handleAbout = () => {
    const scrollToAbout = () => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    if (pathname === "/") {
      scrollToAbout();
      return;
    }

    router.push("/");
    let attempts = 0;
    const id = window.setInterval(() => {
      attempts++;
      scrollToAbout();
      if (attempts >= 20) window.clearInterval(id);
    }, 150);
  };

  return (
    <nav
      className={clsx(
        "relative z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100"
      )}
      aria-label={t("nav.mobileNav")}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 h-16">
          <Link
            href="/"
            className="flex-shrink-0 font-display font-bold text-xl tracking-tight min-h-0 min-w-0 inline-flex items-center gap-2"
            aria-label={t("nav.aria.home")}
          >
            <Image
              src="/clothing.svg"
              alt="Black Phoenix icon"
              width={24}
              height={24}
              priority={false}
              className="hidden sm:block"
            />
            <span className="text-primary">BLACK</span>
            <span className="text-base-content hidden min-[400px]:inline">PHOENIX</span>
          </Link>


          <div className="flex-1 hidden md:flex justify-center px-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 ml-auto">
            <Link
              href="/favorites"
              className={clsx(
                "btn-icon-sm relative rounded-lg hover:bg-base-200 transition-colors text-base-content/70 hover:text-base-content",
                pathname === "/favorites" && "text-primary"
              )}
              aria-label={t("nav.aria.favorites")}
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-warning text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {favCount > 9 ? "9+" : favCount}
                </span>
              )}
            </Link>

            <Link
              href="/basket"
              className={clsx(
                "btn-icon-sm relative rounded-lg hover:bg-base-200 transition-colors text-base-content/70 hover:text-base-content",
                pathname === "/basket" && "text-primary"
              )}
              aria-label={t("nav.aria.cart")}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-warning text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {mounted && isAuthenticated && user ? (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn-icon-sm flex items-center gap-1.5 px-2 rounded-lg hover:bg-base-200 transition-colors text-sm text-base-content/70 hover:text-base-content"
                  aria-label={t("nav.userMenu")}
                  aria-haspopup="menu"
                >
                  <User size={18} className="text-primary flex-shrink-0" />
                  <span className="hidden sm:block text-xs font-medium max-w-[80px] truncate">
                    {user.phoneNumber}
                  </span>
                </button>
                <ul
                  tabIndex={0}
                  role="menu"
                  className="dropdown-content z-50 menu menu-sm shadow-2xl bg-base-200 border border-base-300 rounded-xl w-48 p-2 mt-1"
                >
                  <li className="px-3 py-2 border-b border-base-300 mb-1">
                    <p className="text-xs text-base-content/40">{t("nav.phone")}</p>
                    <p className="text-sm font-medium text-base-content">{user.phoneNumber}</p>
                  </li>
                  <li>
                    <button
                      role="menuitem"
                      onClick={() => logout()}
                      className="flex items-center gap-2 text-sm text-error hover:text-red-300 hover:bg-red-400/10 rounded-lg px-3 py-2 w-full text-left min-h-0"
                    >
                      <LogOut size={14} />
                      {t("common.logout")}
                    </button>
                  </li>
                </ul>
              </div>
            ) : mounted && !isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5 ml-1">
                <Link
                  href="/auth/login"
                  className="text-sm text-base-content/70 hover:text-base-content transition-colors px-3 py-2 rounded-lg hover:bg-base-200 min-h-[44px] flex items-center"
                >
                  {t("common.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm bg-warning text-black font-semibold px-3 py-2 rounded-lg hover:bg-warning/90 transition-colors min-h-[44px] flex items-center"
                >
                  {t("common.register")}
                </Link>
              </div>
            ) : null}

            <LanguageSwitcher />

            <button
              className="btn-icon-sm rounded-lg hover:bg-base-200 transition-colors text-base-content/70 hover:text-base-content md:hidden ml-0 sm:ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>


        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      <div
        id="mobile-menu"
        role="navigation"
        aria-label={t("nav.mobileNav")}
        className={clsx(
          "md:hidden border-t border-base-300 bg-base-200 transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-screen pb-4" : "max-h-0"
        )}
      >
        <ul className="px-4 pt-2 space-y-1">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <li key={link.href}>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleAbout();
                  }}
                  className="block w-full text-left px-3 py-3 rounded-lg text-sm transition-colors text-base-content/70 hover:text-base-content hover:bg-base-200"
                >
                  {link.label}
                </button>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "block px-3 py-3 rounded-lg text-sm transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
          {mounted && !isAuthenticated && (
            <>
              <li className="pt-2 border-t border-base-300">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm text-base-content/70 hover:text-base-content hover:bg-base-200 transition-colors"
                >
                  {t("common.login")}
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm bg-warning text-black font-semibold hover:bg-warning/90 transition-colors text-center"
                >
                  {t("common.register")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
