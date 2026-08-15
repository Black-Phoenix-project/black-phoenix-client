import { NextResponse } from "next/server";
import { SERVER_API_URL } from "@/lib/api/baseUrl";

// Server-side proxy for GET /api/product — avoids browser CORS and centralizes
// the backend URL resolution.

export async function GET() {
  try {
    const res = await fetch(`${SERVER_API_URL}/api/product`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: "Ошибка загрузки товаров" },
        { status: res.status }
      );
    }

    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json(
      { success: false, message: "Сервис временно недоступен" },
      { status: 503 }
    );
  }
}
