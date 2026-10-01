#!/usr/bin/env python3
"""Genera los PDF del CV en español e inglés que sirve la web.

    pip install reportlab
    python3 scripts/generate-cv.py

Escribe `public/CV-DavidTorres.pdf` y `public/CV-DavidTorres-EN.pdf`, que son
los archivos que enlaza el botón de la navbar (ver `nav.cvHref` en
`src/i18n/ui.ts`). El contenido de ambos idiomas vive aquí abajo, en `CV`, para
que una misma edición pueda aplicarse a los dos.

La maquetación imita el CV original hecho en Word: serif, nombre centrado,
filetes finos entre secciones y, en cada puesto, empresa y rol a la izquierda
con ubicación y fechas a la derecha. Una sola columna, texto seleccionable y
fuentes estándar, que es lo que necesitan los filtros ATS.
"""

from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    HRFlowable,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT_DIR = "public"

LINKEDIN = "https://www.linkedin.com/in/david-torres-l%C3%B3pez/"
EMAIL = "davto.xyz@gmail.com"
SITE = "https://davto.xyz"

CV = {
    "es": {
        "file": "CV-DavidTorres.pdf",
        "location": "Murcia",
        "summary": [
            "Desarrollador Full-Stack con más de 5 años de experiencia en desarrollo de "
            "aplicaciones web, arquitectura de software e integración de sistemas. "
            "Especializado en backend y frontend, con experiencia en diseño y consumo de "
            "APIs REST, lógica de negocio, bases de datos relacionales y desarrollo de "
            "interfaces de usuario.",
            "Experiencia en análisis de datos y Business Intelligence (BI), incluyendo "
            "elaboración de consultas SQL complejas, integración de datos entre sistemas, "
            "automatización de procesos y generación de reportes orientados a la toma de "
            "decisiones.",
            "Conocimiento de metodologías ágiles y buenas prácticas de desarrollo, "
            "priorizando rendimiento, mantenibilidad y escalabilidad de las soluciones.",
        ],
        "experience_heading": "EXPERIENCIA PROFESIONAL",
        "experience": [
            {
                "company": "Freelance",
                "role": "Full Stack Developer · Frontend Developer",
                "place": "Murcia, España",
                "dates": "Marzo 2025 – Actualidad",
                "bullets": [
                    "Desarrollé plataformas web completas con React, Astro y TypeScript "
                    "para clientes de distintos sectores, desde la conceptualización "
                    "hasta el despliegue.",
                    "Construí sistemas de gestión y aplicaciones SPA a medida, "
                    "incluyendo filtrado dinámico y gestión de contenidos.",
                    "Diseñé e implementé interfaces responsive con Tailwind CSS.",
                    "Optimicé SEO y rendimiento web, mejorando visibilidad y tiempos de "
                    "carga de los proyectos.",
                    "Integré WhatsApp y otros canales de contacto directo en los flujos "
                    "de captación de clientes.",
                    "Mantuve y di soporte técnico a proyectos en producción.",
                ],
            },
            {
                "company": "Xtart FP",
                "role": "Full Stack Developer · Data Analyst",
                "place": "Murcia, España",
                "dates": "Mayo 2019 – Febrero 2025",
                "bullets": [
                    "Desarrollé e implementé middleware para la integración de sistemas "
                    "internos, reduciendo la intervención manual en procesos clave.",
                    "Diseñé y mantuve bases de datos MySQL y SQL Server, incluyendo "
                    "modelado, optimización de consultas y gestión de rendimiento.",
                    "Construí plataformas web completas con Laravel, JavaScript y SQL "
                    "Server, desde el backend hasta la interfaz de usuario.",
                    "Implementé consultas complejas y pipelines de datos para Business "
                    "Intelligence, sirviendo como data source para reporting corporativo.",
                    "Integré APIs externas y servicios REST en los flujos de trabajo de "
                    "la empresa, automatizando procesos y mejorando la eficiencia "
                    "operativa.",
                    "Desarrollé y administré plataformas de formación en Moodle "
                    "adaptadas a las necesidades del negocio.",
                ],
            },
            {
                "company": "Openred Soluciones",
                "role": "Frontend Developer",
                "place": "Murcia, España",
                "dates": "Mayo 2018 – Marzo 2019",
                "bullets": [
                    "Desarrollé sitios web y tiendas online con WordPress y Magento para "
                    "clientes de distintos sectores.",
                    "Maqueté campañas de email marketing con HTML5 y CSS3, adaptadas a "
                    "múltiples clientes de correo.",
                    "Implementé y gestioné bases de datos MySQL en proyectos de "
                    "e-commerce.",
                    "Desarrollé scripts en PHP para automatizar tareas y extender "
                    "funcionalidades de las plataformas.",
                ],
            },
        ],
        "education_heading": "EDUCACIÓN",
        "education": {
            "title": "CFGS · Administración de Sistemas Informáticos en Red (ASIR)",
            "subtitle": "Formación Profesional de Grado Superior",
            "place": "Murcia, España",
            "dates": "Septiembre 2016 – Mayo 2018",
        },
        "skills_heading": "SKILLS ADICIONALES",
        "skills": [
            "Backend: Laravel, PHP, MySQL, SQL Server, APIs REST",
            "Frontend: JavaScript, HTML5, CSS3, React, Astro, Tailwind CSS, Vite, TypeScript",
            "CMS / LMS: WordPress, Magento, Moodle",
            "Herramientas: Github, Docker",
            "Otros: Fundamentos básicos de Java",
            "Idiomas: Español nativo, inglés medio.",
        ],
    },
    "en": {
        "file": "CV-DavidTorres-EN.pdf",
        "location": "Murcia, Spain",
        "summary": [
            "Full-Stack Developer with more than 5 years of experience in web application "
            "development, software architecture and systems integration. Specialised in "
            "backend and frontend, with experience in designing and consuming REST APIs, "
            "business logic, relational databases and user interface development.",
            "Experienced in data analysis and Business Intelligence (BI), including "
            "writing complex SQL queries, integrating data across systems, automating "
            "processes and producing reports to support decision-making.",
            "Familiar with agile methodologies and development best practices, "
            "prioritising the performance, maintainability and scalability of the "
            "solutions delivered.",
        ],
        "experience_heading": "PROFESSIONAL EXPERIENCE",
        "experience": [
            {
                "company": "Freelance",
                "role": "Full Stack Developer · Frontend Developer",
                "place": "Murcia, Spain",
                "dates": "March 2025 – Present",
                "bullets": [
                    "Built complete web platforms with React, Astro and TypeScript for "
                    "clients across a range of sectors, from concept through to "
                    "deployment.",
                    "Developed bespoke management systems and SPAs, including dynamic "
                    "filtering and content management.",
                    "Designed and implemented responsive interfaces with Tailwind CSS.",
                    "Optimised SEO and web performance, improving the visibility and "
                    "loading times of the projects.",
                    "Integrated WhatsApp and other direct contact channels into client "
                    "acquisition flows.",
                    "Maintained and provided technical support for projects in "
                    "production.",
                ],
            },
            {
                "company": "Xtart FP",
                "role": "Full Stack Developer · Data Analyst",
                "place": "Murcia, Spain",
                "dates": "May 2019 – February 2025",
                "bullets": [
                    "Developed and deployed middleware for internal systems integration, "
                    "reducing manual intervention in key processes.",
                    "Designed and maintained MySQL and SQL Server databases, covering "
                    "data modelling, query optimisation and performance management.",
                    "Built complete web platforms with Laravel, JavaScript and SQL "
                    "Server, from the backend through to the user interface.",
                    "Implemented complex queries and data pipelines for Business "
                    "Intelligence, serving as the data source for corporate reporting.",
                    "Integrated external APIs and REST services into company workflows, "
                    "automating processes and improving operational efficiency.",
                    "Developed and administered Moodle training platforms tailored to "
                    "business needs.",
                ],
            },
            {
                "company": "Openred Soluciones",
                "role": "Frontend Developer",
                "place": "Murcia, Spain",
                "dates": "May 2018 – March 2019",
                "bullets": [
                    "Built websites and online stores with WordPress and Magento for "
                    "clients across a range of sectors.",
                    "Coded email marketing campaigns with HTML5 and CSS3, adapted to "
                    "multiple email clients.",
                    "Implemented and managed MySQL databases for e-commerce projects.",
                    "Developed PHP scripts to automate tasks and extend platform "
                    "functionality.",
                ],
            },
        ],
        "education_heading": "EDUCATION",
        "education": {
            "title": "Computer Systems and Network Administration (ASIR)",
            "subtitle": "Higher Vocational Training Diploma (CFGS)",
            "place": "Murcia, Spain",
            "dates": "September 2016 – May 2018",
        },
        "skills_heading": "ADDITIONAL SKILLS",
        "skills": [
            "Backend: Laravel, PHP, MySQL, SQL Server, REST APIs",
            "Frontend: JavaScript, HTML5, CSS3, React, Astro, Tailwind CSS, Vite, TypeScript",
            "CMS / LMS: WordPress, Magento, Moodle",
            "Tools: Github, Docker",
            "Other: Java fundamentals",
            "Languages: Spanish (native), English (intermediate).",
        ],
    },
}

