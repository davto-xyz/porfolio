// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/postcss';
import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon()],
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss,
        ],
      },
    },
  },
});