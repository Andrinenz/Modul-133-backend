/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { models } from '../db/associations.js';
import ItemModel from '../db/models/item-model.js';
import ReviewModel from '../db/models/review-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getAllRatings = async (req, res) => {
  try {
    let ratings = [];

    ratings = await ReviewModel.findAll({
      include: [ItemModel, models.userModel],
    });
    res.status(200).json({ result: ratings });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getRatingByItem = async (req, res) => {
  try {
    let ratings = await ReviewModel.findAll({
      where: { ItemId: req.query.id },
      include: [ItemModel, models.userModel],
    });

    if (!ratings) {
      return res.status(400).json({ error: 'Not rating with this id found' });
    }

    res.status(200).json({ result: ratings });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getRatingsByUserId = async (req, res) => {
  try {
    let ratings = await ReviewModel.findAll({
      where: { UserId: req.query.id },
      include: [ItemModel, models.userModel],
    });

    if (!ratings) {
      return res.status(400).json({ error: 'Not rating with this id found' });
    }

    res.status(200).json({ result: ratings });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createRating = async (req, res) => {
  try {
    let data = { ...req.body, UserId: req.user.id };

    let rating = await ReviewModel.create(data, {
      include: [models.userModel, ItemModel],
    });

    let ratingWithUser = await ReviewModel.findOne({
      where: { id: rating.id },
      include: [models.userModel, ItemModel],
    });

    res.status(201).json({ result: ratingWithUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateRatingById = async (req, res) => {
  let ratingUpdate = await ReviewModel.update(
    { ...req.body },
    {
      where: { id: req.body.id },
    }
  );

  if (ratingUpdate[0] === 0) {
    return res.status(400).json({ error: 'Please enter a valid Id' });
  }
  try {
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteRating = async (req, res) => {
  try {
    let deletedRatingCount = await ReviewModel.destroy({
      where: { id: req.body.id },
    });

    if (deletedRatingCount === 1) {
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
  createRating,
  deleteRating,
  updateRatingById,
  getAllRatings,
  getRatingByItem,
  getRatingsByUserId,
};
