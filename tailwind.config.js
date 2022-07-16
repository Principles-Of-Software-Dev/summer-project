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
        'dropdown-menu-login': '15rem',
        'dropdown-menu-login-mobile': '50vh',
        'dropdown-menu-register': '25rem',
        'dropdown-menu-register-mobile': '60vh',
        'tenth': '10%',
        'fifth': '20%',
        'quarter': '50%',
        'third': '33%',
        'half': '50%',
        'most': '75%',
        'main': '85%',
      },
      width: {
        'xsmall-logo':'2rem',
        'small-logo': '3rem',
        'dropdown-menu': '30%',
        'dropdown-menu-mobile': '100vw',
        'tenth': '10%',
        'fifth': '20%',
        'quarter': '50%',
        'third': '33%',
        'half': '50%',
        'most': '75%',
        'main': '85%',
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
      backgroundImage: {
        'high-res-logo': "url('/src/assets/high_res_logo.png')",
        'house-banner-1': "url('/src/assets/house_banner_1.jpg')",
        'house-banner-2': "url('/src/assets/house_banner_2.jpeg')",
        
      },


    },
  },
  plugins: [],
}
