/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {};

      // Classes for margin, padding, and gap (you've added this, so keep it)
      const spacings = [
        "m",
        "mt",
        "mr",
        "mb",
        "ml",
        "mx",
        "my",
        "p",
        "pt",
        "pr",
        "pb",
        "pl",
        "px",
        "py",
        "gap",
        "gap-x",
        "gap-y",
      ];

      spacings.forEach((spacing) => {
        for (let i = 0; i <= 64; i += 1) {
          newUtilities[`.${spacing}-${i}`] = {
            [`${spacing}`]: `${i * 0.25}rem !important`,
          };
        }
      });

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],

  // Remove Bootstrap conflicting classes if necessary
  blocklist: ["container", "collapse"],

  // Optionally, ensure that you don’t accidentally override the class names
  prefix: "",
};
