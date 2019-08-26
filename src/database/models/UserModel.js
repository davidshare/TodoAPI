import connection from '../../helpers/db_conn';
import { SIGNUP_QUERY } from '../../helpers/constants';
import AuthHelpers from '../../helpers/AuthHelpers';

const pool = connection();
/**
 * @fileoverview Class to manage UserModels
 * @class UserModel
 * @exports UserModel
 * @description a class to manage user model operations
 */
class UserModel {
/**
 * @param {Object} userObject - email, password, firstname, lastname
 * @return {Object} json
 * @description constructor method for the user model
 */
  constructor({email, password, firstname ='', lastname=''}) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  /**
 * @param {Object} Userobject
 * @return {Object} json
 * @description method to create a new user
 */
  async create(){
    try{
      const query = {
      text: SIGNUP_QUERY,
      values: [
        this.firstname,
        this.lastname,
        this.email,
        AuthHelpers.encryptPassword(this.password)
      ],
    };
      return await pool.query(query);
    }catch(error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} Userobject
   * @return {Object} json
   * @description method to create a new user
  */
    async findByEmail(){
      try{
        const query = `SELECT *  FROM users WHERE email = '${this.email}';`;
        return await pool.query(query);
      }catch(error) {
        throw new Error(error);
      }
    }

}

export default UserModel;
