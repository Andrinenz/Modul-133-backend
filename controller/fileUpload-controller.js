/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import fileUploadService from '../services/fileupload-service.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const upload = async (req, res) => {
  try {
    let hostedPath = await fileUploadService.upload(req.files.file);
    if (hostedPath) {
      return res.status(200).json({ result: { hostedPath } });
    }
    res.status(500).json({ error: "File couldn't be uploaded" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { upload };
