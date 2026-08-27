"use client";

import { useState } from "react";
import { Send, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

const TELEGRAM_LINK = "https://t.me/SardorXojimurodov";
const PHONE_TEL = "tel:+998770902226";

export default function FloatingContactButtons() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<"telegram" | "phone" | null>(null);

  const openModal = (ch: "telegram" | "phone") => {
    setChannel(ch);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setChannel(null);
  };

  const confirm = () => {
    setOpen(false);
    // TODO: Sardor'ning "necessary function" ini shu yerga ulash
    if (channel === "telegram") {
      window.open(TELEGRAM_LINK, "_blank", "noopener,noreferrer");
    } else if (channel === "phone") {
      window.location.href = PHONE_TEL;
    }
    setChannel(null);
  };

  return (
    <>
      <div className="fixed left-3 sm:left-4 bottom-4 sm:bottom-6 z-50 flex flex-col gap-3">
        <button
          type="button"
          aria-label={t("floating.telegram", "Telegram")}
          onClick={() => openModal("telegram")}
          className="btn btn-circle bg-success text-white shadow-lg border-none"
        >
          <Send size={20} />
        </button>
        <button
          type="button"
          aria-label={t("floating.phone", "Qo'ng'iroq")}
          onClick={() => openModal("phone")}
          className="btn btn-circle bg-info text-white shadow-lg border-none"
        >
          <Phone size={20} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={close}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-base-100 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center"
          >
            <p className="text-base-content font-medium leading-relaxed">
              {t(
                "floating.confirmTitle",
                "Aloqa jarayonini davom ettirishni xohlaysizmi?"
              )}
            </p>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={close}
                className="flex-1 btn rounded-xl border border-base-300 bg-base-100 text-base-content"
              >
                {t("floating.confirmNo", "Yo'q")}
              </button>
              <button
                type="button"
                onClick={confirm}
                className="flex-1 btn rounded-xl bg-warning text-black font-semibold"
              >
                {t("floating.confirmYes", "Ha")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
