const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./orders.model');
const { TIRES_TABLE, Tire } = require('./tires.model');

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
  subtotal: {
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
    this.belongsTo(models.Tire, {
      foreignKey: 'tire_ID',
      as: 'Tire',
    });
    this.belongsTo(models.Order, {
      foreignKey: 'order_ID',
      as: 'order',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERDETAILS_TABLE,
      modelname: 'orderDetail',
      timestamps: false,
      hooks: {
        beforeCreate: (orderDetail) => {
          orderDetail.subtotal = orderDetail.quantity * orderDetail.unitPrice;
        },
        beforeUpdate: (orderDetail) => {
          orderDetail.subtotal = orderDetail.quantity * orderDetail.unitPrice;
        },
        afterCreate: async (orderDetail, options) => {
          const tire = await Tire.findByPk(orderDetail.tire_ID);
          if (tire) {
            tire.stock -= orderDetail.quantity;
            await tire.save();
          }
        },
        afterUpdate: async (orderDetail, options) => {
          const tire = await Tire.findByPk(orderDetail.tire_ID);
          if (tire) {
            const oldQuantity = options.fields.includes('quantity') ? options.fields.quantity.previous : orderDetail.quantity;
            tire.stock += oldQuantity - orderDetail.quantity;
            await tire.save();
          }
        },
      },
    };
  }
}

module.exports = {
  ORDERDETAILS_TABLE,
  OrderDetailSchema,
  OrderDetail,
};
