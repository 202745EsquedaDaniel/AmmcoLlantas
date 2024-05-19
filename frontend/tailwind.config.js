/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayInput: "#f6f6f9",
        bluebg:"#e3e4ff",
        blueactive:"#2124ff"
      }
    },
  },
  plugins: [],
};
