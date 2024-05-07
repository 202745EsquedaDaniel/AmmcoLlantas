const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./orders.model');
const { TIRES_TABLE } = require('./tires.model');

const ORDERDETAILS_TABLE = 'OrderDetails';

const OrderDetailSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  order_ID: {
    field: 'order_ID',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  tire_ID: {
    field: 'tire_ID',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TIRES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  unitPrice: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class OrderDetail extends Model {
  static associate(models) {
    this.hasMany(models.ProjectCustomer, {
      as: 'projectCustomers',
      foreignKey: 'project_id',
    });
    this.belongsTo(models.Customer, {
      as: 'Customer',
      foreignKey: 'customer_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERDETAILS_TABLE,
      modelname: 'orderdetail',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDERDETAILS_TABLE,
  OrderDetailSchema,
  OrderDetail,
};
