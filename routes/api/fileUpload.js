/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import Joi from 'joi';
import express from 'express';
import validate from '../../middleware/validate.js';
import controller from '../../controller/fileUpload-controller.js';
import expressForm from 'express-formidable';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const router = express.Router();

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(
  '/upload',
  expressForm(),
  validate({
    files: Joi.object({
      file: Joi.string().required(),
    }),
  }),
  controller.upload
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
