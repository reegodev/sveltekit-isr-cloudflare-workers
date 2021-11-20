const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [ 
    "./src/**/*.svelte",
    "./src/**/*.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
      primary: '#ff3e00',
    },
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro'],
      },
      minWidth: {
        150: '700px',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}