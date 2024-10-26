# Stefanini Latam Challenge

Este proyecto es una aplicación de gestión de tareas desarrollada para el Stefanini Latam Challenge. Consiste en un frontend simple usando React y una API backend construida con Flask y SQLite. La aplicación permite a los usuarios crear, ver y eliminar tareas.

## Demo del Proyecto

[![Demo del Proyecto](https://cdn-icons-png.flaticon.com/512/174/174883.png)](https://www.youtube.com/watch?v=O4FlfQrZm3Q)


## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Setup](#setup)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Testing](#testing)
- [Endpoints de la API](#endpoints-de-la-api)

---

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

```
Stefanini_Latam_Challenge/
├── backend/
│   ├── app.py                # Flask app with API endpoints
│   ├── models.py             # Database model definitions
│   ├── test_app.py           # Unit tests for backend
│   ├── requirements.txt      # Backend dependencies
│   └── instance/             # Instance folder for Flask
│       └── task.db/          # Archivo de base de datos
├── .coverage                 # Coverage report for backend tests
├── frontend/
│   ├── coverage/             # Coverage report for frontend tests
│   ├── node_modules/         # Node modules for React
│   ├── public/               # Public folder for React
│   └── src/
│       ├── images/           # Folder for images used in frontend
│       ├── App.css           # Main CSS file for React app
│       ├── App.js            # Main React component
│       ├── App.test.js       # Unit tests for frontend
│       ├── index.css         # CSS file for index
│       ├── index.js          # Entry point for React app
│       ├── logo.svg          # Logo for the app
│       ├── reportWebVitals.js # Web vitals reporting for performance
│       ├── setupTests.js     # Setup for testing environment
│       ├── TaskManager.css   # CSS for Task Manager component
│       └── TaskManager.js    # Task management component
├── package.json              # Frontend dependencies
├── package-lock.json         # Lock file for dependencies
└── .gitignore                # Git ignore file for both backend and frontend
```

---

## Prerrequisitos

- **Node.js** y **npm**: Descargar desde [Node.js](https://nodejs.org/)
- **Python 3.9+**: Disponible en [Python.org](https://www.python.org/downloads/)
- **pip**: Instalador de paquetes de Python
- **SQLite**: Base de datos integrada con Python 3.9+

---

## Setup

### Clonar el Repositorio
1. Clona este repositorio:
    ```bash
    git clone https://github.com/drodriguezol/stefanini-latam-challenge.git
    cd stefanini-latam-challenge
    ```

### Configuración del Backend
1. Navega al directorio `backend`:
    ```bash
    cd backend
    ```
2. Crea un entorno virtual y actívalo:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
    ```
3. Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```
### Configuración del Frontend
1. Navega al directorio `frontend`:
    ```bash
    cd ../frontend
    ```
2. Instala las dependencias:
    ```bash
    npm install
    npm install react react-dom axios react-scripts

    ```

---

## Ejecutar la Aplicación

### Ejecutar el Servidor Backend
1. En el directorio `backend`, asegúrate de que el entorno virtual esté activado.
2. Ejecuta la aplicación Flask:
    ```bash
    python3 app.py
    ```
3. El servidor backend se iniciará en `http://127.0.0.1:5000`.

### Ejecutar el Servidor Frontend
1. En el directorio `frontend`:
    ```bash
    npm start
    ```
2. El frontend se iniciará en `http://localhost:3000`.

---

## Testing

### Pruebas del Backend
1. En el directorio `backend`, activa el entorno virtual.
2. Ejecuta las pruebas con:
    ```bash
    python3 -m unittest discover
    ```
3. Para ver la cobertura, instala `coverage` y ejecuta:
    ```bash
    pip install coverage
    coverage run -m unittest discover
    coverage report
    ```

### Pruebas del Frontend
1. En el directorio `frontend`, ejecuta:
    ```bash
    npm test -- --watchAll --coverage

    ```

---

## Endpoints de la API

### `GET /tasks`
- **Descripción**: Recupera todas las tareas.
- **Respuesta**:
    ```json
    [
        {
            "id": 1,
            "title": "Task Title",
            "description": "Task Description"
        }
    ]
    ```

### `POST /tasks`
- **Descripción**: Crea una nueva tarea.
- **Solicitud**:
    ```json
    {
        "title": "New Task",
        "description": "Task Description"
    }
    ```
- **Respuesta**:
    ```json
    {
        "id": 1,
        "title": "New Task",
        "description": "Task Description"
    }
    ```

### `DELETE /tasks/<id>`
- **Descripción**: Elimina una tarea por ID.
- **Respuesta**: Estado `204 No Content` si se completa con éxito.
