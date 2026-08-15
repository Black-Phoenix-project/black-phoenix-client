import type { Metadata } from "next";
import PrivacyContent from "@/components/legal/PrivacyContent";
import ApplyLanguage from "@/components/i18n/ApplyLanguage";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Black Phoenix",
};

export default function PrivacyPage() {
  return (
    <>
      <PrivacyContent />
      <ApplyLanguage />
    </>
  );
}
