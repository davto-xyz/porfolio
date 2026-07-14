# Portfolio — David Torres

Portfolio personal de **David Torres**, Full Stack Developer. Sitio estático, one-page, en español, construido con **Astro 6** y **Tailwind CSS v4**, y desplegado en **Netlify**.

> Idioma de la interfaz y los contenidos: **Español** (`<html lang="es">`).

---

## Tabla de contenidos

- [Visión general](#visión-general)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
- [Sistema de diseño](#sistema-de-diseño)
- [Colecciones de contenido](#colecciones-de-contenido)
- [Secciones de la página](#secciones-de-la-página)
- [Despliegue en Netlify](#despliegue-en-netlify)
- [Convenciones y detalles](#convenciones-y-detalles)

---

## Visión general

Este repositorio contiene el código fuente del portfolio personal. Es un sitio **100% estático** (sin SSR): todas las páginas se pre-renderizan en build y se sirven como HTML, CSS y JS desde Netlify.

- **Una sola página** (`/`) que compone varias secciones (hero, proyectos, experiencia, habilidades, sobre mí, contacto).
- **Contenido basado en colecciones** (archivos `.mdx`) con frontmatter validado por Zod, lo que permite añadir proyectos, experiencias o habilidades editando Markdown sin tocar el código.
- Página **404** propia.

---

## Tecnologías

| Herramienta              | Uso                                                            |
| ------------------------ | -------------------------------------------------------------- |
| **Astro 6**              | Framework principal. Salida estática, islas e integración MDX. |
| **MDX** (`@astrojs/mdx`) | Contenido enriquecido de las colecciones.                      |
| **Tailwind CSS v4**      | Estilos utilitarios (vía plugin PostCSS `@tailwindcss/postcss`). |
| **astro-icon**           | Iconos SVG.                                                    |
| **sharp**                | Optimización de imágenes (`astro:assets`).                     |
| **@fontsource/inter**    | Tipografía Inter (pesos 400, 700, 900).                        |
| **pnpm**                 | Gestor de paquetes.                                            |
| **Netlify**              | Hosting e integración continua.                                |

---

## Estructura del proyecto

```text
.
├── astro.config.mjs          # Configuración de Astro (integraciones + Tailwind/PostCSS)
├── netlify.toml              # Configuración de build, redirects y headers de Netlify
├── tailwind.config.js        # Fuentes, font-stretch y color gold para Tailwind
├── tsconfig.json
├── public/
│   ├── CV-DavidTorres.pdf    # CV descargable desde la navbar
│   ├── favicon.png
│   └── img/                  # Imágenes estáticas (p. ej. icono de Threads)
└── src/
    ├── pages/
    │   ├── index.astro       # Página única: compone todas las secciones
    │   └── 404.astro         # Página de error
    ├── layouts/
    │   ├── Layout.astro      # Shell HTML base (NavBar, Footer, ToStart, CSS global)
    │   └── Layout404.astro   # Layout específico del 404
    ├── components/           # Componentes Astro (uno por sección + utilidades)
    ├── content/              # Colecciones de contenido en MDX
    │   ├── projects/
    │   ├── skills/
    │   └── experience/
    ├── content.config.ts     # Esquemas Zod + loaders glob() de las colecciones
    ├── data/
    │   └── contact.ts        # Email y redes sociales centralizados
    ├── scripts/
    │   ├── smoothScroll.js   # Scroll suave para la navegación interna
    │   └── top.js            # Botón "volver arriba"
    ├── styles/
    │   └── global.css        # Tailwind + sistema de diseño (color, bento, animaciones)
    └── assets/               # Imágenes procesadas por astro:assets
```

---

## Puesta en marcha

Requisitos: **Node 22.12+** y **pnpm**.

```sh
pnpm install      # Instalar dependencias
pnpm dev          # Servidor de desarrollo en http://localhost:4321
pnpm build        # Build de producción a dist/
pnpm preview      # Previsualizar el build de producción localmente
```

> No hay linter, typecheck ni tests configurados en este proyecto.

---

## Sistema de diseño

Todo el sistema visual está definido en **`src/styles/global.css`** (Tailwind v4 se importa ahí mismo).

### Color y tipografía

- **Color de acento**: oro `#F6A60D`, expuesto como utilidades `text-gold-500`, `bg-gold-500`, `border-gold-500`, etc.
- **Fondo**: beige `#E3E2DC` (con variante `.bg-noise-beige` que añade textura de ruido).
- **Tipografía**: **Inter** (400/700/900), cargada con `@fontsource/inter` y configurada como `font-sans` en `tailwind.config.js`.

### Bento grid

Layout de rejilla personalizado (no es una librería). Clases disponibles:

- `.bento-grid` / `.experience-bento-grid` — contenedores de 12 columnas.
- Ítems: `.bento-large`, `.bento-medium-wide`, `.bento-medium-tall`, `.bento-small` (y su variante `exp-*`), con ajustes responsivos en `md` y `lg`.

### Animaciones

- Entradas de texto: `.text-entrance-left`, `-bottom`, `-fade`, `-right` con utilidades de retardo `.delay-200/400/600/800`.
- Menú móvil: `.mobile-menu-animate` con fade + slide.
- **Accesibilidad**: se respeta `prefers-reduced-motion`, desactivando animaciones y scroll suave.

---

## Colecciones de contenido

Definidas en `src/content.config.ts` con la **Content Layer API** (loaders `glob()` + esquemas Zod). El contenido vive en `src/content/<coleccion>/*.mdx`. Para añadir una entrada nueva, basta con crear un archivo `.mdx` con el frontmatter correspondiente.

### `experience` — `src/content/experience/*.mdx`

```yaml
---
company: "Nombre de la empresa"
roles: ["Full Stack Developer"]        # array
period: "Mes AAAA - Actualidad"        # texto libre
tasks: ["Tarea 1", "Tarea 2"]          # array
technologies: ["React", "Astro"]       # array
type: "contract"                       # 'full-time' | 'freelance' | 'contract'
order: 1                               # opcional, define el orden de visualización
---
```

### `projects` — `src/content/projects/*.mdx`

```yaml
---
title: "Nombre del proyecto"
name: "Nombre"
description: "Descripción breve"
image: "/img/proyecto.png"             # ruta de la imagen
alt: "Texto alternativo"
tag: "Web App"                         # etiqueta/badge
technologies: ["React", "TypeScript"]  # opcional
isMainProject: false                   # opcional
url: "https://..."                     # opcional, enlace "VER PROYECTO"
features: ["Feature 1", "Feature 2"]   # opcional
order: 1                               # opcional
---
```

### `skills` — `src/content/skills/*.mdx`

```yaml
---
category: "frontend"                   # las categorías definen agrupaciones
description: "..."
order: 1                               # opcional
# Opcional: lista directa de habilidades
skills:
  - name: "React"
    icon: "🟦"                          # emoji, URL o SVG
    iconType: "emoji"                  # 'url' | 'emoji' | 'svg' (por defecto 'emoji')
    color: "#61DAFB"                   # opcional
# Opcional: subcategorías
subcategories:
  - title: "Frontend"
    skills: [...]
---
```

> La categoría `softskills` se trata de forma especial en `SkillsBlock.astro` (se muestra en la zona de "Soft skills").

---

## Secciones de la página

`src/pages/index.astro` compone las secciones en este orden:

1. **`SectionIndicator`** — indicador de sección activa.
2. **`ModernHero`** — cabecera principal.
3. **`ProjectsGrid`** — grid de proyectos (desde la colección `projects`).
4. **`ExperienceBlock`** — experiencia laboral (desde `experience`).
5. **`SkillsBlock`** — hard skills + soft skills (desde `skills`).
6. **`AboutMe`** — sección "Sobre mí".
7. **`ContactBlock`** — formulario/enlaces de contacto.

La navegación (`NavBar.astro`) enlaza a: **Proyectos · Experiencia · Habilidades · Sobre mí · Contacto**, e incluye un botón para **descargar el CV** (`public/CV-DavidTorres.pdf`).

Los datos de contacto y redes sociales están centralizados en **`src/data/contact.ts`**.

---

## Despliegue en Netlify

Configurado en `netlify.toml`:

- **Build**: `npm run build` → salida en `dist/`.
- **404**: redirect de rutas no encontradas a `/404.html` con status 404.
- **Headers**: cabeceras de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, etc.) y caché de assets, imágenes y fuentes.

> **Versión de Node**: Astro 6 requiere **Node 22.12+**. `netlify.toml` declara `NODE_VERSION = "22"`.

El despliegue es automático al hacer push a la rama principal.

---

## Convenciones y detalles

- **Sitio estático**: no hay SSR ni adaptador. Todo es pre-renderizado.
- **Gestor de paquetes**: el proyecto usa **pnpm** (ver `pnpm-lock.yaml`). El build de Netlify, sin embargo, usa `npm run build`.
- **Tipografía**: los pesos de Inter se importan en `global.css`, no desde un CDN.
- **Color gold**: se aplica mediante utilidades CSS custom en `global.css`, no únicamente desde `tailwind.config.js`.
- **Imágenes**: las que necesitan optimización van en `src/assets/` (procesadas por `astro:assets`); las estáticas, en `public/`.
- **`.astro/`** está gitignored (tipos generados): se regenera al ejecutar `pnpm dev` o `pnpm build`.
- **`performance-test.js`** (raíz) es un helper manual de pruebas en navegador, no un test automatizado.
