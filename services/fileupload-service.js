/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import IBM from 'ibm-cos-sdk';
import config from '../config/index.js';
import fs from 'fs';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

let cos = new IBM.S3(config.fileupload);

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const upload = async (file) => {
  let params = {
    Bucket: config.fileupload.bucketName,
    Key: file.name,
    Body: fs.createReadStream(file.path),
    ContentType: file.type,
  };
  try {
    await cos.putObject(params).promise();
    return (
      config.fileupload.endpoint +
      '/' +
      config.fileupload.bucketName +
      '/' +
      file.name
    );
  } catch (err) {
    return false;
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { upload };
