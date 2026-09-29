/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Switch to Light Mode Colors
        background: '#f1f5f9', // Light gray background
        card: '#ffffff', // White cards
        primary: '#0284c7', // Darker cyan/blue for better contrast
        secondary: '#059669', // Darker green
        accent: '#0ea5e9',
        destructive: '#dc2626',
        border: '#cbd5e1', // Light border
        
        // Re-map absolute colors used in the UI to their light-mode equivalents
        // This prevents us from having to rewrite every component file
        white: '#0f172a', // text-white becomes dark slate
        black: '#e2e8f0', // bg-black becomes light gray
        gray: {
          400: '#64748b', // text-gray-400 remains visible gray
          500: '#94a3b8',
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
