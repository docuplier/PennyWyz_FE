/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        pennywyz: {
          yellow: {
            t1: "#FFF6E3",
            t2: "#FFB319",
          },
          ash: {
            t1: "#F5F5F5",
            t2: "#A09C92",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            499: "#9CA3AF",
          },
          neutral: {
            50: "#F9FAFB",
            100: "#2A2A2A",
          },
          green: "#22C55E",
          red: "#EF4444",
          white: "#FFFFFF",
          black: "#000000",
          gray_50: "#F9FAFA",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
