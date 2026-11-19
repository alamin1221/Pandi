import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages, create a .env file with:
// VITE_BASE=/your-repository-name/
// Everything else can stay as-is.
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
