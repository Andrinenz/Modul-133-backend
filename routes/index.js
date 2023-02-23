/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import authRouter from './api/auth.js';
import itemRouter from './api/item.js';
import orderRouter from './api/order.js';
import ratingRouter from './api/review.js';
import userRouter from './api/user.js';
import cardRouter from './api/card.js';
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

  app.use(
    '/api/rating',
    passport.authenticate('jwt', { session: false }),
    ratingRouter
  );

  app.use(
    '/api/user',
    passport.authenticate('jwt', { session: false }),
    userRouter
  );

  app.use(
    '/api/card',
    passport.authenticate('jwt', { session: false }),
    cardRouter
  );
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default init;
