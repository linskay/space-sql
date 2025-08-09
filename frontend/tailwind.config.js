/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Космическая палитра
        space: {
          'dark': '#0d0221',
          'purple': '#2d0b59',
          'deep': '#0f0c29',
          'medium': '#302b63',
          'light': '#24243e',
        },
        cosmic: {
          'blue': '#2de2e6',
          'purple': '#8a2be2',
          'pink': '#ff2e88',
          'green': '#00ff9d',
          'cyan': '#00aaff',
          'magenta': '#ff00ff',
        },
        starlight: '#ffffff',
        'text-muted': '#b8b8b8',
      },
      fontFamily: {
        'cosmic': ['"Press Start 2P"', 'cursive'],
        'mono': ['"Roboto Mono"', 'monospace'],
        'space': ['"Orbitron"', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'cosmic-purple': 'linear-gradient(90deg, #8a2be2, #00ff9d)',
        'cosmic-blue': 'linear-gradient(45deg, #2de2e6, #8a2be2)',
        'space-dark': 'linear-gradient(135deg, #0a081a 0%, #201d47 50%, #18182f 100%)',
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(138, 43, 226, 0.5)',
        'cosmic-lg': '0 0 30px rgba(138, 43, 226, 0.7)',
        'glow': '0 0 15px rgba(45, 226, 230, 0.5)',
        'glow-lg': '0 0 25px rgba(45, 226, 230, 0.7)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s infinite alternate',
        'glow-pulse': 'glow-pulse 2s infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translatey(0px)' },
          '50%': { transform: 'translatey(-10px)' },
          '100%': { transform: 'translatey(0px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(138, 43, 226, 0.8)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'cosmic': '5px',
      },
    },
  },
  plugins: [],
}
