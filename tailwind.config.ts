import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          50: '#f5f7fa',
          100: '#e9ecf0',
          200: '#cfd5de',
          300: '#a8b4c2',
          400: '#7a8ea3',
          500: '#5a7289',
          600: '#475d72',
          700: '#3b4d5e',
          800: '#33414f',
          900: '#2d3844',
          950: '#1c242d',
        },
        accent: {
          500: '#e85d04',
          600: '#dc4c02',
          700: '#c43d01',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
