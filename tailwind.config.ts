import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141C24",
        secondary: "#5C6970",
        tertiary: "#4426D9",
        hoverTertiary: "#361FAD",
      },
    },
  },
  plugins: [],
};
export default config;
