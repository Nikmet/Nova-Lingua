import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Vercel (the real deploy target, see docs/adr/0006) serves from the domain root,
  // so base stays "/" there. The gh-pages script sets GH_PAGES=true to build for
  // https://nikmet.github.io/Nova-Lingua/ instead, a portfolio-only mirror.
  base: process.env.GH_PAGES ? '/Nova-Lingua/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
