/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["Noto Sans Telugu"],

        myfont2: ["Roboto"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
