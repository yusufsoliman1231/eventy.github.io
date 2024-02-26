/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/navigator/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      primary: '#EF835D',
      secondary: '#1E2243',
      tertiary: '#72C4BF',
      gray: '#D1D5DB',
      graylight: '#F3F4F6',
      graydark: '#787A8D',
      accent: '#FBCD77',
    },
    fontFamily: {
      PoppinsBold: ['Poppins-Bold', 'sans-serif'],
      PoppinsRegular: ['Poppins-Regular', 'sans-serif'],
      PoppinsSemibold: ['Poppins-Semibold', 'sans-serif'],
      Lato: ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
};
