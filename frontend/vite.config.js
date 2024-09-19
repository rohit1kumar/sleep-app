import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': process.env.VITE_API_URL || "http://localhost:3000"
      }
    }
  }
})
