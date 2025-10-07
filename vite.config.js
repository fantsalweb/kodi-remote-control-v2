// vite.config.js (Ejemplo corregido)
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple'; 
import { join } from 'path';

export default defineConfig({
  // Asegura que las rutas estáticas funcionen
  base: './', 
  plugins: [
    electron({
      main: {
        entry: 'main.js', // El archivo principal de Electron
      },
      renderer: {
        // EL ARCHIVO QUE CONTIENE TU APP PRINCIPAL Y LIT
        entry: 'index.html', 
      },
    }),
  ],
  build: {
    outDir: 'dist', 
  }
});