/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { models } from "../db/associations.js";
import CardModel from "../db/models/card-model.js";
import ItemModel from "../db/models/item-model.js";

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
      where: { UserId: user.id, isArchived: false },
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

    let dublicatedCard = await CardModel.findOne({
      where: { ItemId: data.ItemId, choosedSize: data.choosedSize },
    });

    if (dublicatedCard) {
      const cardJson = dublicatedCard.toJSON();
      dublicatedCard.update({
        itemCount: cardJson?.itemCount + data?.itemCount,
      });
      return res.sendStatus(200);
    }

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

const updateCard = async (req, res) => {
  let cardUpadte = await CardModel.update(
    { ...req.body },
    {
      where: { id: req.body.id },
    }
  );

  if (cardUpadte[0] === 0) {
    return res.status(400).json({ error: "Please enter a valid Id" });
  }
  try {
    res.sendStatus(200);
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
    res.status(400).json({ error: "Id not found" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default { deleteCard, createCard, getCardFromUser, updateCard };
