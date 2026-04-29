---
name: portfolio-seo
description: Auditoría y cambios SEO para esta SPA Vite — meta en index.html, OG, canonical, robots y sitemap. Usar cuando pidan SEO, rich snippets o indexación.
---

# Skill: SEO del portfolio

## Contexto

- SPA sin SSR: lo que lleve [`index.html`](index.html) es lo primero que ven crawlers y previews sociales.
- URL canónica y OG deben ser **absolutas**, construidas con `VITE_PUBLIC_SITE_URL` (ver [`vite.config.ts`](vite.config.ts) transform si existe).
- Repositorio: [lemuel-ayala-portfolio](https://github.com/lemuayala/lemuel-ayala-portfolio).

## Checklist rápida

1. `html lang` alineado con idioma principal (es por defecto en i18n).
2. `<title>` y `meta name="description"` únicos y claros.
3. Open Graph: `og:title`, `og:description`, `og:url`, `og:image` (1200×630 ideal), `og:type`, `og:locale`.
4. Twitter: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
5. `<link rel="canonical">` a la URL pública definitiva.
6. `robots.txt` y `sitemap.xml` en `dist/` con la misma base que producción.
7. Opcional: JSON-LD `Person` / `WebSite` con `sameAs` (GitHub, LinkedIn).

## Archivos habituales

- [`index.html`](index.html)
- [`public/`](public/) — favicon, `image.png` para OG si se referencia
- [`vite.config.ts`](vite.config.ts) — inyección de URL en build

## Límites

- Sin SSR: no hay meta por idioma por ruta sin duplicar estrategia (segunda página HTML o herramienta de prerender).
