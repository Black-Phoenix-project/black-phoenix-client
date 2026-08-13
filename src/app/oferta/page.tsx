import type { Metadata } from "next";
import OfertaContent from "@/components/legal/OfertaContent";

export const metadata: Metadata = {
  title: "Публичная оферта — Black Phoenix",
};

export default function OfertaPage() {
  return <OfertaContent />;
}
