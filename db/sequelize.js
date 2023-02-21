/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { Sequelize } from 'sequelize';
import config from '../config/index.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const sequelize = new Sequelize({
  database: config.db.database,
  username: config.db.username,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  dialectOptions: config.db.dialectOptions,
  logging: false,
});

export default sequelize;

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
