const colors = require("tailwindcss/colors");

module.exports = {
  presets: [require("@vercel/examples-ui/tailwind")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vercel/examples-ui/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#010206", // Replace with your primary color
        secondary: "#1393D0", // Replace with your secondary color
        primarytext: "#ffffff",
        primaryAlt: "#090A0C",
        secondaryAlt: "#166B97",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        slideFadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear infinite",
        "slide-in-fade-in": "slideFadeIn 2s forwards",
      },
    },
  },
};
