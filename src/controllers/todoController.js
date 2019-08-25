import TodoService from '../services/TodoService';
import sendResponse from '../helpers/responseHelpers';
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  TODO_NOT_FOUND,
  TODOS_NOT_FOUND,
  ADD_TODO_FAILURE
} from '../helpers/constants';

/**
 * @fileoverview Class to manage todos
 * @class TodoController
 * @exports TodoController
 */
class TodoController {
  /**
   * @param {Object} request
   * @param {Object} response
   * @param {object} next - Error handler
   * @description Create a todo
   * @return {Object} json
   * @memberof TodoController
   */
  static async addTodo(request, response, next) {
    try {
      const { title, description } = request.body;
      const userId = request.user.id;
      const result = await TodoService.createTodo({
        title,
        description,
        userId
      });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 400, false, ADD_TODO_FAILURE);
      }
      return sendResponse(response, 201, false, ADD_TODO_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  get all todos
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async getTodos(request, response, next) {
    try {
      const userId = request.user.id;
      const result = await TodoService.fetchTodos(userId);
      const { rowCount, rows } = result;
      if (rowCount < 1) {
        return sendResponse(response, 404, false, TODOS_NOT_FOUND);
      }
      return sendResponse(response, 200, true, GET_TODO_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Get a todo
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async getTodoById(request, response, next) {
    try {
      const { todoId } = request.params;
      const userId = request.user.id;
      const result = await TodoService.fetchTodoById({ todoId, userId });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, TODO_NOT_FOUND);
      }
      return sendResponse(response, 200, true, GET_TODO_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  update a todo
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async updateTodoById(request, response, next) {
    try {
      const { todoId } = request.params;
      const { title, description } = request.body;
      const userId = request.user.id;
      const result = await TodoService.updateTodo({
        todoId,
        title,
        description,
        userId
      });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, TODO_NOT_FOUND);
      }
      return sendResponse(response, 200, true, UPDATE_TODO_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  delete a todo
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async deleteTodoById(request, response, next) {
    try {
      const { todoId } = request.params;
      const userId = request.user.id;
      const result = await TodoService.deleteTodoById({ todoId, userId });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, TODO_NOT_FOUND);
      }
      return sendResponse(response, 200, true, DELETE_TODO_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }
}

export default TodoController;
