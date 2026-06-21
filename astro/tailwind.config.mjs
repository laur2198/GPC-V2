import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'gpc-white': '#FFFFFF',
        'gpc-card': '#F4F4F5',
        'gpc-surface': '#E4E4E7',
        'gpc-border': '#E0E0E0',
        'gpc-ink': '#050505',
        'gpc-text-secondary': '#52525B',
        'gpc-text-muted': '#71717A',
        'gpc-green': '#43A047',
        'gpc-green-dark': '#2E7D32',
        'gpc-green-light': '#66BB6A',
        'gpc-red': '#FF0033',
        'gpc-red-dark': '#CC0029',
        'gpc-red-soft': '#FF3355',
        'gpc-footer': '#050505',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
