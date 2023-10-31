/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
   colors: {
     accent:"#FF002E1A",
     red: "#FF002E",
     gold:"#F39C12",
     grey:"#34495E",
     grey2:"#F0F0F0",
     white:"#ffffff",
     black:"#241F31",
     bg2: "#F8F8F8"
    
   },

   extend: {
    fontFamily: {
      'lato': ['Lato', 'sans-serif'],
      'montserrat' : ['Montserrat', 'sans-serif'],
      'inter' : ['inter', 'sans-serif']
    },
   },
 },
 plugins: [],
}
