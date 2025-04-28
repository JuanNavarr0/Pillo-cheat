# apps/backend/tests/test_main.py (Usando TestClient)

# Quitamos pytest ya que no usamos el marcador asyncio
# import pytest
from fastapi.testclient import TestClient # Importa TestClient

# Importa la app de FastAPI
try:
    from ..main import app
except ImportError:
    from main import app

# Crea una instancia del TestClient pasando tu aplicación FastAPI
client = TestClient(app)

# Los tests ahora son funciones normales (no async)
def test_read_root():
    """Testea el endpoint raíz '/'."""
    # Usa el cliente de forma síncrona
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bienvenido al backend de Pillo"}

def test_health_check():
    """Testea el endpoint '/health'."""
    # Usa el cliente de forma síncrona
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}