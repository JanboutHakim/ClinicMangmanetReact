/* eslint-env node */
/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you prefer automatic dark mode

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
        sans: ['Tajawal', 'sans-serif'], // set default sans to Cairo
      },},
  },
  plugins: [
  ],
}