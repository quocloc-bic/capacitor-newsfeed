module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      padding: {
        'safe-top': 'var(--ion-safe-area-top)',
        'safe-bottom': 'var(--ion-safe-area-bottom)',
      },
    },
  },
  plugins: [],
}; 