/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        awadhi: {
          darkest: '#1a0306',
          dark: '#2A0409',
          maroon: '#520B13',
          crimson: '#6B0F1A',
          wine: '#841320',
          rich: '#9B1626',
          lightmaroon: '#B82234',
        },
        cream: {
          50: '#FFFEFA',
          100: '#FDFBF7',
          200: '#FBF4EA',
          300: '#F5E8D6',
          400: '#ECD3BA',
          500: '#DFC09C',
        },
        gold: {
          100: '#FEF9E7',
          200: '#FDF0C5',
          300: '#F9DF8D',
          400: '#F3C951',
          500: '#D4AF37', // Royal Lakhnavi Gold
          600: '#B89225',
          700: '#8C6C16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Marcellus', 'Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        script: ['Great Vibes', 'cursive'],
        hindi: ['Rozha One', 'serif']
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'maroon-glow': '0 0 35px rgba(107, 15, 26, 0.45)',
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
