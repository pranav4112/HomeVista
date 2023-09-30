/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C27803',
        dark_bg: '#030C10',
        bcgr: '#0F1C28',
        txt: '#D9D7D5',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
