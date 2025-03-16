import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    strictPort: true,
  },
  plugins: [react(), basicSsl()],
  server: {
    https: true,
    host: true,
  }
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';


// export default defineConfig({
//   plugins: [react()],
//   plugins: [react(), basicSsl()],
//   server: {
//     port: 5173,  // Frontend Port
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',  // Backend Port
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       },
//     },
//     https: true,
//     host: true,
//   }
// });