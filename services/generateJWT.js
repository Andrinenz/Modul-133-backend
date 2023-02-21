/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const generateJWT = (user = {}) => {
  const token = jwt.sign(user, config.secretKeys.jwtSecret, {
    expiresIn: '3 days',
  });

  const tokenMultiplier = 3 * 24 * 60 * 60; // 3 days
  const tokenExpiration = Math.floor(Date.now() / 1000) + tokenMultiplier;

  return {
    token,
    tokenExpiration,
  };
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/

export default generateJWT;
