import { EMAIL_REGEX, PASS_REGEX, NAME_REGEX, TITLE_REGEX } from './constants';
import connection from './db_conn';

const pool = connection();

/**
 * @class ValidationHelpers
 * @description class to host methods for validations
 */
class ValidationHelper {
  /**
   * @static
   * @description checks if an email syntax is right or wrong
   * @param {String} email
   * @returns {Boolean} Boolean
   * @memberof ValidationHelper
   */
  static isValidEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  /**
   * @static
   * @description checks if a password syntax is right
   * @param {String} password to be tested
   * @returns {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidPass(password) {
    return PASS_REGEX.test(password);
  }

  /**
   * @static
   * @description checks if a name syntax is right
   * @param {String} name to be tested
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidName(name) {
    return NAME_REGEX.test(name);
  }

  /**
   * @static
   * @param {String} email
   * @memberof ValidationHelper
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static async emailExists(email) {
    /* eslint-disable-next-line */
    const query = `SELECT id from users WHERE email='${email}'`;
    const result = await pool.query(query);
    return result.rowCount > 0;
  }

  /**
   * @static
   * @description validates the syntax of the todo title
   * @param {String} title to be tested
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidTitle(title) {
    return TITLE_REGEX.test(title);
  }

  /**
   * @static
   * @description validates the syntax of the noteType
   * @param {String} noteType to be tested
   * @return {Boolean} returns true or false
   * @memberof ValidationHelper
   */
  static isValidNoteType(noteType) {
    return noteType == 'note' || noteType == 'three65';
  }

  /**
   * @static
   * @param {String} value
   * @memberof ValidationHelper
   * @return {Boolean} returns true or false
   */
  static isEmpty(value) {
    return !value || !value.trim();
  }
}

export default ValidationHelper;
