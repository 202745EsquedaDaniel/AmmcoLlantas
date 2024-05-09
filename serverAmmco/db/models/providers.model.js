const { Model, Sequelize, DataTypes } = require('sequelize');

const PROVIDER_TABLE = 'Providers';

const ProviderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  contactPhone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Provider extends Model {
  static associate(models) {
    this.hasMany(models.Tire, {
      as: 'Tires',
      foreignKey: 'provider_ID',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVIDER_TABLE,
      modelName: 'Provider',
      timestamps: false,
    };
  }
}

module.exports = {
  PROVIDER_TABLE,
  ProviderSchema,
  Provider,
};
