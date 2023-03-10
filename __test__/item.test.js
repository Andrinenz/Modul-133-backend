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

describe('Backendtest - Product', () => {
  let app = '';
  let token = '';
  let Items = [];
  let product = '';

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

  test('Get Product by id', async () => {
    await request(app)
      .get('/api/items/getItemById')
      .query({ id: Items[0].id })
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
  });

  test('Create Product', async () => {
    let res = await request(app)
      .post('/api/items/createItem')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Backendtest',
        image: '1234',
        price: '3530',
        description: 'test description',
        isArchived: false,
        size: 'M,S,XL',
        itemsInStock: '100',
      })
      .expect(201);
    product = res.body.result;
  });

  test('Update product', async () => {
    await request(app)
      .patch('/api/items/updateById')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: product.id,
        image: 'abc123',
        title: 'new',
        description: 'new description',
      })
      .expect(200);
  });

  test('Delete product', async () => {
    await request(app)
      .delete('/api/items/deleteById')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: product.id,
      })
      .expect(200);
  });
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
