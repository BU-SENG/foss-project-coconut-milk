/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
        colors: {
          primary: {
            DEFAULT: '#0ea5a4',
          },
          secondary: {
            DEFAULT: '#f97316',
          },
      }
    }
  },
  plugins: []
}
