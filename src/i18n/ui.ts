// Diccionarios de idioma del sitio.
// El español es el idioma por defecto y sirve de referencia: `en` está tipado
// como `typeof es`, así que falta cualquier clave y TypeScript avisa.

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

const es = {
  meta: {
    title: 'David Torres - Portfolio',
    description:
      'Portfolio de David Torres - Full Stack Developer especializado en tecnologías web modernas',
  },
  nav: {
    projects: 'PROYECTOS',
    experience: 'EXPERIENCIA',
    skills: 'HABILIDADES',
    about: 'SOBRE MÍ',
    contact: 'CONTACTO',
    cv: 'Descargar CV',
    // Archivos de `public/`, referenciados por su ruta para que se descarguen
    // con su nombre y no se dupliquen en el build
    cvHref: '/CV-DavidTorres.pdf',
    langLabel: 'Cambiar idioma',
    langShort: { es: 'ES', en: 'EN' },
  },
  hero: {
    greeting: '¡Hola!, soy David',
    roles: ['Full-stack Developer', 'Data Analyst'],
    description:
      'Me apasiona crear soluciones digitales que realmente importen. Transformo ideas en productos web que conectan con los usuarios y generan resultados reales.',
    imageAlt: 'David Torres - Portfolio',
  },
  projects: {
    title: 'Proyectos',
    subtitle:
      'Soluciones digitales reales, diseñadas y desarrolladas con tecnologías modernas',
    viewProject: 'VER PROYECTO',
  },
  experience: {
    title: 'Experiencia',
    subtitle:
      '+5 años construyendo experiencias digitales extraordinarias para empresas líderes y proyectos innovadores',
  },
  skills: {
    title: 'Habilidades',
    hard: 'Hard skills',
    soft: 'Soft skills',
  },
  about: {
    title: 'Sobre mí',
    greeting: '¡Hola! Soy David,',
    paragraphs: [
      'Mi historia como desarrollador web empezó mucho antes de escribir mi primera línea de código. Desde pequeño me gustaba mucho la informática, y esa curiosidad me llevó a desmontar ordenadores para ver cómo funcionaban por dentro.',
      'Fue esa pasión la que me hizo plantearme estudiar más a fondo el mundo de la tecnología, hasta que decidí cursar ASIR (Administración de Sistemas Informáticos en Red). Durante esos estudios fue cuando el mundo de la programación realmente empezó a captar mi atención de forma seria.',
      'La combinación entre mi curiosidad natural por entender cómo funcionan las cosas y los conocimientos que adquirí en sistemas y redes me llevó naturalmente hacia la programación. Era la evolución lógica de todo lo que había estado explorando desde niño.',
      'Cuando no estoy programando, disfruto de actividades que me ayudan a desconectar y mantener el equilibrio. Me gusta pasar tiempo al aire libre, ya sea caminando o simplemente disfrutando de la naturaleza. También dedico tiempo a leer, tanto sobre tecnología como otros temas que amplían mi perspectiva.',
    ],
    imageAlt: 'David Torres',
  },
  contact: {
    title: 'Contacto',
    subtitle:
      'Tanto si tienes un proyecto interesante, una oportunidad laboral, o simplemente quieres conectar, me encantaría escucharte.',
    email: {
      title: 'Email',
      description: 'La forma más directa',
      cta: 'Enviar correo',
    },
    linkedin: {
      title: 'LinkedIn',
      description: 'Conecta profesionalmente',
      cta: 'Ver perfil',
    },
  },
  footer: {
    cta: 'Puedes contactar conmigo de muchas formas. Elige la que más te guste.',
    copyEmail: 'Copiar email al portapapeles',
    madeIn: 'Hecho con ❤️ en Murcia',
  },
  social: {
    visit: 'Visitar',
  },
  toStart: {
    title: 'Ir al inicio',
  },
  notFound: {
    title: 'Página no encontrada',
    description:
      'La página que buscas no existe o ha sido movida. Pero no te preocupes, puedes volver al inicio.',
    cta: 'Volver al inicio',
  },
};

const en: typeof es = {
  meta: {
    title: 'David Torres - Portfolio',
    description:
      'Portfolio of David Torres - Full Stack Developer specialised in modern web technologies',
  },
  nav: {
    projects: 'PROJECTS',
    experience: 'EXPERIENCE',
    skills: 'SKILLS',
    about: 'ABOUT ME',
    contact: 'CONTACT',
    cv: 'Download CV',
    cvHref: '/CV-DavidTorres-EN.pdf',
    langLabel: 'Switch language',
    langShort: { es: 'ES', en: 'EN' },
  },
  hero: {
    greeting: "Hi! I'm David",
    roles: ['Full-stack Developer', 'Data Analyst'],
    description:
      'I love building digital solutions that really matter. I turn ideas into web products that connect with users and deliver real results.',
    imageAlt: 'David Torres - Portfolio',
  },
  projects: {
    title: 'Projects',
    subtitle: 'Real digital solutions, designed and built with modern technologies',
    viewProject: 'VIEW PROJECT',
  },
  experience: {
    title: 'Experience',
    subtitle:
      '5+ years building outstanding digital experiences for leading companies and innovative projects',
  },
  skills: {
    title: 'Skills',
    hard: 'Hard skills',
    soft: 'Soft skills',
  },
  about: {
    title: 'About me',
    greeting: "Hi! I'm David,",
    paragraphs: [
      'My story as a web developer started long before I wrote my first line of code. I was hooked on computers as a kid, and that curiosity led me to take machines apart just to see how they worked inside.',
      'That passion is what made me want to study technology properly, until I decided to take ASIR (Computer Systems and Network Administration). It was during those studies that programming really began to catch my attention.',
      'The mix of my natural curiosity about how things work and everything I learnt about systems and networks led me straight into programming. It was the logical next step in what I had been exploring since childhood.',
      "When I'm not coding, I enjoy things that help me switch off and keep my balance. I like being outdoors, whether walking or simply enjoying nature. I also make time to read, both about technology and about other topics that broaden my perspective.",
    ],
    imageAlt: 'David Torres',
  },
  contact: {
    title: 'Contact',
    subtitle:
      "Whether you have an interesting project, a job opportunity, or you just want to connect, I'd love to hear from you.",
    email: {
      title: 'Email',
      description: 'The most direct way',
      cta: 'Send an email',
    },
    linkedin: {
      title: 'LinkedIn',
      description: 'Connect professionally',
      cta: 'View profile',
    },
  },
  footer: {
    cta: 'There are plenty of ways to reach me. Pick whichever you like best.',
    copyEmail: 'Copy email to clipboard',
    madeIn: 'Made with ❤️ in Murcia',
  },
  social: {
    visit: 'Visit',
  },
  toStart: {
    title: 'Back to top',
  },
  notFound: {
    title: 'Page not found',
    description:
      "The page you are looking for does not exist or has been moved. No worries though, you can head back home.",
    cta: 'Back to home',
  },
};

export const ui = { es, en } satisfies Record<Lang, typeof es>;

export type UI = typeof es;
