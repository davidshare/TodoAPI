import NoteController from '../controllers/NoteController';
import ContentValidator from '../middleware/ContentValidator';
import Authentication from '../middleware/Authentication';

const noteRoutes = app => {
  // get all notes for a specific user
  app.get(
    '/api/v1/notes',
    Authentication.authenticateUser,
    NoteController.getNotes
  );

  // Post a note
  app.post(
    '/api/v1/note',
    [
      Authentication.authenticateUser,
      ContentValidator.isValidTitle,
      ContentValidator.isValidNoteType
    ],
    NoteController.addNote
  );

  // get a note by the id
  app.get(
    '/api/v1/notes/:noteId',
    Authentication.authenticateUser,
    NoteController.getNoteById
  );

  // get all notes for a specific type
  app.get(
    '/api/v1/notes/:noteType/notetype',
    Authentication.authenticateUser,
    NoteController.getNotes
  );

  // update a note by the id
  app.put(
    '/api/v1/notes/:noteId',
    [
      ContentValidator.isValidTitle,
      ContentValidator.isValidNoteType,
      Authentication.authenticateUser,
    ],
    NoteController.updateNoteById

  );

  // delete a note by the id
  app.delete(
    '/api/v1/notes/:noteId',
    Authentication.authenticateUser,
    NoteController.deleteNoteById
  );
};

export default noteRoutes;
