import TodoController from '../controllers/todoController';
import ContentValidator from '../middleware/ContentValidator';
import Authentication from '../middleware/Authentication';

const todoRoutes = app => {
  // get all todos for a specific user
  app.get(
    '/api/v1/todos',
    Authentication.authenticateUser,
    TodoController.getTodos
  );

  // Post a todo
  app.post(
    '/api/v1/todos',
    [Authentication.authenticateUser, ContentValidator.isValidTitle],
    TodoController.addTodo
  );

  // get a todo by the id
  app.get(
    '/api/v1/todos/:todoId',
    Authentication.authenticateUser,
    TodoController.getTodoById
  );

  // update a todo by the id
  app.put(
    '/api/v1/todos/:todoId',
    Authentication.authenticateUser,
    TodoController.updateTodoById
  );

  // delete a todo by the id
  app.delete(
    '/api/v1/todos/:todoId',
    Authentication.authenticateUser,
    TodoController.deleteTodoById
  );
};

export default todoRoutes;
