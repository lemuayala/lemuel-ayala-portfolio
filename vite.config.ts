import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// On Vercel the app is served from the domain root, so we use '/'.
// On GitHub Pages it lives at /lemuel-ayala-portfolio/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VERCEL ? '/' : '/lemuel-ayala-portfolio/',
});
