/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import UserModel from './models/user-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

const defaultUser = {
  email: 'test@tbz.ch',
  isAdmin: true,
  firstname: 'Test',
  lastname: 'TBZ',
  password: '1234',
};

//Checks if two objects got the same attributes and values, without memory restrictions
const deepEqual = (x, y) => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const loadDefaultValues = async () => {
  //Sync user
  let testUser = await UserModel.findOne({
    where: { email: defaultUser.email },
    attributes: {
      exclude: ['id', 'token', 'createdAt', 'updatedAt'],
    },
  });
  if (testUser && deepEqual(testUser.toJSON(), defaultUser)) return;

  if (testUser) {
    UserModel.update(defaultUser, {
      where: { email: defaultUser.email },
    });
    console.log('1 user had to be synced');
    return;
  }

  await UserModel.create(defaultUser);
  console.log('1 user had to be synced');
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export { loadDefaultValues };
