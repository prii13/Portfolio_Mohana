import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
   base: '/Portfolio_Mohana/',
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    sourcemap: false,
    minify: 'oxc',

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }

          if (id.includes('node_modules/framer-motion/')) {
            return 'animations';
          }
        },
      },
    },
  },
});