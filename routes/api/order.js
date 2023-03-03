/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/order-controller.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.get(
  '/allOrders',
  validate({
    query: Joi.object(),
  }),
  controller.getAllOrders
);

router.post(
  '/createOrder',
  validate({
    body: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string(),
      address: Joi.string().required(),
      apartementNumber: Joi.string().required(),
      country: Joi.string().required(),
      plz: Joi.string().required(),
      state: Joi.string().required(),
      cardNumber: Joi.string().required(),
      cardHolder: Joi.string().required(),
      totalAmount: Joi.string().required(),
      sentToShippingCompany: Joi.boolean().required(),
      ItemId: Joi.number().required(),
    }),
  }),
  controller.createOrder
);

router.patch(
  '/updateOrderById',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string(),
      address: Joi.string(),
      apartementNumber: Joi.string(),
      country: Joi.string(),
      cardNumber: Joi.string(),
      state: Joi.string(),
      cardHolder: Joi.string(),
      plz: Joi.string(),
      totalAmount: Joi.string(),
      sentToShippingCompany: Joi.boolean(),
    }),
  }),
  controller.updateOrderById
);

router.get(
  '/getOrderById',
  validate({
    query: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.getOrderById
);

router.delete(
  '/deleteOrder',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.deleteOrder
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
