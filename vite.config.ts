import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages: https://AstraA00.github.io/jumpion-web-app/
  base: command === 'build' ? '/jumpion-web-app/' : '/',
}))
