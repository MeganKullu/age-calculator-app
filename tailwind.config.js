/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    colors : {
      'purple': '#854DFF',
      'light-red' :'#FF5757',
      'off-white':'#F0F0F0',
      'light-gray':'#DBDBDB',
      'smokey-grey':'#716F6F',
      'off-black':'#141414',
      'white':'#FFFFFF',
    },
   extend:{
    spacing : {
      'base':'32px',
      '5xl':'6rem',
      '6xl':'10rem',
    },
    borderRadius : {
      '4xl':'6rem'
    },
    letterSpacing : {
      'wider':'0.35em'
    }
      
    },
  },
  plugins: [],
}

