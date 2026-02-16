import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3182CE", // Blue for buttons - matching Figma
          hover: "#2C5282",
        },
        border: "#E5E7EB",
        input: {
          bg: "#F3F4F6",
          text: "#1F2937",
          border: "#D1D5DB",
        },
        success: "#10B981",
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          link: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
