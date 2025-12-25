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
        'neon-green': '#CCFF00',
        'neon-cyan': '#00FFFF',
        'crimson': '#c41e3a',
        'crimson-bright': '#e63946',
        'blood-red': '#8b0000',
        'dark-bg': '#0f1419',
        'dark-card': '#1a2832',
        'dark-teal': '#1a2832',
        'darker-teal': '#0f1419',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'crimson-glow': 'crimsonGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #CCFF00, 0 0 10px #CCFF00' },
          '100%': { boxShadow: '0 0 10px #CCFF00, 0 0 20px #CCFF00, 0 0 30px #CCFF00' },
        },
        crimsonGlow: {
          '0%': { boxShadow: '0 0 5px #c41e3a, 0 0 10px #c41e3a' },
          '100%': { boxShadow: '0 0 10px #c41e3a, 0 0 20px #c41e3a, 0 0 30px #c41e3a' },
        },
      },
    },
  },
  plugins: [],
}
export default config
