const destroyUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const destroyTodos = 'DROP TABLE IF EXISTS todos CASCADE; ';

const destroyQuery = `${destroyTodos}${destroyUsers}`;

export default destroyQuery;
