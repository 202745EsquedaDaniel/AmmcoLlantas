const { models } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class OrderDetailService {
  async find() {
    const rta = await models.OrderDetail.findAll();
    return rta;
  }

  async findOne(id) {
    const order = await models.OrderDetail.findByPk(id);
    if (!order) {
      throw boom.notFound('OrderDetail not found');
    }
    return order;
  }

  async create(data) {
    const newCustomer = await models.OrderDetail.create(data);
    return newCustomer;
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

module.exports = OrderDetailService;
