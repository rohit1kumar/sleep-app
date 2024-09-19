import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const API_URL = process.env.VITE_API_URL || 'http://localhost:3000'
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': API_URL
      }
    }
  }
})
