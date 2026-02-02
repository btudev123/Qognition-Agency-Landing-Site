
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 'base' is crucial for GitHub Pages. './' allows assets to load relatively 
  // regardless of the repo name in the URL (e.g. username.github.io/repo-name/).
  base: './', 
});
