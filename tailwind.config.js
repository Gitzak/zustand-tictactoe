/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
        },
        ember: '#b4231c',
        sand: '#fde68a',
        cocoa: '#7c2d12',
      },
    },
  },
  plugins: [],
}
