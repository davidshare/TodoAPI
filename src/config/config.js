import dotenv from 'dotenv';

dotenv.config();

export default {
  secretKey: process.env.SECRET_KEY,
  test: {
    dbTestURL: process.env.DB_TEST_URL,
  },
  development: {
    dbDevURL: process.env.DB_DEV_URL,
  },
  production: {
    dbProdURL: process.env.DATABASE_URL,
  },
};
