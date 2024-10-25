import { render, screen, fireEvent, act } from '@testing-library/react';
import TaskManager from './TaskManager';
import axios from 'axios';
import App from './App';

// Mock de Axios antes de cada prueba
beforeEach(() => {
  jest.spyOn(axios, 'get').mockResolvedValue({
    data: [
      { id: 1, title: 'Tarea de prueba', description: 'Descripción de prueba' },
    ],
  });

  jest.spyOn(axios, 'post').mockResolvedValue({
    data: { id: 2, title: 'Nueva Tarea', description: 'Nueva descripción' },
  });

  jest.spyOn(axios, 'delete').mockResolvedValue({ status: 204 });
});

// Restaura los mocks después de cada prueba para evitar interferencias
afterEach(() => {
  jest.restoreAllMocks();
});

test('carga y muestra las tareas iniciales', async () => {
  render(<TaskManager />);

  // Simula el ingreso de credenciales correctas
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña/i), { target: { value: 'password' } });

  // Espera a que las tareas de prueba aparezcan en el DOM
  expect(await screen.findByText(/Tarea de prueba/i)).toBeInTheDocument();
  expect(await screen.findByText(/Descripción de prueba/i)).toBeInTheDocument();
});

test('agrega una nueva tarea cuando se llena el formulario', async () => {
  render(<TaskManager />);

  // Simula el ingreso de credenciales correctas
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña/i), { target: { value: 'password' } });

  // Simula la entrada de datos
  fireEvent.change(screen.getByPlaceholderText(/Título/i), { target: { value: 'Nueva Tarea' } });
  fireEvent.change(screen.getByPlaceholderText(/Descripción/i), { target: { value: 'Nueva descripción' } });

  // Usa `act` para procesar el cambio de estado
  await act(async () => {
    fireEvent.click(screen.getByText(/Agregar Tarea/i));
  });

  // Verifica que la nueva tarea aparece en el DOM
  expect(await screen.findByText(/Nueva Tarea/i)).toBeInTheDocument();
  expect(await screen.findByText(/Nueva descripción/i)).toBeInTheDocument();
});

test('elimina una tarea correctamente', async () => {
  render(<TaskManager />);

  // Simula el ingreso de credenciales correctas
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña/i), { target: { value: 'password' } });

  // Espera a que la tarea de prueba cargue en el DOM
  const tarea = await screen.findByText(/Tarea de prueba/i);

  // Simula el clic en el botón "Eliminar" de la tarea
  const botonEliminar = tarea.closest('li').querySelector('.delete-btn');
  await act(async () => {
    fireEvent.click(botonEliminar);
  });

  // Verifica que la tarea ha sido eliminada
  expect(screen.queryByText(/Tarea de prueba/i)).not.toBeInTheDocument();
});

// Nueva prueba para manejar la validación de credenciales
test('muestra un error si el usuario o la contraseña son inválidos', async () => {
  render(<TaskManager />);

  // Simula el ingreso de credenciales incorrectas
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i), { target: { value: 'wrongUser' } });
  fireEvent.change(screen.getByPlaceholderText(/Ingresa tu contraseña/i), { target: { value: 'wrongPassword' } });


  // Mock de Axios para que devuelva un error 401
  jest.spyOn(axios, 'post').mockRejectedValue({
    response: { status: 401 }
});


  // Intenta obtener tareas (o cualquier acción que desencadene la verificación de credenciales)
  await act(async () => {
      fireEvent.click(screen.getByText(/Agregar Tarea/i));  // O cualquier acción que desencadene fetchTasks
  });

  expect(await screen.findByText(/Invalid username or password/i)).toBeInTheDocument();

});

test('renderiza el componente TaskManager', () => {
  render(<App />);
  
  // Verifica que el TaskManager se haya renderizado
  const taskManagerElement = screen.getByText(/gestión de tareas/i); // Ajusta el texto según tu implementación en TaskManager
  expect(taskManagerElement).toBeInTheDocument();
});

