---
name: portfolio-deploy
description: Despliegue GitHub Pages vs Vercel, base de Vite y script gh-pages. Usar cuando hablen de publicar el portfolio, rutas rotas o assets 404.
---

# Skill: despliegue del portfolio

## Base de assets

[`vite.config.ts`](vite.config.ts):

- Si `process.env.VERCEL` (inyectado en build en Vercel) existe → `base: '/'`.
- Si no → `base: '/lemuel-ayala-portfolio/'` para GitHub Pages en subruta del usuario **lemuayala**.

Quien fork el repo debe cambiar el segmento del repo si su nombre difiere.

## Scripts

- `pnpm build` — salida en `dist/`.
- `pnpm deploy` — `pnpm build && gh-pages -d dist -b github-pages` según [`package.json`](package.json).

## Variables

- `VITE_PUBLIC_SITE_URL` — URL canónica del sitio en producción (OG, sitemap, canonical). Documentado en README.

## Problemas típicos

- Pantalla en blanco o assets 404: `base` no coincide con la ruta real del hosting.
- OG rotas: imagen o canonical con HTTP mezclado con HTTPS, o URL relativa en lugar de absoluta.
