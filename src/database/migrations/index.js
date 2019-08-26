import createQuery from './create_tables';
import destroyQuery from './destroy_tables';
import connection from '../../helpers/db_conn';

const pool = connection();
const dbQueries = `${destroyQuery}${createQuery}`;
pool.query(dbQueries, (err, result) => {
  /* eslint-disable-next-line */
  if(err) console.log(err);

  /* eslint-disable-next-line */
  if(result) console.log(result);
});
