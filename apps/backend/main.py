# apps/backend/main.py
from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Cargar variables de entorno (especialmente útil para claves API, etc.)
# Busca un archivo .env en el directorio actual o superior
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


# Aquí añadiremos los endpoints /ws, /v1/transcribe, /v1/chat, etc.

if __name__ == "__main__":
    # Esto permite ejecutar el servidor directamente con `python main.py`
    # para desarrollo rápido, aunque Uvicorn CLI es preferible.
    import uvicorn

    print("Ejecutando servidor FastAPI en modo desarrollo...")
    uvicorn.run(
        "main:app",  # Apunta a la instancia 'app' en el archivo 'main.py'
        host=os.getenv("BACKEND_HOST", "127.0.0.1"),
        port=int(os.getenv("BACKEND_PORT", 8000)),
        reload=True,  # Recarga automáticamente en cambios (solo para desarrollo)
    )
