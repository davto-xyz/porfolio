import { defaultLang, languages, ui, type Lang, type UI } from './ui';

/**
 * Deduce el idioma a partir del primer segmento de la URL.
 * El idioma por defecto (español) no lleva prefijo: `/` es español y `/en/` inglés.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment && segment in languages) {
    return segment as Lang;
  }
  return defaultLang;
}

/** Devuelve el diccionario de textos del idioma indicado. */
export function useTranslations(lang: Lang): UI {
  return ui[lang];
}

/** Añade el prefijo de idioma a una ruta interna (el idioma por defecto no lo lleva). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Lista de idiomas con su ruta equivalente, para las etiquetas hreflang. */
export function getLanguageOptions(path: string) {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    label: languages[lang],
    href: localizePath(path, lang),
  }));
}

/**
 * Opciones del selector de idioma.
 *
 * El `href` apunta a la página real de cada idioma, así que sin JavaScript el
 * selector sigue funcionando (a costa de mostrar `/en/` en la URL). Con
 * JavaScript, el propio componente intercepta el clic, guarda la preferencia en
 * la cookie `lang_en` y recarga: Netlify sirve entonces el HTML inglés desde `/`
 * y la barra de direcciones no cambia.
 */
export function getLanguageSwitchOptions() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    label: languages[lang],
    href: localizePath('/', lang),
  }));
}
