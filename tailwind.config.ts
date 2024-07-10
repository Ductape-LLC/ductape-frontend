import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#0846A6",
        },
        grey: {
          DEFAULT: "#232830",
          500: "#5F5F5F",
          300: "#D9D9D9",
        },
        error: {
          DEFAULT: "#FF0000",
        },
      },
      fontSize: {
        "3.5xl": "2rem", // 32px
      },
      spacing: {
        18: "4.5rem", // 72px
      },
    },
  },
  plugins: [],
};
export default config;
