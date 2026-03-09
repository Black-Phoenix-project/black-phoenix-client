import type { SwiperSlide } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://black-phoenixx-backend.onrender.com";

export async function getSwiperSlides(): Promise<SwiperSlide[]> {
  try {
    const res = await fetch(`${API_URL}/api/swiper`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data.swipers) return data.swipers;
    if (data.data) return data.data;
    return [];
  } catch {
    return [];
  }
}
