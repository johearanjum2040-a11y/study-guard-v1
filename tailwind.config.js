/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#84cc16", // Bright lime green from UI
          darkBg: "#0B0E17",
          cardBg: "#131826",
          accentBorder: "#1E2638",
          coral: "#f87171"
        }
      }
    },
  },
  plugins: [],
}
