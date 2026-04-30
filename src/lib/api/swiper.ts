import type { SwiperSlide } from "@/types";
import { SERVER_API_URL } from "./baseUrl";

export async function getSwiperSlides(): Promise<SwiperSlide[]> {
  try {
    const res = await fetch(`${SERVER_API_URL}/api/swiper`, {
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
