/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { ExtractJwt } from 'passport-jwt';
import { Strategy as JWTStrategy } from 'passport-jwt';
import UserModel from '../db/models/user-model.js';
import config from '../config/index.js';
import passport from 'passport';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKeys.jwtSecret,
};

const authFunc = async (jwtPayload, done) => {
  try {
    let user = await UserModel.findByPk(jwtPayload.id);
    if (user !== null) {
      user = user.toJSON();
      return done(null, user);
    }

    done('No User found with token', false);
  } catch (err) {
    done(err, false);
  }
};

passport.use(new JWTStrategy(options, authFunc));

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default passport;
