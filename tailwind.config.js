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
        tarawera: "#006a4e",
        genoa: "#006a4e",
        flamingo: "#F42A41",
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