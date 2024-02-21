/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./core/**/*.{ts,tsx}",
    "./feature/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "6xl": "56px",
        "4xl": "40px",
        "3xl": "32px",
      },
      lineHeight: {
        120: "120%",
        140: "140%",
        150: "150%",
      },
      minWidth: {
        25: "6.25rem",
      },
      maxWidth: {
        "2xl": "676px",
      },
      spacing: {
        19: "4.75rem",
        2.5: "0.625rem",
      },
      colors: {
        light: "#3572AF",
        dark: "#1B1E2A",
        brand: {
          neutral: "#18181B",
          red: "#DD524C",
          yellow: "#E9A23B",
          hacker: "#E2FF92",
          emerald: "#55B685",
          companie: "#4BA2E3",
          blue: "#4E80EE",
          mediator: "#845EEE",
          default: "#FFFFFF",
        },
        background: {
          page: "#1F1F1F",
          main: "#000000",
          "main-light": "#FAFAFA",
          "main-dark": "#0D0D0D",
          progress: "#D9D9D9",
        },
        neutral: {
          0: "#FFFFFF",
          10: "#F8F8F8",
          20: "#E6E6E6",
          30: "#CCCCCC",
          40: "#B3B3B3",
          50: "#999999",
          60: "#808080",
          70: "#666666",
          80: "#4D4D4D",
          90: "#232323",
          100: "#1A1A1A",
        },
        red: {
          dark: "#85312E",
          darker: "#B1423D",
          normal: "#DD524C",
          lighter: "#E47570",
          light: "#EB9794",
          error: "#E60202",
        },
        yellow: {
          dark: "#8C6123",
          darker: "#BA822F",
          normal: "#E9A23B",
          lighter: "#EDB562",
          light: "#F2C789",
        },
        lime: {
          dark: "#C0D093",
          darker: "#CFE593",
          normal: "#BAFF00",
          lighter: "#C8FF33",
          light: "#D6FF66",
          "dark-green": "#4D6900",
        },
        emeral: {
          dark: "#336D50",
          darker: "#44926A",
          normal: "#55B685",
          lighter: "#77C59D",
          light: "#99D3B6",
        },
        sky: {
          dark: "#2D6188",
          darker: "#3C82B6",
          normal: "#4BA2E3",
          lighter: "#6FB5E9",
          light: "#93C7EE",
        },
        blue: {
          dark: "#2F4D8F",
          darker: "#3E66BE",
          normal: "#4E80EE",
          lighter: "#7199F1",
          light: "#95B3F5",
        },
        violet: {
          dark: "#4F388F",
          darker: "#6A4BBE",
          normal: "#845EEE",
          lighter: "#9D7EF1",
          light: "#B59EF5",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        type: "-10px 10px 15px 0px rgba(75, 162, 227, 0.20), 5px -4px 15px 0px rgba(200, 255, 51, 0.15)",
        hacker: "0px 0px 15px 0px rgba(122, 168, 0, 0.20)",
        company: "0px 0px 15px 0px rgba(75, 162, 227, 0.20)",
      },
      backgroundImage: {
        progress:
          "linear-gradient(270deg, #BAFF00 3.72%, #73E4B5 49.62%, #93C7EE 98.36%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
