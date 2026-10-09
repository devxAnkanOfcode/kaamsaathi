/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        surface: {
          50: '#FAF9F6',
          100: '#F5F4F0',
          200: '#EBE9E1',
          300: '#DBD8CD',
          400: '#A8A497',
          900: '#181A1B',
        },
        charcoal: {
          900: '#111418',
          800: '#1C2024',
          700: '#2A3036',
          600: '#404952',
          500: '#64748B',
        },
        kaamGreen: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        gold: {
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(17, 20, 24, 0.05), 0 1px 4px -1px rgba(17, 20, 24, 0.03)',
        'soft': '0 10px 30px -5px rgba(17, 20, 24, 0.06), 0 4px 12px -2px rgba(17, 20, 24, 0.04)',
        'soft-lg': '0 20px 40px -8px rgba(17, 20, 24, 0.08), 0 8px 16px -4px rgba(17, 20, 24, 0.04)',
        'premium': '0 25px 60px -15px rgba(249, 115, 22, 0.12), 0 10px 25px -5px rgba(17, 20, 24, 0.06)',
      }
    },
  },
  plugins: [],
}
