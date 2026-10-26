import { defineConfig } from 'vite';

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
    sourcemap: false
  }
});
