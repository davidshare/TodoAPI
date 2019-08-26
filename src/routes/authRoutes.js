import UserValidator from '../middleware/UserValidators';
import UserController from '../controllers/userController';

const authRoutes = app => {
  // User signup
  app.post(
    '/api/v1/auth/signup',
    [
      UserValidator.requiredSignupValues,
      UserValidator.isValidEmail,
      UserValidator.isExistingEmail,
      UserValidator.isValidFirstname,
      UserValidator.isValidLastname,
      UserValidator.isValidPass
    ],
    UserController.signup
  );

  // User signin
  app.post('/api/v1/auth/signin', UserController.signin);
};

export default authRoutes;
