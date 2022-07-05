module.exports = {
  content: [ "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      'default': 'calc(100vh - 112px)'
    },
    
    extend: {
      backgroundImage:{
        'banner': "url('../public/background.png')",
      },
    }
  },
  safelist: [
    {
      pattern: /./
    },
  ],
  plugins: [require("daisyui")],
}
