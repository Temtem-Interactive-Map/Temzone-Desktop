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
        red: {
          50: "#fdebeb",
          100: "#fbd7d7",
          200: "#f7aeb0",
          300: "#f38688",
          400: "#f06467",
          500: "#ed4245",
          600: "#f13538",
          700: "#f4282b",
          800: "#f81a1f",
          900: "#fb0d12",
          950: "#fd070b",
        },
        indigo: {
          50: "#eef0fe",
          100: "#dee0fc",
          200: "#bcc1fa",
          300: "#9ba3f7",
          400: "#7984f5",
          500: "#5865f2",
          600: "#454fbf",
          700: "#3441cf",
          800: "#2333df",
          900: "#1124ef",
          950: "#091df7",
        },
      },
      spacing: {
        192: "48rem",
      },
      backgroundImage: {
        login: "url('/images/background.jpg')",
      },
    },
  },
};
