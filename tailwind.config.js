// Tailwind configuration (plain JavaScript)

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
    './node_modules/@tw/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        destructive: 'var(--destructive)',
        muted: 'var(--muted)',
        card: 'var(--card)',
        popover: 'var(--popover)',
      },
      animation: {
        bounce: 'bounce 2s infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
