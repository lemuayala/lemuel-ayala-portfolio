import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// On Vercel the app is served from the domain root, so we use '/'.
// On GitHub Pages it lives at /lemuel-ayala-portfolio/.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isVercel = Boolean(env.VERCEL);
  return {
    plugins: [react(), tailwindcss()],
    base: isVercel ? '/' : '/lemuel-ayala-portfolio/',
  };
});
