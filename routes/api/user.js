/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/user-controller.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.get(
  '/getUsers',
  validate({
    query: Joi.object(),
  }),
  controller.getUsers
);

router.post(
  '/createUser',
  validate({
    body: Joi.object({
      email: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      isAdmin: Joi.boolean(),
      password: Joi.string().required(),
    }),
  }),
  controller.createUser
);

router.patch(
  '/updateById',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
      firstname: Joi.string(),
      lastname: Joi.string(),
      isAdmin: Joi.boolean(),
    }),
  }),
  controller.updateUser
);

router.delete(
  '/deleteUser',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.deleteUser
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
