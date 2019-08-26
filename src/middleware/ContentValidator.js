import ValidationHelper from '../helpers/ValidationHelper';
import sendResponse from '../helpers/responseHelpers';
import {
  REQUIRED_TITLE,
  INVALID_TITLE,
  INVALID_NOTE_TYPE
} from '../helpers/constants';

/**
 * @class TodoValidator
 * @description Class to validate todos
 */
class ContentValidator{
  /**
   * @param { Object } request
   * @param { Object } response
   * @param { Callback } next
   * @returns { Object | Callback } returns an object or the next() callback
   * @memberof TodoValidator
   * @description this method checks for the validity of the title
   */
  static isValidTitle(request, response, next){
    const { title } = request.body;
    if(ValidationHelper.isEmpty(title)){
      return sendResponse(response, 400, false, REQUIRED_TITLE);
    }

    if(!ValidationHelper.isValidTitle(title.trim())){
      return sendResponse(response, 400, false, INVALID_TITLE);
    }

    return next();
  }

  /**
   * @param { Object } request
   * @param { Object } response
   * @param { Callback } next
   * @returns { Object | Callback } returns an object or the next() callback
   * @memberof NoteValidator
   * @description this method checks for the validity of the todo title
   */
  static isValidNoteType(request, response, next){
    const { noteType } = request.body;
    if(!ValidationHelper.isValidNoteType(noteType.trim())){
      return sendResponse(response, 400, false, INVALID_NOTE_TYPE);
    }

    return next();
  }
}

export default ContentValidator;
