const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    upass VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createTodosTable = `
  CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR (255) NOT NULL,
    description TEXT,
    userId BIGINT REFERENCES users (id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createNotesTable = `
  CREATE TABLE IF NOT EXISTS notes(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR (255) NOT NULL,
    description TEXT,
    userId BIGINT REFERENCES users (id) NOT NULL,
    type varchar(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;
const createQuery = `${createUsersTable}${createTodosTable}${createNotesTable}`;
export default createQuery;
