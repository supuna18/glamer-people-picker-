
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark & Gold Theme Palette
        gold: {
          400: '#FACC15', // Bright Gold
          500: '#EAB308', // Standard Gold
          600: '#CA8A04', // Dark Gold
          glow: 'rgba(234, 179, 8, 0.5)' // Gold Glow
        },
        dark: {
          900: '#0f172a', // Deep Background
          800: '#1e293b', // Card Background
          700: '#334155', // Border
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

