"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Send, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function Footer() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success(t("footer.logoutSuccess"));
    router.push("/");
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-base-200 border-t border-base-300 mt-20"
      role="contentinfo"
      aria-label={t("footer.contacts")}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-bold text-2xl mb-3 min-h-0 min-w-0"
            aria-label="Black Phoenix"
          >
            <Image
              src="/clothing.svg"
              alt="Black Phoenix icon"
              width={28}
              height={28}
              priority={false}
            />
            <span className="text-primary">BLACK</span>
            <span className="text-base-content">PHOENIX</span>
          </Link>
          <p className="text-sm text-base-content/40 leading-relaxed max-w-xs">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-base-content/30 uppercase tracking-widest mb-4">
            {t("footer.contacts")}
          </h3>
          <ul className="space-y-3" aria-label={t("footer.contacts")}>
            <li>
              <a
                href="tel:+998901234567"
                className="flex items-center gap-2.5 text-sm text-base-content/60 hover:text-primary transition-colors group min-h-0 min-w-0"
                aria-label="Telefon: +998 90 123-45-67"
              >
                <Phone
                  size={15}
                  className="text-primary/60 group-hover:text-primary flex-shrink-0"
                />
                +998 90 123-45-67
              </a>
            </li>
            <li>
              <a
                href="mailto:info@blackphoenix.uz"
                className="flex items-center gap-2.5 text-sm text-base-content/60 hover:text-primary transition-colors group min-h-0 min-w-0"
                aria-label="Email: info@blackphoenix.uz"
              >
                <Mail
                  size={15}
                  className="text-primary/60 group-hover:text-primary flex-shrink-0"
                />
                info@blackphoenix.uz
              </a>
            </li>
            <li>
              <address className="flex items-start gap-2.5 text-sm text-base-content/60 not-italic">
                <MapPin
                  size={15}
                  className="text-primary/60 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{t("footer.address")}</span>
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-base-content/30 uppercase tracking-widest mb-4">
            {t("footer.social")}
          </h3>
          <ul className="space-y-3" aria-label={t("footer.social")}>
            <li>
              <a
                href="https://instagram.com/blackphoenix.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-base-content/60 hover:text-primary transition-colors group min-h-0 min-w-0"
                aria-label={t("footer.instagramAria")}
              >
                <Instagram
                  size={15}
                  className="text-primary/60 group-hover:text-primary"
                />
                @blackphoenix.uz
              </a>
            </li>
            <li>
              <a
                href="https://t.me/blackphoenix_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-base-content/60 hover:text-primary transition-colors group min-h-0 min-w-0"
                aria-label={t("footer.telegramAria")}
              >
                <Send
                  size={15}
                  className="text-primary/60 group-hover:text-primary"
                />
                Telegram
              </a>
            </li>
          </ul>

          <h3 className="text-xs font-semibold text-base-content/30 uppercase tracking-widest mb-3 mt-6">
            {t("footer.pages")}
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/products", label: t("nav.products") },
              { href: "/basket", label: t("common.cart") },
              { href: "/favorites", label: t("common.favorites") },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-base-content/60 hover:text-primary transition-colors min-h-0 min-w-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-base-content/30 uppercase tracking-widest mb-4">
            {t("footer.account")}
          </h3>
          <div
            className="glass-card rounded-xl p-4"
            aria-label={t("footer.account")}
          >
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    {user.fullName && (
                      <p className="text-sm font-medium text-base-content leading-tight">
                        {user.fullName}
                      </p>
                    )}
                    <p className="text-xs text-base-content/50">{user.phoneNumber}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs text-error hover:text-red-300 bg-red-400/5 hover:bg-red-400/10 rounded-lg transition-colors border border-red-400/10 min-h-[44px]"
                  aria-label={t("footer.logout")}
                >
                  <LogOut size={13} />
                  {t("footer.logout")}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-base-content/40 mb-3">
                  {t("footer.accountPrompt")}
                </p>
                <Link
                  href="/auth/login"
                  className="block w-full text-center py-2 text-sm font-medium bg-primary/10 hover:bg-warning/20 text-primary border border-primary/20 rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {t("footer.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="block w-full text-center py-2 text-sm font-medium bg-warning text-black hover:bg-warning/90 rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {t("footer.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-base-content/30">
          <p>© {year} Black Phoenix. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors min-h-0 min-w-0"
            >
              {t("footer.privacy")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/oferta"
              className="hover:text-primary transition-colors min-h-0 min-w-0"
            >
              {t("footer.oferta")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
