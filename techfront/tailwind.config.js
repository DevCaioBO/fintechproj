/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "mobile-tech":"url('src/assets/img/mobile-tech.png')",
        "desktop-tech":"url('src/assets/img/desktop-tech.jpg')",
      
        
      },
      
      colors:{
        "ocean-green":"#009990",
        "ocean-gray":"#D9D9D9",
        "subscribe-blue":"#074799",
        "tech-purple":"#262642",
        "tech-gray-header":"#424258",
        "tech-assign-account":"#3e5c76",
        "submit-account":'#1b263b',
        "total-amount":"#525363",
        "span-decor-one":"#212137"
      },
      fontFamily:{
        "poppins":"Poppins,sans-serif"
      }
    },
  },
  plugins: [],
}

