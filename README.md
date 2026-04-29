# Portfolio profesional — Lemuel Ayala

Desarrollador full stack · **React** · **TypeScript** · **.NET**

Portfolio personal con diseño tipo liquid glass (iOS), modo claro/oscuro, animaciones y formulario de contacto.

![Preview del Portfolio](https://github.com/user-attachments/assets/1ac5682f-2916-4503-9d56-2927c8e4f281)

## Características

- **Modo claro/oscuro** — toggle persistente; tema aplicado antes del primer paint para reducir parpadeos.
- **Cursor lumos** — halo que sigue el puntero en escritorio (desactivado en táctil).
- **Sección «Conóceme en código»** — editor simulado con pestañas, resaltado básico y modo claro/oscuro alineado al tema.
- **Proyectos** — tarjetas con preview o mockup navegador; hover tipo Siri; soporte light/dark en mockups.
- **Multi-idioma** — español / inglés (`react-i18next`, JSON en `src/locales/`).
- **Contacto** — EmailJS + reCAPTCHA v2 (variables de entorno).
- **Footer** — tagline i18n (React y Tailwind CSS).

## Tecnologías

### Frontend

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- EmailJS · react-google-recaptcha · react-hot-toast · Lucide

### Otros (experiencia / proyectos)

- .NET · SQL Server · Azure (según CV y proyectos listados)

## Estructura del proyecto

```text
src/
├── components/           # Piezas reutilizables (NavBar, CodeEditor, CursorGlow, …)
├── components/sections/  # Home, About, Projects, Contact, Footer
├── context/              # LanguageContext (i18n)
├── locales/              # es.json · en.json
├── App.tsx
└── main.tsx

public/
├── previews/             # Capturas para tarjetas de proyecto
└── image.png             # Favicon (y recurso para OG si lo referencias en index)
```

`robots.txt` y `sitemap.xml` no viven en `public/`; el build los escribe en `dist/` (ver `vite.config.ts`).

No hay carpeta `src/assets`; las imágenes públicas van en `public/`.

## Variables de entorno

Crea un archivo `.env` en la raíz:

```env
VITE_SERVICE_ID=tu_service_id_emailjs
VITE_TEMPLATE_ID=tu_template_id
VITE_PUBLIC_KEY=tu_public_key
VITE_RECAPTCHA_SITE_KEY=tu_site_key_recaptcha

# Opcional: URL canónica del sitio (Open Graph, canonical, JSON-LD).
# Ejemplo GitHub Pages: https://tuusuario.github.io/lemuel-ayala-portfolio
# Ejemplo Vercel: https://tu-app.vercel.app
VITE_PUBLIC_SITE_URL=https://lemuayala.github.io/lemuel-ayala-portfolio
```

Si no defines `VITE_PUBLIC_SITE_URL`, el build usa una URL por defecto pensada para GitHub Pages (ver `vite.config.ts`).

## Cómo ejecutarlo

1. **Clonar**

```bash
git clone https://github.com/lemuayala/lemuel-ayala-portfolio.git
cd lemuel-ayala-portfolio
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar** `.env` como arriba.

4. **Desarrollo**

```bash
pnpm dev
```

5. **Build de producción**

```bash
pnpm build
```

6. **Preview del build**

```bash
pnpm preview
```

## Despliegue

- **`vite.config.ts`**: si existe la variable de entorno `VERCEL`, `base` es `'/'`. En otros entornos (p. ej. GitHub Pages en subruta) `base` es `'/lemuel-ayala-portfolio/'`.
- Script **`pnpm deploy`**: ejecuta build y publica `dist` en la rama `github-pages` con `gh-pages` (ajusta según tu flujo).

Tras cambiar de dominio o de proveedor, define `VITE_PUBLIC_SITE_URL` en `.env` antes del build: **`pnpm build`** genera `dist/robots.txt` y `dist/sitemap.xml` con esa URL (plugin en [`vite.config.ts`](vite.config.ts)).

## Contacto

- **Email:** [lemuayala@gmail.com](mailto:lemuayala@gmail.com)
- **LinkedIn:** [linkedin.com/in/lemuayala](https://linkedin.com/in/lemuayala)
- **GitHub:** [github.com/lemuayala](https://github.com/lemuayala)

Proyecto destacado: [Glass UI](https://github.com/lemuayala/glass-ui) · [Demo](https://v0-glass-ui-flax.vercel.app/)

## Licencia

MIT License — Copyright (c) 2026 Lemuel Ayala
