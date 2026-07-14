import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    alt: z.string(),
    tag: z.string(),
    technologies: z.array(z.string()).optional(),
    isMainProject: z.boolean().optional(),
    url: z.string().optional(),
    features: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/skills' }),
  schema: z.object({
    category: z.string(),
    description: z.string(),
    subcategories: z.array(z.object({
      title: z.string(),
      skills: z.array(z.object({
        name: z.string(),
        icon: z.string(),
        iconType: z.enum(['url', 'emoji', 'svg']).optional().default('emoji'),
        color: z.string().optional(),
      }))
    })).optional(),
    skills: z.array(z.object({
      name: z.string(),
      icon: z.string(),
      iconType: z.enum(['url', 'emoji', 'svg']).optional().default('emoji'),
      color: z.string().optional(),
    })).optional(),
    order: z.number().optional(),
  }),
});


const experienceCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    roles: z.array(z.string()),
    period: z.string(),
    tasks: z.array(z.string()),
    technologies: z.array(z.string()),
    type: z.enum(['full-time', 'freelance', 'contract']),
    order: z.number().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'skills': skillsCollection,
  'experience': experienceCollection,
};
