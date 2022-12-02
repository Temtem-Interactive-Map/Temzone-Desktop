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
        brand: "#5965f2",
      },
    },
  },
};
