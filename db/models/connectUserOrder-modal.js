/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { DataTypes, Model } from 'sequelize';
import ItemModel from './item-model.js';
import OrderModel from './order-model.js';
import UserModel from './user-model.js';
import sequelize from '../sequelize.js';
import CardModel from './card-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

class ConnectUserOrder extends Model {}

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

ConnectUserOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    CardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CardModel,
        key: 'id',
      },
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrderModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'ConnectCards',
    tableName: 'ConnectCards',
  }
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default ConnectUserOrder;
