// apps/desktop/src/tests/setup.ts
import '@testing-library/jest-dom/vitest'; // Extiende expect con matchers de jest-dom

// Puedes añadir aquí mocks globales, configuraciones, etc.
// Ejemplo: Mockear API de Electron si es necesario para tests de UI
// import { vi } from 'vitest'; // Importa 'vi' si lo usas
// vi.mock('electron', () => ({
//   ipcRenderer: {
//     on: vi.fn(),
//     send: vi.fn(),
//     removeListener: vi.fn(),
//   },
// }));