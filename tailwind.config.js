/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  
    ringWidth: {
    DEFAULT: '2px',
     },
  accentColor: {
    purple: '#a855f7',
  },},
  },
  
  plugins: [],
}

