"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { customOrdersApi } from "@/lib/api/customOrders";
import { categoriesApi, type Category } from "@/lib/api/categories";
import toast from "@/lib/toast";

export default function CustomOrderPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    requirements: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    categoriesApi
      .list()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.requirements.trim()) {
      toast.error(t("customOrder.errorEmpty"));
      return;
    }
    setSubmitting(true);
    try {
      await customOrdersApi.create({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        category: form.category || undefined,
        requirements: form.requirements,
      });
      toast.success(t("customOrder.success"));
      setForm({ name: "", phone: "", email: "", category: "", requirements: "" });
    } catch (err: any) {
      toast.error(err?.message || t("customOrder.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-base-content/60 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {t("common.back")}
        </Link>

        <div className="bg-base-100 border border-base-300 shadow-sm rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-warning/15 flex items-center justify-center">
              <Send size={22} className="text-warning" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
                {t("customOrder.title")}
              </h1>
              <p className="text-sm text-base-content/50 mt-0.5">
                {t("customOrder.subtitle")}
              </p>
            </div>
          </div>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                  {t("customOrder.name")}
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder={t("customOrder.namePlaceholder")}
                  className="input w-full bg-base-200 border-base-300 focus:border-warning focus:outline-none rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                  {t("customOrder.phone")}
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder={t("customOrder.phonePlaceholder")}
                  className="input w-full bg-base-200 border-base-300 focus:border-warning focus:outline-none rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                  {t("customOrder.email")}
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="example@mail.com"
                  className="input w-full bg-base-200 border-base-300 focus:border-warning focus:outline-none rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                  {t("customOrder.category")}
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="select w-full bg-base-200 border-base-300 focus:border-warning focus:outline-none rounded-xl"
                >
                  <option value="">{t("customOrder.categoryPlaceholder")}</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                {t("customOrder.requirements")}
              </label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={onChange}
                rows={5}
                placeholder={t("customOrder.requirementsPlaceholder")}
                className="textarea w-full bg-base-200 border-base-300 focus:border-warning focus:outline-none resize-none rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn w-full bg-warning text-black font-semibold rounded-xl hover:bg-warning/90 disabled:opacity-60"
            >
              {submitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <Send size={16} />
                  {t("customOrder.submit")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
