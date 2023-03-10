/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/card-controller.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.get(
  '/getCardFromUser',
  validate({
    query: Joi.object(),
  }),
  controller.getCardFromUser
);

router.post(
  '/createCard',
  validate({
    body: Joi.object({
      itemCount: Joi.number(),
      ItemId: Joi.number().required(),
    }),
  }),
  controller.createCard
);

router.delete(
  '/deleteCard',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.deleteCard
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
