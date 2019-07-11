
import TodoController from '../controllers/todoController'
;

const routes = (app) =>{
  app.get('/', (request, response) => response.status(200).send({
    statusCode: 200,
    success: true,
    message: 'Welcome to the Todo API',
  }));

  app.get('/api/v1/todos', TodoController.getTodos);

  app.post('/api/v1/todo', TodoController.addTodo);

  app.get('/api/v1/todos/:todoId', TodoController.getTodoById);

  app.put('/api/v1/todos/:todoId', TodoController.updateTodoById);

  app.delete('/api/v1/todos/:todoId', TodoController.deleteTodoById);

};

export default routes;
