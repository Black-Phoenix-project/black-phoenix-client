import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://black-phoenixx-backend.onrender.com";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const upstream = new URL(`${BACKEND_URL}/api/search`);
  searchParams.forEach((value, key) => upstream.searchParams.set(key, value));

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 0 },
    });

    const data = await res.json();

    // Normalize: backend returns { results } but legacy Next.js proxy returned { results } too
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Search service unavailable" },
      { status: 503 }
    );
  }
}
