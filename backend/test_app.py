import unittest
from app import create_app, db

class TaskManagerTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(testing=True)
        self.client = self.app.test_client()

        # Crear tablas en la base de datos de prueba
        with self.app.app_context():
            db.create_all()

    def test_get_tasks(self):
        # Intentar obtener tareas con credenciales incorrectas
        response = self.client.get('/tasks', headers={'Authorization': 'Basic 12345dXNlcjpwYXNzd29yZA=='})  # user:password
        self.assertEqual(response.status_code, 401)  # Debe fallar

        # Intentar obtener tareas con credenciales correctas
        response = self.client.get('/tasks', headers={'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='})  # user:password
        self.assertEqual(response.status_code, 200)  # Debe tener éxito 
        self.assertEqual(response.json, [])  # Lista vacía al inicio

    def test_add_task(self):
        new_task = {
            "title": "Prueba de tarea",
            "description": "Esto es una tarea de prueba"
        }
        response = self.client.post('/tasks', json=new_task, headers={'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='})  # user:password
        self.assertEqual(response.status_code, 201)
        self.assertIn('title', response.json)
        self.assertEqual(response.json['title'], "Prueba de tarea")

    def test_delete_task(self):
        new_task = {"title": "Tarea para eliminar", "description": "Descripción de prueba"}
        response = self.client.post('/tasks', json=new_task, headers={'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='})  # user:password
        task_id = response.json['id']

        delete_response = self.client.delete(f'/tasks/{task_id}', headers={'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='})  # user:password
        self.assertEqual(delete_response.status_code, 204)

        get_response = self.client.get('/tasks', headers={'Authorization': 'Basic dXNlcjpwYXNzd29yZA=='})  # user:password
        self.assertNotIn('Tarea para eliminar', [task['title'] for task in get_response.json])

if __name__ == '__main__':
    unittest.main(verbosity=2)
