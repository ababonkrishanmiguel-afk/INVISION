/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        blood: '#b30d12',
        ember: '#ea1d24',
        smoke: '#d9d9d9'
      },
      fontFamily: {
        display: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        body: ['Segoe UI', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        redglow: '0 0 24px rgba(179, 13, 18, 0.55)'
      }
    }
  },
  plugins: []
}
