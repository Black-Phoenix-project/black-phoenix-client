"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock, User, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import ApplyLanguage from "@/components/i18n/ApplyLanguage";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!phoneDigits || !password.trim()) {
      toast.error(t("auth.phoneRequired"));
      return;
    }
    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      toast.error(t("auth.invalidPhone"));
      return;
    }
    if (password.trim().length < 6) {
      toast.error(t("auth.shortPassword"));
      return;
    }

    setLoading(true);

    try {
      // API ga register so'rov
      const result = await authApi.register({
        phoneNumber: phoneDigits,
        password: password.trim(),
        fullName: fullName || undefined,
      });

      // Agar muvaffaqiyatli bo‘lsa, user va token store ga yoziladi
      setAuth(result.user, result.token);

      toast.success(t("auth.registerSuccess"));
      router.push("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("basket.error");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <ApplyLanguage />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-display font-bold text-2xl mb-6"
          >
            <span className="text-primary">BLACK</span>
            <span className="text-base-content">PHOENIX</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-base-content mb-1">
            {t("auth.register")}
          </h1>
          <p className="text-base-content/40 text-sm">{t("auth.registerTitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 sm:p-8 space-y-4"
          noValidate
          aria-label={t("auth.register")}
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="block text-sm font-medium text-base-content/70 mb-1.5"
            >
              {t("auth.name")}
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("auth.namePlaceholder")}
                autoComplete="name"
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-muted shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all min-h-[48px]"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="reg-phone"
              className="block text-sm font-medium text-base-content/70 mb-1.5"
            >
              {t("auth.phone")} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998901234567"
                inputMode="numeric"
                required
                aria-required="true"
                autoComplete="tel"
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-900 placeholder-muted shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all min-h-[48px]"
              />
            </div>
            <p className="text-[10px] text-primary/60 mt-1">
              {t("auth.phoneNote")}
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block text-sm font-medium text-base-content/70 mb-1.5"
            >
              {t("auth.password")} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.strongPasswordPlaceholder")}
                required
                aria-required="true"
                autoComplete="new-password"
                minLength={6}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-10 py-3 text-sm text-gray-900 placeholder-muted shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all min-h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content transition-colors min-h-0 min-w-0 p-1"
                aria-label={showPass ? t("auth.hidePassword") : t("auth.showPassword")}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !phone.trim() || !password.trim()}
            className="w-full flex items-center justify-center gap-2 bg-warning text-black font-bold py-3 rounded-xl hover:bg-warning/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] text-sm"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              t("auth.submitRegister")
            )}
          </button>
        </form>

        <p className="text-center text-sm text-base-content/40 mt-4">
          {t("auth.hasAccount")}{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            {t("auth.goLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}
