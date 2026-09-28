import type { CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './ui';

type SkillsData = CollectionEntry<'skills'>['data'];
type Skill = NonNullable<SkillsData['skills']>[number];

/**
 * Las colecciones de contenido guardan el español en la raíz del frontmatter y
 * las traducciones dentro de un objeto `en`. Estos helpers aplican la traducción
 * cuando existe y, si falta algún campo, mantienen el valor español.
 */

export function localizeExperience(
  entry: CollectionEntry<'experience'>,
  lang: Lang
) {
  const { en, ...data } = entry.data;
  if (lang === defaultLang || !en) return data;

  return {
    ...data,
    roles: en.roles ?? data.roles,
    period: en.period ?? data.period,
    tasks: en.tasks ?? data.tasks,
  };
}

export function localizeProject(entry: CollectionEntry<'projects'>, lang: Lang) {
  const { en, ...data } = entry.data;
  if (lang === defaultLang || !en) return data;

  return {
    ...data,
    title: en.title ?? data.title,
    description: en.description ?? data.description,
    tag: en.tag ?? data.tag,
    features: en.features ?? data.features,
    alt: en.alt ?? data.alt,
  };
}

export function localizeSkill(skill: Skill, lang: Lang) {
  const { en, ...data } = skill;
  if (lang === defaultLang || !en) return data;

  return {
    ...data,
    name: en.name ?? data.name,
  };
}
