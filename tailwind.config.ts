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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1677ff',
          600: '#0958d9',
          700: '#003eb3',
          800: '#002c8c',
          900: '#001d66',
        },
        success: {
          50: '#f6ffed',
          500: '#52c41a',
          600: '#389e0d',
        },
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
      boxShadow: {
        antd: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
