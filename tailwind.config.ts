import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1152px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      colors: {
        background: "#F5F2EB",
        foreground: "#1A1A1A",
        muted: "#6B6B6B",
        subtle: "#999999",
        border: "#D4D0C8",
        "border-light": "#E8E5DE",
        accent: "#1A1A1A",
        card: "#FFFFFF",
        tag: {
          ai: "#3B82F6",
          "ai-bg": "#EFF6FF",
          frontend: "#22C55E",
          "frontend-bg": "#F0FDF4",
          backend: "#F59E0B",
          "backend-bg": "#FFFBEB",
          default: "#6B7280",
          "default-bg": "#F3F4F6",
        },
      },
      fontSize: {
        "display": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "heading-sm": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
        "label": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.15em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
