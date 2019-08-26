import createQuery from './create_tables';
import destroyQuery from './destroy_tables';
import connection from '../../helpers/db_conn';

const pool = connection();
const dbQueries = `${destroyQuery}${createQuery}`;
// eslint-disable-next-line no-unused-vars
pool.query(dbQueries, (err, result) => {
  /* eslint-disable-next-line */
  if(err) console.log(err);
});
