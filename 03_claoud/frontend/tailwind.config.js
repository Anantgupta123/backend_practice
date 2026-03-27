module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
        danger: '#EF4444',
        success: '#10B981',
      },
      borderRadius: {
        lg: '0.5rem',
      },
    },
  },
  plugins: [],
}
