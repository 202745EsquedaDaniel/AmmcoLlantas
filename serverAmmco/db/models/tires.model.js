const { Model, Sequelize, DataTypes } = require('sequelize');

const { PROVIDER_TABLE } = require('./providers.model');

const TIRES_TABLE = 'Tires';

const TireSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  provider_ID: {
    field: 'provider_ID',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROVIDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  model: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Tire extends Model {
  static associate(models) {
    this.belongsTo(models.Provider, {
      foreignKey: 'provider_ID',
      as: 'provider',
    });
    this.hasMany(models.OrderDetail, {
      as: 'OrderDetails',
      foreignKey: 'tire_ID',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIRES_TABLE,
      modelName: 'Tire',
      timestamps: false,
    };
  }
}

module.exports = {
  TIRES_TABLE,
  TireSchema,
  Tire,
};
