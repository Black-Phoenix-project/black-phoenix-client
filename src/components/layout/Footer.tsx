"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Send, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Footer() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Вы вышли из системы");
    router.push("/");
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-brand-dark-2 border-t border-white/5 mt-20"
      role="contentinfo"
      aria-label="Подвал сайта"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-bold text-2xl mb-3 min-h-0 min-w-0"
            aria-label="Black Phoenix главная"
          >
            <Image
              src="/clothing.svg"
              alt="Black Phoenix icon"
              width={28}
              height={28}
              priority={false}
            />
            <span className="text-warning">BLACK</span>
            <span className="text-white">PHOENIX</span>
          </Link>
          <p className="text-sm text-white/40 leading-relaxed max-w-xs">
            Производитель и поставщик надежной рабочей одежды и средств защиты.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
            Контакты
          </h3>
          <ul className="space-y-3" aria-label="Контактная информация">
            <li>
              <a
                href="tel:+998901234567"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-warning transition-colors group min-h-0 min-w-0"
                aria-label="Telefon: +998 90 123-45-67"
              >
                <Phone
                  size={15}
                  className="text-warning/60 group-hover:text-warning flex-shrink-0"
                />
                +998 90 123-45-67
              </a>
            </li>
            <li>
              <a
                href="mailto:info@blackphoenix.uz"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-warning transition-colors group min-h-0 min-w-0"
                aria-label="Email: info@blackphoenix.uz"
              >
                <Mail
                  size={15}
                  className="text-warning/60 group-hover:text-warning flex-shrink-0"
                />
                info@blackphoenix.uz
              </a>
            </li>
            <li>
              <address className="flex items-start gap-2.5 text-sm text-white/60 not-italic">
                <MapPin
                  size={15}
                  className="text-warning/60 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>Ташкент, Узбекистан</span>
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
            Социальные сети
          </h3>
          <ul className="space-y-3" aria-label="Социальные сети">
            <li>
              <a
                href="https://instagram.com/blackphoenix.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-warning transition-colors group min-h-0 min-w-0"
                aria-label="Страница Instagram (откроется в новой вкладке)"
              >
                <Instagram
                  size={15}
                  className="text-warning/60 group-hover:text-warning"
                />
                @blackphoenix.uz
              </a>
            </li>
            <li>
              <a
                href="https://t.me/blackphoenix_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-warning transition-colors group min-h-0 min-w-0"
                aria-label="Канал Telegram (откроется в новой вкладке)"
              >
                <Send
                  size={15}
                  className="text-warning/60 group-hover:text-warning"
                />
                Telegram
              </a>
            </li>
          </ul>

          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3 mt-6">
            Страницы
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/products", label: "Товары" },
              { href: "/basket", label: "Корзина" },
              { href: "/favorites", label: "Избранное" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 hover:text-warning transition-colors min-h-0 min-w-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
            Личный кабинет
          </h3>
          <div
            className="glass-card rounded-xl p-4"
            aria-label="Личный кабинет"
          >
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-warning" aria-hidden="true" />
                  </div>
                  <div>
                    {user.fullName && (
                      <p className="text-sm font-medium text-white leading-tight">
                        {user.fullName}
                      </p>
                    )}
                    <p className="text-xs text-white/50">{user.phoneNumber}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-400 hover:text-red-300 bg-red-400/5 hover:bg-red-400/10 rounded-lg transition-colors border border-red-400/10 min-h-[44px]"
                  aria-label="Выйти"
                >
                  <LogOut size={13} />
                  Выйти
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-white/40 mb-3">
                  Войдите в систему, чтобы открыть кабинет
                </p>
                <Link
                  href="/auth/login"
                  className="block w-full text-center py-2 text-sm font-medium bg-warning/10 hover:bg-warning/20 text-warning border border-warning/20 rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/register"
                  className="block w-full text-center py-2 text-sm font-medium bg-warning text-black hover:bg-warning/90 rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Зарегистрироваться
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} Black Phoenix. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-warning transition-colors min-h-0 min-w-0"
            >
              Политика конфиденциальности
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/oferta"
              className="hover:text-warning transition-colors min-h-0 min-w-0"
            >
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
