const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customers.model');

const ORDER_TABLE = 'Orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customer_ID: {
    field: 'customer_ID',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  total: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Order extends Model {
  static associate(models) {
    this.hasMany(models.OrderDetail, {
      as: 'orderDetail',
      foreignKey: 'orderDetail_ID',
    });
    this.belongsTo(models.Customer, {
      as: 'Customer',
      foreignKey: 'customer_ID',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelname: 'order',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_TABLE,
  OrderSchema,
  Order,
};
