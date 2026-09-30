/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Switch to Dark Mode Colors
        background: '#0f172a', // Dark slate background
        card: '#1e293b', // Darker slate cards
        primary: '#38bdf8', // Cyan/blue
        secondary: '#34d399', // Green
        accent: '#818cf8', // Indigo
        destructive: '#ef4444', // Red
        border: '#334155', // Dark border
        
        // Re-map absolute colors to actual colors
        white: '#ffffff', 
        black: '#000000', 
        gray: {
          400: '#9ca3af', 
          500: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
