/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        sridhar:
        {
          50: '#fff1df',
          100: '#fed8b3',
          200: '#fabf85',
          300: '#f7a555',
          400: '#f58c27',
          500: '#db730f',
          600: '#aa590a',
          700: '#7a3f05',
          800: '#4a2600',
          900: '#1c0b00',
        },
        navCol:       
        {
          50: '#edf1fc',
          100: '#d3d4e1',
          200: '#2b3149',
          300: '#989bb2',
          400: '#7c7f9b',
          500: '#636582',
          600: '#4c4f66',
          700: '#363849',
          800: '#21222e',
          900: '#0a0a16',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

