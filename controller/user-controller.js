/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import UserModel from '../db/models/user-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getUsers = async (req, res) => {
  try {
    let users = UserModel.findAll({});

    res.status(200).json({ result: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createUser = async (req, res) => {
  try {
    let data = { ...req.body };

    let user = await UserModel.create(data);

    res.status(201).json({ result: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateUser = async (req, res) => {
  let userUpdate = await UserModel.update(
    { ...req.body },
    { where: { id: req.body.id } }
  );

  if (userUpdate[0] === 0) {
    return res.status(400).json({ error: 'Please enter a valid Id' });
  }
  try {
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    let deleteUserCount = await UserModel.destroy({
      where: { id: req.body.id },
    });

    if (deleteUserCount === 1) {
      return res.sendStatus(200);
    }
    res.status(400).json({ error: 'Id not found' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { getUsers, createUser, updateUser, deleteUser };
