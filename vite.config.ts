import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Cấu hình Vite cho Render (cổng, host)
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
