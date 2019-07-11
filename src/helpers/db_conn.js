import dotenv from 'dotenv';
import { Pool } from 'pg';
import setup from '../config/config';

dotenv.config();
const connection = () => {
  let config;
  if (process.env.NODE_ENV === 'test') {
    config = setup.test.dbTestURL;
  } else if(process.env.NODE_ENV==='dev'){
    config = setup.development.dbDevURL;
  }else{
    config = setup.production.dbProdURL;
  }

  const pool = new Pool({connectionString: config});
  return pool;
};
export default connection;
