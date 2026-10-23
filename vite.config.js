import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('.', import.meta.url));
const pages = [
  'index',
  'home',
  'explore',
  'courses',
  'careers',
  'roadmap',
  'resources',
  'skills',
  'updates',
  'project',
  'decision-matrix',
  'login',
  'signup',
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(root, `${page}.html`)]),
      ),
    },
  },
});
