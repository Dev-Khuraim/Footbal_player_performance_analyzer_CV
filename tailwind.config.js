/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'auto': 'auto',
        '1/2': '50%',
        'full': '100%',
        'screen': '100vh',
      },
      colors: {
        customBlue: '#909cd9',
      },
    },
  },
  plugins: [],
}

