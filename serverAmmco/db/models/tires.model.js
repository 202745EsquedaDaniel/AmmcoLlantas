const { Model, Sequelize, DataTypes } = require('sequelize');

const TIRES_TABLE = 'Tires';

const TireSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  provider_ID: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
      as: 'Provider',
      foreignKey: 'provider_id',
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
