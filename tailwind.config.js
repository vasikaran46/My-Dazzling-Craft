/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b04a9f',
          dark: '#7f246f',
          light: '#f5c7df',
          xlight: '#fff2f8',
        },
        accent: '#f8d7e8',
        brand: {
          text: '#333333',
          muted: '#777777',
          dark: '#170014',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
