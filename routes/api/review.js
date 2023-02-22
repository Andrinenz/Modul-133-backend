/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/review-controller.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.get(
  '/allRatings',
  validate({
    query: Joi.object(),
  }),
  controller.getAllRatings
);

router.get(
  '/ratingByUser',
  validate({
    query: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.getRatingsByUserId
);

router.post(
  '/createRating',
  validate({
    body: Joi.object({
      rating: Joi.string().required(),
      comment: Joi.string(),
      ItemId: Joi.number().required(),
    }),
  }),
  controller.createRating
);

router.patch(
  '/updateById',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
      rating: Joi.string(),
      comment: Joi.string(),
    }),
  }),
  controller.updateRatingById
);

router.delete(
  '/deleteRating',
  validate({
    body: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  controller.deleteRating
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
