/*-------------------------------------------------------------*/
/*IMPORTS*/
/*-------------------------------------------------------------*/

import { DataTypes, Model } from 'sequelize';

import sequelize from '../sequelize.js';
import UserModel from './user-model.js';

/*-------------------------------------------------------------*/
/*DECLARATION AND INITIALIZATION*/
/*-------------------------------------------------------------*/

class OrderModel extends Model {}

/*-------------------------------------------------------------*/
/*MAIN*/
/*-------------------------------------------------------------*/

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apartementNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardExpiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardCompany: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plz: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentToShippingCompany: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cardHolder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Order',
    tableName: 'Order',
  }
);

/*-------------------------------------------------------------*/
/*EXPORTS*/
/*-------------------------------------------------------------*/
export default OrderModel;
