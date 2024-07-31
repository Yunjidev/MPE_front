/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
        '101': '1.01',
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