BODY = 10.2
LEAD = 12.3

styles = {
    "name": ParagraphStyle(
        "name", fontName="Times-Bold", fontSize=23, leading=26,
        alignment=TA_CENTER, spaceAfter=3,
    ),
    "contact": ParagraphStyle(
        "contact", fontName="Times-Roman", fontSize=10.2, leading=13,
        alignment=TA_CENTER, spaceAfter=8,
    ),
    "summary": ParagraphStyle(
        "summary", fontName="Times-Roman", fontSize=BODY, leading=LEAD,
        alignment=TA_JUSTIFY,
    ),
    "section": ParagraphStyle(
        "section", fontName="Times-Bold", fontSize=11.5, leading=14,
        spaceBefore=1, spaceAfter=4,
    ),
    "company": ParagraphStyle(
        "company", fontName="Times-Bold", fontSize=BODY + 0.3, leading=13,
    ),
    "role": ParagraphStyle(
        "role", fontName="Times-Italic", fontSize=BODY - 0.4, leading=12,
    ),
    "right": ParagraphStyle(
        "right", fontName="Times-Roman", fontSize=BODY - 0.2, leading=13,
        alignment=2,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="Times-Roman", fontSize=BODY, leading=LEAD,
        alignment=TA_JUSTIFY,
    ),
}


