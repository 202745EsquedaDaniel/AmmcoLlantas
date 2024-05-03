const { Model, Sequelize, DataTypes } = require('sequelize');

const PROVIDERE_TABLE = 'Providers';

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
    type: DataTypes.INTEGER,
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

class Worker extends Model {
  static associate(models) {
    this.hasMany(models.ProjectWorker, {
      as: 'projectWorkers',
      foreignKey: 'worker_id',
      include: [{ model: models.Project, as: 'project', attributes: ['name'] }],
    });
    this.hasMany(models.NominasSemanales, {
      as: 'NominasSemanales',
      foreignKey: 'worker_id',
    });
    this.hasMany(models.WorkerCost, {
      as: 'WorkerCosts',
      foreignKey: 'worker_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVIDERE_TABLE,
      modelName: 'Worker',
      timestamps: false,
      hooks: {
        beforeSave: (worker) => {
          worker.salary;
          if (worker.salary != 0) {
            var diario = worker.salary / 7;
            worker.salary_hour = diario;
          }
        },
      },
    };
  }
}

module.exports = {
  WORKER_TABLE: PROVIDERE_TABLE,
  WorkerSchema: ProviderSchema,
  Worker,
};
