// apps/desktop/src/renderer/App.tsx
import React from 'react';

function App(): JSX.Element {

  const handlePing = () => {
    // Assuming 'electronAPI' was exposed in preload
    if (window.electronAPI) {
      window.electronAPI.sendPing();
      console.log('Ping sent via preload!');
    } else {
        console.warn('electronAPI not found. Was preload script successful?');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-cyan-500">¡Hola desde Pillo! (React)</h1>
      <p>Esta es la interfaz de la aplicación de escritorio.</p>
      <button
        onClick={handlePing}
        className="mt-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Test IPC Ping
       </button>
    </div>
  );
}

export default App;