// Signup constants
export const SIGNUP_QUERY='insert into users(firstname, lastname, email, upass) Values($1, $2, $3, $4) returning *';
export const SIGNUP_SUCCESS='The user has been added successfully';
export const SIGNUP_ERROR='The account could not be created'

// signin constants
export const INVALID_SIGNIN='Invalid login: either your email or password is not correct.';
export const SIGNIN_SUCCESS='The user successfully signed in.';

// constants for todos
export const ADD_TODO_QUERY='insert into todos(userId, title, description) Values($1, $2, $3) returning *';
export const ADD_TODO_SUCCESS='The todo has been added successfully';
export const ADD_TODO_FAILURE='Sorry, the todo could not be added, please try again.';
export const DELETE_TODO_SUCCESS='Successfully deleted the todo.';
export const GET_TODO_SUCCESS='Successfully got the todo(s)';
export const UPDATE_TODO_SUCCESS='Successfully updated the todo';
export const TODO_NOT_FOUND='Sorry, the todo does not exist.';
export const TODOS_NOT_FOUND='Sorry, no todo was found.';

// constants for notes
export const ADD_NOTE_QUERY = 'insert into notes(userId, title, description, type) Values($1, $2, $3, $4) returning *'
export const ADD_NOTE_SUCCESS='The note has been added successfully';
export const ADD_NOTE_FAILURE='Sorry, the note could not be added, please try again.';
export const DELETE_NOTE_SUCCESS='Successfully deleted the note.';
export const GET_NOTE_SUCCESS='Successfully got the note(s)';
export const UPDATE_NOTE_SUCCESS='Successfully updated the note';
export const NOTE_NOT_FOUND='Sorry, the note does not exist.';
export const NOTES_NOT_FOUND='Sorry, no note was found.';
export const INVALID_NOTE_TYPE='Sorry the note type can only be "note" or "three65"'

// VALIDATION CONSTANTS
export const EMAIL_REGEX=/^([a-z_.!@#$%^&*0-9]{3,25})@([a-z]{3,20})\.([a-z]){2,7}(\.[a-z]{2,5})?$/i;
export const PASS_REGEX=/^(?=.*[0-9])([a-zA-Z0-9!@#$.%^&*~`?><,.';"|}{}+-=)()|]{8,20})$/;
export const NAME_REGEX=/^([a-zA-Z]){3,20}$/;
export const TITLE_REGEX=/^[a-zA-Z][a-zA-Z0-9\s?:]{10,255}$/;
export const INVALID_FIRSTNAME='Invalid firstname: Please supply a valid first name.';
export const INVALID_LASTNAME='Invalid lastname: Please supply a valid last name.';
export const INVALID_EMAIL='Invalid email: Please supply a valid email.';
export const INVALID_PASSWORD='Invalid password: Please supply a valid password.';
export const EMAIL_EXISTS='Sorry, this email address has already been registered.';
export const REQUIRED_FIELDS='All fields are required.';
export const REQUIRED_TITLE='The title is required.';
export const INVALID_TITLE='Invalid Todo title: please supply a valid todo title.';

// AUTH CONSTANTS
export const REQUIRED_PASSWORD='Password error: no password provided.';
export const REQUIRED_COMPARE_PASSWORDS='Please supply both passwords.';
export const INVALID_TOKEN='Authentication failed: Please supply a valid token.';

//API prefix
export const API_PREFIX='/api/v1/';



