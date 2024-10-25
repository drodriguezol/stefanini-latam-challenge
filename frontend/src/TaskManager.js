import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './TaskManager.css';
import logo from './images/stefanini.png'; // Ruta del logo
import eyeIcon from './images/eye.png'; // Ruta de la imagen que se usará para revelar las credenciales

const TaskManager = () => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error

  // Estado para controlar la visibilidad de las credenciales
  const [showCredentials, setShowCredentials] = useState(false);
  const actualUsername = 'user'; // Nombre de usuario real
  const actualPassword = 'password'; // Contraseña real

  // Función para obtener las tareas desde el backend
  const fetchTasks = useCallback(async () => {
    if (!username || !password) {
      setError('Username and password missing');
      return;
    }
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks', {
        auth: {
          username: username,
          password: password
        }
      });
      setTasks(response.data);
      setError(''); // Limpia el mensaje de error si la solicitud es exitosa
    } catch (error) {
      handleApiError(error);
    }
  }, [username, password]);

  useEffect(() => {
    if (username && password) fetchTasks();
  }, [username, password, fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password missing');
      return;
    }
    const newTask = { title, description };
    try {
      const response = await axios.post('http://127.0.0.1:5000/tasks', newTask, {
        auth: {
          username: username,
          password: password
        },
        headers: { 'Content-Type': 'application/json' }
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle('');
      setDescription('');
      setError(''); // Limpia el mensaje de error si la solicitud es exitosa
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!username || !password) {
      setError('Username and password missing');
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${id}`, {
        auth: {
          username: username,
          password: password
        }
      });
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id)); // Elimina localmente
      setError(''); // Limpia el mensaje de error si la solicitud es exitosa
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
      setError('Invalid username or password');
    } else {
      setError('Error en la solicitud, intenta de nuevo');
    }
  };

  return (
    <div className="container">
      <div className="header-container">
        <h1 className="text-center mb-4">Stefanini Latam Challenge</h1>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo de Stefanini" className="logo-centered" />
        </div>
      </div>
      <h2>Gestión de Tareas</h2>

      {/* Campo de entrada para el nombre de usuario */}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </form>

      {/* Mostrar mensaje de error */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Sección para mostrar el usuario y la contraseña */}
      <div className="credentials-container">
        <img 
          src={eyeIcon} 
          alt="Reveal credentials" 
          onMouseEnter={() => setShowCredentials(true)} 
          onMouseLeave={() => setShowCredentials(false)} 
          className="eye-icon" 
        />
        {showCredentials && (
          <p>
            Usuario: <strong>{actualUsername}</strong> | Contraseña: <strong>{actualPassword}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
