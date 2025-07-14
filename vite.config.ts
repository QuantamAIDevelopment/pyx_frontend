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
    chunkSizeWarningLimit: 1000, // Optional: raise limit to avoid noise for known big deps
  },
})
