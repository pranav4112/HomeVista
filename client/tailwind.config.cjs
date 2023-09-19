/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
        // bcgr : '#0F1C28',
        // tx : '#D9D7D5',
      },
    },
  },
  plugins: [],
}
