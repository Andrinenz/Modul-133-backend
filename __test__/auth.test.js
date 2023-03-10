/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import 'regenerator-runtime/runtime';
import request from 'supertest';
import start from '../loaders';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

describe('Backendtests - Auth', () => {
  let app;
  let token = '';

  beforeAll(async () => {
    app = await start();
  });

  test('Get token', async () => {
    let res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@tbz.ch',
        password: '1234',
      })
      .expect(200);
    token = res.body.token;
  });

  test('Logout', async () => {
    await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
  });
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
