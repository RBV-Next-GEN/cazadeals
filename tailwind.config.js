/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de colores actualizada
        'background-light': '#F9FAFB',
        'primary-light': '#FFFFFF',
        'secondary-light': '#F3F4F6',
        'text-light': '#1F2937',
        'text-secondary-light': '#6B7280',
        'accent-orange-light': '#F97316',
        'accent-green-light': '#16A34A',
        'accent-pink': '#E53A89',
        'accent-pink-hover': '#D81B60',
        'accent-cream': '#FFFBEB',

        // Paleta oscura
        'primary-dark': '#111827',
        'secondary-dark': '#1E293B',
        'header-dark': '#0F172A',
        'tertiary-dark': '#334155',
        'text-dark': '#CBD5E1',
        'text-secondary-dark': '#94A3B8',
        'accent-orange-dark': '#F97316',
        'accent-green-dark': '#16A34A',
        'accent-pink-dark': '#E53A89',
      },
      animation: {
        'marquee-slow': 'marquee-slow 40s linear infinite',
        'float-1': 'float-1 15s ease-in-out infinite',
        'float-2': 'float-2 18s ease-in-out infinite',
        'float-3': 'float-3 22s ease-in-out infinite',
        'float-4': 'float-4 16s ease-in-out infinite',
        'float-5': 'float-5 20s ease-in-out infinite',
        'float-6': 'float-6 25s ease-in-out infinite',
      },
      keyframes: {
        'marquee-slow': {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
        },
        'float-1': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(-5deg)' },
            '50%': { transform: 'translate(-20px, 20px) rotate(5deg)' },
        },
        'float-2': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(5deg)' },
            '50%': { transform: 'translate(20px, -20px) rotate(-5deg)' },
        },
        'float-3': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(-10deg)' },
            '50%': { transform: 'translate(-30px, 30px) rotate(10deg)' },
        },
        'float-4': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(10deg)' },
            '50%': { transform: 'translate(30px, -30px) rotate(-10deg)' },
        },
        'float-5': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(-15deg)' },
            '50%': { transform: 'translate(-40px, 40px) rotate(15deg)' },
        },
        'float-6': {
            '0%, 100%': { transform: 'translate(0px, 0px) rotate(15deg)' },
            '50%': { transform: 'translate(40px, -40px) rotate(-15deg)' },
        },
      },
    },
  },
  plugins: [],
}