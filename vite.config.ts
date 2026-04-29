import path from 'node:path';
import fs from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_SITE_URL =
  'https://lemuayala.github.io/lemuel-ayala-portfolio';

// https://vite.dev/config/
// On Vercel the app is served from the domain root, so we use '/'.
// On GitHub Pages it lives at /lemuel-ayala-portfolio/.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isVercel = Boolean(process.env.VERCEL || env.VERCEL);
  const siteUrl = (env.VITE_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(
    /\/$/,
    ''
  );

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-public-site-url',
        transformIndexHtml(html: string) {
          return html.replace(/%PUBLIC_SITE_URL%/g, siteUrl);
        },
      },
      {
        name: 'emit-seo-files',
        closeBundle() {
          const outDir = path.resolve(process.cwd(), 'dist');
          if (!fs.existsSync(outDir)) return;

          const robots = [
            'User-agent: *',
            'Allow: /',
            '',
            `Sitemap: ${siteUrl}/sitemap.xml`,
            '',
          ].join('\n');

          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

          fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');
          fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
        },
      },
    ],
    base: isVercel ? '/' : '/lemuel-ayala-portfolio/',
  };
});
