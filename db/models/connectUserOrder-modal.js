/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { DataTypes, Model } from 'sequelize';
import ItemModel from './item-model.js';
import OrderModel from './order-model.js';
import UserModel from './user-model.js';
import sequelize from '../sequelize.js';

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
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ItemModel,
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
    modelName: 'ConnectItems',
    tableName: 'ConnectItems',
  }
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default ConnectUserOrder;
