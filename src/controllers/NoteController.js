import NoteService from '../services/NoteService';
import sendResponse from '../helpers/responseHelpers';
import {
  ADD_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  GET_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  NOTE_NOT_FOUND,
  NOTES_NOT_FOUND,
  ADD_NOTE_FAILURE
} from '../helpers/constants';

/**
 * @fileoverview Class to manage notes
 * @class NoteController
 * @exports NoteController
 */
class NoteController {
  /**
   * @param {Object} request
   * @param {Object} response
   * @param {object} next - Error handler
   * @description Create a note
   * @return {Object} json
   * @memberof NoteController
   */
  static async addNote(request, response, next) {
    try {
      const { title, description, noteType } = request.body;
      const userId = request.user.id;
      const result = await NoteService.createNote({
        title,
        description,
        userId,
        noteType
      });
      return sendResponse(response, 201, true, ADD_NOTE_SUCCESS, result.rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  get all notes
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async getNotes(request, response, next) {
    try {
      const userId = request.user.id;
      const noteType = request.params.noteType || false;
      const result = await NoteService.fetchNotes(userId, noteType);
      const { rowCount, rows } = result;
      if (rowCount < 1) {
        return sendResponse(response, 404, false, NOTES_NOT_FOUND);
      }
      return sendResponse(response, 200, true, GET_NOTE_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  Get a note
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async getNoteById(request, response, next) {
    try {
      const { noteId } = request.params;
      const userId = request.user.id;
      const result = await NoteService.fetchNoteById({ noteId, userId });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, NOTE_NOT_FOUND);
      }
      return sendResponse(response, 200, true, GET_NOTE_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  update a note
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async updateNoteById(request, response, next) {
    try {
      const { noteId } = request.params;
      const { title, description, noteType } = request.body;
      const userId = request.user.id;
      const result = await NoteService.updateNote({
        noteId,
        title,
        description,
        userId,
        noteType
      });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, NOTE_NOT_FOUND);
      }
      return sendResponse(response, 200, true, UPDATE_NOTE_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  delete a note
   *  @param {Object} request
   *  @param {Object} response
   *  @param {object} next - Error handler
   *  @return {Object} json
   */
  static async deleteNoteById(request, response, next) {
    try {
      const { noteId } = request.params;
      const userId = request.user.id;
      const result = await NoteService.deleteNoteById({ noteId, userId });
      const { rowCount, rows } = result;
      if (!rowCount || rowCount < 1) {
        return sendResponse(response, 404, false, NOTE_NOT_FOUND);
      }
      return sendResponse(response, 200, true, DELETE_NOTE_SUCCESS, rows);
    } catch (error) {
      return next(error);
    }
  }
}

export default NoteController;
