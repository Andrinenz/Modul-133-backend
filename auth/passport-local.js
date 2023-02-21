/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../db/models/user-model.js';
import passport from 'passport';
import { Op } from 'sequelize';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      let user = await UserModel.findOne({
        where: { email: { [Op.iLike]: email }, password: password },
      });
      if (user !== null) {
        user = user.toJSON();
        return done(null, user);
      }
      return done(null, false, { message: 'Password or Mail incorrect' });
    }
  )
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default passport;
