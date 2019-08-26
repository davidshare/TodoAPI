import Note from '../database/models/NoteModel';

/**
 * @fileoverview Class to manage Note Services
 * @class NoteService
 * @exports NoteService
 * @description a class to manage user service operations
 */
class NoteService {
  /**
   * @param {Object} noteObject - title, description, userId, noteType
   * @return {Object} json
   * @description static method to create notes
   */
  static async createNote({ title, description, userId, noteType }) {
    try {
      const note = new Note({ title, description, userId, noteType });
      return await note.create();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} noteObject - title, description, userId, noteId, noteType
   * @return {Object} json
   * @description static method to create notes
   */
  static async updateNote({ noteId, title, description, userId, noteType }) {
    try {
      const note = new Note({ noteId, title, description, userId, noteType });
      return await note.update();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {integer} userId
   * @param {string} noteType
   * @return {Object} json
   * @description static method to find all notes
   */
  static async fetchNotes(userId, noteType=false) {
    try {
      return await Note.findAllUserNotes(userId, noteType);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} noteId, userId
   * @return {Object} json
   * @description static method to find a single note
   */
  static async fetchNoteById({ noteId, userId }) {
    try {
      return await Note.findUserNoteById({ noteId, userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {Object} noteId, userId
   * @return {Object} json
   * @description static method to delete a note by id
   */
  static async deleteNoteById({ noteId, userId }) {
    try {
      return await Note.delete({ noteId, userId });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NoteService;
