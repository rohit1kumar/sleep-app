import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': "https://sleep-api.onrender.com" || "http://localhost:3000"
      }
    }
  }
})
