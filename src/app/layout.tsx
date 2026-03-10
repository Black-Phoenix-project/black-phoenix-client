import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blackphoenix.uz";

// Fonts
const fontPrimary = DM_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-primary",
  preload: true,
});

const fontDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Black Phoenix — Maxsus Kiyim va Himoya Vositalari | Спецодежда Ташкент",
    template: "%s | Black Phoenix",
  },
  description:
    "Black Phoenix — O'zbekistondagi eng ishonchli maxsus kiyim (спецодежда) ishlab chiqaruvchi. Sanoat, xizmat ko'rsatish va himoya kiyimlari. Tezkor yetkazib berish.",
  keywords: [
    "спецодежда",
    "спецодежда Ташкент",
    "blackphoenix",
    "black phoenix",
    "maxsus kiyim",
    "himoya vositalari",
    "ish kiyimi",
    "forma kiyim",
    "сигнальная одежда",
    "спецодежда Узбекистан",
    "iş kıyafeti",
    "BlackPhoenix спецодежда",
    "корпоративная одежда",
    "рабочая одежда",
  ],
  authors: [{ name: "Black Phoenix", url: SITE_URL }],
  creator: "Black Phoenix",
  publisher: "Black Phoenix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU"],
    url: SITE_URL,
    siteName: "Black Phoenix",
    title:
      "Black Phoenix — Maxsus Kiyim va Himoya Vositalari | Спецодежда Ташкент",
    description:
      "O'zbekistondagi eng ishonchli maxsus kiyim ishlab chiqaruvchi. Tezkor yetkazib berish.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Black Phoenix — Спецодежда",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Phoenix — Спецодежда Ташкент",
    description:
      "O'zbekistondagi eng ishonchli maxsus kiyim va himoya vositalari.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico", // Brauzer tab
    apple: "/apple-touch-icon.png", // iOS
    
  },
  manifest: "/site.webmanifest",
};

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
};

// JSON-LD Organization
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Black Phoenix",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+998-XX-XXX-XX-XX",
    contactType: "customer service",
    areaServed: "UZ",
    availableLanguage: ["Uzbek", "Russian"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "UZ",
    addressLocality: "Toshkent",
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" data-theme="blackphoenix" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              var root = document.documentElement;
              var mq = window.matchMedia("(prefers-color-scheme: dark)");
              var applyTheme = function (isDark) {
                root.setAttribute("data-theme", isDark ? "blackphoenix" : "blackphoenixlight");
              };
              applyTheme(mq.matches);
              if (typeof mq.addEventListener === "function") {
                mq.addEventListener("change", function (e) { applyTheme(e.matches); });
              } else if (typeof mq.addListener === "function") {
                mq.addListener(function (e) { applyTheme(e.matches); });
              }
            })();`,
          }}
        />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${fontPrimary.variable} ${fontDisplay.variable} min-h-screen bg-brand-dark text-brand-light antialiased transition-colors duration-300`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-text)",
              border: "1px solid var(--toast-border)",
              fontFamily: "var(--font-primary)",
            },
            success: { iconTheme: { primary: "#F59E0B", secondary: "#0F0F0F" } },
            error: { iconTheme: { primary: "#EF4444", secondary: "#F8F8F6" } },
          }}
        />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}