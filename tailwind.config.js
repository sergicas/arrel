/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base Backgrounds
        void: 'var(--bg-void)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',

        // Typography
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',

        // Accents
        accent: 'var(--accent-primary)',
        'accent-dim': 'var(--accent-primary-dim)',
        alert: 'var(--accent-alert)',

        // Borders
        border: 'var(--border-subtle)',
        'border-active': 'var(--border-active)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'], // Explicit display font if needed
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.025em',
        normal: '0',
        wide: '0.025em',
        widest: '0.1em',
      },
    },
  },
  plugins: [],
};
