/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {

      height: {
        'navbar': '4rem',
        'xsmall-logo':'2rem',
        'small-logo': '3rem',
        'xsmall-button': '1.75rem',
        'small-button': '2.5rem',
        'dropdown-menu-mobile': '30vh',
        'dropdown-menu-login': '30vh',
        'dropdown-menu-login-mobile': '50vh',
        'dropdown-menu-register': '50vh',
        'dropdown-menu-register-mobile': '60vh',
      },
      width: {
        'xsmall-logo':'2rem',
        'small-logo': '3rem',
        'dropdown-menu': '30%',
        'dropdown-menu-mobile': '100vw',
      },
      colors: {
        'c-blue-pigment': '#29339B',
        'c-rich-electric-blue': '#009DDC',
        'c-jet-stream': '#B3DEC1',
        'c-water': '#DBF9F0',
        'c-cultured': '#F7F9F7',
        'c-metallic-seaweed': '#077187',
        'c-satin-sheen-gold': '#C8963E',
        'c-white': '#ffffff',
      },
      fontFamily: {
        'cursive' : '"brush script mt", "snell roundhand", "cursive"',
      },

    },
  },
  plugins: [],
}
