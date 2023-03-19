/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import OrderModel from '../db/models/order-model.js';
import CardModel from '../db/models/card-model.js';
import ConnectUserOrder from '../db/models/connectUserOrder-modal.js';
import { models } from '../db/associations.js';
import ItemModel from '../db/models/item-model.js';

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
      include: [{ model: CardModel, include: [ItemModel, models.userModel] }],
    });

    res.status(200).json({ result: orders });
  } catch (err) {
    console.log(err);
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
    let { Cards: cards, ...body } = req.body;

    let order = await OrderModel.create(body);

    let selectedCards = cards;

    await ConnectUserOrder.bulkCreate(
      cards.map((item) => ({ OrderId: order.id, CardId: item }))
    );

    selectedCards.forEach(async (id) => {
      await CardModel.findOne({
        where: { id: id },
      }).then((selectedCard) => selectedCard.update({ isArchived: true }));
    });

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
