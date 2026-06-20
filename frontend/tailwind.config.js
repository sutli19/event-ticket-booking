/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          light: "#818CF8",
          dark: "#4F46E5",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          light: "#38BDF8",
          dark: "#0284C7",
        },
        accent: {
          DEFAULT: "#22D3EE",
          light: "#67E8F9",
          dark: "#06B6D4",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },

        background: "#0B0F19",
        "surface-dark": "#111827",
        "surface-muted": "#1E293B",
        "border-dark": "#1F2937",

        textPrimary: "#0F172A",
        textSecondary: "#64748B",
        textPrimaryDark: "#F8FAFC",
        textSecondaryDark: "#94A3B8",

        "seat-available": "#1E293B",
        "seat-availableBorder": "#334155",
        "seat-selected": "#6366F1",
        "seat-selectedBorder": "#818CF8",
        "seat-reserved": "#F59E0B",
        "seat-reservedBorder": "#FBBF24",
        "seat-booked": "#334155",
        "seat-bookedBorder": "#475569",
      },

      fontSize: {
        h1: "40px",
        h2: "32px",
        h3: "28px",
        h4: "24px",
        h5: "20px",
        h6: "16px",
        "body-lg": "18px",
        "body-md": "16px",
        "body-sm": "14px",
        caption: "12px",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },

      boxShadow: {
        card:
          "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)",
        "card-hover":
          "0 8px 16px rgba(0,0,0,0.10), 0 16px 32px rgba(0,0,0,0.12)",
        modal:
          "0 20px 40px rgba(0,0,0,0.20), 0 8px 16px rgba(0,0,0,0.12)",
        button:
          "0 2px 4px rgba(99,102,241,0.24), 0 4px 8px rgba(99,102,241,0.16)",
      },
    },
  },
  plugins: [],
};