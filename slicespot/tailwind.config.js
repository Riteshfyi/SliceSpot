/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE5F1E', 
        primary_hover: '#b23301' ,
        secondary : '#F8F8F8' ,
        pure: '#FFF' ,
        dark: '#232323' ,
        gray: '#ccc' ,

      }
    },
  },
  plugins: [],
}
