/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        'primary-light': '#FFFFFF',
        'secondary-light': '#F0F2F5',
        'text-primary-light': '#1A202C',
        'text-secondary-light': '#718096',

        'primary-dark': '#1A202C',
        'secondary-dark': '#2D3748',
        'text-primary-dark': '#F7FAFC',
        'text-secondary-dark': '#A0AEC0',

        'accent-orange-light': '#FFC83D',
        'accent-orange': '#FF8C00',
        
        'border-color': '#E2E8F0',
        'background-light': '#F7FAFC',
        'brand-pink': '#E53E85',
        'brand-green': '#38A169',
      },
      animation: {
        'marquee-slow': 'marquee 60s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      zIndex: {
        '1': '1',
        '2': '2',
      },
    },
  },
  plugins: [],
}
