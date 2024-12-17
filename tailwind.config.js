/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'montserrat-bold': ['MontserratBold', 'sans-serif'],
        'montserrat-extra-bold': ['MontserratExtraBold', 'sans-serif'],
        'montserrat-semi-bold': ['MontserratSemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
