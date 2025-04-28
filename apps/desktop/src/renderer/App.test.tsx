// apps/desktop/src/renderer/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App'; // Importa el componente a testear

describe('App Component', () => {
  it('renders the main heading', () => {
    // Renderiza el componente
    render(<App />);

    // Busca el encabezado por su texto (insensible a mayúsculas/minúsculas)
    const headingElement = screen.getByText(/¡Hola desde Pillo!/i);

    // Verifica que el elemento existe en el DOM virtual
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the IPC ping button', () => {
    render(<App />);
    // Busca el botón por su texto
    const buttonElement = screen.getByRole('button', { name: /Test IPC Ping/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // Aquí podríamos añadir tests para simular clicks y verificar llamadas a window.electronAPI
  // usando vi.spyOn o mocks configurados en setup.ts
});