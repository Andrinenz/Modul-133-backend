/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { DataTypes, Model } from 'sequelize';

import sequelize from '../sequelize.js';
import ItemModel from './item-model.js';
import UserModel from './user-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

class ReviewModel extends Model {}

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

ReviewModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ItemModel,
        key: 'id',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'Review',
    tableName: 'Review',
  }
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default ReviewModel;
