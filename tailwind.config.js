/** @type {import('tailwindcss').Config} */

// customize here own styles
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      cardHeader: "20px",
      cardSubHeader: "17px",
      cardDescription: "14px",
      header:'24px'
    },
    colors: {
      brand: "#ECEBEB",
      sideMenuColor: "#fff",
      bgColor: `var(--bg-color)`,
      textColor: `var(--text-color)`,
      btnLink:`#6c6cda`
    },
    fontWeight: {
      cardHeader: "600",
      cardSubHeader: "600",
      cardDescription: "400",
      header:'700'
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    gridTemplateColumns: {
      mainTemplate: "150px 1fr",
    },
    gridTemplateRows: {
      mainTemplate: "1fr 1fr",
    },
    boxShadow: {
      cardShadow: "0px 0px 10px 0px rgba(0,0,0,0.45) inset",
      shadowBottom:
        " 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",

      customerCardShadow: "0px 0.1px 3.25px rgba(0, 0, 0, 0.25)",
      modalShadow:
        "rgba(0, 0, 0, 0.25) -1.5px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    },
    extend: {
      width: {
        sm: "768px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari, and Opera */
        ".hide-scrollbar": {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
