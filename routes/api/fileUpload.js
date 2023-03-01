/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import express from 'express';
const router = express.Router();
import Joi from 'joi';
import validate from '../../middleware/validate.js';
import controller from '../../controller/fileUpload-controller.js';
import expressForm from 'express-formidable';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

router.post(
  '/upload',
  expressForm(),
  validate({
    files: Joi.object({
      file: Joi.object().required(),
    }),
  }),
  controller.upload
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default router;
