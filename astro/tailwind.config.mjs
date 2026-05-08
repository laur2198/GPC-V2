/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'phoenix-black': '#0A0A0A',
        'phoenix-green': '#00FF94',
        'phoenix-cyan': '#00E5FF',
        'phoenix-gray': '#1A1A1A',
        'phoenix-light': '#E5E5E5',
      },
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
