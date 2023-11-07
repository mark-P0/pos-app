/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
    fontFamily: {
      head: ["Barlow Condensed"],
      body: ["Montserrat"],
      mono: ["Sometype Mono"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
