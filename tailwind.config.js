module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xl: '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      colors: {
        gray: {
          50: '#f5f5f5', // gray-50 #f5f5f5, 100%
          100: '#e2e4e5', // gray-100 #e2e4e5, 100%
          200: '#a7a8ab', // gray-200 #a7a8ab, 100%
          300: '#5a5b63', // gray-300 #5a5b63, 100%
          400: '#43444b', // gray-400 #43444b, 100%
          500: '#27282e', // gray-500 #27282e, 100%
          600: '#232429', // gray-600 #232429, 100%
          700: '#1b1c21', // gray-700 #1b1c21, 100%
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
        },
        green: {
          DEFAULT: '#34C759'
        },
        red: {
          DEFAULT: '#FF3B30'
        }
      },
      lineClamp: {
        10: '10'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    }
  },
  // temporary workaround with container size
  corePlugins: {
    container: false
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    // temporary workaround with container size
    function ({ addComponents, config }) {
      addComponents({
        '.container': {
          width: config('theme.width.full'),
          '@screen sm': {
            maxWidth: '640px'
          },
          '@screen md': {
            maxWidth: '768px'
          },
          '@screen lg': {
            maxWidth: '1024px'
          },
          '@screen xl': {
            maxWidth: '1280px'
          },
          '@screen 2xl': {
            maxWidth: '1400px'
          }
        }
      })
    }
  ]
}
