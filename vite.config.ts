import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxies to your local backends during development to avoid CORS
      '/api/contact': {
        target: process.env.VITE_DEV_CONTACT_TARGET || 'http://localhost:8085',
        changeOrigin: true,
      },
      '/api/keys': {
        target: process.env.VITE_DEV_KEYS_TARGET || 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
          ],
          lucide: ['lucide-react'],
          framer: ['framer-motion'],
          recharts: ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, 
  },
})
