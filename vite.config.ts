import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  preview: {
    // Deep links (/temple/..., /region/...) need SPA fallback in preview
  },
  appType: 'spa',
})
