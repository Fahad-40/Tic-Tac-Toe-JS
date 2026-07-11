/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {},
     boxShadow: {
      'glow-x': '0 0 12px rgba(34, 211, 238, 0.55)',   // cyan glow
      'glow-o': '0 0 12px rgba(251, 113, 133, 0.55)',  // coral glow
    },
    colors: {
        'game-bg': '#0F172A',
        'cell-bg': '#1E293B',
        'cell-border': '#334155',
        'player-x': '#22D3EE',
        'player-o': '#FB7185',
        'win-gold': '#FACC15',
      }
  },
  plugins: [],
}

