import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      clashDisplay: ["var(--font-clashDisplay)"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom1': '0 4px 6px rgba(0, 0, 0, 0.1)', // Example shadow
        'custom2': '0 10px 15px rgba(0, 0, 0, 0.2)' // Example shadow
      },
      scale: {
        105: '1.05',
        110: '1.1'
      }
    }
  },
  variants: {
    extend: {
      scale: ['hover'], // Enable hover variants for scaling
      boxShadow: ['hover'] // Enable hover variants for box shadows

    },
  },
  plugins: [nextui()],
};
export default config;
