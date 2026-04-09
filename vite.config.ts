import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'firebase'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', '@headlessui/react', 'react-select'],
          'data-vendor': ['@supabase/supabase-js', 'axios'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'dnd-vendor': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/accessibility'],
        },
      },
    },
  },
  test: {
    environment: 'node',
  },
});
