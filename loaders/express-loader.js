/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import helmet from 'helmet';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import morgan from 'morgan';
import flash from 'express-flash';

const MemoryStore = createMemoryStore(session);

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

export default async (app) => {
  //Security
  app.use(helmet());

  //Payload limit
  app.use(express.json({ limit: '2mb' }));

  //Handle CORS (allow origin all)
  app.use(cors());

  //body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //session
  app.use(
    session({
      secret: '123',
      resave: true,
      store: new MemoryStore(),
      saveUninitialized: true,
    })
  );

  //Loggin Requests
  app.use(morgan('tiny'));

  app.use(flash());
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
