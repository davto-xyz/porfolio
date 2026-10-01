# Portfolio — David Torres

Portfolio personal de **David Torres**, Full Stack Developer. Sitio estático, one-page, bilingüe (español e inglés), construido con **Astro 6** y **Tailwind CSS v4**, y desplegado en **Netlify**.

> Idiomas: **Español** (por defecto, en `/`) e **Inglés** (en `/en/`). Se cambia con el selector **ES / EN** de la parte superior.

---

## Tabla de contenidos

- [Visión general](#visión-general)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
- [Internacionalización (i18n)](#internacionalización-i18n)
  - [URL sin `/en/`](#url-sin-en)
- [Sistema de diseño](#sistema-de-diseño)
- [Colecciones de contenido](#colecciones-de-contenido)
- [Secciones de la página](#secciones-de-la-página)
- [Despliegue en Netlify](#despliegue-en-netlify)
- [Convenciones y detalles](#convenciones-y-detalles)

---

## Visión general

Este repositorio contiene el código fuente del portfolio personal. Es un sitio **100% estático** (sin SSR): todas las páginas se pre-renderizan en build y se sirven como HTML, CSS y JS desde Netlify.

- **Una sola página por idioma** (`/` en español y `/en/` en inglés) que compone varias secciones (hero, proyectos, experiencia, habilidades, sobre mí, contacto).
- **Contenido basado en colecciones** (archivos `.mdx`) con frontmatter validado por Zod, lo que permite añadir proyectos, experiencias o habilidades editando Markdown sin tocar el código.
- **Bilingüe**: textos de interfaz en `src/i18n/` y traducciones de contenido en el propio frontmatter.
- Página **404** propia en cada idioma.

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
├── astro.config.mjs          # Configuración de Astro (i18n, integraciones + Tailwind/PostCSS)
├── scripts/
│   └── generate-cv.py        # Genera los PDF del CV en español e inglés
├── netlify.toml              # Configuración de build, redirects y headers de Netlify
├── tailwind.config.js        # Fuentes, font-stretch y color gold para Tailwind
├── tsconfig.json
├── public/
│   ├── CV-DavidTorres.pdf    # CV en español (generado por scripts/generate-cv.py)
│   ├── CV-DavidTorres-EN.pdf # CV en inglés (se sirve en la versión inglesa)
│   ├── favicon.png
│   └── img/                  # Imágenes estáticas (p. ej. icono de Threads)
└── src/
    ├── pages/
    │   ├── index.astro       # Home en español: compone todas las secciones
    │   ├── 404.astro         # Página de error en español
    │   └── en/
    │       ├── index.astro   # Home en inglés (mismas secciones)
    │       └── 404.astro     # Página de error en inglés
    ├── layouts/
    │   ├── Layout.astro      # Shell HTML base (NavBar, Footer, ToStart, CSS global, hreflang)
    │   └── Layout404.astro   # Layout específico del 404
    ├── components/           # Componentes Astro (uno por sección + utilidades)
    ├── i18n/                 # Internacionalización
    │   ├── ui.ts             # Diccionarios de textos (es / en)
    │   ├── utils.ts          # Detección de idioma y rutas localizadas
    │   └── content.ts        # Traducción de las entradas de las colecciones
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

## Internacionalización (i18n)

El sitio se publica en **español** (idioma por defecto, sin prefijo) e **inglés** (bajo `/en/`), usando el enrutado i18n nativo de Astro declarado en `astro.config.mjs`:

```js
i18n: {
  locales: ['es', 'en'],
  defaultLocale: 'es',
  routing: { prefixDefaultLocale: false },
}
```

| Ruta       | Idioma   | Archivo                    |
| ---------- | -------- | -------------------------- |
| `/`        | Español  | `src/pages/index.astro`    |
| `/en/`     | Inglés   | `src/pages/en/index.astro` |
| `/404`     | Español  | `src/pages/404.astro`      |
| `/en/404`  | Inglés   | `src/pages/en/404.astro`   |

> En producción, la navegación normal **no muestra `/en/` en la barra de direcciones**: ver [URL sin `/en/`](#url-sin-en).

### Cómo funciona

- **Detección de idioma**: cada componente llama a `getLangFromUrl(Astro.url)` (`src/i18n/utils.ts`), que lee el primer segmento de la URL. Al no haber estado en cliente, todo se resuelve en build.
- **Textos de interfaz**: viven en `src/i18n/ui.ts`, en dos diccionarios (`es` y `en`). El componente obtiene el suyo con `useTranslations(lang)` y lo usa como `t.seccion.clave`.
- **Tipado**: el diccionario inglés se declara como `typeof es`, así que si se añade una clave al español y falta en inglés, **el editor marca el error** en `ui.ts`. Ojo: `pnpm build` transpila sin comprobar tipos, así que esa red de seguridad es del editor (o de `astro check`, que no está instalado en el proyecto).
- **Selector de idioma**: `src/components/LanguageSwitcher.astro`, integrado en la `NavBar` junto al botón de CV. Marca el idioma activo con el color oro y su altura la iguala el `items-stretch` del contenedor, de modo que coincide con el botón de CV.
- **SEO**: `Layout.astro` emite `<html lang="…">` y etiquetas `<link rel="alternate" hreflang="…">` para ambos idiomas más `x-default`. Si se define `site` en `astro.config.mjs`, esas URLs pasan a ser absolutas automáticamente (recomendado por Google).

### URL sin `/en/`

Aunque el inglés se construye en `/en/`, quien navega por el sitio ve siempre `/`. Lo consigue un **rewrite de Netlify condicionado por cookie**, declarado en `netlify.toml`:

```toml
[[redirects]]
  from = "/"
  to = "/en/index.html"
  status = 200          # rewrite, no redirect: la URL no cambia
  force = true
  conditions = {Cookie = ["lang_en"]}
```

Las condiciones de cookie de Netlify sólo comprueban si la cookie **existe**, no su valor; de ahí el nombre `lang_en`: presente = inglés, ausente = español. Hay una regla equivalente para `/404`, y ambas rutas envían `Vary: Cookie` para que ninguna caché reutilice el idioma anterior.

El flujo completo:

1. El selector enlaza a `/` y a `/en/` (URLs reales). Sin JavaScript, el enlace navega y el sitio funciona: sólo se ve el prefijo en la barra.
2. Con JavaScript, el script del componente intercepta el clic, pone o borra la cookie `lang_en` y recarga `/`. Netlify sirve entonces el HTML del otro idioma **en la misma URL**.
3. Al cargar cualquier página, el script sincroniza la cookie con el idioma que se está viendo. Así, si alguien entra directo a `/en/` desde un enlace compartido o desde Google, la home le seguirá saliendo en inglés.

**Las reglas deben ir antes que la genérica `/*`** del bloque de 404: gana la primera que coincide.

`/en/` sigue existiendo, siendo indexable y funcionando al compartirla — es lo que mantiene el SEO del inglés. La contrapartida es que esa URL puede aparecer en resultados de búsqueda; ocultarla del todo implicaría renunciar a que el inglés posicione.

### Añadir o cambiar un texto de interfaz

1. Añade la clave en el diccionario `es` de `src/i18n/ui.ts`.
2. Añade la misma clave en `en` (si falta, el build avisa).
3. Úsala en el componente con `t.tuSeccion.tuClave`.

### Traducir contenido de las colecciones

El frontmatter guarda el **español en la raíz** y el inglés dentro de un objeto **`en`**. Sólo hay que traducir lo que cambia: nombres de empresa, tecnologías, iconos y URLs se comparten entre idiomas. Si un campo no se traduce, se usa el español como fallback.

```yaml
---
company: "Openred Soluciones"
period: "Mayo 2018 - Marzo 2019"
tasks: ["Desarrollo de páginas web con Wordpress"]
en:
  period: "May 2018 - March 2019"
  tasks: ["Development of websites with WordPress"]
---
```

Los helpers de `src/i18n/content.ts` (`localizeExperience`, `localizeProject`, `localizeSkill`) hacen la mezcla. Devuelven los datos ya planos, por lo que en las plantillas se usa `exp.period` en lugar de `exp.data.period`.

### Añadir un idioma nuevo

1. Añádelo a `languages` en `src/i18n/ui.ts` y crea su diccionario.
2. Añádelo a `locales` en `astro.config.mjs`.
3. Crea `src/pages/<codigo>/index.astro` y `src/pages/<codigo>/404.astro` (copias de los ingleses, ajustando las rutas de import).
4. Añade su bloque de traducción en el frontmatter del contenido.
5. Añade su ruta a `HOME_PATHS` en `src/scripts/smoothScroll.js` y sus redirects en `netlify.toml`.
6. Como las condiciones de cookie de Netlify sólo miran la presencia, un tercer idioma necesita su propia cookie (`lang_<codigo>`) y su pareja de reglas; actualiza también el script del selector, que hoy asume dos idiomas.

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
en:                                    # opcional, traducción al inglés
  roles: ["Full Stack Developer"]
  period: "Month YYYY - Present"
  tasks: ["Task 1", "Task 2"]
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
en:                                    # opcional, traducción al inglés
  title: "Project name"
  description: "Short description"
  alt: "Alt text"
  tag: "Web App"
  features: ["Feature 1", "Feature 2"]
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
    en: { name: "React" }              # opcional; sólo hace falta en las soft skills
# Opcional: subcategorías
subcategories:
  - title: "Frontend"
    skills: [...]
---
```

> La categoría `softskills` se trata de forma especial en `SkillsBlock.astro` (se muestra en la zona de "Soft skills").

---

## Secciones de la página

`src/pages/index.astro` (y su equivalente en inglés, `src/pages/en/index.astro`) compone las secciones en este orden:

1. **`SectionIndicator`** — indicador de sección activa.
2. **`ModernHero`** — cabecera principal.
3. **`ProjectsGrid`** — grid de proyectos (desde la colección `projects`).
4. **`ExperienceBlock`** — experiencia laboral (desde `experience`).
5. **`SkillsBlock`** — hard skills + soft skills (desde `skills`).
6. **`AboutMe`** — sección "Sobre mí".
7. **`ContactBlock`** — formulario/enlaces de contacto.

La navegación (`NavBar.astro`) enlaza a: **Proyectos · Experiencia · Habilidades · Sobre mí · Contacto**, e incluye el **selector de idioma ES / EN** y un botón para **descargar el CV**.

Hay un CV por idioma, y la ruta sale del diccionario (`nav.cvHref`), así que el botón sirve el que toca:

| Idioma  | Archivo                          |
| ------- | -------------------------------- |
| Español | `public/CV-DavidTorres.pdf`      |
| Inglés  | `public/CV-DavidTorres-EN.pdf`   |

Se referencian por su ruta de `public/` (no con `import`) para que se descarguen con su nombre real y no se dupliquen en el build.

Ambos PDF los genera **`scripts/generate-cv.py`**, que tiene el contenido de los dos idiomas en un único diccionario y reproduce la maquetación del CV original (serif, nombre centrado, filetes entre secciones y cada puesto con empresa/rol a la izquierda y ubicación/fechas a la derecha):

```sh
pip install reportlab
python3 scripts/generate-cv.py   # reescribe los dos PDF de public/
```

Editar el CV significa tocar el diccionario `CV` del script y volver a ejecutarlo, así que los dos idiomas no se desincronizan. Si prefieres mantener el CV en Word, también vale: exporta el PDF con el mismo nombre, déjalo en `public/` y borra el script — la web sólo sirve el archivo.

Los datos de contacto y redes sociales están centralizados en **`src/data/contact.ts`**.

---

## Despliegue en Netlify

Configurado en `netlify.toml`:

- **Build**: `npm run build` → salida en `dist/`.
- **404**: redirect de rutas no encontradas a `/404.html` con status 404. Las rutas bajo `/en/*` van al 404 en inglés (`/en/404/index.html`); **el orden de los redirects importa**, las reglas de `/en/*` van antes que la genérica `/*`.
- **Idioma**: rewrites condicionados por la cookie `lang_en` que sirven el inglés desde `/` sin cambiar la URL (ver [URL sin `/en/`](#url-sin-en)). Son las primeras reglas del archivo.
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
