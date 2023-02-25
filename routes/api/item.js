/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/item-controller.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.get(
  '/getItems',
  validate({
    query: Joi.object(),
  }),
  controller.getItems
);

router.get(
  '/getItemById',
  validate({
    query: Joi.object({
      id: Joi.number().required(),
    }),
  })
);

router.post(
  '/createItem',
  validate({
    body: Joi.object({
      title: Joi.string().required(),
      image: Joi.string(),
      price: Joi.string().required(),
      description: Joi.string(),
      itemsInStock: Joi.string().required(),
    }),
  }),
  controller.createItem
);

router.patch(
  '/updateById',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
      image: Joi.string(),
      title: Joi.string(),
      price: Joi.string(),
      size: Joi.string().required(),
      description: Joi.string(),
      itemsInStock: Joi.string(),
    }),
  }),
  controller.updateById
);

router.delete(
  '/deleteById',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.deleteById
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
