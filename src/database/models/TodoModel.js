import connection from '../../helpers/db_conn';
import { ADD_TODO_QUERY } from '../../helpers/constants';

const pool = connection();
/**
 * @fileoverview Class to manage TodoModels
 * @class TodoModel
 * @exports TodoModel
 * @description a class to manage todo model operations
 */
class TodoModel {
  /**
   * @param {Object} todoObject - title, description
   * @return {Object} json
   * @description constructor method for the todo model
   */
  constructor({ todoId='', title, description, userId }) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.todoId = todoId;
  }

  /**
   * @param {Object} todoObject
   * @return {Object} json
   * @description method to create a new todo
   */
  async create() {
    try {
      const query = {
        text: ADD_TODO_QUERY,
        values: [this.userId, this.title, this.description]
      };
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} todoObject
   * @return {Object} json
   * @description method to update a todo
   */
  async update() {
    try {
      // eslint-disable-next-line max-len
      const query = `update todos set title='${this.title}', description='${this.description}' where id=${this.todoId} AND userId=${this.userId} returning *`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} todoId
   * @return {Object} json
   * @description method to delete a todo
   */
  static async delete({ todoId, userId }) {
    try {
      // eslint-disable-next-line max-len
      const query = `delete from todos Where id=${todoId} AND userid=${userId} returning *;`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} todoId
   * @return {Object} json
   * @description method to find a todo by id
   */
  static async findById(todoId) {
    try {
      const query = `SELECT *  FROM todos WHERE id = '${todoId}';`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} todoId
   * @return {Object} json
   * @description method to find a todo by id
   */
  static async findUserTodoById({ todoId, userId }) {
    try {
      // eslint-disable-next-line max-len
      const query = `select * from todos Where id=${todoId} AND userId=${userId};`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} userId - the userID
   * @return {Object} json
   * @description method to find all todos for a specific user
   */
  static async findAllUserTodos(userId) {
    try {
      const query = `select * from todos where userId=${userId}`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TodoModel;
