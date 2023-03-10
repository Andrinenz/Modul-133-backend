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

describe('Backendtest - Card', () => {
  let app = '';
  let token = '';
  let card = '';
  let Items = [];

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

  test('Get Products', async () => {
    let res = await request(app)
      .get('/api/items/getItems')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
    Items = res.body.result;
  });

  test('Get Card from user', async () => {
    await request(app)
      .get('/api/card/getCardFromUser')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
  });

  test('Create Card', async () => {
    let res = await request(app)
      .post('/api/card/createCard')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ItemId: Items[0].id,
      })
      .expect(201);
    card = res.body.result;
  });

  test('Delete Card', async () => {
    await request(app)
      .delete('/api/card/deleteCard')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: card.id,
      })
      .expect(200);
  });
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
