import UserService from '../services/UserService';
import  sendResponse from '../helpers/responseHelpers';
import {
  SIGNUP_SUCCESS,
  INVALID_SIGNIN,
  SIGNIN_SUCCESS,
} from '../helpers/constants';
import AuthHelpers from '../helpers/AuthHelpers';

/**
 * @fileoverview Class to manage users
 * @class UserController
 * @exports UserController
 * @description a class to manage user operations
 */
class UserController {

/**
 * @param {Object} request
 * @param {Object} response
 * @param {object} next - Error handler
 * @return {Object} json
 * @description method to signup a user
 */
  static async signup(request, response, next){
    try{
      const result = await UserService.createUser(request.body);
      const user = AuthHelpers.generateJWT(
        AuthHelpers.stripDateAndPassword(result.rows[0]));
      return sendResponse(response, 200, true, SIGNUP_SUCCESS, user);
    }catch(error){
      return next(error);
    }
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Object} next - Error handler
   * @return {Object} JSON
   * @description method to signin a user
   */
  static async signin(request, response, next){
    try{
      const { password, email } = request.body;
      const result = await UserService.loginUser({email, password});
      const {rowCount, rows } = result;
      if(rowCount<1
        || !AuthHelpers.comparePasswords(password, rows[0].upass)){
          return sendResponse(response, 400, false, INVALID_SIGNIN);
      }
      const user = AuthHelpers.generateJWT(
        AuthHelpers.stripDateAndPassword(rows[0])
      );
      return sendResponse(response, 200, true, SIGNIN_SUCCESS, user);
    }catch(error){
      return next(error);
    }
  }

}

export default UserController;
