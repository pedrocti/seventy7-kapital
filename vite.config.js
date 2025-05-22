import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Frontend-only configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },
  root: './client',
  publicDir: '../public',
  server: {
    port: 5000,
    host: '0.0.0.0',
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
});