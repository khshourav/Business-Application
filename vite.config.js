import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css', 
        'resources/js/app.jsx'
      ],
      refresh: [
        'resources/js/**', // Watches all JS/JSX files
      ],
    }),
    react(),
  ],
  server: {
    host: 'aqiservices.test',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'aqiservices.test',
    },
    cors: true, // Simplify for local dev
  },
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
});