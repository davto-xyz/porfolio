import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    alt: z.string(),
    tag: z.string(),
    technologies: z.array(z.string()).optional(),
    isMainProject: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.string(),
    description: z.string(),
    subcategories: z.array(z.object({
      title: z.string(),
      skills: z.array(z.object({
        name: z.string(),
        icon: z.string(), // URL del icono SVG o imagen
        iconType: z.enum(['url', 'emoji', 'svg']).optional().default('emoji'), // Tipo de icono
        color: z.string().optional(),
      }))
    })).optional(),
    skills: z.array(z.object({
      name: z.string(),
      icon: z.string(), // URL del icono SVG o imagen
      iconType: z.enum(['url', 'emoji', 'svg']).optional().default('emoji'), // Tipo de icono
      color: z.string().optional(),
    })).optional(),
    order: z.number().optional(),
  }),
});


const experienceCollection = defineCollection({
  type: 'content',
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