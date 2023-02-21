/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import express from 'express';
import expressLoader from './express-loader.js';
import sequelizeLoader from './sequelize-loader.js';
import routesLoader from './routes-loader.js';
import passportLoader from './passport-loader.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/
const app = express();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const start = async () => {
  await initLoaders(app);
  return app;
};

const initLoaders = async (app) => {
  await sequelizeLoader(app);
  console.log('Sequelize loaded sucessfully');

  await expressLoader(app);
  console.log('Express loaded sucessfully');

  await passportLoader(app);
  console.log('Passport loaded sucessfully');

  await routesLoader(app);
  console.log('Routes loaded successfully');
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default start;
