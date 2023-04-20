/** @type {import('tailwindcss').Config} */
export default {
  mode:'jit',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

