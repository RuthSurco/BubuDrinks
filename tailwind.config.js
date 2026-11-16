/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bubu: {
          50: '#F3F8F3',
          100: '#E3F0E5',
          200: '#C9E1CE',
          300: '#A7CBAF',
          400: '#7FAE89',
          500: '#4D7C59',
          600: '#3F6949',
          700: '#33553D',
          800: '#2D4433',
          900: '#25372A',
        },
        cream: {
          50: '#FFFCF8',
          100: '#FBF6EE',
          200: '#F6EBDD',
          300: '#EBD8C2',
        },
        coffee: '#5C4638',
        caramel: '#C98755',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 40px rgba(92, 70, 56, 0.08)',
        card: '0 10px 24px rgba(77, 124, 89, 0.11)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
