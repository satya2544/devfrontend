/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: { animation: {
      'sliding-text': 'slide-in 1s ease-in-out infinite alternate', // Change values as needed
    },
    keyframes: {
      'slide-in': {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0%)' },
      },
    },},
  },
  plugins: [require("daisyui")],
 
}

