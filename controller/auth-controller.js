/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { Op } from 'sequelize';
import UserModel from '../db/models/user-model.js';
import generateJWT from '../services/generateJWT.js';
import bcrypt from 'bcrypt';

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

const createUser = async (req, res) => {
  try {
    let data = { ...req.body };

    const hash = bcrypt.hash(data.password, 10);

    let user = await UserModel.create({
      email: data.email,
      password: hash,
      firstname: data.firstname,
      lastname: data.lastname,
    });

    let newUser = user.toJSON();

    delete newUser.token;

    let newJWT = await generateJWT(newUser);

    await UserModel.update(
      {
        token: newJWT.token,
      },
      { where: { id: user.id } }
    );

    res.status(201).json(newJWT);
  } catch (err) {
    res.status(500).json({ error: err });
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
export default { logout, login, createUser };
