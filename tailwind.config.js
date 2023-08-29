/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-home": "url('3d-room.png')",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
