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
        // Base
        'primary-light': '#FFFFFF',
        'secondary-light': '#F5F7FA',
        'background-light': '#F8FAFC',
        'text-primary-light': '#0F172A',
        'text-secondary-light': '#475569',

        'primary-dark': '#0B1220',
        'secondary-dark': '#0F1724',
        'text-primary-dark': '#F8FAFC',
        'text-secondary-dark': '#94A3B8',

        // Premium palette
        'petrol-blue': '#0F4C75',
        'deep-navy': '#071B2F',
        'golden': '#C79A2B',
        'soft-gold': '#E6C77F',
        'muted-slate': '#6B7280',

        // Accents (kept for compatibility)
        'accent-orange-light': '#FFC83D',
        'accent-orange': '#FF8C00',

        // Utilities
        'border-color': '#E6EEF8',
        'brand-pink': '#E53E85',
        'brand-green': '#38A169',
      },
      boxShadow: {
        'soft-md': '0 6px 18px rgba(12, 22, 31, 0.08)',
        'soft-lg': '0 12px 30px rgba(12, 22, 31, 0.10)',
        'inset-soft': 'inset 0 -6px 18px rgba(12,22,31,0.04)'
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'micro-move': 'micro-move 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'micro-move': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
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
