import daisyui from "daisyui";
import 'flowbite';
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#00292C",
        accentGold: "#FFD700",
        genoa: "#006a4e",
        flamingo: "#F42A41",
        river: "#43525B",
      },
    },
  },
  plugins: [daisyui , 'flowbite/plugin'],
  daisyui: {
    themes: [
      "light"],
  },
});