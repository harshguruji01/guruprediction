import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/android/**', '**/ios/**', '**/test/**', '**/.git/**', '**/build/**', '**/*.png']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        download: resolve(__dirname, 'download/index.html')
      }
    }
  }
});
