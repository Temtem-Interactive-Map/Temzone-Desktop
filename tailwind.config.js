/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./renderer/pages/**/*.{js,jsx}",
    "./renderer/components/**/*.{js,jsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide")],
  theme: {
    extend: {
      colors: {
        brand: "#5865f2",
        gray: {
          50: "#ededee",
          100: "#dcddde",
          200: "#b9bbbe",
          300: "#8e9297",
          400: "#72767d",
          500: "#5c6067",
          550: "#4f545c",
          600: "#464950",
          700: "#36393f",
          800: "#2f3136",
          900: "#202225",
          950: "#040405",
        },
      },
      backgroundImage: {
        login: "url('/images/background.jpg')",
      },
    },
  },
};
