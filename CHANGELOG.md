# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased]

### Añadido

- Documentación de variables `VITE_PUBLIC_SITE_URL`, SEO (`robots.txt`, `sitemap.xml`, meta Open Graph).
- Reglas y skills de Cursor en `.cursor/rules` y `.cursor/skills`.

### Cambiado

- Dependencias actualizadas dentro de rangos semver compatibles (`pnpm update` en `^`); añadido `@types/node` para el plugin SEO en `vite.config.ts`.

### Corregido

- ESLint/TypeScript: `NavBar` y `MobileMenu` usan `Dispatch<SetStateAction<boolean>>` para el setter del menú; `RevealOnScroll` y `CodeEditor` con tipos más estrictos.

### Repositorio

- `robots.txt` y `sitemap.xml` se generan en `dist/` en el build, no como archivos estáticos en `public/`.

---

## [2.1.0] — 2026-04-29

Mejoras de UX, contenido y herramientas de desarrollo.

### Añadido

- Footer con tagline i18n («Desarrollado con ♥ por lemuayala con React y Tailwind CSS»).
- Proyecto **Glass UI** en datos i18n: repo [lemuayala/glass-ui](https://github.com/lemuayala/glass-ui), demo en Vercel, preview `glass-ui.png`.
- Meta SEO ampliadas (descripción, Open Graph, Twitter Card, JSON-LD opcional vía build).
- `robots.txt` y `sitemap.xml` generados en `dist/` durante el build (URL canónica vía `VITE_PUBLIC_SITE_URL`).

### Cambiado

- Pantalla de carga: texto `<HelloWorld />` en color sólido por tema; fade-out antes de mostrar la app; fondo raíz `html` alineado con tema claro para evitar flash negro.
- Contenedor principal sin `opacity-0` tras el splash (evita hueco visual).
- Editor «Conóceme en código»: soporte visual para **modo claro** (tokens, header, barra de estado).
- Cursor **lumos**: visible en modo claro; hover sobre enlaces/botones alineado entre temas.
- **Proyectos**: mockup navegador con variantes light/dark; anillo Siri por encima del chrome del mockup; zoom en hover solo cuando hay imagen de preview; variante skeleton con hover más luminoso sin zoom.
- **Nav**: logo solo texto `lemuayala.tech` (sin avatar «LA»).
- **Contacto**: tonos más apagados en iconos y badges de enlaces.
- **Locales**: título del proyecto Glass UI; enlaces repo/demo; stack Next.js 15.

### Corregido

- reCAPTCHA: montaje seguro sin `sitekey` vacío; widget fuera del bloque con `opacity:0` del reveal.
- Parpadeo inicial al cargar (tema + transición splash).

### Repositorio

- Commits convencionales en español (`fix`, `feat`, `style`, `chore`) sin ámbito entre paréntesis.
