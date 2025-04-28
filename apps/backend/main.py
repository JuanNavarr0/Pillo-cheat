# apps/backend/main.py (Modificado)
from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Importa sio_app desde nuestro gestor
from socket_manager import sio_app as fastapi_sio_app # Renombramos para evitar conflicto de nombres

# Cargar variables de entorno
load_dotenv()

# Crear instancia de la aplicación FastAPI
app = FastAPI(
    title="Pillo Backend API",
    description="API para la aplicación Pillo, gestionando transcripción y chat.",
    version="0.0.1",
)

@app.get("/")
async def read_root():
    """Endpoint raíz de bienvenida."""
    return {"message": "Bienvenido al backend de Pillo"}

@app.get("/health")
async def health_check():
    """Endpoint simple para verificar que el servidor está vivo."""
    return {"status": "ok"}

# Aquí añadiremos los endpoints REST /v1/transcribe, /v1/chat más adelante

# Monta la aplicación Socket.IO ASGI en la aplicación FastAPI
# Cualquier tráfico que vaya a /ws (o subrutas) será manejado por sio_app
app.mount("/ws", fastapi_sio_app)

# --- NO CAMBIA ---
if __name__ == "__main__":
    import uvicorn
    print("Ejecutando servidor FastAPI con Socket.IO en modo desarrollo...")
    # Uvicorn necesita saber dónde está la app principal 'app' en 'main.py'
    # No necesita saber explícitamente sobre el montaje de Socket.IO
    uvicorn.run(
        "main:app",
        host=os.getenv("BACKEND_HOST", "127.0.0.1"),
        port=int(os.getenv("BACKEND_PORT", 8000)),
        reload=True,
        reload_dirs=["."] # Asegura que Uvicorn vigile el directorio actual para recargar
    )