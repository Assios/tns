/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        new4: "repeat(6, 100px)",
      },
      gridTemplateRows: {
        new4: "repeat(6, 100px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
