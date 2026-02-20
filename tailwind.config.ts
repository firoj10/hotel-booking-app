import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/forms/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       primary: "hsl(var(--primary))",
  background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};

export default config;