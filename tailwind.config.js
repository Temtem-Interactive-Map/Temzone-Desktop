/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./renderer/pages/**/*.{js,jsx}",
    "./renderer/components/**/*.{js,jsx}",
  ],
  theme: {
    extends: {
      colors: {
        brand: "#5965F2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