def rule():
    return HRFlowable(width="100%", thickness=0.8, color="#000000",
                      spaceBefore=6, spaceAfter=5)


def two_columns(left, left_style, right, width):
    """Fila de dos columnas: texto a la izquierda, dato alineado a la derecha."""
    table = Table(
        [[Paragraph(left, left_style), Paragraph(right, styles["right"])]],
        colWidths=[width * 0.63, width * 0.37],
    )
    table.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return table


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(text, styles["bullet"]), leftIndent=14)
         for text in items],
        bulletType="bullet", bulletChar="●", bulletFontSize=6.5,
        leftIndent=14, bulletOffsetY=-2, spaceBefore=3, spaceAfter=0,
    )


def build(lang, data):
    path = f"{OUT_DIR}/{data['file']}"
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=2 * cm, rightMargin=2 * cm,
        topMargin=1.4 * cm, bottomMargin=1.3 * cm,
        title="David Torres López - CV", author="David Torres López",
        subject="Curriculum Vitae", creator="David Torres López",
        lang=lang,
    )
    width = doc.width
    story = [
        Paragraph("David Torres López", styles["name"]),
        Paragraph(
            f'{data["location"]} &nbsp;•&nbsp; '
            f'<link href="{LINKEDIN}"><u>linkedin.com/in/david-torres-lópez</u></link>'
            f' &nbsp;•&nbsp; <link href="mailto:{EMAIL}">{EMAIL}</link>'
            f' &nbsp;•&nbsp; <link href="{SITE}"><u>davto.xyz</u></link>',
            styles["contact"],
        ),
    ]

    for paragraph in data["summary"]:
        story.append(Paragraph(paragraph, styles["summary"]))

    story.append(rule())
    story.append(Paragraph(data["experience_heading"], styles["section"]))
    for index, job in enumerate(data["experience"]):
        if index:
            story.append(Spacer(1, 9))
        story.append(two_columns(job["company"], styles["company"], job["place"], width))
        story.append(two_columns(job["role"], styles["role"], job["dates"], width))
        story.append(bullets(job["bullets"]))

    story.append(rule())
    story.append(Paragraph(data["education_heading"], styles["section"]))
    education = data["education"]
    story.append(two_columns(
        education["title"], styles["company"], education["place"], width))
    story.append(two_columns(
        education["subtitle"], styles["role"], education["dates"], width))

    story.append(rule())
    story.append(Paragraph(data["skills_heading"], styles["section"]))
    story.append(bullets(data["skills"]))

    doc.build(story)
    print(f"escrito {path}")


if __name__ == "__main__":
    for lang, data in CV.items():
        build(lang, data)
