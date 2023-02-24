/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { Op } from 'sequelize';
import UserModel from '../db/models/user-model.js';
import generateJWT from '../services/generateJWT.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const login = async (req, res) => {
  let user = await UserModel.findOne({
    where: {
      email: { [Op.iLike]: req.body.email },
      password: req.body.password,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (user) {
    user = user.toJSON();

    delete user.token;
    delete user.password;

    let newJWT = await generateJWT(user);
    await UserModel.update(
      {
        token: newJWT.token,
      },
      { where: { id: user.id } }
    );
    res.status(200).json(newJWT);
  }
};

const logout = async (req, res) => {
  try {
    await UserModel.update({ token: null }, { where: { id: req.user.id } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { logout, login };
