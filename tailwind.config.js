/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg":
          "linear-gradient(to bottom right, #000000, #1a1a1a, #2c2c2c)",
      },
    },
  },
  plugins: [],
};
