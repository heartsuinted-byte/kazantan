/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141220",
        violet: {
          25: "#F7F5FF",
          50: "#EFECFE",
          100: "#E3DEFD",
          400: "#8B7CF6",
          500: "#6D5AF0",
          600: "#5A45E6",
          700: "#4936C4",
        },
        mist: "#F6F5FA",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(20, 18, 32, 0.18)",
        lift: "0 20px 50px -20px rgba(90, 69, 230, 0.45)",
      },
    },
  },
  plugins: [],
};
