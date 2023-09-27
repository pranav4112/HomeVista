/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary:'rgb(227 160 8 / 1)',
        // primary: '#F5385D',
        // bcgr : '#000',
        bcgr : '#0F1C28',
        txt : '#D9D7D5',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
