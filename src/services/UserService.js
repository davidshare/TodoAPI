import UserModel from '../database/models/UserModel';

/**
 * @fileoverview Class to manage User Services
 * @class UserService
 * @exports UserService
 * @description a class to manage user service operations
 */
class UserService{
/**
 * @param {Object} userObject - email, password, firstname, lastname
 * @return {Object} json
 * @description constructor method for the user model
 */
  static async createUser({email, password, firstname, lastname}){
    try {
      const user = new UserModel({email, password, firstname, lastname});
      return user.create();
    }catch(error){
      throw new Error(error);
    }
  }

  /**
 * @param {Object} userObject - email, password, firstname, lastname
 * @return {Object} json
 * @description constructor method for the user model
 */
  static async loginUser({email, password}){
    try {
      const user = new UserModel({email, password});
      return user.findByEmail();
    }catch(error){
      throw new Error(error);
    }
  }
}

export default UserService;
