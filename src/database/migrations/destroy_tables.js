const destroyUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const destroyTodos = 'DROP TABLE IF EXISTS todos CASCADE; ';
const destroyNotes = 'DROP TABLE IF EXISTS notes CASCADE; ';

const destroyQuery = `${destroyTodos}${destroyUsers}${destroyNotes}`;

export default destroyQuery;
