/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import controller from '../../controller/auth-controller.js';
import express from 'express';
import passportJWT from '../../auth/passport-jwt.js';
import passportLocal from '../../auth/passport-local.js';
import validate from '../../middleware/validate.js';

const router = express.Router();

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(
  '/login',
  validate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  passportLocal.authenticate('local'),
  controller.login
);

router.get('/error', (req, res) => {
  res.json({ error: true });
});

router.post(
  '/logout',
  passportJWT.authenticate('jwt', { session: false }),
  controller.logout
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
