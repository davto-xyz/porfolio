# AGENTS.md

## Project

Personal portfolio site for David Torres — a static Astro 5 site deployed on Netlify. Bilingual (Spanish default, English under `/en/`). Single-page layout per locale.

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

- `src/pages/index.astro` — Spanish entry page, composes all sections; `src/pages/en/index.astro` is the English twin
- `src/layouts/Layout.astro` — base HTML shell (includes NavBar, Footer, global CSS, smooth scroll script, `hreflang` alternates)
- `src/layouts/Layout404.astro` — separate layout for the 404 pages
- `src/components/` — Astro UI components (one per section: Hero, Experience, Skills, About, Contact, etc.)
- `src/i18n/` — `ui.ts` (text dictionaries), `utils.ts` (language detection + localized paths), `content.ts` (content-collection translation helpers)
- `src/content/` — Astro content collections (MDX files with frontmatter validated by `src/content/config.ts`):
  - `projects/` — portfolio projects
  - `skills/` — skill categories
  - `experience/` — work experience entries
- `src/data/contact.ts` — contact/social links
- `src/scripts/` — client-side JS (`smoothScroll.js`, `top.js`)
- `src/styles/global.css` — Tailwind import + custom utilities, bento grid classes, animations

## Content Collections

Defined in `src/content/config.ts` with Zod schemas. Three collections: `projects`, `skills`, `experience`. Each uses `type: 'content'` (MDX). Adding a new entry means creating an `.mdx` file in the right directory with the required frontmatter fields.

## i18n

- Astro's native i18n routing, configured in `astro.config.mjs`: `locales: ['es', 'en']`, `defaultLocale: 'es'`, `prefixDefaultLocale: false`. Spanish lives at `/`, English at `/en/`.
- Components resolve their locale with `getLangFromUrl(Astro.url)` and read strings from `useTranslations(lang)` as `t.section.key`. No client-side state — everything resolves at build time.
- **Never hardcode user-facing text in a component.** Add the key to the `es` dictionary in `src/i18n/ui.ts`, then to `en`. The English dictionary is typed as `typeof es`, so a missing key shows up as a type error in the editor — note `pnpm build` only transpiles, it does not typecheck (no `astro check` in this repo), so verify translations by eye too.
- Content collections keep Spanish at the frontmatter root and English inside an optional `en` object; untranslated fields fall back to Spanish. `localizeExperience` / `localizeProject` / `localizeSkill` (in `src/i18n/content.ts`) merge them and return flat data, so templates use `exp.period`, not `exp.data.period`.
- Company names, technology lists, icons and URLs are shared across locales — they are not part of the `en` block.
- The `ES / EN` switcher is `src/components/LanguageSwitcher.astro`, rendered in the NavBar next to the CV button.
- **The URL never shows `/en/` during normal navigation.** `netlify.toml` has cookie-conditioned rewrites (`status = 200`, `conditions = {Cookie = ["lang_en"]}`) that serve the English HTML from `/`. Netlify cookie conditions only test for a cookie's *presence*, hence the name `lang_en`: present means English. The switcher's links point at the real pages (`/` and `/en/`) so it degrades without JS; its inline script sets or clears the cookie, reloads, and syncs the cookie to the page's language on load. Those rewrites must stay above the generic `/*` 404 rule, and `/` and `/404` send `Vary: Cookie`.
- `/en/` stays reachable and indexable on purpose — it is what keeps the English version in search results and what works when shared.
- There is one CV per locale (`public/CV-DavidTorres.pdf`, `public/CV-DavidTorres-EN.pdf`), picked through `nav.cvHref` in the dictionary. Reference files in `public/` by path, never with `import` — importing makes Vite emit a second hashed copy and the browser saves it under that hashed name.
- Adding a locale also means: a new `src/pages/<code>/` directory, its path in `HOME_PATHS` in `src/scripts/smoothScroll.js`, and its 404 redirects in `netlify.toml` (locale rules must come before the generic `/*`).

## Key Conventions

- Default language is **Spanish** (`lang="es"` at `/`); English is a full translation at `/en/`
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
