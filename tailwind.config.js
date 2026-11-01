/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ammu: {
          dark: '#070a1e',
          night: '#0c1236',
          deepBlue: '#152052',
          blue: '#4a90e2',
          sky: '#70a1ff',
          babyBlue: '#b4d4ff',
          iceBlue: '#e2f0ff',
          blush: '#ffb4d6',
          pink: '#ff758f',
          rose: '#ff4d6d',
          lavender: '#d8b4fe',
          softPurple: '#c084fc',
          cream: '#fffdfa',
          gold: '#ffd166',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        romantic: ['Sacramento', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-reverse': 'floatReverse 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-fast': 'twinkle 1.5s ease-in-out infinite',
        'butterfly': 'butterflyFlutter 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(112, 161, 255, 0.5))' },
          '50%': { opacity: '1', transform: 'scale(1.05)', filter: 'drop-shadow(0 0 25px rgba(255, 180, 214, 0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        butterflyFlutter: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scaleX(1)' },
          '25%': { transform: 'translate(15px, -20px) rotate(8deg) scaleX(0.7)' },
          '50%': { transform: 'translate(30px, -5px) rotate(-5deg) scaleX(1)' },
          '75%': { transform: 'translate(10px, -25px) rotate(6deg) scaleX(0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.18)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
