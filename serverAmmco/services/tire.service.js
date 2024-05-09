const { models } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class TireService {
  async find() {
    const rta = await models.Tire.findAll();
    return rta;
  }

  async findOne(id) {
    const tire = await models.Tire.findByPk(id);
    if (!tire) {
      throw boom.notFound('Tire not found');
    }
    return tire;
  }

  async create(data) {
    const newTire = await models.Tire.create(data);
    return newTire;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = TireService;
