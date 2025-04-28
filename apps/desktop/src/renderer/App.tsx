// apps/desktop/src/renderer/App.tsx (CORREGIDO)
import { useEffect, useState } from 'react'; // Quitamos import React innecesario
// Import socket.io-client
import { io, Socket } from 'socket.io-client'; // Importamos Socket para tipado opcional

// Definimos tipos para los datos de los eventos (buena práctica)
interface SaludoData {
  mensaje: string;
}
interface RespuestaTestData {
  respuesta: string;
}
interface MensajeTestData {
  cliente_mensaje: string;
}

function App() {
  const [response, setResponse] = useState<string>(''); // Añadimos tipo al estado
  const [isConnected, setIsConnected] = useState<boolean>(false); // Estado para conexión

  useEffect(() => {
    console.log('Intentando conectar al WebSocket...');

    // 1. Defina la URL y el path correctos
    const socket: Socket = io('ws://localhost:8000', { // URL base
      path: '/ws', // Path donde escucha el server
      // Opciones adicionales si fueran necesarias (ej. reconexión)
      // reconnectionAttempts: 5,
      // reconnectionDelay: 1000,
    });

    // 2. Registra manejadores de eventos
    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket! SID:', socket.id);
      setIsConnected(true);
      // Enviamos el mensaje de prueba DESPUÉS de confirmar la conexión
      socket.emit('mensaje_test', { cliente_mensaje: 'Hola servidor desde React!' });
    });

    socket.on('disconnect', (reason) => {
      console.log('Desconectado del servidor WebSocket:', reason);
      setIsConnected(false);
      setResponse('Desconectado'); // Actualiza UI al desconectar
    });

    socket.on('connect_error', (error) => {
        console.error('Error de conexión WebSocket:', error);
        setIsConnected(false);
        setResponse('Error de conexión');
      });

    socket.on('saludo', (data: SaludoData) => {
      console.log('Mensaje de saludo recibido:', data.mensaje);
      setResponse(data.mensaje); // Actualizar el estado para mostrarlo
    });

    socket.on('respuesta_test', (data: RespuestaTestData) => {
      console.log('Respuesta del servidor:', data.respuesta);
      // Podrías mostrar esta respuesta también si quisieras
    });

    // 3. Limpieza: Desconecta el socket cuando el componente se desmonta
    return () => {
      console.log('Desconectando socket...');
      socket.disconnect();
      setIsConnected(false);
    };
  }, []); // El array vacío asegura que useEffect se ejecuta solo al montar/desmontar

  // Función para manejar el click del botón (usa sendPing)
  const handlePingClick = () => {
    if (window.electronAPI) {
        console.log('Enviando ping IPC...');
        window.electronAPI.sendPing(); // <-- Llamada corregida a sendPing
    } else {
        console.error('electronAPI no encontrada en window!');
    }
  }

  return (
    // Usamos Tailwind para un estilo rápido
    <div className="p-4 font-sans">
      <h1 className="text-xl font-bold mb-3">Pillo App</h1>
      <div className="mb-3">
        Estado WS:
        <span className={`ml-2 font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Conectado' : 'Desconectado'}
        </span>
      </div>
      <div className="mb-3">
        Respuesta Backend:
        <strong className={`ml-2 ${isConnected ? 'text-blue-700' : 'text-gray-500'}`}>
          {response || (isConnected ? 'Esperando saludo...' : 'N/A')}
        </strong>
      </div>
      {/* Usamos la función handler para el onClick */}
      <button
        onClick={handlePingClick}
        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={!window.electronAPI} // Deshabilitar si la API no está lista
      >
        Test IPC Ping
      </button>
    </div>
  );
}

export default App;