import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066CC",
          500: "#0066CC",
        },
        secondary: {
          DEFAULT: "#00AA44",
          500: "#00AA44",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;