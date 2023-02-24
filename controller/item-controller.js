/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import ItemModel from '../db/models/item-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

const getItems = async (req, res) => {
  try {
    let items = [];

    items = await ItemModel.findAll({});
    res.status(200).json({ result: items });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getItemById = async (req, res) => {
  try {
    let item = await ItemModel.findOne({
      where: { id: req.query.id },
    });

    if (!item) {
      return res.status(400).json({ error: 'Not order with this id found' });
    }

    res.status(200).json({ result: item });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createItem = async (req, res) => {
  try {
    let data = { ...req.body };

    let item = await ItemModel.create(data);

    res.status(201).json({ result: item });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateById = async (req, res) => {
  let itemUpdate = await ItemModel.update(
    {
      ...req.body,
    },
    {
      where: { id: req.body.id },
    }
  );

  if (itemUpdate[0] === 0) {
    return res.status(400).json({ error: 'Please enter a valid Id' });
  }
  try {
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteById = async (req, res) => {
  try {
    let deletedItemCount = await ItemModel.destroy({
      where: { id: req.body.id },
    });

    if (deletedItemCount === 1) {
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
export default { getItems, createItem, getItemById, deleteById, updateById };
