import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable dark mode via adding 'dark' class on <html>
  content: [
    "./app/**/*.{ts,tsx,js,jsx}", // Your app folder files
    "./pages/**/*.{ts,tsx,js,jsx}", // If you have a pages folder
    "./components/**/*.{ts,tsx,js,jsx}", // Your components
  ],
  theme: {
    extend: {
      // You can extend colors, fonts, etc here if needed
      colors: {
        // Example: add custom orange shade
        orange: {
          400: "#fb923c",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [
    // Add Tailwind plugins if needed
  ],
};

export default config;
