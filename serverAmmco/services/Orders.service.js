const { models } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class OrdersService {
  async find() {
    const rta = await models.Order.findAll();
    return rta;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          model: models.OrderDetail,
          as: 'orderDetails',
          include: [
            {
              model: models.Tire,
              as: 'Tire', // Asegúrate de que este nombre coincida con la asociación en el modelo OrderDetail
              attributes: ['name', 'model']
            }
          ]
        }
      ]
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }


  async create(data) {
    const newCustomer = await models.Order.create(data);
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

module.exports = OrdersService;
