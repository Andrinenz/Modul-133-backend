/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import '../db/associations.js';
import { loadDefaultValues } from '../db/defaultValues.js';
import sequelize from '../db/sequelize.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

export default async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); //{alter:true} or {force:true}
    await loadDefaultValues();
  } catch (error) {
    if (error?.original?.routine === 'auth_failed') {
      throw new Error('Unable to connect to the database: \n' + error);
    }
    if (error?.original?.routine === 'DefineEnum') {
      return console.log(
        "Error DefineEnum: error sync fail, enum can't be defined (this is a known issue in postgres)"
      );
    }
    console.log(error);
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
