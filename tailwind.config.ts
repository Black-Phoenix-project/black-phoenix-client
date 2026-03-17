import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        brand: {
          warning: "#F59E0B",
          "warning-light": "#FEF3C7",
          "warning-dark": "#B45309",
          dark: "#0F0F0F",
          "dark-2": "#1A1A1A",
          "dark-3": "#252525",
          light: "#F8F8F6",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        blackphoenix: {
          primary: "#F59E0B",
          "primary-content": "#0F0F0F",
          secondary: "#1A1A1A",
          "secondary-content": "#F8F8F6",
          accent: "#F59E0B",
          "accent-content": "#0F0F0F",
          neutral: "#252525",
          "neutral-content": "#F8F8F6",
          "base-100": "#0F0F0F",
          "base-200": "#1A1A1A",
          "base-300": "#252525",
          "base-content": "#F8F8F6",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          "warning-content": "#0F0F0F",
          error: "#EF4444",
        },
      },
      {
        blackphoenixlight: {
          primary: "#D97706",
          "primary-content": "#111111",
          secondary: "#F3F4F6",
          "secondary-content": "#111111",
          accent: "#F59E0B",
          "accent-content": "#111111",
          neutral: "#E5E7EB",
          "neutral-content": "#111111",
          "base-100": "#FAFAFA",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          "base-content": "#111111",
          info: "#2563EB",
          success: "#16A34A",
          warning: "#D97706",
          "warning-content": "#111111",
          error: "#DC2626",
        },
      },
    ],
    darkTheme: "blackphoenixlight",
  },
};

export default config;
