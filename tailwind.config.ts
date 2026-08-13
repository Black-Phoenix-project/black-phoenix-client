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
          warning: "#FACC15",
          "warning-light": "#FEF9C3",
          "warning-dark": "#B45309",
          dark: "#FFFFFF",
          "dark-2": "#F3F4F6",
          "dark-3": "#E5E7EB",
          light: "#FAFAFA",
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
        blackphoenixlight: {
          primary: "#FACC15",
          "primary-content": "#111111",
          secondary: "#F3F4F6",
          "secondary-content": "#111111",
          accent: "#FACC15",
          "accent-content": "#111111",
          neutral: "#E5E7EB",
          "neutral-content": "#111111",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          "base-content": "#111111",
          info: "#2563EB",
          success: "#16A34A",
          warning: "#FACC15",
          "warning-content": "#111111",
          error: "#DC2626",
        },
      },
    ],
    darkTheme: "blackphoenixlight",
  },
};

export default config;
