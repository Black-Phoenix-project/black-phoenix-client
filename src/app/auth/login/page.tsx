"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import toast from "@/lib/toast";
import ApplyLanguage from "@/components/i18n/ApplyLanguage";

export default function LoginPage() {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits || !password.trim()) return;

    setLoading(true);
    try {
      const result = await authApi.login({
        phoneNumber: phoneDigits,
        password,
      });
      setAuth(result.user, result.token);
      toast.success(t("auth.loginSuccess"));
      router.push("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : t("auth.loginFailed");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <ApplyLanguage />

      {/* Brand panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-warning/20 blur-3xl pointer-events-none" />
        <Link href="/" className="font-display font-bold text-2xl relative">
          <span className="text-primary">BLACK</span>
          <span className="text-base-content">PHOENIX</span>
        </Link>
        <div className="relative max-w-sm">
          <h2 className="text-3xl font-bold text-base-content leading-tight">
            {t("auth.loginBrandTitle")}
          </h2>
          <p className="text-base-content/50 mt-3 leading-relaxed">
            {t("auth.loginBrandSub")}
          </p>
        </div>
        <p className="text-xs text-base-content/30 relative">© BLACK PHOENIX</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-base-100">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block font-display font-bold text-2xl">
              <span className="text-primary">BLACK</span>
              <span className="text-base-content">PHOENIX</span>
            </Link>
          </div>

          <div className="bg-base-100 border border-base-300 shadow-xl rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-base-content">
                {t("auth.login")}
              </h1>
              <p className="text-base-content/40 text-sm mt-1">
                {t("auth.loginTitle")}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
              aria-label={t("auth.login")}
            >
              {/* Phone */}
              <div>
                <label
                  htmlFor="login-phone"
                  className="block text-sm font-medium text-base-content/70 mb-1.5"
                >
                  {t("auth.phone")}
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="login-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998901234567"
                    inputMode="numeric"
                    required
                    aria-required="true"
                    autoComplete="tel"
                    className="w-full bg-base-200 border border-base-300 rounded-xl pl-9 pr-4 py-3 text-sm text-base-content placeholder:text-base-content/40 shadow-sm focus:outline-none focus:border-warning focus:ring-2 focus:ring-warning/20 transition-all min-h-[48px]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-base-content/70 mb-1.5"
                >
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="login-password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    required
                    aria-required="true"
                    autoComplete="current-password"
                    className="w-full bg-base-200 border border-base-300 rounded-xl pl-9 pr-10 py-3 text-sm text-base-content placeholder:text-base-content/40 shadow-sm focus:outline-none focus:border-warning focus:ring-2 focus:ring-warning/20 transition-all min-h-[48px]"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !phone.trim() || !password.trim()}
                className="w-full flex items-center justify-center gap-2 bg-warning text-black font-bold py-3 rounded-xl hover:bg-warning/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] text-sm"
                aria-label={t("auth.submit")}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    {t("common.loading")}
                  </>
                ) : (
                  t("auth.submit")
                )}
              </button>
            </form>

            <p className="text-center text-sm text-base-content/40 mt-4">
              {t("auth.noAccount")}{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline min-h-0 min-w-0"
              >
                {t("auth.createOne")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
