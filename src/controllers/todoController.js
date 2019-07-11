import connection from '../helpers/db_conn';

const pool = connection();

/**
 * @fileoverview Class to manage todos
 * @class TodoController
 * @exports TodoController
 */
class TodoController {

/**
 *  Create a todo
 *  @param {Object} request
 *  @param {Object} response
 *  @param {object} next - Error handler
 *  @return {Object} json
 */
  static async addTodo(request, response, next){
    try{
      const {
        title,
        description
      } = request.body;

      const query = {
        /* eslint-disable-next-line */
        text: 'insert into todos(title, description) Values($1, $2) returning *',
        values: [ title, description ],
      };
      const result = await pool.query(query);
      return response.status(201).json({
          message: 'The todo has been added successfully',
          success: true,
          data: result.rows
      });
    }catch(error){
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
  static async getTodos(request, response, next){
    try{
      const query = 'select * from todos';
      const result = await pool.query(query);
      return response.status(200).json({
          message: 'Successfully got all todos',
          success: true,
          data: result.rows
      });
    }catch(error){
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
  static async getTodoById(request, response, next){
    try{
      const { todoId } = request.params;
      const query = 'select * from todos Where id='+todoId;
      const result = await pool.query(query);
      return response.status(200).json({
          message: 'Successfully got the todo',
          success: true,
          data: result.rows
      });
    }catch(error){
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
  static async updateTodoById(request, response, next){
    try{
      const { todoId } = request.params;
      const {
        title,
        description
      } = request.body;

      /* eslint-disable-next-line */
      const query = `update todos set title='${title}', description='${description}' where id=${todoId} returning *`;

      const result = await pool.query(query);
      return response.status(200).json({
          message: 'Successfully updated the todo',
          success: true,
          data: result.rows
      });
    }catch(error){
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
  static async deleteTodoById(request, response, next){
    try{
      const { todoId } = request.params;
      /* eslint-disable-next-line */
      const query = `delete from todos where id=${todoId} returning *`;

      const result = await pool.query(query);
      return response.status(200).json({
          message: 'Successfully deleted the todo',
          success: true,
          data: result.rows
      });
    }catch(error){
      return next(error);
    }
  }
}

export default TodoController;
