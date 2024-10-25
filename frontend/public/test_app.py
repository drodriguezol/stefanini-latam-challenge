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
        response = self.client.get('/tasks')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

    def test_add_task(self):
        new_task = {
            "title": "Prueba de tarea",
            "description": "Esto es una tarea de prueba"
        }
        response = self.client.post('/tasks', json=new_task)
        self.assertEqual(response.status_code, 201)
        self.assertIn('title', response.json)
        self.assertEqual(response.json['title'], "Prueba de tarea")

    def test_delete_task(self):
        new_task = {"title": "Tarea para eliminar", "description": "Descripción de prueba"}
        response = self.client.post('/tasks', json=new_task)
        task_id = response.json['id']

        delete_response = self.client.delete(f'/tasks/{task_id}')
        self.assertEqual(delete_response.status_code, 204)

        get_response = self.client.get('/tasks')
        self.assertNotIn('Tarea para eliminar', [task['title'] for task in get_response.json])


if __name__ == '__main__':
    unittest.main(verbosity=2)
