/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import request from "supertest";
import start from "../loaders";

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

describe("Backendtest - Order", () => {
  let app = "";
  let token = "";
  let cards = [];
  let orders = [];
  let order = "";

  beforeAll(async () => {
    app = await start();
  });

  test("Get token", async () => {
    let res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@tbz.ch",
        password: "1234",
      })
      .expect(200);
    token = res.body.token;
  });

  test("Get orders", async () => {
    let res = await request(app)
      .get("/api/order/allOrders")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);
    orders = res.body.result;
  });

  test("Get Card from user", async () => {
    let res = await request(app)
      .get("/api/card/getCardFromUser")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);
    cards = res.body.result;
  });

  test("Create Order", async () => {
    let res = await request(app)
      .post("/api/order/createOrder")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "Backend",
        lastname: "Test",
        email: "backend@test.ch",
        address: "backendaddr",
        country: "Test",
        plz: "5034",
        state: "Zürich",
        apartementNumber: "56",
        totalAmount: "34500",
        paymentMethod: "PayPal",
        sentToShippingCompany: false,
        UserId: 63,
        Cards: [cards[0].id],
      })
      .expect(201);
    order = res.body;
  });

  test("Update Order", async () => {
    await request(app)
      .patch("/api/order/updateOrderById")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: order.id,
        firstname: "New test",
      })
      .expect(200);
  });

  test("Delete Order", async () => {
    await request(app)
      .delete("/api/order/deleteOrder")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: order.id,
      })
      .expect(200);
  });
});

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
