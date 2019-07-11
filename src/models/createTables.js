const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255),
    role INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createTodosTable = `
CREATE TABLE IF NOT EXISTS todos(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR (255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);`;
const createQuery = `${createUsersTable}${createTodosTable}`;
export default createQuery;
