// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-yellow": "#ffc727",
        "theme-yellow-dark":"#e6b323",
        "theme-dark":"#37474f"
    },
    height:{
      "screen-75": "90vh",
      "screen-50": "50vh",
    },
    fontFamily:{
      "manin":['"Open Sans"']
    }
  },
  },
  variants:{
    extend:{
      
    },
  },
  plugins: [],
}

