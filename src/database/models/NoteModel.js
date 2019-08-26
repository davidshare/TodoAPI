import connection from '../../helpers/db_conn';
import { ADD_NOTE_QUERY } from '../../helpers/constants';

const pool = connection();
/**
 * @fileoverview Class to manage noteModels
 * @class noteModel
 * @exports noteModel
 * @description a class to manage note model operations
 */
class NoteModel {
  /**
   * @param {Object} noteObect - title, description
   * @return {Object} json
   * @description constructor method for the note model
   */
  constructor({ noteId='', title, description, userId, noteType='note' }) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.noteId = noteId;
    this.noteType = noteType;
  }

  /**
   * @param {Object} noteObject
   * @return {Object} json
   * @description method to create a new note
   */
  async create() {
    try {
      const query = {
        text: ADD_NOTE_QUERY,
        values: [this.userId, this.title, this.description, this.noteType]
      };
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} noteObject
   * @return {Object} json
   * @description method to update a note
   */
  async update() {
    try {
      // eslint-disable-next-line max-len
      const query = `update notes set title='${this.title}', description='${this.description}', type='${this.noteType}' where id=${this.noteId} AND userId=${this.userId} returning *`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} noteId
   * @return {Object} json
   * @description method to delete a note
   */
  static async delete({ noteId, userId }) {
    try {
      // eslint-disable-next-line max-len
      const query = `delete from notes Where id=${noteId} AND userid=${userId} returning *;`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} noteId
   * @return {Object} json
   * @description method to find a note by id
   */
  static async findById(noteId) {
    try {
      const query = `SELECT * FROM notes WHERE id = '${noteId}';`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} noteId
   * @return {Object} json
   * @description method to find a single note by id
   */
  static async findUserNoteById({ noteId, userId }) {
    try {
      // eslint-disable-next-line max-len
      const query = `select * from notes Where id=${noteId} AND userId=${userId};`;
      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Integer} userId - the userId
   * @param {String} noteType - the userId
   * @return {Object} json
   * @description method to find all notes for a specific user
   */
  static async findAllUserNotes(userId, noteType=false) {
    try {
      let query = `select * from notes where userId=${userId}`;
      if(noteType=='three65' || noteType=='note'){
        // eslint-disable-next-line max-len
        query = `select * from notes where userId=${userId} AND type='${noteType}'`;
    }

      return await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NoteModel;
