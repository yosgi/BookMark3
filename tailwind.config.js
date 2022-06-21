module.exports = {
  content: [ "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    maxHeight: {
      'default': '700px',
    },
    extend: {
    }
  },
  safelist: [
    {
      pattern: /./
    },
  ],
  plugins: [require("daisyui")],
}
