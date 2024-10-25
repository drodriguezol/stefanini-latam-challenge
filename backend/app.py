from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Task  # Importa db y Task desde models.py

# Define un usuario y contraseña para la autenticación
USERNAME = 'user'
PASSWORD = 'password'

def create_app(testing=False):
    app = Flask(__name__)
    CORS(app)

    # Configuración de la base de datos
    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Base de datos en memoria para pruebas
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # Base de datos de producción
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # Crear las tablas solo en producción
    if not testing:
        with app.app_context():
            db.create_all()

    # Función para verificar el usuario y la contraseña
    def verify_credentials():
        auth = request.authorization
        if not auth or auth.username != USERNAME or auth.password != PASSWORD:
            return jsonify({"error": "Unauthorized"}), 401

    # Define rutas aquí
    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        auth_response = verify_credentials()
        if auth_response: return auth_response
        tasks = Task.query.all()
        tasks_list = [{"id": task.id, "title": task.title, "description": task.description} for task in tasks]
        return jsonify(tasks_list)

    @app.route('/tasks', methods=['POST'])
    def add_task():
        auth_response = verify_credentials()
        if auth_response: return auth_response
        task_data = request.get_json()
        new_task = Task(title=task_data['title'], description=task_data['description'])
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"id": new_task.id, "title": new_task.title, "description": new_task.description}), 201

    @app.route('/tasks/<int:id>', methods=['DELETE'])
    def delete_task(id):
        auth_response = verify_credentials()
        if auth_response: return auth_response
        task = db.session.get(Task, id)
        if task is None:
            return jsonify({"error": "Tarea no encontrada"}), 404
        db.session.delete(task)
        db.session.commit()
        return '', 204

    return app

# Inicia la aplicación solo si el archivo se ejecuta directamente
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
