"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Phone, Lock, User, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function RegisterPage() {
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
      toast.error("Telefon va parol majburiy");
      return;
    }
    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      toast.error("Telefon raqam noto'g'ri formatda");
      return;
    }
    if (password.trim().length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lsin");
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

      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      router.push("/"); // Asosiy sahifaga yo‘naltirish
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Xato yuz berdi";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-display font-bold text-2xl mb-6"
          >
            <span className="text-warning">BLACK</span>
            <span className="text-white">PHOENIX</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Ro&apos;yxatdan o&apos;tish
          </h1>
          <p className="text-white/40 text-sm">Yangi hisob yarating</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 sm:p-8 space-y-4"
          noValidate
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="block text-sm font-medium text-white/70 mb-1.5"
            >
              Ism (ixtiyoriy)
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="To'liq ismingiz"
                autoComplete="name"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-warning/50 transition-all min-h-[48px]"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="reg-phone"
              className="block text-sm font-medium text-white/70 mb-1.5"
            >
              Telefon raqam <span className="text-warning">*</span>
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-warning/50 transition-all min-h-[48px]"
              />
            </div>
            <p className="text-[10px] text-warning/60 mt-1">
              Adminlar buyurtma uchun shu raqamga qo&apos;ng&apos;iroq qiladi
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="block text-sm font-medium text-white/70 mb-1.5"
            >
              Parol <span className="text-warning">*</span>
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="reg-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kuchli parol kiriting"
                required
                aria-required="true"
                autoComplete="new-password"
                minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-10 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-warning/50 transition-all min-h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors min-h-0 min-w-0 p-1"
                aria-label={showPass ? "Parolni yashirish" : "Parolni ko'rsatish"}
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
                Yuklanmoqda...
              </>
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-4">
          Hisobingiz bormi?{" "}
          <Link href="/auth/login" className="text-warning hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}
