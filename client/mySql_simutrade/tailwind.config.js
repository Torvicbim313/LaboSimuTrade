/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '3/4vw': '80vw'
      },
      height: {
        '3/4vh': '80vh'
      }
    },  },
  plugins: [],
}