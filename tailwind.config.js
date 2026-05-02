/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: "#effaf7",
          100: "#d8f3ec",
          500: "#1f9d7a",
          600: "#157e63",
          700: "#11664f"
        },
        ink: "#172026"
      },
      boxShadow: {
        card: "0 18px 45px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};
