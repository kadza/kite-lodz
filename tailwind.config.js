/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        textColor: "#39563e",
        hoverColor: "#c7a370",
      },
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
      },
    },
  },
  plugins: [],
}