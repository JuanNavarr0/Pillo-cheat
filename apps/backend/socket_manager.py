# apps/backend/socket_manager.py
import socketio
import logging

# Configura un logger básico para ver eventos de socket
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 1. Crea una instancia del servidor Socket.IO ASGI
#    async_mode='asgi' es crucial para la integración con FastAPI/Uvicorn
#    cors_allowed_origins='*' permite conexiones desde cualquier origen (¡AJUSTAR PARA PRODUCCIÓN!)
sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=[], # Empezar vacío por seguridad, añadiremos el origen del renderer después
    logger=True, # Usar logger estándar para eventos de socketio
    engineio_logger=True # Loggear también eventos de Engine.IO (capa inferior)
)

# 2. Crea una aplicación ASGI para Socket.IO (que montaremos en FastAPI)
#    El path '/ws' es donde el cliente se conectará (ej: ws://localhost:8000/ws)
sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='/ws' # El path donde escucha Socket.IO
)

# 3. Define manejadores de eventos estándar de Socket.IO
@sio_server.event
async def connect(sid: str, environ: dict, auth: dict | None = None):
    """Se llama cuando un cliente se conecta."""
    logger.info(f"Cliente conectado: sid={sid}")
    # Aquí podríamos validar 'auth' si lo enviamos desde el cliente
    # Ejemplo de envío de mensaje al cliente recién conectado:
    await sio_server.emit('saludo', {'mensaje': f'Hola cliente {sid}, ¡bienvenido!'}, room=sid)

@sio_server.event
async def disconnect(sid: str):
    """Se llama cuando un cliente se desconecta."""
    logger.info(f"Cliente desconectado: sid={sid}")

# 4. Define manejadores para eventos personalizados (ejemplo)
@sio_server.event
async def mensaje_test(sid: str, data: dict):
    """Escucha un evento 'mensaje_test' enviado por un cliente."""
    logger.info(f"Mensaje recibido de {sid}: {data}")
    # Responder al cliente que envió el mensaje
    await sio_server.emit('respuesta_test', {'respuesta': 'Mensaje recibido OK'}, room=sid)

# Podríamos añadir más eventos aquí para manejar el stream de audio, eventos UI, etc.

# (Opcional) Función para emitir eventos desde otras partes de la app FastAPI
async def emitir_evento_a_todos(evento: str, data: dict):
    """Emite un evento a todos los clientes conectados."""
    await sio_server.emit(evento, data)

async def emitir_evento_a_sid(sid: str, evento: str, data: dict):
    """Emite un evento a un cliente específico por su SID."""
    await sio_server.emit(evento, data, room=sid)