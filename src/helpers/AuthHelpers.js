import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';
import { REQUIRED_PASSWORD, REQUIRED_COMPARE_PASSWORDS } from './constants';

dotenv.config();
const { SECRET } = config;

/**
 * @class AuthHelpers
 * @description class to host authentication methods
 */
class AuthHelpers {
  /**
   * @static
   * @param { String } password
   * @returns { String } encrypted_pass
   * @description method to encypt password using bcrypt hash sync
   * @memberof AuthHelpers
   */
  static encryptPassword(password){
    if(!password || !password.trim()) throw new Error(REQUIRED_PASSWORD);
    return bcrypt.hashSync(password, 10);
  }

  /**
   * @static
   * @param { String } password user supplied
   * @param { String } hashedPassword - hashed password from database
   * @returns { Boolean } true or false
   * @description method to encypt password using bcrypt hash sync
   * @memberof AuthHelpers
   */
  static comparePasswords(password, hashedPassword){
    if(!password || !hashedPassword
      || !password.trim() || !hashedPassword.trim()) {
      throw new Error(REQUIRED_COMPARE_PASSWORDS);
    }
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * @static
   * @param { object } userObject
   * @param {string} [duration='1d']
   * @return {string} userToken
   * @memberof AuthHelpers
   */
  static generateJWT(userObject, duration='7d'){
    if(!userObject.email) throw new Error('Please supply a valid user object.');
    const userToken = jwt.sign({ user: userObject }, SECRET,
      {
        expiresIn: duration,
      });
      return userToken;
  }

  /**
   * @static
   * @param {string} token
   * @returns {object} returns error object or decoded token object
   * @memberof AuthHelpers
   */
  static verifyToken(token){
    if(!token || typeof token !=='string'){
      throw new Error('Please supply a valid token.');
    }
    try{
      const decodedToken = jwt.verify(token, SECRET);
      return decodedToken;
    }
    catch(err) {
      return err;
    }
  }

  /**
   * @static
   * @param {object} user
   * @returns {object} user object
   * @description function to strip date and password from user object
   * @memberof AuthHelpers
   */
  static stripDateAndPassword(user){
    if(!user.firstname){
      throw new Error('Please enter a valid user object.');
    }
    const {created_at, upass, ...userObject } = user;
    return userObject;
  }

}

export default AuthHelpers;
