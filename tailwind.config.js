module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      colors: {
        gray: {
          50: '#f5f5f5',
          100: '#e2e4e5',
          200: '#a7a8ab',
          300: '#5a5b63',
          400: '#43444b',
          500: '#27282e',
          600: '#232429',
          700: '#1b1c21',
          800: '',
          900: ''
        },
        gold: {
          200: '#f6f3ee',
          300: '#d9ccbb',
          400: '#b6a68f',
          500: '#938063',
          600: '#786a57'
        },
        dark: {
          500: '#5c544a',
          600: '#403e3e',
          700: '#323338',
          800: '#242731'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
