/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import dotenv from 'dotenv';

dotenv.config();

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_BASE64,
} = process.env;

const { SECRET_JWT, SECRET_SESSION } = process.env;

const { PORT } = process.env;

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const config = {
  express: {
    port: PORT || 8080,
  },
  db: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        ca: DB_BASE64,
        rejectUnauthorized: false,
      },
    },
  },
  secretKeys: {
    jwtSecret: SECRET_JWT,
    expressSessionSecret: SECRET_SESSION,
  },
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default config;
