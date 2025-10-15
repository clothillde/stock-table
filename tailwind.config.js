/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      animation: {
        'blink-green': 'blink-green 0.5s ease-in-out',
        'blink-red': 'blink-red 0.5s ease-in-out',
        'blink-blue': 'blink-blue 1.5s ease-in-out 3',
      },
      keyframes: {
        'blink-green': { '0%, 100%': { backgroundColor: 'transparent' }, '50%': { backgroundColor: 'rgba(0, 255, 0, 0.3)' } },
        'blink-red': { '0%, 100%': { backgroundColor: 'transparent' }, '50%': { backgroundColor: 'rgba(255, 0, 0, 0.3)' } },
        'blink-blue': { '0%, 100%': { backgroundColor: 'transparent' }, '50%': { backgroundColor: 'rgba(0, 0, 255, 0.3)' } },
      },
    },
  },
  plugins: [],
};
