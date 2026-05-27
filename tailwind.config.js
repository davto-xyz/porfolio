/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontStretch: {
        'ultra-condensed': 'ultra-condensed',
        'extra-condensed': 'extra-condensed',
        'condensed': 'condensed',
        'semi-condensed': 'semi-condensed',
        'normal': 'normal',
        'semi-expanded': 'semi-expanded',
        'expanded': 'expanded',
        'extra-expanded': 'extra-expanded',
        'ultra-expanded': 'ultra-expanded',
      },
      colors: {
        'custom-gold': '#F6A60D',
        'gold': {
          500: '#F6A60D'
        }
      }
    },
  },
  plugins: [],
}