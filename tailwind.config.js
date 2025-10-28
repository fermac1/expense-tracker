/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
       fontFamily: {
        plusJakartaSans: ['Plus Jakarta Sans', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif']
      },
    },
  },
  plugins: [],
}

