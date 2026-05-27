# AGENTS.md

## Project

Personal portfolio site for David Torres — a static Astro 5 site deployed on Netlify. Spanish-language content. Single-page layout.

## Commands

- `pnpm install` — install deps (uses pnpm, not npm/yarn)
- `pnpm dev` — dev server on `localhost:4321`
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview production build locally

No test runner, linter, or typecheck command is configured.

## Stack

- **Astro 5** with MDX integration — all pages are `.astro` files, content entries are `.mdx`
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin (not the legacy `@tailwindcss/vite` or v3 config approach)
- **astro-icon** for icon packs
- **sharp** for image optimization
- **Netlify** for hosting (static output, no SSR adapter)

## Architecture

- `src/pages/index.astro` — single entry page, composes all sections
- `src/layouts/Layout.astro` — base HTML shell (includes NavBar, Footer, global CSS, smooth scroll script)
- `src/layouts/Layout404.astro` — separate layout for the 404 page
- `src/components/` — Astro UI components (one per section: Hero, Experience, Skills, About, Contact, etc.)
- `src/content/` — Astro content collections (MDX files with frontmatter validated by `src/content/config.ts`):
  - `projects/` — portfolio projects
  - `skills/` — skill categories
  - `experience/` — work experience entries
- `src/data/contact.ts` — contact/social links
- `src/scripts/` — client-side JS (`smoothScroll.js`, `top.js`)
- `src/styles/global.css` — Tailwind import + custom utilities, bento grid classes, animations

## Content Collections

Defined in `src/content/config.ts` with Zod schemas. Three collections: `projects`, `skills`, `experience`. Each uses `type: 'content'` (MDX). Adding a new entry means creating an `.mdx` file in the right directory with the required frontmatter fields.

## Key Conventions

- Site language is **Spanish** (`lang="es"`), UI text and content are in Spanish
- Accent color is **gold `#F6A60D`** — used throughout with custom Tailwind utilities (`text-gold-500`, `bg-gold-500`, etc.) defined in `global.css` rather than via Tailwind config
- `tailwind.config.js` exists but Tailwind v4 is loaded via PostCSS plugin; the config primarily adds custom font family and the gold color
- Fonts loaded via `@fontsource/inter` CSS imports in `global.css` (weights 400, 700, 900)
- Bento grid layout system is custom CSS classes in `global.css`, not a library
- `ProjectsGrid` component is currently commented out in `index.astro`
- `performance-test.js` at root is a manual browser test helper, not automated
- `netlify.toml` uses `npm run build` (not pnpm) for Netlify builds

## Gotchas

- This is a **static site** (no SSR) — all pages are pre-rendered at build time
- `.astro/` directory is gitignored (generated types) — run `pnpm dev` or `pnpm build` to regenerate
- `pnpm-workspace.yaml` exists only to skip building `esbuild` and `sharp` from source
- No tests exist in this repo
