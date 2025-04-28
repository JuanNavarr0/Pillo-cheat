// apps/desktop/vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Combina la configuración de Vite con la de Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar APIs de Vitest globalmente (describe, it, expect...)
    environment: 'jsdom', // Simula el DOM
    setupFiles: './src/tests/setup.ts', // Archivo de setup para tests (opcional, lo crearemos)
    coverage: {
      provider: 'v8', // Usa el provider V8
      reporter: ['text', 'json', 'html'], // Formatos de reporte de cobertura
      reportsDirectory: './coverage', // Carpeta de salida para reportes HTML/JSON
      include: ['src/renderer/**/*.{ts,tsx}', 'src/preload/**/*.ts'], // Qué incluir en cobertura
      exclude: [ // Qué excluir
        'src/**/main.ts', // El proceso main es difícil de testear unitariamente aquí
        'src/**/*.d.ts',
        'src/tests',
        'out',
        '.*.cjs',
      ],
      all: true, // Intenta incluir todos los archivos del 'include', incluso sin tests
      lines: 80, // Metas de cobertura (opcionales, podemos ajustarlas luego)
      functions: 80,
      branches: 80,
      statements: 80,
    },
    alias: { // Asegura que los alias de Vite funcionen en tests
        '@renderer': resolve(__dirname, './src/renderer')
    },
  },
  // Añadir resolve alias aquí también si no está heredado de la config principal
  resolve: {
      alias: {
          '@renderer': resolve(__dirname, './src/renderer')
      }
  }
});