import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    https: true,
    host: true
  },
  plugins: [react(), basicSsl()],
  base: process.env.VITE_API_BASE || '/Solomonopoly',
});
