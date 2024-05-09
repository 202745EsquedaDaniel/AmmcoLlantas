const { models } = require('../lib/sequelize');
const boom = require('@hapi/boom');

class ProviderService {
  async find() {
    const rta = await models.Provider.findAll();
    return rta;
  }

  async findOne(id) {
    const provider = await models.Provider.findByPk(id, { include: ['Tires'] });
    if (!provider) {
      throw boom.notFound('Provider not found');
    }
    return provider;
  }

  async create(data) {
    const newProvider = await models.Provider.create(data);
    return newProvider;
  }

  async update(id, changes) {
    const provider = await this.findOne(id);
    const rta = await provider.update(changes);
    return rta;
  }

  async delete(id) {
    const provider = await this.findOne(id);
    await provider.destroy();
    return { id };
  }
}

module.exports = ProviderService;
