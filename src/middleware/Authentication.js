import AuthHelpers from '../helpers/AuthHelpers';
import { INVALID_TOKEN } from '../helpers/constants';

/**
 * @class Authentication
 * @description class for performing user authentication
 */
class Authentication {
  /**
   * @static
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {callback} returns a next callback
   * @memberof Authentication
   */
  static authenticateUser(request, response, next){
    if (!request.headers.authorization) {
      return response.status(401).json({
        success: false,
        message: INVALID_TOKEN
      });
    }

    try {
      const userToken = request.headers.authorization.split(' ')[1];
      const verifiedToken = AuthHelpers.verifyToken(userToken);
      if (verifiedToken.name === 'JsonWebTokenError' ||
        verifiedToken.name === 'TokenExpiredError'){
        return response.status(401).json({
          success: false,
          message: INVALID_TOKEN
        });
      }
      request.user = verifiedToken.user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default Authentication;
