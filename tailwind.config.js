import daisyui from "daisyui";
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#00292C",
        tarawera: "#073c45",
        genoa: "#167375",
        flamingo: "#EF4936",
        river: "#43525B",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light"],
  },
});