module.exports = {
  content: [ "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      'default': 'calc(100vh - 112px)',
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
