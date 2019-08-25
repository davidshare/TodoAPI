import Todo from '../database/models/TodoModel';

/**
 * @fileoverview Class to manage Todo Services
 * @class TodoService
 * @exports TodoService
 * @description a class to manage user service operations
 */
class TodoService {
  /**
   * @param {Object} userObject - title, description, userId
   * @return {Object} json
   * @description static method to create todos
   */
  static async createTodo({ title, description, userId }) {
    try {
      const todo = new Todo({ title, description, userId });
      return await todo.create();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} userObject - title, description, userId, todoId
   * @return {Object} json
   * @description static method to create todos
   */
  static async updateTodo({ todoId, title, description, userId }) {
    try {
      const todo = new Todo({ todoId, title, description, userId });
      return await todo.update();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} userId
   * @return {Object} json
   * @description static method to find all todos
   */
  static async fetchTodos(userId) {
    try {
      return await Todo.findAllUserTodos(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} todoId, userId
   * @return {Object} json
   * @description static method to find a single todo
   */
  static async fetchTodoById({ todoId, userId }) {
    try {
      return await Todo.findUserTodoById({ todoId, userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} todoId, userId
   * @return {Object} json
   * @description static method to delete a todo by id
   */
  static async deleteTodoById({ todoId, userId }) {
    try {
      return await Todo.delete({ todoId, userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoService;
