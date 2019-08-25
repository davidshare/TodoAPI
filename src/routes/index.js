import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';
import noteRoutes from './noteRoutes';

/**
 * @param {object} app
 * @returns {object} undefine
 * @description function for handling routing
 */
const routes = app => {
  app.get('/', (request, response) =>
    response.status(200).json({
      success: true,
      message: 'Welcome to the Todo API'
    })
  );

  authRoutes(app);
  todoRoutes(app);
  noteRoutes(app);
};

export default routes;
