/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { models } from '../db/associations.js';
import CardModel from '../db/models/card-model.js';
import ItemModel from '../db/models/item-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getCardFromUser = async (req, res) => {
  try {
    let user = req.user;

    let card = await CardModel.findAll({
      where: { UserId: user.id },
      include: [ItemModel, models.userModel],
    });

    res.status(200).json({ result: card });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const createCard = async (req, res) => {
  try {
    let data = { ...req.body, UserId: req.user.id };

    let card = await CardModel.create(data, {
      include: [ItemModel, models.userModel],
    });

    let cardWithUser = await CardModel.findOne({
      where: { id: card.id },
      include: [models.userModel, ItemModel],
    });

    res.status(201).json({ result: cardWithUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteCard = async (req, res) => {
  try {
    let deleteCardCount = await CardModel.destroy({
      where: { id: req.body.id },
    });

    if (deleteCardCount === 1) {
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
export default { deleteCard, createCard, getCardFromUser };
