/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["Noto Sans Telugu"],

        myfont2: ["Roboto"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
