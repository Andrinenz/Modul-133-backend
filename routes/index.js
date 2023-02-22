/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import authRouter from './api/auth.js';
import itemRouter from './api/item.js';
import orderRouter from './api/order.js';
import passport from '../auth/passport-jwt.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const init = (app) => {
  app.use('/api/auth', authRouter);

  app.use(
    '/api/items',
    passport.authenticate('jwt', { session: false }),
    itemRouter
  );

  app.use(
    '/api/order',
    passport.authenticate('jwt', { session: false }),
    orderRouter
  );
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default init;
