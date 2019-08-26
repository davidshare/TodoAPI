import ValidationHelper from '../helpers/ValidationHelper';
import {
  INVALID_FIRSTNAME,
  INVALID_LASTNAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  EMAIL_EXISTS,
  REQUIRED_FIELDS
} from '../helpers/constants';

/**
 * @class UserValidator
 * @description class for middlewares for validating user input
 */
class UserValidator{

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Callback} next
   * @returns {object | callback } next or response object
   * @description method to check if firstname is valid
   * @memberof UserValidator
   */
  static isValidFirstname(request, response, next){
    if(!ValidationHelper.isValidName(request.body.firstname.trim())){
      return response.status(400).json({
        success: false,
        message: INVALID_FIRSTNAME
      });
    }
    return next();
  }

    /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param { Callback } next
   * @returns {object | callback} next or response object
   * @description method to check if lastname is valid
   * @memberof UserValidator
   */
  static isValidLastname(request, response, next){
    if(!ValidationHelper.isValidName(request.body.lastname.trim())){
      return response.status(400).json({
        success: false,
        message: INVALID_LASTNAME
      });
    }
    return next();
  }

  /**
   * @static
   * @param {Object} request
   * @param {Object} response
   * @param {Callback} next
   * @returns {Object | Callback} next or response object
   * @description method to check if email is valid
   * @memberof UserValidator
   */
  static isValidEmail(request, response, next){
    if(!ValidationHelper.isValidEmail(request.body.email.trim())){
      return response.status(400).json({
        success: false,
        message: INVALID_EMAIL
      });
    }
    return next();
  }

  /**
   * @static
   * @param { Object } request
   * @param {Object} response
   * @param {Callback} next
   * @returns {Object | Callback} next or response object
   * @description method to check if email is valid
   * @memberof UserValidator
   */
  static isValidPass(request, response, next){
    if(!ValidationHelper.isValidPass(request.body.password.trim())){
      return response.status(400).json({
        success: false,
        message: INVALID_PASSWORD
      });
    }
    return next();
  }

  /**
   * @static
   * @param { Object } request
   * @param { Object } response
   * @param { Object } next
   * @returns { Object | Callback } response or next
   * @description method to check if a user exists using the email
   * @memberof UserValidator
   */
  static async isExistingEmail(request, response, next){
    const email = request.body.email.trim();
    const isDuplicateEmail = await ValidationHelper.emailExists(email);
    if(isDuplicateEmail){
      return response.status(400).json({
        success: false,
        message: EMAIL_EXISTS
      });
    }

    return next();
  }

  /**
   * @param { Object } request
   * @param { Object } response
   * @param { Callback } next
   * @returns { Object | Callback } returns an Object or call back
   * @description method to check if all signup fields have been filled
   * @memberof UserValidator
   */
  static requiredSignupValues(request, response, next){
    const { firstname, lastname, email, password } = request.body;
    if(ValidationHelper.isEmpty(firstname)
    || ValidationHelper.isEmpty(lastname)
    || ValidationHelper.isEmpty(email)
    || ValidationHelper.isEmpty(password)){
      return response.status(400).json({
        success: false,
        message: REQUIRED_FIELDS
      });
    }

    return next();
  }
}

export default UserValidator;
