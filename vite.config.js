import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {port: 3000,
    allowedHosts: ['https://2182-89-38-99-79.ngrok-free.app','2182-89-38-99-79.ngrok-free.app'],
    proxy: {
      '/auth': 'http://localhost:8080',
    }},
})
