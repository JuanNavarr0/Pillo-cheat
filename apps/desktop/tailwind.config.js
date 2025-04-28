// apps/desktop/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/renderer/index.html",
      "./src/renderer/**/*.{js,ts,jsx,tsx}", // Scan React components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }