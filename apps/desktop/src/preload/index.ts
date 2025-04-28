// apps/desktop/src/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';
// import { electronAPI } from '@electron-toolkit/preload'; // Example from toolkit

// Custom APIs for renderer
const api = {
  sendPing: () => ipcRenderer.send('ping'),
  // Add other APIs needed by the renderer process here
  // Example: handle backend communication setup
};

// Use `contextBridge` to expose Node.js-based APIs to your renderer process
// in a controlled and secure way.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', api); // Expose 'api' object
    // contextBridge.exposeInMainWorld('electron', electronAPI); // Optional: expose toolkit api
  } catch (error) {
    console.error('Failed to expose preload API:', error);
  }
} else {
  // @ts-expect-error (define in dts) // <-- CAMBIADO
  window.electronAPI = api; // Less secure, use only if contextIsolation is false
  // window.electron = electronAPI;
}

console.log('Preload script loaded.');
