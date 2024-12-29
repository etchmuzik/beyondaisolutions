/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        border: 'hsl(var(--border))',
        primary: {
          DEFAULT: '#47bda4',
          50: '#edfaf8',
          100: '#d5f3ee',
          200: '#b0e8e0',
          300: '#7ed8cb',
          400: '#47bda4',
          500: '#2ba08a',
          600: '#208170',
          700: '#1d685c',
          800: '#1b544c',
          900: '#1a4641',
        },
        'primary-foreground': 'hsl(var(--primary-foreground))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};