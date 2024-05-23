import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: process.env.PORT || 4173,
    host: true,
  }
});
