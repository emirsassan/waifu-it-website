/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      // primary one
      text: "#050315",
      background: "#fbfbfe",
      primary: "#2f27ce",
      secondary: "#dedcff",
      accent: "#433bff",

      "dark-text": "#dedcef",
      "dark-background": "#040309",
      "dark-primary": "#9d98e2",
      "dark-secondary": "#241d86",
      "dark-accent": "#463ae1",
    },
  },
  darkMode: 'selector',
  plugins: [require("tailwind-scrollbar")],
};
