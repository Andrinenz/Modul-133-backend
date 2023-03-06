/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import ItemModel from '../db/models/item-model.js';
import OrderModel from '../db/models/order-model.js';
import ConnectUserOrder from '../db/models/connectUserOrder-modal.js';
import { models } from '../db/associations.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getAllOrders = async (req, res) => {
  try {
    let orders = [];

    orders = await OrderModel.findAll({
      include: [models.userModel, ItemModel],
    });

    res.status(200).json({ result: orders });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getOrderById = async (req, res) => {
  try {
    let order = await OrderModel.findOne({
      where: { id: req.query.id },
      include: [models.userModel],
    });

    if (!order) {
      return res.status(400).json({ error: 'Not order with this id found' });
    }

    res.status(200).json({ result: order });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createOrder = async (req, res) => {
  try {
    // let data = { ...req.body, UserId: req.user.id };
    let { Items: items, ...body } = req.body;

    let order = await OrderModel.create(body);

    await ConnectUserOrder.bulkCreate(
      items.map((item) => ({ OrderId: order.id, ItemId: item }))
    );

    res.status(201).json({ ...order.toJSON() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const updateOrderById = async (req, res) => {
  let orderUpdate = await OrderModel.update(
    { ...req.body },
    {
      where: { id: req.body.id },
    }
  );

  if (orderUpdate[0] === 0) {
    return res.status(400).json({ error: 'Please enter a valid Id' });
  }
  try {
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteOrder = async (req, res) => {
  try {
    let deletedOrderCount = await OrderModel.destroy({
      where: { id: req.body.id },
    });

    if (deletedOrderCount === 1) {
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
export default {
  getAllOrders,
  createOrder,
  updateOrderById,
  deleteOrder,
  getOrderById,
};
