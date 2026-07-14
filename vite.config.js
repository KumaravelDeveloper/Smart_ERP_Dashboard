import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/Smart_ERP_Dashboard/',
  plugins: [react()],
  build: {
    outDir: '../',
    emptyOutDir: false, // CRITICAL: Prevent deleting the root directory containing source code
  }
})
