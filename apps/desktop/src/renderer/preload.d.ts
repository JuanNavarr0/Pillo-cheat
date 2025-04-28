// apps/desktop/src/renderer/preload.d.ts

// Importa los tipos de las funciones que expones si es necesario
// import { IpcRenderer } from 'electron';

// Declara una interfaz para la API que expusiste desde preload.ts
export interface IElectronAPI {
  sendPing: () => void;
  // Añade aquí los tipos para otras funciones/propiedades que expongas
  // Ejemplo: onUpdateCounter: (callback: (event: IpcRendererEvent, value: number) => void) => void;
}

// Extiende la interfaz global Window para incluir tu API
declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

// Es necesario exportar algo para que TypeScript lo trate como un módulo
export {};
