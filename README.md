# Stefanini Latam Challenge

This project is a task management application developed for the Stefanini Latam Challenge. It consists of a simple frontend using React and a backend API built with Flask and SQLite. The application allows users to create, view, and delete tasks.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)

---

## Project Structure

The project is structured as follows:

```
Stefanini_Latam_Challenge/ ├── backend/ │ ├── app.py # Flask app with API endpoints │ ├── models.py # Database model definitions │ ├── test_app.py # Unit tests for backend │ ├── requirements.txt # Backend dependencies │ └── instance/ # Instance folder for Flask │ └── venv/ # Virtual environment folder for Python ├── .coverage # Coverage report for backend tests ├── frontend/ │ ├── coverage/ # Coverage report for frontend tests │ ├── node_modules/ # Node modules for React │ ├── public/ # Public folder for React │ └── src/ │ ├── images/ # Folder for images used in frontend │ ├── App.css # Main CSS file for React app │ ├── App.js # Main React component │ ├── App.test.js # Unit tests for frontend │ ├── index.css # CSS file for index │ ├── index.js # Entry point for React app │ ├── logo.svg # Logo for the app │ ├── reportWebVitals.js # Web vitals reporting for performance │ ├── setupTests.js # Setup for testing environment │ ├── TaskManager.css # CSS for Task Manager component │ └── TaskManager.js # Task management component ├── package.json # Frontend dependencies ├── package-lock.json # Lock file for dependencies └── .gitignore # Git ignore file for both backend and frontend
```

# General project instructions


---

## Prerequisites

- **Node.js** and **npm**: Download from [Node.js](https://nodejs.org/)
- **Python 3.9+**: Available at [Python.org](https://www.python.org/downloads/)
- **pip**: Python package installer
- **SQLite**: Integrated database with Python 3.9+

---

## Setup

### Clone Repository
1. Clone this repository:
    ```bash
    git clone <repository_url>
    cd Stefanini_Latam_Challenge
    ```

### Backend Setup
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Initialize the SQLite database:
    ```bash
    python3 -c "from app import db; db.create_all()"
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

---

## Running the Application

### Running the Backend Server
1. In the `backend` directory, ensure the virtual environment is activated.
2. Run the Flask app:
    ```bash
    python3 app.py
    ```
3. The backend server will start on `http://127.0.0.1:5000`.

### Running the Frontend Server
1. In the `frontend` directory:
    ```bash
    npm start
    ```
2. The frontend will start on `http://localhost:3000`.

---

## Testing

### Backend Tests
1. In the `backend` directory, activate the virtual environment.
2. Run tests with:
    ```bash
    python -m unittest discover
    ```
3. To view coverage, install `coverage` and run:
    ```bash
    pip install coverage
    coverage run -m unittest discover
    coverage report
    ```

### Frontend Tests
1. In the `frontend` directory, run:
    ```bash
    npm test -- --coverage

    ```

---

## API Endpoints

### `GET /tasks`
- **Description**: Retrieve all tasks.
- **Response**:
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
- **Description**: Create a new task.
- **Request**:
    ```json
    {
        "title": "New Task",
        "description": "Task Description"
    }
    ```
- **Response**:
    ```json
    {
        "id": 1,
        "title": "New Task",
        "description": "Task Description"
    }
    ```

### `DELETE /tasks/<id>`
- **Description**: Delete a task by ID.
- **Response**: Status `204 No Content` if successful.


