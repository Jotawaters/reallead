import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#003BD3",
          dark: "#002A9E",
          light: "#3366E6",
        },
        accent: {
          DEFAULT: "#FF6700",
          dark: "#CC5200",
          light: "#FF8533",
        },
      },
    },
  },
  plugins: [],
};
export default config;
