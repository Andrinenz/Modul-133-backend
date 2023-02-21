/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import express from 'express';
import expressLoader from './express-loader.js';
import sequelizeLoader from './sequelize-loader.js';

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
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default start;
